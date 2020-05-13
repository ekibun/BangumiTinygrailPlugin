/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-02 21:43:23
 */
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation'

import { BackHandler, NativeModules } from 'react-native';
import { log } from '@utils/dev'

import {
  Tinygrail,
  TinygrailAdvance,
  TinygrailAdvanceAsk,
  TinygrailAdvanceAuction,
  TinygrailAdvanceAuction2,
  TinygrailAdvanceBid,
  TinygrailAdvanceSacrifice,
  TinygrailBid,
  TinygrailCharaAssets,
  TinygrailDeal,
  TinygrailICO,
  TinygrailICODeal,
  TinygrailItems,
  TinygrailLogs,
  TinygrailNew,
  TinygrailOverview,
  TinygrailRich,
  TinygrailSacrifice,
  TinygrailSearch,
  TinygrailTemples,
  TinygrailTopWeek,
  TinygrailTrade,
  TinygrailTree,
  TinygrailTreeRich,
  TinygrailValhall
} from '@screens'
import navigationsParams from '../navigations'
import config from './stacks/config'


const HomeStack = createStackNavigator(
  {
    Tinygrail,
    TinygrailAdvance,
    TinygrailAdvanceAsk,
    TinygrailAdvanceAuction,
    TinygrailAdvanceAuction2,
    TinygrailAdvanceBid,
    TinygrailAdvanceSacrifice,
    TinygrailBid,
    TinygrailCharaAssets,
    TinygrailDeal,
    TinygrailICO,
    TinygrailICODeal,
    TinygrailItems,
    TinygrailLogs,
    TinygrailNew,
    TinygrailOverview,
    TinygrailRich,
    TinygrailSacrifice,
    TinygrailSearch,
    TinygrailTemples,
    TinygrailTopWeek,
    TinygrailTrade,
    TinygrailTree,
    TinygrailTreeRich,
    TinygrailValhall
  },
  {
    ...navigationsParams,
    ...config
  }
)

const defaultGetStateForAction = HomeStack.router.getStateForAction
HomeStack.router.getStateForAction = (action, state) => {
  log(JSON.stringify({ action, state }))
  if (action.type == 'Navigation/BACK' && state.routes.length < 2) {
    BackHandler.exitApp();
  } else {
    switch (action.routeName) {
        case 'Topic':
          NativeModules.Tinygrail.startActivity(`http://bgm.tv/rakuen/topic/${action.params.topicId}`)
          return null
        case 'Group':
          NativeModules.Tinygrail.startActivity(`http://bgm.tv/group/${action.params.groupId}`)
          return null
        case 'Mono':
          NativeModules.Tinygrail.startActivity(`http://bgm.tv/${action.params.monoId}`)
          return null
        case 'Zone':
          NativeModules.Tinygrail.startActivity(`http://bgm.tv/user/${action.params.userId}`)
          return null
        default:
          break
    }
  }
  return defaultGetStateForAction(action, state)
}

export default createAppContainer(HomeStack)
