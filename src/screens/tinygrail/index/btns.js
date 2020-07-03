/*
 * @Author: czy0729
 * @Date: 2019-12-23 12:07:36
 * @Last Modified by: ekibun
 * @Last Modified time: 2020-05-01 23:01:25
 */
import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from '@components'
import { Popover } from '@screens/_'
import { _, tinygrailStore } from '@stores'
import { observer } from '@utils/decorators'
import { APP_ID_SAY_TINYGRAIL } from '@constants'

const dataToday = ['刮刮乐', '幻想乡刮刮乐', '每周分红', '每日签到', '节日福利']
const dataMore = ['重新授权', '人物直达', '意见反馈', '设置']

function Btns(props, { $, navigation }) {
  const styles = memoStyles()
  const { loading, loadingBonus } = $.state
  if (!tinygrailStore.cookie) {
    return (
      <Button
        style={styles.btn}
        styleText={styles.text}
        size='sm'
        loading={loading}
        onPress={$.doAuth}
      >
        授权
      </Button>
    )
  }

  return (
    <>
      <Popover
        data={dataToday}
        onSelect={title => {
          setTimeout(() => {
            switch (title) {
              case '刮刮乐':
                $.doLottery(navigation)
                break
              case '幻想乡刮刮乐':
                $.doLottery(navigation, true)
                break
              case '每周分红':
                Alert.alert('警告', '确定领取每周分红? (每周日0点刷新)', [
                  {
                    text: '取消',
                    style: 'cancel'
                  },
                  {
                    text: '确定',
                    onPress: $.doGetBonusWeek
                  }
                ])
                break
              case '每日签到':
                $.doGetBonusDaily()
                break
              case '节日福利':
                $.doGetBonusHoliday()
                break
              default:
                break
            }
          }, 400)
        }}
      >
        <Button
          style={styles.btn}
          styleText={styles.text}
          size='sm'
          loading={loadingBonus}
        >
          每日
        </Button>
      </Popover>
      <Popover
        data={dataMore}
        onSelect={title => {
          setTimeout(() => {
            switch (title) {
              case '重新授权':
                $.doAuth()
                break
              case '人物直达':
                navigation.push('TinygrailSearch')
                break
              case '意见反馈':
                navigation.push('Say', {
                  id: APP_ID_SAY_TINYGRAIL
                })
                break
              case '设置':
                navigation.push('Setting')
                break
              default:
                break
            }
          }, 400)
        }}
      >
        <Button
          style={styles.btn}
          styleText={styles.text}
          size='sm'
          loading={loading}
        >
          更多
        </Button>
      </Popover>
    </>
  )
}

Btns.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Btns)

const memoStyles = _.memoStyles(_ => ({
  btn: {
    width: 68,
    marginLeft: _.sm,
    backgroundColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg),
    borderColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg)
  },
  text: {
    color: _.tSelect(_.__colorPlain__, _.colorTinygrailPlain)
  }
}))
