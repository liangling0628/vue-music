import {rankParams, rankDetailParams, option, rankOption} from '../common/js/config'
// import axios from 'axios'
import jsonp from '../common/js/jsonp'

export function getRankList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  return jsonp(url, rankParams, option).then((res) => {
    return Promise.resolve(res)
  })
}

export function getRankListDetail(topId) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  let date = '2017-11-12'
  if (topId === 26 || topId === 28 || topId === 5 || topId === 6 || topId === 3 || topId === 16 || topId === 17 || topId === 36) {
    date = '2017_45'
  } else if (topId === 52) {
    date = '2017_10'
  }
  let paras = Object.assign({}, rankDetailParams, {topid: topId, date: date})
  return jsonp(url, paras, rankOption).then((res) => {
    return Promise.resolve(res)
  })
}
