/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-20 17:25:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { systemStore } from '@stores'
import { getCoverMedium } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

// function Cover({ src, ...other }) {
//   const { cdn } = systemStore.setting
//   const _src = cdn ? CDN_OSS_SUBJECT(getCoverMedium(src)) : getCoverMedium(src)
//   return <Image src={_src} {...other} />
// }

// export default observer(Cover)

function Cover({ style, src, ...other }) {
  const { cdn } = systemStore.setting
  const _src =
    (cdn ? CDN_OSS_SUBJECT(getCoverMedium(src)) : getCoverMedium(src)) ||
    IMG_DEFAULT
  return (
    <Image
      style={[
        style,
        _src.includes &&
          _src.includes('jsdelivr') && {
            borderColor: 'red',
            borderWidth: 1
          }
      ]}
      src={_src}
      {...other}
    />
  )
}

export default observer(Cover)
