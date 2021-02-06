/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: ekibun
 * @Last Modified time: 2021-01-22 11:49:37
 */
// import React from 'react'
import {
  // createAppContainer,
  createStackNavigator,
  // getActiveChildNavigationOptions
} from 'react-navigation'
import { BackHandler, NativeModules } from 'react-native';
import createAppContainer from '@components/@/react-navigation/createAppContainer'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
// import { observer } from 'mobx-react'
import * as Screens from '@screens'
import navigationsParams, { initialRouteName } from '@/config'
// import TabBarComponent from './tab-bar-component'
import config from './config'
// import HomeScreen from './home-screen'
import { navigateOnce } from './utils'

// const HomeTab = observer(
//   createBottomTabNavigator(
//     {
//       Discovery: Screens.Discovery,
//       Timeline: Screens.Timeline,
//       Home: HomeScreen,
//       Rakuen: Screens.Rakuen,
//       User: Screens.User
//     },
//     {
//       initialRouteName,
//       tabBarComponent: props => <TabBarComponent {...props} />,
//       navigationOptions: ({ navigation, screenProps }) =>
//         getActiveChildNavigationOptions(navigation, screenProps),
//       animationEnabled: false
//       // lazy: false
//     }
//   )
// )

const HomeStack = createStackNavigator(
  {
    ...Screens,
    // HomeTab
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
        case 'Say':
          NativeModules.Tinygrail.startActivity(`http://bgm.tv/user/sukaretto/timeline/status/${action.params.id}`)
          return null
        default:
          break
    }
  }
  return defaultGetStateForAction(action, state)
}

const MainNavigator = createAppContainer(HomeStack)
MainNavigator.router.getStateForAction = navigateOnce(
  MainNavigator.router.getStateForAction
)

export default MainNavigator
