import storage from 'good-storage'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200
const PLAY_KEY = '__play__'

export function saveFavarite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
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
  return storage.get(PLAY_KEY, [])
}
