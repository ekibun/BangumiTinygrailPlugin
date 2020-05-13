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

export default createAppContainer(HomeStack)
