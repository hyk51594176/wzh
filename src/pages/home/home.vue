<template>
  <div class="home">
    <div class="home-header" :style="{ background: `rgba(76, 213, 203,${opacity})`}">
      <div class="shopname" @click="$router.push('/shop')">
        <icon name='location' class="micon" style='width:16px;' />
        <span>{{shop.shopname}}</span>
      </div>
      <!-- style="width:70%" -->
      <mSearch style="width:70%">
        <icon slot="prepend" name='search' style='width:25px;height:18px;' />
        <icon slot="append" name='mic' style='width:25px;height:18px;' />
      </mSearch>&nbsp;&nbsp;
      <!-- <icon name='shopping' style="mragin-left:5px" class="micon"/>&nbsp;&nbsp; -->
      <icon name='more' @click="fastShow=!fastShow" class="micon" />
    </div>
    <div class="page-conner" ref='pageConner'  @scroll="onScroll">
      <Swipe :autoplay="3000">
        <SwipeItem v-for="(obj,index) in banner" :key="index" >
          <img :src="obj.img" style="width:100%" @click="$store.dispatch('updatedTempObj',obj)">
        </SwipeItem>
      </Swipe>
      <ul class="home-entry">
        <li v-for="obj in entrys" :key="obj.img">
          <img :src="obj.img" @click="$store.dispatch('updatedTempObj',obj)">
          <p>{{obj.title}}</p>
        </li>
      </ul>
      <div style="background:#ffffff;text-align:center">
      <Swipe>
        <SwipeItem v-for="(obj,index) in banner2" :key="index"  :loop='false'>
          <img :src="obj.img" style="width:100%" @click="$store.dispatch('updatedTempObj',obj)">
        </SwipeItem>
      </Swipe>

      </div>
      <!-- 万中头条：加入万中汇+会员  宝马座驾等你来！ -->
      <div class="van-hairline--top wztt">
        <span class="van-hairline--right">
          <font class="wz">万</font>
          <font  class="wz">中</font>
          <font class="tt">头</font>
          <font class="tt">条</font>
        </span>&nbsp;&nbsp;
        <span @click="$store.dispatch('updatedTempObj',banner2[0])">
         加入万中汇+会员  宝马座驾等你来！
        </span>
      </div>
      <div  class="van-hairline--top-bottom newWelfare" >
        <img :src="obj.img" :style="{width:obj.width}" v-for="obj in newWelfare" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)">
      </div>
      <div class="bdc">
        <span class="title">
          <span class="label">8点场</span>
          <font class="van-hairline--surround">01</font> :
          <font class="van-hairline--surround">00</font> :
          <font class="van-hairline--surround">44</font>
        </span>
        <span class="pull-right" style="color:#6e6e6e;font-size:12px">
          秒抢好货
          <icon name='right' style="width:12px" />
        </span>
        <ul class="goods">
          <li v-for="obj in goodsList" :key="obj.img"  @click="$store.dispatch('updatedTempObj',obj)">
            <img :src="obj.img" alt="">
            <div>
               {{obj.price | currency}}
              <p>仅剩3{{obj.count}}件</p>
            </div>
          </li>
        </ul>
      </div>
      <div style="margin-top:5px;" class="goods2">
            <img :src="goods.left.img" :style="{width:goods.left.width}"    @click="$store.dispatch('updatedTempObj',goods.left)">
            <span class="wzbzhy-right">
             <img :src="obj.img" alt="" v-for="obj in goods.right" :style="{width:obj.width}" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)"/>
            </span>
        <!-- <ul>
          <li class="left">
            <div class="title">
              <span style="color:#48C0FF;font-size: 20px;">掌上专享</span>
              <p style="font-size:16px" class="dan">海信43英寸平板电视</p>
              <span style="color:black;font-size:16px">￥1799</span>
            </div>
            <img src="~@/assets/img/图层-43@2x.png" alt="">
          </li>
          <li class="right">
            <div class="goods2-up">
              <div  style="width:50%">
                <span style="color:#BB42D2;font-size: 20px;">值得买</span>
                <p style="font-size:16px" class="dan">Apple iPhone X 苹果...</p>
                <span style="color:black;font-size:16px">￥7868</span>
              </div>
              <img src="~@/assets/img/图层-45@2x.png" alt="" style="width:50%">
            </div>
            <div class="goods2-down">
              <div>
                <p style="font-size: 20px;color:#FF5B3C">排行榜</p>
                <p style="font-size:16px">必买尖儿货</p>
                <img src="~@/assets/img/图层-45@2x.png" alt="">
              </div>
              <div>
                <p style="font-size: 20px;color:#34B778;">团购</p>
                <p style="font-size:16px">火拼价更低</p>
                <img src="~@/assets/img/图层-45@2x.png" alt="">
              </div>
            </div>
          </li>
        </ul> -->
      </div>
      <div style="margin-top:10px" class="wzhdh">
        <img :src="wzhdh.bg.img" style="width:100%" class="bg">
        <div class="wz-goods">
             <img :src="obj.img"   v-for="obj in wzhdh.goods" :style="{width:obj.width}" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)"/>

        </div>
      </div>
      <div style="line-height:44px;height:44px;text-align:center">
        <h3>商城精选</h3>
      </div>
      <div style="background:#ffffff;height:190px;">
      </div>
      <div style="line-height:44px;height:44px;text-align:center">
        <h3>社区精选</h3>
      </div>
      <div style="background:#ffffff;height:273px;">
      </div>
      <div style="line-height:44px;height:44px;text-align:center">
        <h3>物流精选</h3>
      </div>
      <div style="background:#ffffff;height:200px;">
      </div>
      <Swipe :autoplay="3000" style="margin-top:11px">
        <SwipeItem v-for="(obj,index) in banner3" :key="index">
          <img :src="obj.img"  @click="$store.dispatch('updatedTempObj',obj)">
        </SwipeItem>
      </Swipe>
      <div style="line-height:44px;height:44px;text-align:center">
        <h3>酒店精选</h3>
      </div>
      <div style="background:#ffffff" class="newWelfare">
        <img :src="obj.img" :style="{width:obj.width,marginBottom: '5px'}" v-for="obj in hotels" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)">
      </div>
      <div style="line-height:44px;height:44px;text-align:center">
        <h3>金融理财</h3>
      </div>
      <div style="background:#ffffff;">
        <img src="~@/assets/img/lcxs.png" style="width:100%">
      </div>
      <div style="line-height:44px;height:44px;text-align:center">
        <h3>好店推荐</h3>
      </div>
      <div style="background:#ffffff" class="newWelfare">
          <img :src="obj.img" :style="{width:obj.width,marginBottom: '5px'}" v-for="obj in goodShops" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)">
      </div>
    </div>
    <Popup v-model="fastShow" position='top' class="fast-entry">
      <ul>
        <li>付款码</li>
        <li>个人中心</li>
        <li>优惠券</li>
        <li>消息</li>
      </ul>
    </Popup>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  NoticeBar,
  Popup
} from 'vant'
import * as service from '@/api/service'
export default {
  name: 'home',
  data () {
    return {
      fastShow: false,
      ...service,
      opacity: 0
    }
  },
  methods: {
    onScroll (e) {
      this.opacity = Math.abs(e.target.scrollTop / 150)
    }
  },
  computed: {
    shop () {
      return this.$store.getters.activeShop || {}
    }
  },
  components: {
    Swipe,
    SwipeItem,
    NoticeBar,
    Popup
  }
}
</script>

