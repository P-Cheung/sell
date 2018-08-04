import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/pages/seller/Seller'
import Goods from '@/pages/seller/components/goods/Goods'
import Rating from '@/pages/seller/components/rating/Rating'
import Restaurant from '@/pages/seller/components/restaurant/Restaurant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Seller',
      component: Seller,
      children: [
        {
          path: 'goods',
          name: 'SellerGoods',
          component: Goods
        },
        {
          path: 'rating',
          name: 'SellerRating',
          component: Rating
        },
        {
          path: 'restaurant',
          name: 'SellerRestaurant',
          component: Restaurant
        },
        {
          path: '',
          redirect: 'goods'
        }
      ]
    }
  ]
})
