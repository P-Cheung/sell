<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item"
          v-for="(item, index) of goods"
          :key="index"
        >
          <span class="text border-bottom">
            <span class="icon" v-if="item.type>0" :class="iconMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'sellerGoods',
  props: {
    seller: Object
  },
  data () {
    return {
      iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      goods: {}
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
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/mixin.styl'
.border-bottom
  &:before
    border-color rgba(7, 17, 27, 0.1)
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
        // color rgb(240, 20, 20)
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
  .goods-wrapper
    flex 1
</style>
