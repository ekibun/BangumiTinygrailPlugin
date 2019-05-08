/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 20:43:43
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import _, { colorPlain } from '@styles'

const Head = ({ style }, { $ }) => {
  const { avatar, nickname, id } = $.usersInfo
  return (
    <Flex style={style} justify='center' direction='column'>
      <Image style={[styles.avatar, _.mt.md]} size={80} src={avatar.large} />
      <Text style={_.mt.md} type='plain' size={16}>
        {nickname}
        <Text style={styles.id} type='plain' size={14}>
          {' '}
          {id ? `@${id}` : ''}
        </Text>
      </Text>
    </Flex>
  )
}

Head.contextTypes = {
  $: PropTypes.object
}

export default observer(Head)

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: colorPlain,
    borderRadius: 80,
    overflow: 'hidden'
  },
  id: {
    opacity: 0.88
  }
})
