import Foundation
import ActivityKit

@available(iOS 16.2, *)
public final class StopwatchLiveActivityManager {
    public static let shared = StopwatchLiveActivityManager()
    private var activeActivity: Activity<StopwatchActivityAttributes>? = nil

    private init() {}

    public var areActivitiesEnabled: Bool {
        ActivityAuthorizationInfo().areActivitiesEnabled
    }

    public func start(exerciseName: String, userName: String, durationSeconds: Double) async throws -> String {
        guard areActivitiesEnabled else {
            throw NSError(domain: "LiveActivity", code: 1, userInfo: [NSLocalizedDescriptionKey: "Live Activities are disabled by user"])
        }

        // Dismiss existing activities
        await endCurrent()

        let attributes = StopwatchActivityAttributes(exerciseName: exerciseName, userName: userName)
        let endTime = Date().addingTimeInterval(durationSeconds)
        let contentState = StopwatchActivityAttributes.ContentState(endTime: endTime, totalSeconds: durationSeconds)

        let activity = try Activity<StopwatchActivityAttributes>.request(
            attributes: attributes,
            contentState: contentState,
            pushType: nil
        )
        self.activeActivity = activity
        return activity.id
    }

    public func endCurrent() async {
        for activity in Activity<StopwatchActivityAttributes>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
        self.activeActivity = nil
    }
}
