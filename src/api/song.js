import {songParmas} from '../common/js/config'
import axios from 'axios'

export function getLyric(mid) {
  let url = 'http://119.23.229.199:8088/api/lyric'
  let data = Object.assign({}, songParmas, {musicid: mid})
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

