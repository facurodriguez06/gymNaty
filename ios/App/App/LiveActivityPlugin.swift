import Foundation
import Capacitor
import ActivityKit

@objc(LiveActivityPlugin)
public class LiveActivityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LiveActivityPlugin"
    public let jsName = "LiveActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startRestTimer", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "endRestTimer", returnType: CAPPluginReturnPromise)
    ]
    
    private var currentActivity: Any? = nil

    @objc public func startRestTimer(_ call: CAPPluginCall) {
        let exerciseName = call.getString("exerciseName", "")
        guard !exerciseName.isEmpty else {
            call.resolve([
                "success": false,
                "message": "Missing required parameter: exerciseName"
            ])
            return
        }

        let seconds = call.getDouble("seconds", -1)
        let isStopwatch = call.getBool("isStopwatch", false)
        let startTimeMs = call.getDouble("startTime", -1)
        
        let userName = call.getString("userName", "Facu")

        if #available(iOS 16.2, *) {
            guard ActivityAuthorizationInfo().areActivitiesEnabled else {
                call.resolve([
                    "success": false,
                    "message": "Live Activities are not enabled on this device"
                ])
                return
            }

            Task {
                var newTimer: RestTimerAttributes.TimerState
                
                if isStopwatch {
                    let startDate = startTimeMs > 0 ? Date(timeIntervalSince1970: startTimeMs / 1000.0) : Date()
                    newTimer = RestTimerAttributes.TimerState(
                        endTime: Date.distantFuture,
                        totalSeconds: 0,
                        exerciseName: exerciseName,
                        isStopwatch: true,
                        startTime: startDate
                    )
                } else {
                    newTimer = RestTimerAttributes.TimerState(
                        endTime: Date().addingTimeInterval(seconds),
                        totalSeconds: seconds,
                        exerciseName: exerciseName,
                        isStopwatch: false,
                        startTime: nil
                    )
                }
                
                // Clean up any ended activities from the lock screen when starting a new timer
                for oldActivity in Activity<RestTimerAttributes>.activities {
                    if oldActivity.activityState == .ended {
                        Task { await oldActivity.end(nil, dismissalPolicy: .immediate) }
                    }
                }
                
                if let activity = Activity<RestTimerAttributes>.activities.first(where: { $0.activityState == .active }) {
                    // Update existing activity
                    var contentState = activity.content.state
                    if userName.lowercased() == "facu" {
                        contentState.facu = newTimer
                    } else if userName.lowercased() == "session" {
                        contentState.session = newTimer
                    } else {
                        contentState.alma = newTimer
                    }
                    
                    let content = ActivityContent(state: contentState, staleDate: nil)
                    await activity.update(content)
                    call.resolve(["id": activity.id, "success": true])
                } else {
                    // Create new activity
                    var contentState = RestTimerAttributes.ContentState(facu: nil, alma: nil, session: nil)
                    if userName.lowercased() == "facu" {
                        contentState.facu = newTimer
                    } else if userName.lowercased() == "session" {
                        contentState.session = newTimer
                    } else {
                        contentState.alma = newTimer
                    }
                    
                    let attributes = RestTimerAttributes()
                    do {
                        let content = ActivityContent(state: contentState, staleDate: nil)
                        let activity = try Activity<RestTimerAttributes>.request(
                            attributes: attributes,
                            content: content,
                            pushType: nil
                        )
                        self.currentActivity = activity
                        call.resolve(["id": activity.id, "success": true])
                    } catch {
                        call.resolve([
                            "success": false,
                            "message": "Failed to start Live Activity: \(error.localizedDescription)"
                        ])
                    }
                }
            }
        } else {
            call.resolve([
                "success": false,
                "message": "Live Activities require iOS 16.2 or later"
            ])
        }
    }

    @objc public func endRestTimer(_ call: CAPPluginCall) {
        let userName = call.getString("userName", "")
        let dismissImmediately = call.getBool("dismissImmediately", false)
        if #available(iOS 16.2, *) {
            Task {
                if let activity = Activity<RestTimerAttributes>.activities.first(where: { $0.activityState == .active }) {
                    var contentState = activity.content.state
                    
                    if dismissImmediately {
                        if userName.lowercased() == "facu" { contentState.facu = nil }
                        else if userName.lowercased() == "alma" { contentState.alma = nil }
                        else if userName.lowercased() == "session" { contentState.session = nil }
                        else {
                            contentState.facu = nil
                            contentState.alma = nil
                            contentState.session = nil
                        }
                    } else {
                        if userName.lowercased() == "facu" {
                            contentState.facu?.isFinished = true
                        } else if userName.lowercased() == "alma" {
                            contentState.alma?.isFinished = true
                        } else if userName.lowercased() == "session" {
                            contentState.session?.isFinished = true
                        } else {
                            contentState.facu?.isFinished = true
                            contentState.alma?.isFinished = true
                            contentState.session?.isFinished = true
                        }
                    }
                    
                    let allFinishedOrNil = (contentState.facu == nil || contentState.facu?.isFinished == true) &&
                                      (contentState.alma == nil || contentState.alma?.isFinished == true) &&
                                      (contentState.session == nil || contentState.session?.isFinished == true)
                    
                    let isEmpty = contentState.facu == nil && contentState.alma == nil && contentState.session == nil
                    
                    if isEmpty {
                        await activity.end(nil, dismissalPolicy: .immediate)
                        self.currentActivity = nil
                    } else if allFinishedOrNil {
                        let content = ActivityContent(state: contentState, staleDate: nil)
                        await activity.end(content, dismissalPolicy: dismissImmediately ? .immediate : .default)
                        self.currentActivity = nil
                    } else {
                        let content = ActivityContent(state: contentState, staleDate: nil)
                        await activity.update(content)
                    }
                    call.resolve()
                } else {
                    // Try to catch any stray activities and force end them if dismissing
                    if dismissImmediately {
                        for oldActivity in Activity<RestTimerAttributes>.activities {
                            await oldActivity.end(nil, dismissalPolicy: .immediate)
                        }
                    }
                    call.resolve()
                }
            }
        } else {
            call.resolve()
        }
    }
}
