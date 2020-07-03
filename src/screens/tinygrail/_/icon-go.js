/*
 * @Author: czy0729
 * @Date: 2020-02-14 03:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 15:22:21
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'

const data = ['K线', '买入', '卖出', '资产重组']

function IconGo({ $ }) {
  const { go } = $.state
  return (
    <Popover style={styles.icon} data={data} onSelect={$.onSelectGo}>
      <Flex>
        <Iconfont name='right' size={14} color={_.colorTinygrailText} />
        <Text style={_.ml.xs} type='tinygrailText'>
          {go}
        </Text>
      </Flex>
    </Popover>
  )
}

export default observer(IconGo)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
