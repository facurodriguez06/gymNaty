import Foundation
import ActivityKit

public struct RestTimerAttributes: ActivityAttributes {
    public struct TimerState: Codable, Hashable {
        public var endTime: Date
        public var totalSeconds: Double
        public var exerciseName: String
        public var isPaused: Bool
        public var isStopwatch: Bool
        public var startTime: Date?
        public var isFinished: Bool?
        
        public init(endTime: Date, totalSeconds: Double, exerciseName: String, isPaused: Bool = false, isStopwatch: Bool = false, startTime: Date? = nil, isFinished: Bool? = false) {
            self.endTime = endTime
            self.totalSeconds = totalSeconds
            self.exerciseName = exerciseName
            self.isPaused = isPaused
            self.isStopwatch = isStopwatch
            self.startTime = startTime
            self.isFinished = isFinished
        }
    }
    
    public struct ContentState: Codable, Hashable {
        public var facu: TimerState?
        public var alma: TimerState?
        public var session: TimerState?
        
        public init(facu: TimerState? = nil, alma: TimerState? = nil, session: TimerState? = nil) {
            self.facu = facu
            self.alma = alma
            self.session = session
        }
    }
    
    // No static attributes needed since all data changes dynamically per user.
    public init() {}
}
