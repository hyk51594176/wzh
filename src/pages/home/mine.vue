<template>
    <div class="mine">
        <m-header title="个人中心" style="background:#0DCFBF;color:#ffffff;margin-bottom: 0px;"/>
        <div class="home page-conner"  ref='pageConner'>
            <div class="my-card-warpper" :style="{backgroundImage:backgroundImage}">
                <ul class="card-content">
                    <li class="card-li1">
                        <div >
                            <img :src="(userInfo && userInfo.headPortrait)||require('@/assets/img/my-photo1.png')" alt="" class="header-img">
                            <span v-if="!userInfo" @click="$router.push('/login')">
                                尚未登录
                            </span >
                             <span v-else >
                                 {{userInfo.phone}}
                                 <p style="color: #6E6E6E;">
                                     {{userInfo.nickname}} &nbsp;&nbsp;&nbsp;{{userInfo.sex && ( userInfo.sex==='0'?'女':'男')}}
                                 </p>
                             </span>
                        </div>
                        <span>
                        <img src="~@/assets/img/qr@3x.png" alt="" class="qr-icon" @click="getQR">
                        </span>
                    </li>
                    <li class="card-li2">
                        <div @click="qiandao">
                            <img src="~@/assets/img/checkin@3x.png" alt="" >
                             <span>签到</span>
                        </div>
                         <div @click="bangka">
                            <img src="~@/assets/img/recharge@3x.png" alt="" >
                             <span>{{ !bingDingInfo ?"绑卡":"充值"}}</span>
                        </div>
                    </li>
                    <li v-if="bingDingInfo">
                        <br>
                        <h3>{{bingDingInfo.cardId}}</h3>
                    </li>

                </ul>
                <ul class="card-footer">
                    <li> 余额 <p>{{balance}}</p></li>
                    <li>积分<p>{{integral}}</p></li>
                    <li>优惠券<p>0</p></li>
                </ul>
            </div>
            <CellGroup>
                <Cell title="消费记录" is-link clickable to="/consumptionRecords">
                    <img slot="icon" class="iconimg" src="~@/assets/img/xfjl.png" alt="">
                </Cell>
                <Cell title="充值记录" is-link clickable to="/rechargeRecord">
                    <img slot="icon" class="iconimg" src="~@/assets/img/czjl.png" alt="">
                </Cell>
                <Cell title="会员卡解绑" is-link clickable @click="unBindCard">
                    <img slot="icon" class="iconimg" src="~@/assets/img/hyk.png" alt="">
                </Cell>
                <Cell title="安全中心" is-link clickable to="/securityCenter">
                    <img slot="icon" class="iconimg" src="~@/assets/img/mmxg.png" alt="">
                </Cell>
            </CellGroup>
            <CellGroup style="margin-top:10px">
                <Cell title="我的信息" is-link clickable to="/personInfo">
                    <img slot="icon" class="iconimg" src="~@/assets/img/wdxx.png" alt="">
                </Cell>
                <Cell title="我的收藏" is-link clickable to="/myCollection">
                    <img slot="icon" class="iconimg" src="~@/assets/img/wdsc.png" alt="">
                </Cell>
                <Cell title="我的订单" is-link clickable to="/myOrder">
                    <img slot="icon" class="iconimg" src="~@/assets/img/wddd.png" alt="">
                </Cell>
            </CellGroup>
            <CellGroup style="margin-top:10px">
                <Cell title="分享万中汇" is-link clickable @click="$plus.shareHref()">
                    <img slot="icon" class="iconimg" src="~@/assets/img/fxwz.png" alt="">
                </Cell>
                <Cell title="电话客服" is-link clickable to="/telService">
                    <img slot="icon" class="iconimg" src="~@/assets/img/dhkf.png" alt="">
                </Cell>
                <Cell title="意见反馈" is-link clickable to="/feedback">
                    <img slot="icon" class="iconimg" src="~@/assets/img/yjfk.png" alt="">
                </Cell>
                <Cell title="帮助中心" is-link clickable to="/helpCenter">
                    <img slot="icon" class="iconimg" src="~@/assets/img/bzzx.png" alt="">
                </Cell>
                <Cell title="关于万中汇" is-link clickable to="/about">
                    <img slot="icon" class="iconimg" src="~@/assets/img/gywzh.png" alt="">
                </Cell>
                <Cell title="退出登录" is-link clickable @click="exit">
                    <img slot="icon" class="iconimg" src="~@/assets/img/tcdl.png" alt="">
                </Cell>
            </CellGroup>
        </div>

        <van-dialog v-model="showQR" close-on-click-overlay :show-confirm-button='false'>
            <div class="code">
                <barcode :text='bar_code' :option='barcodeOptions' style="width:100%"></barcode>
                <qrcode :value='qr_code' style="width:100%"></qrcode>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import {
  Cell,
  CellGroup
} from 'vant'
import {
  qrUrl,
  barUrl
} from '@/config'
import barcode from 'components/barcode'
import qrcode from 'components/qrcode'

