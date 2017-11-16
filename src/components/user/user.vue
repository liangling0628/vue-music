<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
      <div class="play-container">
        <div ref="playBtn" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" :data="favoriteList" v-if="currentIndex===0">
          <div class="list-inner">
            <song-list :songs="favoriteList" :rank="true" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" :data="playHistory" v-if="currentIndex===1">
          <div class="list-inner">
            <song-list :songs="playHistory" :rank="true" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import Scroll from '../../base/scroll/scroll'
  import SongList from '../../base/song-list/song-list'
  import NoResult from '../../base/no-result/no-result'
  import {playlistMixin} from '../../common/js/mixin'
  import Switches from '../../base/swiches/switches'
  import Song from '../../common/js/song'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        currentIndex: 0,
        switches: [
          {
            name: '我喜欢的'
          },
          {
            name: '最近听的'
          }
        ]
      }
    },
    computed: {
      noResult() {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        } else {
          return !this.playHistory.length
        }
      },
      noResultDesc() {
        if (this.currentIndex === 0) {
          return '暂无收藏歌曲'
        } else {
          return '你还没有听过歌曲'
        }
      },
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.listWrapper.style.bottom = bottom
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playList && this.$refs.playList.refresh()
      },
      random() {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        if (list.length === 0) {
          return
        }
        list = list.map((song) => {
          return new Song(song)
        })
        this.randomPlay({
          list
        })
      },
      back() {
        this.$router.back()
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(item) {
        this.insertSong(new Song(item))
      },
      ...mapActions([
        'insertSong',
        'randomPlay'
      ])
    },
    components: {
      Scroll,
      SongList,
      NoResult,
      Switches
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 14px
      left: 6px
      z-index: 50
      .icon-back
        display: block
        /*padding: 10px*/
        font-size: $font-size-large-x
        color: #f9f9f9
    .switches-wrapper
      padding: 10px 0 10px 0
      background: #31c27c
    .play-container
      background-image: url(../../common/image/bg_search.jpg)
      height: 200px
      background-size: cover
      background-position: 50%
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: none
      color: rgba(0, 0, 0, 0.7);
      border-radius: 100px
      font-size: 0
      background: #f9f9f9
      color: #31c27c
      top: 220px
      left: 50%
      position: absolute
      transform: translate(-50%, -50%)
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 250px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 66%
      transform: translateY(-50%)
</style>
