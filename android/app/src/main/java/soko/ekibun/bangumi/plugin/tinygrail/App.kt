package soko.ekibun.bangumi.plugin.tinygrail

import android.app.Activity
import android.content.Context
import androidx.appcompat.view.ContextThemeWrapper
import java.lang.ref.WeakReference

class App(val host: Context, val plugin: Context) {
    val handler = android.os.Handler { true }

    companion object {
        val inited get() = Companion::app.isInitialized

        lateinit var app: App
        fun init(host: Context, plugin: Context) {
            if (!inited) app = App(host, plugin)
        }

        fun createThemeContext(activityRef: WeakReference<Activity>): Context {
            val themeContext = object : ContextThemeWrapper(app.plugin, R.style.AppTheme) {
                override fun getApplicationContext(): Context {
                    return this
                }

                override fun getSystemService(name: String): Any? {
                    return when (name) {
                        Context.WINDOW_SERVICE -> activityRef.get()?.getSystemService(name)
                        else -> super.getSystemService(name)
                    }
                }
            }
            activityRef.get()?.let { themeContext.applyOverrideConfiguration(it.resources.configuration) }
            return themeContext
        }
    }
}
