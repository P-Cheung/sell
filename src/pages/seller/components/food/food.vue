<template>
  <transition name="slide">
    <div class="food-wrapper" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="header-image">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥<span class="num">{{food.price}}</span></span><span class="old" v-if="food.oldPrice">￥<span class="num">{{food.oldPrice}}</span></span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click="handdleBuy">
              加入购物车
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../cartcontrol/CartControl'
import BScroll from 'better-scroll'
import Vue from 'vue'
export default {
  name: 'Food',
  components: {
    cartcontrol
  },
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    handdleBuy (event) {
      Vue.set(this.food, 'count', 1)
      this.$emit('buy', event.target)
    }
  }
}
</script>

<style lang='stylus' scoped>
.food-wrapper
  position fixed
  top 0
  left 0
  bottom .96rem
  background #fff
  width 100%
  z-index 30
  transform translate3d(0, 0, 0)
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%, 0, 0)
  &.slide-enter-active, &.slide-leave-active
    transition all 0.2s linear
  .header-image
    position relative
    width 100%
    height 0
    padding-bottom 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 0
      left 0
      .icon-arrow_lift
        display block
        padding .4rem
        color #fff
  .content
    position relative
    padding .36rem
    .title
      font-size .28rem
      font-weight 700
      color rgb(7, 17, 27)
      line-height .28rem
      margin-bottom .16rem
    .detail
      font-size .2rem
      line-height .2rem
      color rgb(147, 153, 159)
      margin-bottom .36rem
      .count
        margin-right .24rem
    .price
      font-size .2rem
      font-weight normal
      line-height .48rem
      .new
        color rgb(240, 20, 20)
        margin-right .16rem
        .num
          font-weight 700
          font-size .28rem
      .old
        color rgb(147, 153, 159)
        text-decoration line-through
        .num
          font-weight 700
    .cartcontrol-wrapper
      position absolute
      right .24rem
      bottom .24rem
    .buy
      position absolute
      right .36rem
      bottom .36rem
      z-index 10
      width 1.48rem
      height .48rem
      background rgb(0, 160, 220)
      border-radius .24rem
      font-size .2rem
      color #fff
      padding .12rem .24rem
      box-sizing border-box
      line-height .24rem
      &.fade-enter, &.fade-leave-to // 渐隐效果保证能获取元素位置
        opacity 0
      &.fade-enter-active, &.fade-leave-active
        transition all 0.2s
</style>
