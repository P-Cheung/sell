<template>
  <div class="ratings-wrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper"><span class="text">服务态度</span><star class="star" :size="36" :score="seller.serviceScore"></star><span class="num">{{seller.serviceScore}}</span></div>
          <div class="score-wrapper"><span class="text">食物评分</span><star class="star" :size="36" :score="seller.foodScore"></star><span class="num">{{seller.foodScore}}</span></div>
          <div class="deliverytime"><span class="text">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span></div>
        </div>
      </div>
      <split></split>
      <rating-select
        :onlyContent="onlyContent"
        :selectType="selectType"
        :desc="desc"
        :ratings="ratings"
        @check="handleCheck"
        @change="handleChangeSelectType"
      >
      </rating-select>
      <div class="rating-wrapper">
        <ul v-if="ratings.length">
          <li class="rating-item border-bottom" v-for="(rating, index) in selectRatings" :key="index">
            <div class="user-img">
              <img :src="rating.avatar" height="28" width="28">
            </div>
            <div class="ratetime">{{rating.rateTime | formatDate}}</div>
            <p class="username">{{rating.username}}</p>
            <star class="star" :size="24" :score="rating.score"></star><span class="delivverytime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            <p class="text">{{rating.text}}</p>
            <div class="recommend">
              <i :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></i>
              <span class="recommend-item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
            </div>
          </li>
        </ul>
        <div class="no-ratings" v-if="!ratings.length">
          暂无评价
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star/Star'
import split from '../split/split'
import RatingSelect from '../ratingSelect/RatingSelect'
import axios from 'axios'
import BScroll from 'better-scroll'
import {formatDate} from '@/common/js/date'
const ALL = 2
export default {
  name: 'SellerRating',
  props: {
    seller: Object
  },
  components: {
    Star,
    split,
    RatingSelect
  },
  data () {
    return {
      ratings: [],
      onlyContent: false,
      selectType: ALL,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }
  },
  computed: {
    selectRatings () {
      if (this.selectType === ALL) {
        if (this.onlyContent) {
          return this.ratings.filter(item => {
            return item.text
          })
        } else {
          return this.ratings
        }
      } else {
        if (this.onlyContent) {
          return this.ratings.filter(item => {
            return item.rateType === this.selectType && item.text
          })
        } else {
          return this.ratings.filter(item => {
            return item.rateType === this.selectType
          })
        }
      }
    }
  },
  methods: {
    getRatingsInfo () {
      axios.get('api/data.json').then(this.getRatingsInfoSucc)
    },
    getRatingsInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        this.ratings = res.data.ratings
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratingsWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    handleCheck () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    handleChangeSelectType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  mounted () {
    this.getRatingsInfo()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang='stylus' scoped>
.ratings-wrapper
  position absolute
  top 3.48rem
  left 0
  bottom 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding .36rem 0
    .overview-left
      flex 0 0 2.74rem
      text-align center
      border-right 1px solid rgba(7, 17, 27, 0.1)
      @media only screen and (max-width 320px)
        flex 0 0 2.2rem
      .score
        font-size .48rem
        line-height .56rem
        color rgb(255, 153, 0)
        margin-bottom .12rem
      .title
        font-size .24rem
        line-height .24rem
        color rgb(7, 17, 27)
        margin-bottom .16rem
      .rank
        font-size .2rem
        line-height .2rem
        color rgb(147, 153, 159)
        margin-bottom .12rem
    .overview-right
      flex 1
      padding-left .48rem
      @media only screen and (max-width 320px)
        padding-left .16rem
      .score-wrapper
        display inline-block
        vertical-align top
        padding-bottom .16rem
        .text
          font-size .24rem
          color rgb(7, 17, 27)
          line-height .36rem
        .star
          display inline-block
          vertical-align top
          margin 0 .24rem
        .num
          font-size .24rem
          color rgb(255, 153, 0)
          line-height .36rem
      .deliverytime
        .text
          font-size .24rem
          color rgb(7, 17, 27)
          line-height .36rem
        .time
          font-size .24rem
          line-height .36rem
          color rgb(147, 153, 159)
          margin-left .24rem
  .rating-item
    position relative
    margin .36rem
    margin-bottom 0
    padding 0 0 .36rem .8rem
    .user-img
      position absolute
      top 0
      left 0
      img
        border-radius 50%
    .username
      font-size .2rem
      color rgb(7, 17, 27)
      line-height .24rem
    .star
      display inline-block
      margin .08rem .12rem .12rem 0
    .delivverytime, .ratetime
      font-size .2rem
      font-weight 200
      line-height .24rem
      color rgb(147, 153, 159)
    .ratetime
      position absolute
      top 0
      right 0
    .text
      font-size .24rem
      line-height .36rem
      color rgb(7, 17, 27)
    .recommend
      margin-top .16rem
      font-size 0
      .icon-thumb_up, .icon-thumb_down
        display inline-block
        margin-right .16rem
        font-size .24rem
        line-height .32rem
      .icon-thumb_up
        color rgb(0, 160, 220)
      .icon-thumb_down
        color rgb(183, 187, 191)
      .recommend-item
        display inline-block
        font-size .18rem
        line-height .32rem
        color rgb(147, 153, 159)
        padding 0 .12rem
        margin 0 .16rem .12rem 0
        border 1px solid rgba(7, 17, 27, 0.1)
  .no-ratings
    margin .36rem
    font-size .32rem
    color rgb(147, 153, 159)
</style>