<style lang='less'>
.home {
  .fast-entry {
    width: 100%;
    top: 45px;
    ul {
      height: 90px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .wzhdh {
    position: relative;
    text-align: center;
    .bg {
      width: 100%;
    }
    .wz-goods {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      z-index: 2;
      bottom: 5px;
      img{
        margin-bottom:5px;
      }
    }
  }
  .newWelfare {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    img {
      height: 100%;
    }
  }
  .wztt {
    background: #ffffff;
    height: 40px;
    line-height: 40px;
    padding: 0 8px;
    span {
      font-weight: 600;
      color: black;
      padding-right: 8px;
    }
    .tt {
      background: #ff5c5c;
      color: #ffffff;
      margin: 0 2px;
      padding: 4px;
      text-align: center;
    }
  }
  .bdc {
    background: #ffffff; // height: 385px;
    margin-top: 10px;
    padding: 8px 0;
    .title {
      padding: 0 8px;
      border-left: 5px solid #ff5c5c;
      line-height: 1.8;
      vertical-align: middle;
      .label {
        font-size: 16px;
        color: black;
        font-weight: 500;
        margin-right: 8px;
      }
      font {
        // border: 1px solid #ff5c5c;
        color: #ff5c5c;
        padding: 5px;
      }
    }
    .pull-right {
      padding-right: 15px;
      color: rgb(110, 110, 110);
      font-size: 14px;
      vertical-align: middle;
      .svg-icon {
        width: 15px;
        height: 15px;
      }
    }
    .goods {
      display: flex;
      overflow: auto;
      width: 100%;
      li {
        text-align: center;
        color: black;
        padding: 0 8px;
        p {
          font-size: 12px;
          color: #6e6e6e;
        }
        img {
          height: 100px;
        }
      }
    }
  }
  .goods2 {
    background: #ffffff;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    .wzbzhy-right {
      width: 60%;
      display: inline-block;
      img {
        margin-right: 2px;
      }
    }
    ul {
      display: flex;
      overflow: hidden;
      .left {
        width: 40%;
        img {
          width: 100%;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        width: 60%;

        .goods2-up {
          display: flex;
          height: 102px;
          padding: 0 8px;
          box-sizing: border-box;
          img {
            height: 100%;
          }
        }
        .goods2-down {
          display: flex;
          height: 102px;
          text-align: center;
          div {
            line-height: 1.5;
            width: 50%;
          }
          img {
            height: 50%;
          }
        }
      }
    }
  }
  .van-modal {
    top: 45px;
  }
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-notice-bar {
    background: transparent;
    color: #666666;
  }
  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    box-sizing: border-box;
    position: fixed;
    height: 46px;
    width: 100%;
    z-index: 999;
    .micon {
      font-size: 25px;
      width: 25px;
      height: 25px;
      color: #ffffff;
      flex-shrink: 0;
    }
    .shopname {
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ffffff;
      white-space: nowrap;
      max-width: 130px;
      span {
        vertical-align: middle;
      }
    }
  }
  .minput {
    border-radius: 15px !important;
    padding: 0 8px;
    line-height: 1;
    height: 30px;
    input {
      height: 30px;
    }
    &:after {
      border: none;
    }
  }
  .home-entry {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #ffffff;
    padding-bottom: 10px;
    li {
      margin-top: 10px;
      width: 20%;
      text-align: center;
      margin-top: 12px;
      img {
        height: 46px;
      }
      p {
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
    }
  }
}
</style>
