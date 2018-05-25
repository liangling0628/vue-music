<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSonList} from '../../api/recommend'
  import {mapGetters} from 'vuex'
  import {createSongNew} from '../../common/js/song'
  import MusicList from '../music-list/music-list'
  import {ERR_OK} from '../../common/js/config'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSonList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK || res.length > 100) {
            let ret = res.substr(0,res.length-1).replace(/playlistinfoCallback\(/gi,'')
            ret = JSON.parse(ret)
            let cdlist = ret.cdlist.length > 0 ? ret.cdlist[0].songlist : []
            this.songs = this._normalizeSongs(cdlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.length > 0 && list.forEach((musicData, index) => {
          if (musicData.albumid) {
            ret.push(createSongNew(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transation: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
