import jsonp from '../common/js/jsonp'
import {recommendParams, singerDetailParams, option} from '../common/js/config'
import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let para = Object.assign({}, recommendParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, para, option)
}

export function getSingerDetail(singerid) {
  const url = '/api/singerdetail'
  let par = Object.assign({}, singerDetailParams, {singerid: singerid})
  return axios.get(url, {params: par}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
