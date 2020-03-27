package soko.ekibun.bangumi.plugins.main

import android.app.Activity
import soko.ekibun.bangumi.plugins.ActivityPlugin
import java.lang.ref.WeakReference

class MainActivityPlugin : ActivityPlugin {
  override fun setUpPlugins(activityRef: WeakReference<Activity>) {
    MainPresenter(activityRef)
  }
}
