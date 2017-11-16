import storage from 'good-storage'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 20
const SEARCH_KY = '__serach__'
const SEARCH_MAX_LEN = 15

export function saveFavarite(song) {
  let songs = []
  let asongs = storage.get(FAVORITE_KEY, [])
  if (asongs instanceof Array) {
    songs = asongs
  } else {
    songs.push(asongs)
  }
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, song)
  return songs
}

export function deleteFavarite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

function insertArray(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteArray(arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.split(index, 1)
  }
}

export function loadPlay() {
  let data = []
  let d = storage.get(PLAY_KEY, [])
  if (d instanceof Array) {
    data = d
  } else {
    data.push(d)
  }
  return data
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  if (songs instanceof Array) {
    storage.set(PLAY_KEY, songs)
    return songs
  } else {
    let d = []
    d.push(songs)
    storage.set(PLAY_KEY, d)
    return d
  }
}

export function loadSearh() {
  return storage.get(SEARCH_KY, [])
}

export function saveSearch(query) {
  let searchs = storage.get(SEARCH_KY, [])
  insertArray(searchs, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KY, searchs)
  return searchs
}

export function deleteSearch(query) {
  let searchs = storage.get(SEARCH_KY, [])
  deleteFromArray(searchs, (item) => {
    return item === query
  })
  storage.set(SEARCH_KY, searchs)
  return searchs
}

export function clearSearch() {
  storage.remove(SEARCH_KY)
  return []
}

export function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function loadFavarite() {
  let data = []
  let d = storage.get(FAVORITE_KEY, [])
  if (d instanceof Array) {
    data = d
  } else {
    data.push(d)
  }
  return data
}
