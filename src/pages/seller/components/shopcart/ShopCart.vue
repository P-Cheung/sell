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
</style>
