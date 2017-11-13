<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" ref="toplist" :data="topList">
      <ul>
        <div class="topic">
          Q&nbsp;Q&nbsp;音&nbsp;乐&nbsp;巅&nbsp;峰&nbsp;榜
        </div>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList">
              <span class="rank-font">{{index + 1}} {{song.songname}}</span>
              <span>-&nbsp;{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRankList} from '../../api/rank'
  import Scroll from '../../base/scroll/scroll'
  import {ERR_OK} from '../../common/js/config'
  import Loading from '../../base/loading/loading'
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playlistMixin],
    created() {
      this._getTopList()
    },
    data() {
      return {
        topList: []
      }
    },
    methods: {
      _getTopList() {
        getRankList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
            console.log(res)
          }
        })
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    components: {
      Scroll,
      Loading
    },
    watch: {
      topList() {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler()
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    background: #f9f9f9
    .topic
      color: rgba(0, 0, 0, .8)
      text-align: center
      line-height: 20px
      padding-top: 10px
      font-weight: 500
      font-size: 15px
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 10px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: #fff
          color: rgba(0, 0, 0, .8)
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
            color: rgba(0, 0, 0, .5)
            .rank-font
              font-weight: 500
              color: #333
              margin-right: 4px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
