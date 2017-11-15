<template>
  <scroll ref="suggest" class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore" @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，没有找到相关数据"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import {search} from '../../api/search'
  import {ERR_OK} from '../../common/js/config'
  import {createSongNew} from '../../common/js/song'
  import Loading from '../../base/loading/loading'
  import NoResult from '../../base/no-result/no-result'
  import {mapActions, mapMutations} from 'vuex'
  import Singer from '../../common/js/singer'

  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        result: [],
        page: 1,
        hasMore: true,
        pullup: true,
        beforeScroll: true
      }
    },
    methods: {
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        this.result = []
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.result = this.result.concat(this._normarizeData(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _normarizeData(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid) {
            ret.push(createSongNew(musicData))
          }
        })
        return ret
      },
      _checkMore(data) {
        let song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._normarizeData(res.data))
            this._checkMore(res.data)
          }
        })
      },
      listScroll() {
        this.$emit('listScroll')
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername,
            singerid: item.singerid
          })
          this.$router.push({
            path: `/search/${singer.singerid}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select', item)
      },
      ...mapActions([
        'insertSong'
      ]),
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        margin-bottom: 10px;
        [class^="icon-"]
          font-size: 16px
          color: rgb(49, 194, 124)
      .name
        flex: 1
        font-size: $font-size-medium
        color: rgba(0, 0, 0, .7)
        overflow: hidden
        border-bottom: .5px solid #eee
        .text
          no-wrap()
          margin: 5px 5px 15px 5px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
