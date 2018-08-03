<template>
  <div>
    <seller-header :seller="seller"></seller-header>
    <div class="nav border-bottom">
      <router-link class="nav-item" to="goods">商品</router-link>
      <router-link class="nav-item" to="rating">评价</router-link>
      <router-link class="nav-item" to="restaurant">商家</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import sellerHeader from './components/header/Header'
import axios from 'axios'
export default {
  name: 'Seller',
  components: {
    sellerHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  methods: {
    getSellerInfo () {
      axios.get('api/data.json').then(
        this.getSellerInfoSucc
      )
    },
    getSellerInfoSucc (res) {
      // console.log(res)
      res = res.data
      if (res.ret && res.data) {
        this.seller = res.data.seller
        // console.log(res.data.seller)
      }
    }
  },
  created () {
    this.getSellerInfo()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixin.styl'
  .border-bottom
    &:before
      border-color rgba(7, 17, 27, 0.1)
  .nav
    display flex
    height .8rem
    width 100%
    .nav-item
      flex 1
      text-align center
      font-size .28rem
      line-height .8rem
      color rgb(77, 85, 93)
    .router-link-active
      color rgb(240, 20, 20)
</style>
