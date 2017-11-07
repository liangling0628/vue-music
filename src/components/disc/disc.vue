<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSonList} from '../../api/recommend'
  import {mapGetters} from 'vuex'
  import {createSong} from '../../common/js/song'
  import MusicList from '../music-list/music-list'

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
        let slt = getSonList(this.disc.dissid)
        setTimeout(() => {
          slt.then((res) => {
            if (res.code === 0) {
              console.log(res.cdlist)
              let cdlist = res.cdlist.length > 0 ? res.cdlist[0].songlist : []
              this.songs = this._normalizeSongs(cdlist)
            }
          })
        }, 200)
      },
      _normalizeSongs(list) {
        let ret = []
        list.length > 0 && list.forEach((musicData) => {
          if (musicData.id && musicData.album) {
            ret.push(createSong(musicData))
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
