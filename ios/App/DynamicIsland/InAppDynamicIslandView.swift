import SwiftUI

public struct InAppDynamicIslandView: View {
    @Binding public var isExpanded: Bool
    public let exerciseName: String
    public let userName: String
    public let endTime: Date
    public let totalSeconds: Double
    public let onSkip: () -> Void
    public let onAddSeconds: (Double) -> Void

    // Hardware Dimensions (iPhone 14/15/16 Pro)
    private let compactWidth: CGFloat = 126.0
    private let compactHeight: CGFloat = 37.33
    private let expandedHeight: CGFloat = 110.0

    public init(
        isExpanded: Binding<Bool>,
        exerciseName: String,
        userName: String,
        endTime: Date,
        totalSeconds: Double,
        onSkip: @escaping () -> Void,
        onAddSeconds: @escaping (Double) -> Void
    ) {
        self._isExpanded = isExpanded
        self.exerciseName = exerciseName
        self.userName = userName
        self.endTime = endTime
        self.totalSeconds = totalSeconds
        self.onSkip = onSkip
        self.onAddSeconds = onAddSeconds
    }

    public var body: some View {
        ZStack {
            if isExpanded {
                expandedIslandView
            } else {
                compactIslandView
            }
        }
        .background(Color.black)
        .clipShape(RoundedRectangle(cornerRadius: isExpanded ? 36 : 63, style: .continuous))
        .shadow(color: Color.black.opacity(0.4), radius: 12, x: 0, y: 6)
        .frame(
            width: isExpanded ? (UIScreen.main.bounds.width - 24) : compactWidth,
            height: isExpanded ? expandedHeight : compactHeight
        )
        .animation(.interactiveSpring(response: 0.45, dampingFraction: 0.75, blendDuration: 0.25), value: isExpanded)
        .onTapGesture {
            withAnimation(.interactiveSpring(response: 0.45, dampingFraction: 0.75, blendDuration: 0.25)) {
                isExpanded.toggle()
            }
        }
    }

    // MARK: - COMPACT VIEW
    private var compactIslandView: some View {
        HStack(spacing: 6) {
            HStack(spacing: 3) {
                Image(systemName: "timer")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(.orange)
                Text(userName.prefix(1).uppercased())
                    .font(.system(size: 10, weight: .black, design: .monospaced))
                    .foregroundColor(.white)
            }
            .padding(.leading, 12)

            Spacer()

            Text(timerInterval: Date()...endTime, countsDown: true)
                .monospacedDigit()
                .font(.system(size: 12, weight: .bold, design: .rounded))
                .foregroundColor(.orange)
                .padding(.trailing, 12)
        }
    }

    // MARK: - EXPANDED VIEW
    private var expandedIslandView: some View {
        VStack(spacing: 8) {
            HStack(alignment: .center) {
                HStack(spacing: 8) {
                    Image(systemName: "timer")
                        .font(.system(size: 20, weight: .bold))
                        .foregroundColor(.orange)

                    VStack(alignment: .leading, spacing: 2) {
                        Text(exerciseName)
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.white)
                            .lineLimit(1)
                        Text(userName.uppercased() + " • DESCANSO")
                            .font(.system(size: 10, weight: .black, design: .monospaced))
                            .foregroundColor(userName.lowercased().contains("facu") ? .cyan : .pink)
                    }
                }

                Spacer()

                Text(timerInterval: Date()...endTime, countsDown: true)
                    .monospacedDigit()
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                    .foregroundColor(.orange)
            }
            .padding(.horizontal, 16)
            .padding(.top, 12)

            ProgressView(timerInterval: Date()...endTime, countsDown: true)
                .tint(.orange)
                .padding(.horizontal, 16)

            HStack(spacing: 12) {
                Button(action: onSkip) {
                    Text("SALTEAR")
                        .font(.system(size: 11, weight: .black, design: .monospaced))
                        .foregroundColor(.white)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.red.opacity(0.8))
                        .clipShape(Capsule())
                }

                Button(action: { onAddSeconds(30) }) {
                    Text("+30s")
                        .font(.system(size: 11, weight: .black, design: .monospaced))
                        .foregroundColor(.black)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.orange)
                        .clipShape(Capsule())
                }
            }
            .padding(.bottom, 8)
        }
    }
}
