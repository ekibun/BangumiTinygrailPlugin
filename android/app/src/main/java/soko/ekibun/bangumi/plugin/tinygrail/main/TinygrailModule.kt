package soko.ekibun.bangumi.plugin.tinygrail.main

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*

class TinygrailModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "Tinygrail"

  @ReactMethod
  fun getIntentExtra(callback: Callback) {
    callback( Arguments.createMap().also {
      it.putString("userInfo", currentActivity?.intent?.getStringExtra(EXTRA_USER_INFO)?:"")
      it.putString("userCookie", currentActivity?.intent?.getStringExtra(EXTRA_USER_COOKIE)?:"")
      it.putString("cookie", currentActivity?.intent?.getStringExtra(EXTRA_TINYGRAIL_COOKIE)?:"")
    })
  }

  @ReactMethod
  fun updateResult(cookie: String) {
    currentActivity?.setResult(Activity.RESULT_OK, Intent().putExtra(EXTRA_TINYGRAIL_COOKIE, cookie))
  }

  @ReactMethod
  fun logNative(data: String) {
    Log.v("tinygrail", data)
  }

  companion object {
    const val EXTRA_USER_INFO = "extra_user_info"
    const val EXTRA_USER_COOKIE = "extra_user_cookie"
    const val EXTRA_TINYGRAIL_COOKIE = "extra_tinygrail_cookie"
  }
}
