package soko.ekibun.bangumi.plugin.tinygrail

import android.app.Activity
import java.lang.ref.WeakReference

interface ActivityPlugin {
  fun setUpPlugins(activityRef: WeakReference<Activity>)
}
