<template>
  <div class="ratingselect-wrapper">
    <div class="rating-type border-bottom">
      <span class="block positive" :class="{'on':selectType===2}" @click="changeSelectType(2)">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'on':selectType===0}" @click="changeSelectType(0)">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span class="block nagetive" :class="{'on':selectType===1}" @click="changeSelectType(1)">
        {{desc.nagetive}}<span class="count">{{nagetives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="handleCheck">
      <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NAGETIVE = 1
const ALL = 2
export default {
  name: 'RatingSelect',
  props: {
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          positive: '满意',
          nagetive: '不满意',
          all: '全部'
        }
      }
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter(item => {
        return item.rateType === POSITIVE
      })
    },
    nagetives () {
      return this.ratings.filter(item => {
        return item.rateType === NAGETIVE
      })
    }
  },
  methods: {
    handleCheck () {
      this.$emit('check')
    },
    changeSelectType (type) {
      this.$emit('change', type)
    }
  }
}
</script>

<style lang='stylus' scoped>
.rating-type
  margin .36rem .36rem 0
  padding-bottom .36rem
  font-size 0
  .block
    display inline-block
    padding .16rem .24rem
    color rgb(77, 85, 93)
    font-size .24rem
    line-height .32rem
    border-radius .02rem
    margin-right .16rem
    .count
      margin-left .1rem
      font-size .16rem
    &.positive
      background rgba(0, 160, 220, 0.2)
      &.on
        background rgb(0, 160, 220)
        color #fff
    &.nagetive
      background rgba(77, 85, 93, 0.2)
      &.on
        background rgb(77, 85, 93)
        color #fff
.switch
  padding .24rem .36rem
  font-size 0
  border-bottom 1px solid rgba(7, 17, 27, 0.1)
  .icon-check_circle
    display inline-block
    vertical-align top
    font-size .48rem
    line-height .48rem
    color rgb(147, 153, 159)
    margin-right .08rem
    &.on
      color #00c850
  .text
    display inline-block
    vertical-align top
    font-size .24rem
    line-height .48rem
    color rgb(147, 153, 159)
</style>
