/*
 * 图片
 * 1. 支持各种样式设置
 * 2. 支持本地和远端图片
 * 3. 图片缓存到本地
 * 4. 远端图片自动获取高度
 * 5. 错误处理
 * 6. 自动选择Bangumi图片质量
 * 7. 联动ImageViewer
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-21 14:09:17
 */
import React from 'react'
import { View, Image as RNImage } from 'react-native'
import {
  CacheManager,
  Image as AnimatedImage
} from 'react-native-expo-image-cache'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { getCoverSmall, getCoverLarge } from '@utils/app'
import { showImageViewer } from '@utils/ui'
import { t } from '@utils/fetch'
import { HOST, IOS, IMG_EMPTY, IMG_EMPTY_DARK, EVENT } from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'
import Touchable from './touchable'

const defaultHeaders = {
  Referer: `${HOST}/`
}
const maxErrorCount = 2 // 最大失败重试次数

export default
@observer
class Image extends React.Component {
  static defaultProps = {
    style: undefined,
    imageStyle: undefined, // 强制传递给图片的样式
    src: undefined,
    size: 40, // 大小|宽度
    height: undefined, // 高度
    border: false, // 边框
    borderWidth: _.hairlineWidth,
    radius: undefined, // 圆角
    shadow: false, // 阴影
    placeholder: true, // 是否有底色
    autoSize: 0, // 支持自动计算远端图片高度, 传递图片的宽度, 高度适应比例
    quality: true, // 是否自动选择Bangumi图片质量
    imageViewer: false, // 是否点击显示全局的ImageViewer, 此值打开会覆盖onPress
    imageViewerSrc: undefined, // 若有值, 打开ImageViewer时使用此src
    event: EVENT,
    delay: true,
    cache: true,
    headers: undefined,
    onPress: undefined,
    onLongPress: undefined,
    onError: undefined
  }

  state = {
    error: false,
    uri: undefined,
    width: 0,
    height: 0
  }

  errorCount = 0
  timeoutId = null

