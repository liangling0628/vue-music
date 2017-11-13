<template>
  <transition name="slide">
    <music-list :songs="songs" :bgImage="bgImage" :title="title"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../../components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getRankListDetail} from '../../api/rank'
  import {createSongNew} from '../../common/js/song'
  import {ERR_OK} from '../../common/js/config'

  export default {
    computed: {
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      title() {
        return this.topList.topTitle
      },
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getRankDetail()
    },
    methods: {
      _getRankDetail() {
        if (!this.topList.id) {
          this.$router.push({
            path: '/rank'
          })
          return
        }
        getRankListDetail(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
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

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
