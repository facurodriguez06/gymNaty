import ActivityKit
import WidgetKit
import SwiftUI

@available(iOS 16.2, *)
public struct StopwatchLiveActivityWidget: Widget {
    public init() {}

    public var body: some WidgetConfiguration {
        ActivityConfiguration(for: StopwatchActivityAttributes.self) { context in
            // MARK: - LOCK SCREEN & STANDBY BANNER (Apple Clock Timer Native Aesthetic)
            HStack(spacing: 16) {
                ZStack {
                    Circle()
                        .fill(Color.orange.opacity(0.18))
                        .frame(width: 48, height: 48)
                    Image(systemName: "timer")
                        .font(.system(size: 22, weight: .bold))
                        .foregroundColor(.orange)
                }

                VStack(alignment: .leading, spacing: 3) {
                    Text(context.attributes.exerciseName)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundColor(.white)
                        .lineLimit(1)

                    HStack(spacing: 6) {
                        Text(context.attributes.userName.uppercased())
                            .font(.system(size: 10, weight: .black, design: .monospaced))
                            .foregroundColor(context.attributes.userName.lowercased().contains("facu") ? .cyan : .pink)
                        Text("•  DESCANSO")
                            .font(.system(size: 10, weight: .semibold))
                            .foregroundColor(.gray)
                    }
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 2) {
                    Text(timerInterval: Date()...context.state.endTime, countsDown: true)
                        .monospacedDigit()
                        .font(.system(size: 30, weight: .bold, design: .rounded))
                        .foregroundColor(.orange)

                    ProgressView(timerInterval: Date()...context.state.endTime, countsDown: true)
                        .tint(.orange)
                        .frame(width: 75)
                }
            }
            .padding(.horizontal, 18)
            .padding(.vertical, 14)
            .activityBackgroundTint(Color.black.opacity(0.92))
            .activitySystemActionForegroundColor(.orange)

        } dynamicIsland: { context in
            DynamicIsland {
                // MARK: - EXPANDED DYNAMIC ISLAND
                DynamicIslandExpandedRegion(.leading) {
                    HStack(spacing: 8) {
                        Image(systemName: "timer")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundColor(.orange)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(context.attributes.exerciseName)
                                .font(.system(size: 13, weight: .bold))
                                .foregroundColor(.white)
                                .lineLimit(1)
                            Text(context.attributes.userName.uppercased())
                                .font(.system(size: 9, weight: .black, design: .monospaced))
                                .foregroundColor(context.attributes.userName.lowercased().contains("facu") ? .cyan : .pink)
                        }
                    }
                    .padding(.leading, 4)
                }

                DynamicIslandExpandedRegion(.trailing) {
                    Text(timerInterval: Date()...context.state.endTime, countsDown: true)
                        .monospacedDigit()
                        .font(.system(size: 26, weight: .bold, design: .rounded))
                        .foregroundColor(.orange)
                        .padding(.trailing, 4)
                }

                DynamicIslandExpandedRegion(.bottom) {
                    ProgressView(timerInterval: Date()...context.state.endTime, countsDown: true)
                        .tint(.orange)
                        .padding(.horizontal, 6)
                        .padding(.top, 4)
                }
            } compactLeading: {
                // MARK: - COMPACT LEADING
                HStack(spacing: 3) {
                    Image(systemName: "timer")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.orange)
                    Text(context.attributes.userName.prefix(1).uppercased())
                        .font(.system(size: 10, weight: .black, design: .monospaced))
                        .foregroundColor(.white)
                }
                .padding(.leading, 3)
            } compactTrailing: {
                // MARK: - COMPACT TRAILING (Live Native Countdown)
                Text(timerInterval: Date()...context.state.endTime, countsDown: true)
                    .monospacedDigit()
                    .font(.system(size: 12, weight: .bold, design: .rounded))
                    .foregroundColor(.orange)
                    .frame(width: 42, alignment: .trailing)
                    .padding(.trailing, 3)
            } minimal: {
                // MARK: - MINIMAL
                Image(systemName: "timer")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.orange)
            }
        }
    }
}