  async componentDidMount() {
    const { src, cache, autoSize } = this.props
    if (!cache) {
      this.setState({
        uri: src
      })
      return
    }

    await this.cache(src)
    if (autoSize) {
      this.getSize()
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.cache(nextProps.src)
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  /**
   * 缓存图片
   */
  cache = async src => {
    let res
    let uri
    let qualityLevel
    if (this.props.quality) {
      // systemStore.isWifi
      const label = MODEL_SETTING_QUALITY.getLabel(systemStore.setting.quality)
      switch (label) {
        case 'WiFi下高质量':
          if (systemStore.wifi) {
            qualityLevel = 'best'
          }
          break

        case '高质量':
          qualityLevel = 'best'
          break

        case '低质量':
          qualityLevel = 'low'
          break

        default:
          break
      }
    }

    /**
     * @issue 安卓还没调试出怎么使用, 并且安卓貌似自带缓存?
     */
    if (IOS) {
      try {
        if (typeof src === 'string') {
          let _src = src
          if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
            _src = `https:${_src}`
          }
          _src = this.getQuality(_src, qualityLevel)

          // 空地址不作处理
          if (_src === 'https:') {
            this.onError()
            return false
          }

          // 检查本地有没有图片缓存
          // @issue 这个地方没判断同时一个页面有相同图片, 同时检测本地地址的会触发unmounted
          // @issue to fixed
          if (typeof _src === 'string' && _src.includes('https:/img/')) {
            this.onError()
            return false
          }

          res = CacheManager.get(_src, {
            headers: this.headers
          }).getPath()
          const path = await res
          this.setState({
            uri: path || _src
          })
        }
      } catch (error) {
        // 图片是不是会下载失败, 当错误次数大于maxErrorCount就认为是错误
        if (this.errorCount < maxErrorCount) {
          this.timeoutId = setTimeout(() => {
            this.errorCount += 1
            this.cache(src)
          }, 400)
        } else {
          this.timeoutId = null
          this.onError()
        }

        warn('Image', 'cache', error)
      }
    } else {
      uri = src
      if (typeof uri === 'string') {
        uri = this.getQuality(uri, qualityLevel)
        if (uri.indexOf('https:') === -1 && uri.indexOf('http:') === -1) {
          uri = `https:${uri}`
        }
      }

      // 空地址不作处理
      if (uri === 'https:') {
        return false
      }

      this.setState({
        uri
      })
    }

    return res
  }

  /**
   * 选择图片质量
   */
  getQuality = (uri, qualityLevel = 'default') => {
    if (!uri) {
      return ''
    }
    if (qualityLevel === 'default') {
      return uri
    }
    if (qualityLevel === 'best') {
      return getCoverLarge(uri)
    }
    if (qualityLevel === 'low') {
      return getCoverSmall(uri)
    }
    return uri
  }

  /**
   * 获取远程图片宽高
   */
  getSize = () => {
    const { autoSize } = this.props
    const { uri } = this.state
    if (typeof uri !== 'string' || typeof autoSize !== 'number') {
      return
    }

    const cb = (width, height) => {
      let _width
      let _height

      // 假如图片本身的宽度没有超过给定的最大宽度, 直接沿用图片原尺寸
      if (width < autoSize) {
        _width = width
        _height = height
      } else {
        _width = autoSize
        _height = Math.floor((autoSize / width) * height)
      }
      this.setState({
        width: _width,
        height: _height
      })
    }

    RNImage.getSize(uri, cb)
  }

  /**
   * 加载失败
   */
  onError = () => {
    this.setState(
      {
        error: true
      },
      () => {
        const { onError } = this.props
        if (onError) {
          onError()
        }
      }
    )
  }

  get headers() {
    const { headers } = this.props
    if (headers) {
      return {
        ...defaultHeaders,
        ...headers
      }
    }
    return defaultHeaders
  }

  @computed get computedStyle() {
    const {
      style,
      imageStyle,
      size,
      height,
      border,
      borderWidth,
      radius,
      shadow,
      placeholder,
      autoSize
    } = this.props
    const { width: _width, height: _height } = this.state
    const container = []
    const image = []

    // 以state里面的width和height优先
    if (autoSize) {
      image.push({
        width: _width || 160,
        height: _height || 160
      })
    } else if (size) {
      image.push({
        width: this.props.width || size,
        height: height || size
      })
    }

    // 若边框等于hairlineWidth且有影子就不显示边框
    if (border && !(border === _.hairlineWidth && shadow)) {
      if (typeof border === 'string') {
        image.push({
          borderWidth,
          borderColor: border
        })
      } else {
        image.push(this.styles.border)
      }
    }

    if (radius) {
      if (typeof radius === 'boolean') {
        container.push({
          borderRadius: _.radiusXs
        })
        image.push({
          borderRadius: _.radiusXs
        })
      } else {
        container.push({
          borderRadius: radius
        })
        image.push({
          borderRadius: radius
        })
      }
    }

    /**
     * 以下特殊情况不显示阴影
     *
     * _.isDark 黑暗模式没必要显示阴影
     * systemStore.devEvent 安卓下当有阴影, 层级会被提高, 导致遮挡卖点分析的可视化文字
     */
    if (shadow && !_.isDark && !(!IOS && systemStore.devEvent.text)) {
      if (shadow === 'lg') {
        container.push(this.styles.shadowLg)
      } else {
        container.push(this.styles.shadow)
      }
    }

    if (placeholder) {
      container.push(this.styles.placeholder)
    }

    if (style) {
      container.push(style)
    }

    if (imageStyle) {
      container.push(imageStyle)
      image.push(imageStyle)
    }

    return {
      container,
      image
    }
  }

  renderImage() {
    const {
      style,
      imageStyle,
      src,
      size,
      height,
      border,
      borderWidth,
      radius,
      shadow,
      placeholder,
      autoSize,
      quality,
      imageViewer,
      imageViewerSrc,
      headers,
      event,
      delay,
      cache,
      fadeDuration,
      onPress,
      onLongPress,
      onError,
      ...other
    } = this.props
    const { error, uri } = this.state

    const { imageTransition } = systemStore.setting
    const _fadeDuration =
      fadeDuration === undefined
        ? imageTransition
          ? undefined
          : 0
        : fadeDuration

    if (error) {
      // 错误显示本地的错误提示图片
      return (
        <RNImage
          style={[this.computedStyle.image, this.styles.error]}
          source={_.select(IMG_EMPTY, IMG_EMPTY_DARK)}
          fadeDuration={_fadeDuration}
          {...other}
        />
      )
    }

    if (typeof src === 'string' || typeof src === 'undefined') {
      if (uri) {
        // IOS使用了CacheManager管理图片, 请求时已加headers, 所以组件就不需要再加了
        if (IOS && imageTransition) {
          return (
            <AnimatedImage
              style={[
                this.computedStyle.image,
                {
                  width: this.props.width || this.props.size
                }
              ]}
              headers={headers}
              tint={_.select('light', 'dark')}
              preview={_.select(IMG_EMPTY, IMG_EMPTY_DARK)}
              uri={uri}
              onError={this.onError}
              {...other}
            />
          )
        }

        // 网络图片
        return (
          <RNImage
            style={this.computedStyle.image}
            source={{
              headers: this.headers,
              uri: uri.replace('http://', 'https://') // 安卓新版本不允许非https的图片了
            }}
            fadeDuration={_fadeDuration}
            onError={this.onError}
            {...other}
          />
        )
      }

      // 没有图片占位
      return <View style={this.computedStyle.image} />
    }

    // 本地图片
    return (
      <RNImage
        style={this.computedStyle.image}
        source={
          headers
            ? {
                ...src,
                headers: this.headers
              }
            : src
        }
        fadeDuration={_fadeDuration}
        onError={this.onError}
        {...other}
      />
    )
  }

  render() {
    const {
      src,
      imageViewer,
      imageViewerSrc,
      headers,
      event,
      delay,
      onPress,
      onLongPress
    } = this.props
    const { uri } = this.state

    let _onPress = onPress
    if (imageViewer) {
      _onPress = () => {
        let _imageViewerSrc = imageViewerSrc
        if (
          typeof _imageViewerSrc === 'string' &&
          _imageViewerSrc.indexOf('http') !== 0
        ) {
          _imageViewerSrc = undefined
        }

        const { id, data } = event
        t(id, {
          from: '封面图',
          ...data
        })
        showImageViewer([
          {
            url: _imageViewerSrc || uri,
            _url: _imageViewerSrc || src,
            headers
          }
        ])
      }
    }

    if (_onPress || onLongPress) {
      return (
        <Touchable
          style={this.computedStyle.container}
          delay={delay}
          onPress={_onPress}
          onLongPress={onLongPress}
        >
          {this.renderImage()}
        </Touchable>
      )
    }

    return (
      <View style={this.computedStyle.container}>{this.renderImage()}</View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  border: {
    borderWidth: 1,
    borderColor: _.colorBorder
  },
  shadow: _.shadow,
  shadowLg: {
    shadowColor: _.colorShadow,
    shadowOffset: {
      height: 4
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 16
  },
  placeholder: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  error: {
    padding: 4
  }
}))