export default {
  name: 'mine',
  components: {
    Cell,
    CellGroup,
    barcode,
    qrcode
  },
  data () {
    return {
      backgroundImage: `url(${require('@/assets/img/card@3x.png')})`,
      showQR: false,
      qr_code: '',
      bar_code: '',
      barcodeOptions: {
        displayValue: false,
        height: 100,
        width: 1
      }
    }
  },
  created () {
    console.log('mine初始化')
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    bingDingInfo () {
      return this.$store.state.payInfo.bingDingInfo
    },
    cardInfo () {
      return this.$store.state.payInfo.cardInfo
    },
    balance () {
      if (this.cardInfo) {
        let findObj = this.cardInfo.card_info.card_product_info_arrays.card_product_info.find(obj => String(obj.product_id) === '0002')
        if (findObj) return findObj.valid_balance / 100
      }
      return 0
    },
    integral () {
      if (this.cardInfo) {
        let findObj = this.cardInfo.card_info.card_product_info_arrays.card_product_info.find(obj => String(obj.product_id) === '6007')
        if (findObj) return findObj.valid_balance
      }
      return 0
    }

  },

  methods: {
    exit () {
      this.$store.dispatch('logOut')
      this.$toast('您已退出登录')
    },
    qiandao () {
      this.$toast('系统尚在维护中')
    },
    bangka () {
      if (!this.userInfo) return this.$router.push('/login')
      if (this.bingDingInfo) return this.$router.push('/recharge')
      this.$router.push('/binding')
    },
    unBindCard () {
      if (!this.userInfo) return this.$router.push('/login')
      if (!this.bingDingInfo) return this.$toast('您还没有绑定过卡')
      this.$store.dispatch('conponUnbindCard')
    },
    getQR () {
      if (!this.userInfo) return this.$router.push('/login')
      if (!this.bingDingInfo) return this.$router.push('/binding')
      this.qr_code = qrUrl + this.bingDingInfo.cardno
      this.bar_code = barUrl + this.bingDingInfo.cardno
      this.showQR = true
    }
  }
}
</script>

<style lang='less'>
    .mine {
        .iconimg {
            height: 20px;
            margin-right: 8px;
            vertical-align: middle !important;
        }
        .code{
            text-align: center;
             padding: 20px 30px;
        }
        .my-card-warpper {
            background-size: 100% 100%;
            min-height: 320px;
            height: 320px;
            position: relative;
            margin-top: -40px;
            .card-content{
                padding: 70px 30px 0 ;
                color: black;
                .card-li1{
                    display: flex;
                    justify-content: space-between;
                    div{
                        display: flex;
                        align-items: center;
                        span{
                            margin-left: 8px;
                        }
                    }
                    .header-img{
                        border-radius: 50px;
                        height: 50px;
                        width: 50px;
                    }
                    .qr-icon{
                        width: 40px;
                    }
                }
                .card-li2{
                    display: flex;
                    margin-top: 15px;

                    div{
                        margin-right: 30px;
                        img{
                            width: 25px;
                        }
                    }
                }
            }
            .card-footer{
                position: absolute;
                bottom: 8px;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                color: #ffffff;
                li{
                    text-align: center;
                    line-height: 30px;
                }
            }
        }
    }
</style>
