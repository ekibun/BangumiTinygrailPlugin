package soko.ekibun.bangumi.plugin.tinygrail.main

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class TinygrailModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "Tinygrail"

  override fun getConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      "userInfo" to (currentActivity?.intent?.getStringExtra(EXTRA_USER_INFO)?:"null"),
      "userCookie" to (currentActivity?.intent?.getStringExtra(EXTRA_USER_COOKIE)?:"null")
    )
  }

  companion object {
    const val EXTRA_USER_INFO = "extra_user_info"
    const val EXTRA_USER_COOKIE = "extra_user_cookie"
  }
}
