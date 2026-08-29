import WidgetKit
import SwiftUI

@main
struct VigorWidgetsBundle: WidgetBundle {
    var body: some Widget {
        if #available(iOS 16.2, *) {
            RestTimerLiveActivity()
        }
    }
}
