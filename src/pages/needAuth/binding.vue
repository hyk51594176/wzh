<template>
  <div class="binding">
    <m-header title="绑卡" showBack />
    <Field  label="手机号" :value='userInfo.phone'  disabled/>
    <Field  label="卡号" v-model="formData.cardId" placeholder='请输入你的卡号'/>
    <Field  label="支付密码" v-model="formData.password" type='password' placeholder='请输入支付密码'/>
    <div style="text-align:center">

    <Button size="large" class="bindbtn" @click='submit'>确认</Button>
    </div>

  </div>
</template>

<script>
import { Field, Button } from 'vant'
export default {
  name: 'binding',
  data () {
    return {
      formData: {
        phone: '',
        cardId: '',
        password: ''
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  components: {
    Field, Button
  },
  methods: {
    submit () {
      if (!this.formData.cardId) return this.$toast('请输入卡号')
      if (!this.formData.password) return this.$toast('请输入支付密码')
      this.$store.dispatch('payInfoBingDingCard')
    }
  }
}
</script>

<style lang='less'>
.binding {
  .bindbtn {
    margin-top: 20px;
    border-radius: 30px;
    background: #3cdd9f;
    color: #ffffff;
    width: 80%;
  }
}
</style>
