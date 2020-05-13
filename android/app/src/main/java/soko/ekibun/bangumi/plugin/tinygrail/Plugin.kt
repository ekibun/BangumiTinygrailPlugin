package soko.ekibun.bangumi.plugin.tinygrail

import android.app.Activity
import android.content.Context
import android.util.Log
import androidx.annotation.Keep
import soko.ekibun.bangumi.plugin.tinygrail.main.MainActivityPlugin
import soko.ekibun.bangumi.plugins.BasePlugin
import java.lang.ref.WeakReference

@Keep
class Plugin: BasePlugin() {
  private val pluginList = mapOf(
    "soko.ekibun.bangumi.ui.main.MainActivity" to MainActivityPlugin()
  )

  @Keep
  override fun setUpPlugins(activity: Activity, context: Context) {
    App.init(activity.application, context)
    try {
      pluginList[activity.javaClass.name]?.setUpPlugins(WeakReference(activity))
    } catch (e: Exception) {
      Log.e("plugin", Log.getStackTraceString(e))
    }
  }
}
