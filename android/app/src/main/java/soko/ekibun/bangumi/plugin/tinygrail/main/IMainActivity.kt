package soko.ekibun.bangumi.plugin.tinygrail.main

import android.content.Intent
import android.view.Menu
import android.view.MenuItem
import android.view.View

interface IMainActivity {
    val nav_view: View
    val mainPresenter: IMainPresenter
  var onActivityResultListener: (Int, Int, Intent?) -> Unit

    interface INavigationView {
        val menu: Menu
    }

    interface IMainPresenter {
        val drawerView: IDrawerView
    }

    interface IDrawerView {
        var navigationItemSelectedListener: (MenuItem) -> Boolean
    }
}
