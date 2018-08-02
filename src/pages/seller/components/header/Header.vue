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
      <div class="supports-count" v-if="seller.supports" @click="clickDetail">
        <span class="count">{{supportsLength}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="clickDetail">
      <span class="bulletin-title"></span><span class="bulletin-content">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition>
      <div class="detail" v-show="showDetail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="supports-item"
                v-for="(item, index) in seller.supports"
                :key="index"
              >
                <span class="icon" :class="iconMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="clickDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '@/common/star/Star'
export default {
  name: 'sellerHeader',
  components: {
    Star
  },
  props: {
    seller: Object
  },
  data () {
    return {
      iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      showDetail: false
    }
  },
  computed: {
    supportsLength () {
      return this.seller.supports.length
    }
  },
  methods: {
    clickDetail () {
      console.log('click')
      this.showDetail = !this.showDetail
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
  overflow hidden
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
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    height 100%
    width 100%
    overflow auto
    background rgba(7, 17, 27, 0.8)
    backdrop-filter blur(10px) // ios下实现
    &.v-enter, &.v-leave-to
      opacity 0
    &.v-enter-active, &.v-leave-active
      transition opacity .5s
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin 1.28rem .72rem 0
        padding-bottom 1.28rem
        .name
          font-size .32rem
          font-weight 700
          line-height .32rem
          text-align center
        .star-wrapper
          text-align center
          margin .32rem auto 0
          padding .04rem 0
        .title
          display flex
          width 100%
          margin .56rem auto .48rem
          .text
            font-size .28rem
            font-weight 700
            line-height .28rem
            margin 0 .24rem
          .line
            position relative
            top -.12rem
            flex 1
            border-bottom 1px solid rgba(255, 255, 255, .2)
        .supports
          margin 0 .24rem
          .supports-item
            font-size 0
            padding-bottom .24rem
            &:last-child
              padding-bottom 0
            .icon
              display inline-block
              height .32rem
              width .32rem
              background-size .32rem .32rem
              vertical-align top
              backgeound-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.special
                bg-image('special_2')
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
            .text
              font-size .24rem
              line-height .32rem
              font-weight 200
              padding-left .12rem
        .content
          padding 0 .24rem
          font-size .24rem
          line-height .48rem
          font-weight 200
    .detail-close
      // position relative
      width .64rem
      height .64rem
      margin -1.28rem auto 0 auto
      clear both
      font-size .64rem
      .icon-close
        color rgba(255, 255, 255, 0.5)
</style>
