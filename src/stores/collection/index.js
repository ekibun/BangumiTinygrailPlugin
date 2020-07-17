/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/*
 * 收藏
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:40
 * @Last Modified by: ekibun
 * @Last Modified time: 2020-07-16 22:28:45
 */
import { observable } from 'mobx'
import { getTimestamp, trim, sleep } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode } from '@utils/html'
import store from '@utils/store'
import fetch, { fetchHTML, xhr } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { MODEL_SUBJECT_TYPE, MODEL_COLLECTION_STATUS } from '@constants/model'
import {
  API_COLLECTION,
  API_COLLECTION_ACTION,
  API_SUBJECT_UPDATE_WATCHED
} from '@constants/api'
import {
  HTML_USER_COLLECTIONS,
  HTML_ACTION_SUBJECT_SET_WATCHED
} from '@constants/html'
import userStore from '../user'
import {
  NAMESPACE,
  DEFAULT_SUBJECT_TYPE,
  DEFAULT_TYPE,
  DEFAULT_ORDER
} from './init'

class Collection extends store {
  state = observable({
    /**
     * API条目收藏信息
     * @param {*} subjectId
     */
    collection: {
      0: {}
    },

    /**
     * HTML用户收藏概览(全部)
     * @param {*} userId
     * @param {*} subjectType
     * @param {*} type
     */
    userCollections: {
      _: (userId, subjectType, type) =>
        `${userId || userStore.myUserId}|${subjectType}|${type}`,
      0: LIST_EMPTY
    },

    /**
     * HTML用户收藏概览的看过的标签
     */
    userCollectionsTags: {
      _: (userId, subjectType, type) =>
        `${userId || userStore.myUserId}|${subjectType}|${type}`,
      0: []
    },

    /**
     * 所有收藏条目状态
     * @params {*} subjectId
     */
    userCollectionsMap: {
      // 0: '看过'
    }
  })

  init = () => {
    // setTimeout(() => {
    //   this.fetchUserCollectionsQueue()
    // }, 16000)

    return this.readStorage(
      [
        'collection',
        'userCollections',
        'userCollectionsTags',
        'userCollectionsMap'
      ],
      NAMESPACE
    )
  }

