import jsonp from '../common/js/jsonp'
import {recommendParams, dicsListParams, sonlistParams, option} from '../common/js/config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  return jsonp(url, recommendParams, option)
}

export function getDiscList() {
  const url = 'http://119.23.229.199:8088/api/getDiscList'

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

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSonList(id) {
  const url = 'http://119.23.229.199:8088/api/getSonList'
  const data = Object.assign({}, sonlistParams, {disstid: id})
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
