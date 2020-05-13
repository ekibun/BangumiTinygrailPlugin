package soko.ekibun.bangumi.plugin.tinygrail.main

import android.app.Activity
import soko.ekibun.bangumi.plugin.tinygrail.ActivityPlugin
import java.lang.ref.WeakReference

class MainActivityPlugin : ActivityPlugin {
  override fun setUpPlugins(activityRef: WeakReference<Activity>) {
    MainPresenter(activityRef)
  }
}
