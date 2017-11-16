<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" :placeholder="placeholder" v-model="query" @change="changeQuery"/>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from '../../common/js/until'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲/歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      },
      changeQuery() {
        this.query = this.$refs.query.value
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: #fff;
    border-radius: 6px;
    border: 0 none;
    .icon-search
      font-size: 24px
      color: #c9c9c9
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: none
      color: #c9c9c9
      font-size: $font-size-medium
      border: none;
      &::placeholder
        color: #c9c9c9
      &::focus
        outline-color: none !important;
        outline-style: auto !important;
        outline-width: 0px !important;
    .icon-dismiss
      font-size: 16px
      color: #c9c9c9
</style>
