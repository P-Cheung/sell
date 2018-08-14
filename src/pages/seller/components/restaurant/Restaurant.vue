<template>
  <div class="seller-wrapper" ref="bulletin">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{'active':active}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin-wrapper">
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <p class="content border-bottom">
            {{seller.bulletin}}
          </p>
          <ul class="supports" v-if="seller.supports">
            <li class="supports-item"
              v-for="(item, index) in seller.supports"
              :key="index"
            >
              <span class="icon" :class="iconMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="picswrapper">
          <ul class="pics-list" ref="picslist">
            <li class="pic-item" v-for="(img, index) in seller.pics" :key="index">
              <img :src="img" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-bottom">商家信息</h1>
        <ul>
          <li class="info-item border-bottom" v-for="(info, index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import split from '../split/split'
import star from '../star/Star'
import BScroll from 'better-scroll'
export default {
  name: 'SellerStore',
  props: {
    seller: Object
  },
  data () {
    return {
      iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      active: false
    }
  },
  computed: {
    favoriteText () {
      return this.active ? '已收藏' : '收藏'
    }
  },
  components: {
    star,
    split
  },
  watch: {
    'seller' () {
      this.initPicScroll()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
      this.initPicScroll()
    })
  },
  methods: {
    initUlWidth () {
      let picWidth = 120
      let margin = 6
      let width = (picWidth + margin) * this.seller.pics.length - margin
      this.$refs.picslist.style.width = width + 'px'
    },
    initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.bulletin, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    initPicScroll () {
      if (this.seller.pics) {
        this.initUlWidth()
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picswrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    toggleFavorite () {
      this.active = !this.active
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/mixin.styl'

.seller-wrapper
  position absolute
  top 3.48rem
  left 0
  bottom 0
  width 100%
  overflow hidden
  .overview
    position relative
    padding .36rem
    .title
      font-size .28rem
      line-height .28rem
      color rgb(7, 17, 27)
      margin-bottom .16rem
    .desc
      padding-bottom .36rem
      height .36rem
      font-size 0
      .star
        display inline-block
        vertical-align top
        margin-right .16rem
      .text
        font-size .2rem
        line-height .36rem
        color rgb(77, 85, 93)
        margin-right .24rem
    .remark
      display flex
      padding-top .36rem
      .block
        display inline-block
        flex 1
        font-size .2rem
        font-weight .2rem
        color rgb(147, 153, 159)
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border-right none
        .content
          font-size .2rem
          line-height .48rem
          font-weight 200
          color rgb(7, 17, 27)
          margin-top .08rem
          .stress
            font-size .48rem
    .favorite
      position absolute
      right .36rem
      top .36rem
      font-size 0
      width .6rem
      text-align center
      .icon-favorite
        display block
        color #d4d6d9
        font-size .48rem
        line-height .48rem
        margin-bottom .08rem
        &.active
          color rgb(240, 20, 20)
      .text
        font-size .2rem
        line-height .2rem
        color rgb(77, 85, 93)
  .bulletin-wrapper
    padding .36rem .36rem 0 .36rem
    .title
      font-size .28rem
      line-height .28rem
      color rgb(7, 17, 27)
      margin-bottom .16rem
    .content
      padding 0 .24rem .32rem
      font-size .24rem
      font-weight 200
      color rgb(240, 20, 20)
      line-height .48rem
    .supports-item
      font-size 0
      padding .32rem .24rem
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      &:last-child
        border-bottom none
      .icon
        display inline-block
        height .32rem
        width .32rem
        background-size .32rem .32rem
        vertical-align top
        backgeound-repeat no-repeat
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.special
          bg-image('special_4')
        &.invoice
          bg-image('invoice_4')
        &.guarantee
          bg-image('guarantee_4')
      .text
        font-size .24rem
        line-height .32rem
        font-weight 200
        padding-left .12rem
        color rgb(7, 17, 27)
  .pics
    padding .36rem
    .title
      font-size .28rem
      line-height .28rem
      color rgb(7, 17, 27)
      margin-bottom .24rem
    .pics-wrapper
      width 100%
      overflow hidden
      white-space nowrap
      .pics-list
        font-size 0
        .pic-item
          display inline-block
          width 2.4rem
          height 1.8rem
          margin-right .12rem
          &:last-child
            margin-right 0
  .info
    padding .36rem .24rem 0 .24rem
    .title
      font-size .28rem
      line-height .28rem
      color rgb(7, 17, 27)
      padding-bottom .24rem
    .info-item
      padding .32rem .24rem
      font-size .24rem
      font-weight 200
      line-height .32rem
      color rgb(7, 17, 27)
      &:last-child:before
        border-width 0
</style>
