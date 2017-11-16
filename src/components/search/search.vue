<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="hotData">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest @listScroll="blurInput" @select="saveSearch" ref="suggest" :query="query"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from '../../base/serach-box/search-box'
  import Scroll from '../../base/scroll/scroll'
  import {searchMixin, playlistMixin} from '../../common/js/mixin'
  import {getHotKey} from '../../api/search'
  import {ERR_OK} from '../../common/js/config'
  import {mapActions} from 'vuex'
  import SearchList from '../../base/search-list/search-list'
  import Suggest from '../../components/suggest/suggest'
  import Confirm from '../../base/confirm/confirm'

  export default {
    mixins: [playlistMixin, searchMixin],
    data() {
      return {
        hotKey: []
      }
    },
    computed: {
      hotData() {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    created() {
      this._getHotKyes()
    },
    methods: {
      _getHotKyes() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          let s = this.$refs.shortcut
          setTimeout(() => {
            s.refresh()
          }, 20)
        }
      }
    },
    components: {
      SearchBox,
      Scroll,
      SearchList,
      Suggest,
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    .search-box-wrapper
      background-image: url(../../common/image/bg_search.jpg)
      padding: 20px
      background-size: cover
      margin: 10px 0
      background-position: 50%
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      margin-top: 20px
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: rgba(0, 0, 0, .6)
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 10px
            background: none
            font-size: $font-size-medium
            color: #333
            border: .5px solid #ddd
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: rgba(0, 0, 0, .6)
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: rgba(0, 0, 0, .6)
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
      margin-top: 10px
</style>
