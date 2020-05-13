package soko.ekibun.bangumi.plugin.tinygrail.main

import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.FrameLayout

interface IMainActivity {
    val nav_view: View
    val mainPresenter: IMainPresenter

    interface INavigationView {
        val menu: Menu
    }

    interface IMainPresenter {
        val drawerView: IDrawerView
      val user: UserInfo
    }

    interface IDrawerView {
        var navigationItemSelectedListener: (MenuItem) -> Boolean
    }

  data class UserInfo(
    var id: Int = 0,
    var username: String? = null,
    var nickname: String? = null,
    var avatar: String? = null,
    var sign: String? = null
  )
}
