<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="iconMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="this.seller.supports">
        <span class="count">{{supportsLength}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-content">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
export default {
  name: 'sellerHeader',
  props: {
    seller: Object
  },
  data () {
    return {
      iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {
    supportsLength () {
      return this.seller.supports.length
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/mixin.styl'
.header
  position relative
  color rgb(255,255,255)
  background rgba(7, 17, 27, 0.5)
  .content-wrapper
    position relative
    font-size 0
    padding .48rem .24rem .36rem .48rem
    .avatar
      display inline-block
      vertical-align top
    .content
      display inline-block
      margin-left .32rem
      .title
        margin .04rem 0 .16rem 0
        .brand
          display inline-block
          width .6rem
          height .36rem
          bg-image('brand')
          background-size .6rem .36rem
          background-repeat no-repeat
          vertical-align top
        .name
          font-size .32rem
          margin-left .12rem
          font-weight bold
          line-height .36rem
      .description
        margin-bottom .2rem
        font-size .24rem
        line-height .24rem
        font-weight 200
      .supports
        margin-bottom .04rem
        .icon
          display inline-block
          width .24rem
          height .24rem
          background-size .24rem .24rem
          background-repeat no-repeat
          vertical-align top
          &.discount
            bg-image('discount_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
          &.guarantee
            bg-image('guarantee_1')
          &.decrease
            bg-image('decrease_1')
        .text
          margin-left .08rem
          font-size .2rem
          font-weight 200
          line-height .24rem
    .supports-count
      position absolute
      bottom .28rem
      right .24rem
      padding .14rem .16rem
      font-size 0
      // line-height .24rem
      font-weight 200
      background rgba(0, 0, 0, 0.2)
      border-radius .28rem
      text-align center
      .count
        font-size .2rem
        line-height .24rem
        vertical-align top
      .icon-keyboard_arrow_right
        margin-left .04rem
        vertical-align top
        font-size .2rem
        line-height .24rem
  .bulletin-wrapper
    position relative
    height .56rem
    padding 0 .52rem 0 .24rem
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background rgba(7,17,27,0.2)
    .bulletin-title
      display inline-block
      width .44rem
      height .24rem
      bg-image('bulletin')
      background-size .44rem .24rem
      background-repeat no-repeat
      vertical-align top
      margin-top .16rem
    .bulletin-content
      font-size .2rem
      font-weight 200
      margin-left .08rem
      line-height .56rem
    .icon-keyboard_arrow_right
      position absolute
      right .24rem
      bottom .16rem
  .background
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    filter blur(10px)
</style>
