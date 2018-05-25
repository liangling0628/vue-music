import {songParmas,vKeyParams} from '../common/js/config'
import jsonp from '../common/js/jsonp'
import axios from 'axios'

export function getLyric(mid) {
  let url = 'http://119.23.229.199:8088/api/lyric'
  let data = Object.assign({}, songParmas, {musicid: mid})
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getVkey(data) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  let params = Object.assign({},vKeyParams,data)
  return jsonp(url,params)
}
