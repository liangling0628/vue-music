<template>
  <div class="m-header">
    <div class="icon"></div>
    Vue Music
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
    <!--<h1 class="text">Vue Music</h1>-->
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {}
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .m-header
    position: relative
    height: 44px
    font-size: 16px
    background: #31c27c
    color: #fff
    line-height: 44px
    background: #31c27c
    .icon
      float: left
      display: block
      width: 30px
      height: 25px
      margin: 9px 0 0 10px
      text-indent: -9999px;
      bg-image('logo')
      background-size: cover
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: #f9f9f9
</style>
