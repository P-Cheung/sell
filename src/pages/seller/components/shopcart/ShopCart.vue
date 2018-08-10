<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="count" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="goToPay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-wrapper">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="showlist">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="shopcartlist">
            <ul>
              <li class="food-item border-bottom" v-for="(food, index) in selectedFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price-wrapper">
                  <span class="price">￥<span class="num">{{food.price*food.count}}</span></span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="showlist" @click="fold=true"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/CartControl'
import BScroll from 'better-scroll'
export default {
  name: 'ShopCart',
  components: {
    cartcontrol
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFoods.forEach(item => {
        total += item.price * item.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectedFoods.forEach(item => {
        count += item.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < 20) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      return this.totalPrice < this.minPrice ? 'not-enough' : 'enough'
    },
    showlist () {
      if (!this.totalCount) {
        return false
      } else {
        return !this.fold
      }
    }
  },
  methods: {
    addcart (el) {
      let length = this.balls.length
      for (let i = 0; i < length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.el = el
          ball.show = true
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el) {
      console.log(el.offsetHeight) // 触发浏览器重绘
      this.$nextTick(() => { // 复原初始状态
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        // setTimeout(() => {
        //   done()
        // }, 400)
      })
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      this.fold = !this.fold
      if (!this.fold) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.shopcartlist, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    empty () {
      this.selectedFoods.forEach(item => { // 不应子组件修改props
        item.count = 0
      })
      this.fold = true
    },
    goToPay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      alert(`pay ￥${this.totalPrice}`)
    }
  }
}
</script>

<style lang='stylus' scoped>
  .border-bottom
    &:before
      border-color rgba(7, 17, 27, 0.1)
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height .96rem
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -.2rem
          width 1.12rem
          height 1.12rem
          box-sizing border-box
          margin 0 .24rem
          padding .12rem
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
              .icon-shopping_cart
                color #fff
            .icon-shopping_cart
              font-size .48rem
              color #80858a
              line-height .88rem
          .count
            position absolute
            top 0
            right 0
            width .48rem
            height .32rem
            background rgb(240, 20, 20)
            line-height .32rem
            border-radius .32rem
            color #fff
            font-size .18rem
            font-weight 700
            text-align center
            box-shadow 0 .04rem .08rem 0 rgb(0, 0, 0, .4)
        .price
          display inline-block
          vertical-align top
          font-size .32rem
          font-weight 700
          line-height .48rem
          height .48rem
          margin-top .24rem
          padding-right .24rem
          box-sizing border-box
          color rgba(255, 255, 255, .4)
          border-right 1px solid rgba(255, 255, 255, .1)
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin .24rem 0 0 .24rem
          font-size .24rem
          line-height .48rem
          box-sizing border-box
          color rgba(255, 255, 255, .4)
      .content-right
        flex 0 0 2.1rem
        width 2.1rem
        .pay
          font-size .24rem
          height .96rem
          line-height .96rem
          font-weight 700
          color rgba(255, 255, 255, .4)
          text-align center
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-wrapper
      .ball
        position fixed
        left .64rem
        bottom .44rem
        z-index 200
        &.drop-enter-active
          transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width .32rem
            height .32rem
            border-radius 50%
            background rgb(0, 160, 220)
            transition all .4s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition all 0.5s
      &.fold-enter, &.fold-leave-to
        // opacity 0
        transform translate3d(0, 0, 0)
      .list-header
        height .8rem
        line-height .8rem
        padding 0 .36rem
        background #f3f5f7
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size .28rem
          font-weight 200
          color rgb(7, 17, 27)
        .empty
          float right
          font-size .24rem
          color rgb(0, 160, 220)
      .list-content
        background #fff
        padding 0 .36rem
        max-height 217px
        overflow hidden
        .food-item
          position relative
          // height .96rem
          padding .24rem 0
          .name
            font-size .28rem
            color rgb(7, 17, 27)
            line-height .48rem
          .price-wrapper
            position absolute
            right 1.8rem
            top .24rem
            line-height .48rem
            color rgb(240, 20, 20)
            .price
              font-size .2rem
              font-weight normal
              .num
                font-size .28rem
                font-weight 700
          .cartcontrol-wrapper
            position absolute
            right 0
            top .12rem
  .list-mask
    position fixed
    top 0
    left 0
    z-index 40
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.6)
    -webkit-backdrop-filter blur(10px)
    &.fade-enter-active, &.fade-leave-active
      transition opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
</style>
