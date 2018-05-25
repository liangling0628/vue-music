export const recommendParams = {
  g_tk: 5381,
  uin: 0,
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1,
  _: +new Date()
}

export const dicsListParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const sonlistParams = {
  type: 1,
  json: 1,
  utf8: 1,
  onlysong: 0,
  format: 'jsonp',
  g_tk: 5381,
  jsonpCallback: 'playlistinfoCallback',
  loginUin: 0,
  hostUin: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  needNewCode: 0
  // g_tk: 5381,
  // uin: 0,
  // format: 'json',
  // inCharset: 'utf-8',
  // outCharset: 'utf-8',
  // notice: 0,
  // platform: 'h5',
  // needNewCode: 1,
  // new_format: 1,
  // pic: 500,
  // type: 1,
  // json: 1,
  // utf8: 1,
  // onlysong: 0,
  // picmid: 1,
  // nosign: 1,
  // song_begin: 0,
  // song_num: 15,
  // _: Math.random()
}

export const songParmas = {
  g_tk: 5381,
  uin: 0,
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1,
  nobase64: 0,
  songtype: 0,
  _: +new Date(),
  jsonpCallback: 'jsonp1'
}

export const singerDetailParams = {
  g_tk: 5381,
  uin: 0,
  format: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5page',
  needNewCode: 1,
  order: 'listen',
  from: 'h5',
  num: '15',
  begin: '0',
  _: +new Date()
}

export const rankDetailParams = {
  tpl: 3,
  page: 'detail',
  type: 'top',
  song_begin: 0,
  song_num: 30,
  g_tk: 982905839,
  loginUin: 0,
  hostUin: 0,
  format: 'jsonp',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  needNewCode: 0
}

export const rankParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
  uin: 0,
  needNewCode: 1,
  platform: 'h5'
}

export const option = {
  param: 'jsonpCallback'
}

export const lyricOption = {
  param: 'jsonpCallback',
  name: 'MusicJsonCallback_lrc'
}

export const rankOption = {
  param: 'jsonpCallback',
  name: 'MusicJsonCallbacktoplist'
}

export const ERR_OK = 0

export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

export const searchParams = {
  g_tk: 5381,
  uin: 0,
  format: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'h5',
  needNewCode: 1,
  w: '刘德华',
  zhidaqu: 1,
  catZhida: 1,
  t: 0,
  flag: 1,
  ie: 'utf-8',
  sem: 1,
  aggr: 0,
  perpage: 20,
  n: 20,
  p: 3,
  remoteplace: 'txt.mqq.all',
  _: +new Date()
}

export const vKeyParams = {
  g_tk: 5381,
  jsonpCallback: `MusicJsonCallback${Math.random()}`.replace('0.', ''),
  loginUin: 0,
  hostUin: 0,
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  needNewCode: 0,
  cid: 205361747,
  callback: `MusicJsonCallback${Math.random()}`.replace('0.', ''),
  uin: 0,
  songmid: '001J5QJL1pRQYB',
  filename: 'C400001J5QJL1pRQYB.m4a',
  guid: 3112047418,
}
