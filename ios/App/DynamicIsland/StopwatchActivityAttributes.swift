import Foundation
import ActivityKit

public struct StopwatchActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        public var endTime: Date
        public var totalSeconds: Double
        public var isRunning: Bool
        public var currentLap: Int

        public init(endTime: Date, totalSeconds: Double, isRunning: Bool = true, currentLap: Int = 1) {
            self.endTime = endTime
            self.totalSeconds = totalSeconds
            self.isRunning = isRunning
            self.currentLap = currentLap
        }
    }

    public var exerciseName: String
    public var userName: String

    public init(exerciseName: String, userName: String) {
        self.exerciseName = exerciseName
        self.userName = userName
    }
}
