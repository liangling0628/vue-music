import jsonp from '../common/js/jsonp'
import {recommendParams, option} from '../common/js/config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  return jsonp(url, recommendParams, option)
}
