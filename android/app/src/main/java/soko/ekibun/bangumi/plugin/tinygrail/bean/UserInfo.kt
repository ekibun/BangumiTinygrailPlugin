package soko.ekibun.bangumi.plugin.tinygrail.bean

import soko.ekibun.bangumi.plugins.util.ReflectUtil

@ReflectUtil.ReflectClass("soko.ekibun.bangumi.api.bangumi.bean.UserInfo")
data class UserInfo(
  var id: Int = 0,
  var username: String? = null,
  var nickname: String? = null,
  var avatar: String? = null,
  var sign: String? = null
) {
  val url = "https://bgm.tv/user/$username"

  val name get() = if (nickname.isNullOrEmpty()) username else nickname
}
