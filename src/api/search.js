import jsonp from '../common/js/jsonp'
import {option, recommendParams, searchParams} from '../common/js/config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, recommendParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, option)
}

export function search(query, page, zhida, perpage) {
  let url = 'http://119.23.229.199:8088/api/searchKey'
  let data = Object.assign({}, searchParams, {
    w: query,
    catZhida: zhida ? 1 : 0,
    perpage: perpage,
    n: perpage,
    p: page
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
