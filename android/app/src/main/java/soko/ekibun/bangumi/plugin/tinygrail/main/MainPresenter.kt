package soko.ekibun.bangumi.plugin.tinygrail.main

import android.app.Activity
import android.content.Intent
import android.webkit.CookieManager
import soko.ekibun.bangumi.plugin.tinygrail.App
import soko.ekibun.bangumi.plugin.tinygrail.MainActivity
import soko.ekibun.bangumi.plugin.tinygrail.R
import soko.ekibun.bangumi.plugins.util.JsonUtil
import soko.ekibun.bangumi.plugins.util.ReflectUtil
import soko.ekibun.bangumi.plugins.util.ResourceUtil
import java.lang.ref.WeakReference

class MainPresenter(activityRef: WeakReference<Activity>) {
  val proxy = ReflectUtil.proxyObjectWeak(activityRef, IMainActivity::class.java)!!
  private val nav_view = ReflectUtil.proxyObject(proxy.nav_view, IMainActivity.INavigationView::class.java)!!

  val pluginContext = App.createThemeContext(activityRef)

  init {
    val menu =
      nav_view.menu.add(ResourceUtil.getId(App.app.host, "group2"), 2, 1, "小圣杯")
    menu.icon = ResourceUtil.getDrawable(pluginContext, R.drawable.ic_grail)

    val superListener = proxy.mainPresenter.drawerView.navigationItemSelectedListener
    proxy.mainPresenter.drawerView.navigationItemSelectedListener = {
      if (menu.itemId == it.itemId) {
        activityRef.get()?.startActivity(Intent(pluginContext, MainActivity::class.java)
          .putExtra(TinygrailModule.EXTRA_USER_INFO, JsonUtil.toJson(proxy.mainPresenter.user))
          .putExtra(TinygrailModule.EXTRA_USER_COOKIE, CookieManager.getInstance().getCookie(".bgm.tv")))
      }
      superListener(it)
    }
  }
}
