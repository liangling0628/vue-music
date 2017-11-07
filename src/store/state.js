import {playMode} from '../common/js/config'

const state = {
  disc: {},
  playlist: [],
  mode: playMode.sequence,
  sequenceList: [],
  currentIndex: -1,
  playing: false,
  fullScreen: false
}

export default state
