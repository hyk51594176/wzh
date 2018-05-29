<template>
  <div class="rechage">
    <m-header title="充值" showBack/>
    <div class="page-conner" ref='pageConner'>

      <Field :value="bingDingInfo.cardId" label="充值卡号" disabled style="margin-top:8px"></Field>
      <ul class="van-hairline--top card">
        <li :class="{active:postData.amount===50}" @click="setAmount(50)">50元</li>
        <li  :class="{active:postData.amount===500}" @click="setAmount(500)">
          500元
          <p>赠送15积分</p>
        </li>
        <li  :class="{active:postData.amount===1000}" @click="setAmount(1000)">
          1000元
          <p>赠送35积分</p>
        </li>
        <li  :class="{active:postData.amount===2000}" @click="setAmount(2000)">
          2000元
          <p>赠送80积分</p>
        </li>
        <li  :class="{active:postData.amount===5000}" @click="setAmount(5000)">
          5000元
          <p>赠送225积分</p>
        </li>
        <li  :class="{active:postData.amount===10000}" @click="setAmount(10000)">
          10000元
          <p>赠送500积分</p>
        </li>
      </ul>
      <ul class="van-hairline--top card">
        <li class="paytype" :class="{payactive:payType==='0001'}" @click='setPayType("0001")' >
          <img src="~@/assets/img/alipay@3x.png" alt="" srcset="">
          <p>支付宝支付</p>
        </li>
        <li class="paytype" :class="{payactive:payType==='unipay'}" @click='setPayType("unipay")'>
          <img src="~@/assets/img/unipay@3x.png" alt="" srcset="" >
          <p>银联支付</p>

        </li>
        <li class="paytype" :class="{payactive:payType==='wxpay'}" @click='setPayType("wxpay")'>
          <img src="~@/assets/img/weixin@3x.png" alt="" srcset="">
          <p>微信支付</p>
        </li>
      </ul>
        <br>
        <br>

      <Button size="large" class="primary" @click='submit'>立即支付</Button>
    </div>
  </div>
</template>

<script>
import {
  Field,
  Button
} from 'vant'
import {payAlipayGetQuickPay, payAlipayGetAliURL} from '@/api'
import {parseQuery} from '@/util'
export default {
  name: 'recharge',
  components: {
    Field,
    Button
  },
  data () {
    return {
      postData: {
        cardId: '',
        amount: 50,
        password: '',
        userId: '',
        trxid: '',
        oprId: ''
      },
      payType: ''
    }
  },
  computed: {
    bingDingInfo () {
      const {
        bingDingInfo
      } = this.$store.state.payInfo
      return bingDingInfo || {}
    }
  },
  methods: {
    setPayType (payType) {
      this.payType = payType
    },
    setAmount (amount) {
      this.postData.amount = amount
    },
    submit () {
      if (!this.postData.amount) return this.$toast('请选择支付金额')
      if (!this.payType) return this.$toast('请选择支付方式')
      const {userInfo} = this.$store.state
      let data = {
        amount: this.postData.amount,
        userId: userInfo.userId,
        phone: userInfo.phone,
        cardId: this.bingDingInfo.cardId,
        title: '【万中汇+】充值' + this.postData.amount + '元',
        remark: '【万中汇+】充值' + this.postData.amount + '元',
        payType: this.payType
      }
      this.$store.commit('updatePayType', this.payType)
      if (this.payType === 'unipay') {
        payAlipayGetQuickPay(data, true).then(res => {
          this.$store.commit('updateUniPayInfo', res.data)
          this.$router.push('/payIframe/unipay')
        })
      } else if (this.payType === '0001') {
        data.amount *= 100
        payAlipayGetAliURL(data, true).then(res => {
          let { scheme } = parseQuery(res.data.payUrl)
          this.$store.commit('updateAliPayInfo', res.data)
          window.location = scheme
        })
      }
    }
  }
}
</script>

<style lang='less'>
.rechage {
  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #ffffff;
    padding: 8px;
    li {
      color: #44d0c5;
      align-items: center;
      width: 28%;
      border: 2px #44d0c5 solid;
      margin: 8px 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      font-size: 20px;
      border-radius: 5px;
      padding: 18px 0;
      box-sizing: border-box;
      p {
        font-size: 12px;
      }
      img {
        height: 25px;
        flex-grow: 0;
      }
    }
    .paytype {
      border: 2px solid #e5e5e5;
      P {
        margin-top: 5px;
        color: #666;
      }
    }
    .payactive {
      border: 2px #44d0c5 solid;
      p {
        color: #44d0c5 !important;
      }
    }
    .active {
      background-color: #44d0c5;
      color: #ffffff;
    }
  }
}
</style>
