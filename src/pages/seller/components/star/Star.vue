<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses"
      class="star-item"
      :key="index"
      :class="itemClass"
    >
    </span>
  </div>
</template>

<script>
const LENGTH = 5
const STAR_HALF = 'half'
const STAR_ON = 'on'
const STAR_OFF = 'off'

export default {
  name: 'Star',
  props: { // 对传入值范围作检查
    size: Number,
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let arr = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let interge = Math.floor(score)
      for (let i = 0; i < interge; i++) {
        arr.push(STAR_ON)
      }
      if (hasDecimal) {
        arr.push(STAR_HALF)
      }
      while (arr.length < LENGTH) {
        arr.push(STAR_OFF)
      }
      return arr
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/mixin.styl'
.star
  font-size 0 // 消除星星之间默认间隙
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width .4rem
      height .4rem
      margin-right .44rem
      background-size .4rem .4rem
      &:last-child
        margin-right 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
  &.star-36
    .star-item
      width .3rem
      height .3rem
      margin-right .12rem
      background-size .3rem .3rem
      &:last-child
        margin-right 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star-24
    .star-item
      width .2rem
      height .2rem
      margin-right .06rem
      background-size .2rem .2rem
      &:last-child
        margin-right 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
