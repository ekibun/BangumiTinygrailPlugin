/*
 * @Description:
 * @Author: ekibun
 * @Date: 2020-05-13 15:41:04
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-13 18:49:09
 */
import { NativeModules } from 'react-native'
import { userStore, tinygrailStore } from '@stores'

export default {
  init: async () => {
    const intentExtra = await new Promise(resolve => NativeModules.Tinygrail.getIntentExtra(resolve))
    if (intentExtra.userInfo) {
      const nativeUser = JSON.parse(intentExtra.userInfo)
      tinygrailStore.updateCookie(intentExtra.cookie || '')
      userStore.updateUserInfo({
        ...nativeUser,
        avatar: {
          large: nativeUser.avatar,
          medium: nativeUser.avatar,
          small: nativeUser.avatar
        }
      })
      userStore.updateUserCookie({
        cookie: intentExtra.userCookie,
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'
      })
    }
  },
  updateResult: data => {
    NativeModules.Tinygrail.updateResult(data.headers['set-cookie'].map(v => `${v.split(';')[0]};`).join(''))
  }
}
