<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('addcart', event.target)
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding .12rem
    &.move-enter-active, &.move-leave-active
      // opacity 1
      // transform translate3d(0, 0, 0)
      transition all .4s linear
      .inner
        transition all .4s linear
        // transform rotate(0)
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
    .inner
      font-size .48rem
      color rgb(0, 160, 220)
      line-height .48rem
  .cart-count
    display inline-block
    vertical-align top
    font-size .2rem
    width .24rem
    padding-top .12rem
    color rgb(147, 153, 159)
    line-height .48rem
    text-align center
  .cart-add
    display inline-block
    padding .12rem
    font-size .48rem
    color rgb(0, 160, 220)
    line-height .48rem
</style>
