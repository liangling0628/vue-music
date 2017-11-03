import OriginJsonp from 'jsonp'
export default function jsonp(url, data, option) {
  url += url.indexOf('?') < 0 ? '?' : '&' + params(data)
  return new Promise((resolve, reject) => {
    OriginJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      }
      reject(err)
    })
  })
}

export function params(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? encodeURIComponent(data[k]) : ''
    url += `&${k}=${value}`
  }
  return url ? url.substring(1) : ''
}
