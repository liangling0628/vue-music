import * as types from './mutation_types'

const mutations = {
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  [types.SET_SEARCH_HISTORY](state, list) {
    state.searchHistory = list
  }
}
export default mutations
