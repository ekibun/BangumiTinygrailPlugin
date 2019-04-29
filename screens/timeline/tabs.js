/*
 * @Author: czy0729
 * @Date: 2019-04-29 17:36:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 17:37:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from '@components'
import TabBarLeft from './tab-bar-left'
import { tabs } from './store'

const _Tabs = ({ $, children, ...other }) => {
  const { page, _page } = $.state
  return (
    <Tabs
      tabs={tabs}
      initialPage={page}
      page={children ? page : _page}
      renderTabBarLeft={<TabBarLeft $={$} />}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </Tabs>
  )
}

export default observer(_Tabs)