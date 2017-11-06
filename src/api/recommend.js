import jsonp from '../common/js/jsonp'
import {recommendParams, dicsListParams, option} from '../common/js/config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  return jsonp(url, recommendParams, option)
}

export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, dicsListParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
