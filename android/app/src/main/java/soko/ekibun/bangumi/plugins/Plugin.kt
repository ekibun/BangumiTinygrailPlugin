package soko.ekibun.bangumi.plugins

import android.app.Activity
import android.content.Context
import android.util.Log
import androidx.annotation.Keep
import soko.ekibun.bangumi.plugins.main.MainActivityPlugin
import java.lang.ref.WeakReference

@Keep
object Plugin {
  private val pluginList = mapOf(
    "soko.ekibun.bangumi.ui.main.MainActivity" to MainActivityPlugin()
  )

  @Keep
  fun setUpPlugins(activity: Activity, context: Context) {
    App.init(activity.application, context)
    try {
      pluginList[activity.javaClass.name]?.setUpPlugins(WeakReference(activity))
    } catch (e: Exception) {
      Log.e("plugin", Log.getStackTraceString(e))
    }
  }
}
