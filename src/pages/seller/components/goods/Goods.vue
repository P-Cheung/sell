<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item"
          v-for="(item, index) of goods"
          :key="index"
          :class="{'current': index === currentIndex}"
          @click="clickMenu(index)"
        >
          <span class="text border-bottom">
            <span class="icon" v-if="item.type>0" :class="iconMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li class="foodlist foodlist-hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title border-left">{{item.name}}</h1>
          <ul>
            <li class="food-item border-bottom" v-for="(food, index) in item.foods" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">￥<span class="num">{{food.price}}</span></span><span v-if="food.oldPrice" class="old">￥<span class="num">{{food.oldPrice}}</span></span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control class="cartcontrol" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selected-foods="selectedFoods"></shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/ShopCart'
import CartControl from '../cartcontrol/CartControl'
export default {
  name: 'sellerGoods',
  components: {
    shopcart,
    CartControl
  },
  data () {
    return {
      iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      goods: [],
      seller: {},
      scrollHeight: [],
      scrollY: 0,
      foodlist: []
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.scrollHeight.length; i++) {
        let height1 = this.scrollHeight[i]
        let height2 = this.scrollHeight[i + 1]
        if (!height2 || (height1 <= this.scrollY && height2 > this.scrollY)) {
          return i
        }
      }
    },
    selectedFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(item => {
          if (item.count) {
            foods.push(item)
          }
        })
      })
      return foods
    }
  },
  mounted () {
    this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo () {
      axios.get('api/data.json').then(this.getGoodsInfoSucc)
    },
    getGoodsInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        this.goods = res.data.goods
        this.seller = res.data.seller
        this.$nextTick(() => { // 保证数据已获取并渲染
          this._initScroll()
          this._caculateHeight()
        })
      }
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        probeType: 3,
        click: true
      })
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _caculateHeight () {
      let foodlist = this.$refs.goodsWrapper.getElementsByClassName('foodlist-hook')
      this.foodlist = foodlist
      let height = 0
      this.scrollHeight.push(height)
      for (let i = 0; i < foodlist.length; i++) {
        height += foodlist[i].clientHeight
        this.scrollHeight.push(height)
      }
    },
    clickMenu (index) {
      this.goodsScroll.scrollToElement(this.foodlist[index], 300)
      // console.log(index)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/mixin.styl'
.border-bottom
  &:before
    border-color rgba(7, 17, 27, 0.1)
.border-left
  &:before
    border-color #d9dde1
    border-width 2px
.goods
  display flex
  position absolute
  top 3.48rem
  bottom .96rem
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 1.6rem
    width 1.6rem
    background #f3f5f7
    .menu-item
      display table
      width 1.12rem
      height 1.08rem
      padding 0 .24rem
      line-height .28rem
      .text
        display table-cell
        font-size .24rem
        width 1.12rem
        vertical-align middle
        font-weight 200
        .icon
          display inline-block
          width .24rem
          height .24rem
          background-size .24rem .24rem
          background-repeat no-repeat
          vertical-align top
          margin-right .04rem
          &.discount
            bg-image('discount_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
          &.guarantee
            bg-image('guarantee_3')
          &.decrease
            bg-image('decrease_3')
      &.current
        position relative
        margin-top -1px
        z-index 10
        background #fff
        .text
          font-weight 700
          &.border-bottom:before
            border-width 0
  .goods-wrapper
    flex 1
    .title
      height .52rem
      background #f3f5f7
      padding-left .28rem
      font-size .24rem
      color rgb(147, 153, 159)
      line-height .52rem
    .food-item
      display flex
      margin .36rem
      padding-bottom .36rem
      &:last-child
        &:before
          border-width 0
        margin-bottom 0
      .icon
        flex 0 0 1.14rem
        margin-right .2rem
      .content
        // display relative
        flex 1
        .name
          margin-top .04rem
          font-size .28rem
          height .28rem
          line-height .28rem
          color rgb(7, 17, 27)
        .desc
          margin .16rem 0 .16rem 0
          font-size .2rem
          line-height .24rem
          color rgb(147, 153, 159)
        .extra
          font-size .2rem
          line-height .2rem
          color rgb(147, 153, 159)
          .count
            padding-right .24rem
        .price
          .new
            font-size .2rem
            color rgb(240, 20, 20)
            font-weight normal
            line-height .48rem
            margin-right .16rem
            .num
              font-size .28rem
              font-weight 700
          .old
            text-decoration line-through
            font-size .2rem
            color rgb(147, 153, 159)
            font-weight normal
            line-height .48rem
            .num
              font-weight 700
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom .24rem
</style>
