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
  }

}
export default mutations
