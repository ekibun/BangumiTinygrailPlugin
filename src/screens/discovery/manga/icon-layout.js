/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 01:38:10
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconLayout({ $ }) {
  return (
    <IconTouchable
      name={$.isList ? 'order' : 'list'}
      size={$.isList ? 18 : 20}
      color={_.colorTitle}
      onPress={$.switchLayout}
    >
      <Heatmap right={30} id='Manga.切换布局' />
    </IconTouchable>
  )
}

export default ob(IconLayout)
