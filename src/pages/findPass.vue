<template>
    <div class="findPass">
        <m-header title="找回密码" showBack/>
       <div class="page-conner login-form">
           <Field placeholder='请输入手机号' v-model="loginData.phone">
               <icon name='phone' slot="icon" style="color:#3CDD9F"></icon>
           </Field>
              <Field placeholder='请输入验证码'   v-model="loginData.number"  >
                <Button slot="button" size="small" @click="getCode" :disabled='disabled'>{{btnText}}</Button>
           </Field>
           <Field placeholder='请输入新密码' type='password' v-model="loginData.password">
               <icon name='suo' slot="icon" style="color:#3CDD9F"></icon>
           </Field>
             <Field placeholder='请确认新密码' type='password' v-model="loginData.password2">
               <icon name='suo' slot="icon" style="color:#3CDD9F"></icon>
           </Field>
           <Button size="large" class="loginbtn" @click='login'>确认</Button>
       </div>
    </div>
</template>

<script>
import { Field, Button } from 'vant'
import {mapActions} from 'vuex'
import {commonSms, userPasswordRetrieval} from '@/api'
import {isPhoneNum} from '@/util'

import md5 from 'js-md5'
export default {
  name: 'findPass',
  data () {
    return {
      loginData: {
        phone: '',
        password: '',
        password2: '',
        number: ''
      },
      showCode: false,
      btnText: '发送验证码',
      disabled: false
    }
  },
  components: {
    Field,
    Button
  },
  methods: {
    ...mapActions(['userLogin']),
    login () {
      if (!this.loginData.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!isPhoneNum(this.loginData.phone)) {
        this.$toast('您输入的手机号不正确')
        return
      }
      if (!this.loginData.number) {
        this.$toast('请输入验证码')
        return
      }
      if (!this.loginData.password) {
        this.$toast('请输入密码')
        return
      }
      if (this.loginData.password !== this.loginData.password2) {
        this.$toast('两次密码不一致')
        return
      }
      this.findPass()
    },
    findPass () {
      userPasswordRetrieval({...this.loginData, password: md5(this.loginData.password).toUpperCase()}, true).then(res => {
        this.loginInfo()
      })
    },
    loginInfo () {
      this.userLogin({...this.loginData, password: md5(this.loginData.password).toUpperCase()}, true)
        .then(res => {
          if (this.$store.state.beforePath) {
            let path = this.$store.state.beforePath
            this.$store.commit('updateBeforePath', null)
            this.$router.replace(path)
          } else {
            this.$router.back()
          }
        })
    },

    getCode () {
      if (!this.loginData.phone) {
        this.$toast('请输入手机号')
        return
      }
      if (!isPhoneNum(this.loginData.phone)) {
        this.$toast('您输入的手机号不正确')
        return
      }

      commonSms(this.loginData, true).then(({data = {}}) => {
        this.setBtnText(data.waitTime || 60)
      })
    },
    setBtnText (num) {
      this.disabled = true

      let timer = setInterval(e => {
        num -= 1
        if (num !== 0) {
          this.btnText = num + '秒后可重发'
        } else {
          clearInterval(timer)
          this.disabled = false
          this.btnText = '发送验证码'
        }
      }, 1000)
    }
  }
}
</script>

<style lang='less'>
.findPass{
    .login-form{
        text-align: center;
       .loginbtn{
           margin-top: 20px;
           border-radius: 30px;
           background: #3CDD9F;
           color: #ffffff;
           width: 80%
       }
    }
    .rg{
        width: 100%;
        text-align: center;
        margin-top: 12px;
        span{
            cursor: pointer;
        }
        .action{
            color: #0FE19E;
        }
    }
}
</style>