  // -------------------- fetch --------------------
  /**
   * 获取指定条目收藏信息
   * @param {*} subjectId
   */
  fetchCollection = subjectId =>
    this.fetch(
      {
        url: API_COLLECTION(subjectId),
        info: '条目收藏信息'
      },
      ['collection', subjectId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * HTML用户收藏概览(全部)
   */
  fetchUserCollections = async (
    {
      userId: _userId,
      subjectType = DEFAULT_SUBJECT_TYPE,
      type = DEFAULT_TYPE,
      order = DEFAULT_ORDER,
      tag = ''
    } = {},
    refresh
  ) => {
    const userId = _userId || userStore.myUserId
    const { list, pagination } = this.userCollections(userId, subjectType, type)

    // 没有更多不再请求
    if (!refresh && pagination.page >= pagination.pageTotal) {
      return this.userCollections(userId, subjectType, type)
    }

    const page = refresh ? 1 : pagination.page + 1

    // -------------------- 请求HTML --------------------
    // 需要携带cookie请求, 不然会查询不到自己隐藏了的条目
    const raw = await fetchHTML({
      url: HTML_USER_COLLECTIONS(userId, subjectType, type, order, tag, page)
    })
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    let node
    const stateKey = `${userId}|${subjectType}|${type}`

    // 看过的标签
    if (page === 1) {
      const userCollectionsTags = []
      const userCollectionsTagsHTML = HTML.match(
        /<ul id="userTagList" class="tagList">(.*?)<\/ul>/
      )

      if (userCollectionsTagsHTML) {
        const tree = HTMLToTree(userCollectionsTagsHTML[1])
        tree.children.forEach(item => {
          userCollectionsTags.push({
            tag: item.children[0].text[0],
            count: parseInt(item.children[0].children[0].text[0])
          })
        })
      }

      const key = 'userCollectionsTags'
      this.setState({
        [key]: {
          [stateKey]: userCollectionsTags
        }
      })

      if (userId === userStore.myUserId) {
        this.setUserCollectionsTagsStroage()
      }
    }

    // 收藏记录
    let { pageTotal = 0 } = pagination
    const userCollections = []
    const userCollectionsHTML = HTML.match(
      /<ul id="browserItemList" class="browserFull">(.+?)<\/ul><div id="multipage"/
    )
    if (userCollectionsHTML) {
      // 总页数
      if (page === 1) {
        const pageHTML =
          HTML.match(
            /<span class="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/
          ) || HTML.match(/(\d+)<\/a>([^>]*>&rsaquo)/)
        if (pageHTML) {
          pageTotal = pageHTML[1]
        } else {
          pageTotal = 1
        }
      }

      const tree = HTMLToTree(userCollectionsHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        // 条目Id
        node = findTreeNode(children, 'a|href~/subject/')
        const id = node ? node[0].attrs.href.replace('/subject/', '') : ''

        // 封面
        node =
          findTreeNode(children, 'a > span > img') ||
          findTreeNode(children, 'a > noscript > img')
        let cover = node ? node[0].attrs.src : ''
        if (cover === '/img/info_only.png') {
          cover = ''
        }

        // 标题
        node = findTreeNode(children, 'div > h3 > small')
        const name = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > h3 > a')
        const nameCn = node ? node[0].text[0] : ''

        // 描述
        node = findTreeNode(children, 'div > p|class=info tip')
        const tip = node ? trim(node[0].text[0]) : ''

        // 标签
        node = findTreeNode(children, 'div > p > span|class=tip')
        const tags = node ? trim(node[0].text[0].replace('标签: ', '')) : ''

        // 评论
        node = findTreeNode(children, 'div > div > div > div > div')
        const comments = node ? node[0].text[0] : ''

        // 评分
        node = findTreeNode(children, 'div > p > span|class=starstop-s > span')
        const score = node
          ? node[0].attrs.class.replace(/starlight stars/g, '')
          : ''

        node = findTreeNode(children, 'div > p > span|class=tip_j')
        const time = node ? node[0].text[0] : ''

        const data = {
          id,
          cover,
          name,
          nameCn,
          tip,
          tags,
          comments,
          score,
          time
        }
        userCollections.push(data)
      })
    }

    const key = 'userCollections'
    const data = {
      list: refresh ? userCollections : [...list, ...userCollections],
      pagination: {
        page,
        pageTotal: parseInt(pageTotal)
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })

    // 只本地化自己的收藏概览
    if (
      userId === userStore.userInfo.username ||
      userId === userStore.myUserId
    ) {
      this.setUserCollectionsStroage()
    }
    return data
  }

  /**
   * 排队获取自己的所有动画收藏列表记录
   *  - 每种最多取10页240条数据
   */
  fetchUserCollectionsQueue = async () => {
    try {
      const { username } = userStore.usersInfo(userStore.myUserId)
      const userId = username || userStore.myUserId
      if (!userId) {
        return false
      }

      const subjectType = MODEL_SUBJECT_TYPE.getLabel('动画')
      const now = getTimestamp()
      for (const item of MODEL_COLLECTION_STATUS.data) {
        const { _loaded } = this.userCollections(
          userId,
          subjectType,
          item.value
        )
        if (!_loaded || now - _loaded > 60 * 24) {
          await this.fetchUserCollections(
            {
              userId,
              subjectType,
              type: item.value
            },
            true
          )
          await sleep()
        }
      }

      const userCollectionsMap = {}
      for (const item of MODEL_COLLECTION_STATUS.data) {
        const data = this.userCollections(userId, subjectType, item.value)
        const { pagination } = data
        const { page, pageTotal } = pagination

        // 列表未到底就一直请求, 最多请求到10页
        if (page < pageTotal && page < 10) {
          for (let i = page - 1; i < pageTotal; i += 1) {
            await this.fetchUserCollections({
              userId,
              subjectType,
              type: item.value
            })
            await sleep()
          }
        }

        this.userCollections(userId, subjectType, item.value).list.forEach(
          i => (userCollectionsMap[i.id] = item.label)
        )
      }

      this.setState({
        userCollectionsMap
      })
      this.setStorage('userCollectionsMap', userCollectionsMap, NAMESPACE)
      return true
    } catch (error) {
      warn('CollectionStore', 'fetchUserCollectionsQueue', error)
      return false
    }
  }

  // -------------------- page --------------------
  /**
   * 只本地化自己的收藏概览
   */
  setUserCollectionsStroage = () => {
    const { userCollections } = this.state
    const data = {}
    Object.keys(userCollections).forEach(key => {
      if (
        key.includes(`${userStore.userInfo.username}|`) ||
        key.includes(`${userStore.myUserId}|`)
      ) {
        data[key] = userCollections[key]
      }
    })

    this.setStorage('userCollections', data, NAMESPACE)
  }

  /**
   * 只本地化自己的收藏概览的看过的标签
   */
  setUserCollectionsTagsStroage = () => {
    const { userCollectionsTags } = this.state
    const data = {}
    Object.keys(userCollectionsTags).forEach(key => {
      if (key.includes(`${userStore.myUserId}|`)) {
        data[key] = userCollectionsTags[key]
      }
    })
    this.setStorage('userCollectionsTags', data, NAMESPACE)
  }

  // -------------------- action --------------------
  /**
   * 管理收藏
   */
  doUpdateCollection = ({
    subjectId,
    status,
    tags,
    comment,
    rating,
    privacy
  } = {}) =>
    fetch({
      url: API_COLLECTION_ACTION(subjectId),
      method: 'POST',
      data: {
        status,
        tags,
        comment,
        rating,
        privacy
      }
    })

  /**
   * 更新书籍章节
   */
  doUpdateBookEp = ({ subjectId, chap, vol } = {}) =>
    fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: chap,
        watched_vols: vol
      }
    })

  /**
   * 输入框更新章节进度
   */
  doUpdateSubjectEp = ({ subjectId, watchedEps } = {}, success) =>
    xhr(
      {
        url: HTML_ACTION_SUBJECT_SET_WATCHED(subjectId),
        data: {
          referer: 'subject',
          submit: '更新',
          watchedeps: watchedEps
        }
      },
      success
    )
}

const Store = new Collection()
Store.setup()

export default Store
