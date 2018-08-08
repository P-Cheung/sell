<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
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
  </div>
</template>

<script>
export default {
  name: 'ShopCart',
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
      dropBalls: []
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
    }
  }
}
</script>

<style lang='stylus' scoped>
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height .96rem
    background #141d27
    .content
      display flex
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
</style>
