<template>
    <div class="login">
        <img src="~@/assets/img/new_banner.png" alt="" style="width:100%">
        <div class="login-form">
            <Field placeholder='请输入手机号' v-model="loginData.phone">
                <icon name='phone' slot="icon"  class="primary-color" ></icon>
            </Field>
            <Field placeholder='请输入验证码' v-model="loginData.number" v-if="showCode">
                <Button slot="button" size="small" @click="getCode" :disabled='disabled'>{{btnText}}</Button>
            </Field>
            <Field placeholder='请输入密码' type='password' v-model="loginData.password">
                <icon name='suo' slot="icon"  class="primary-color"></icon>
            </Field>
            <Button size="large" class="primary loginbtn" @click='login'>{{showCode?'注 册':'登 录'}}</Button>
            <div class="rg">
                <span @click="showCode=true" v-if="!showCode" class="primary-color">注 &nbsp;&nbsp;册</span>
                <span v-if="!showCode" @click="$router.replace('/findPass')">|&nbsp;忘记密码&nbsp;|</span>
                <span @click="$router.back()" v-if="!showCode">游客登陆</span>
                <span v-if="showCode">已有账号，</span>
                <span @click="showCode=false" v-if="showCode" class="primary-color">立即登录</span>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Field,
  Button
} from 'vant'
import {
  mapActions
} from 'vuex'
import {
  commonSms,
  user,
  userInfoUpdatePush
} from '@/api'

import {
  isPhoneNum
} from '@/util'
import md5 from 'js-md5'
export default {
  name: 'login',
  data () {
    return {
      loginData: {
        phone: '',
        password: '',
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
      if (!this.loginData.password) {
        this.$toast('请输入密码')
        return
      }
      if (this.showCode) {
        if (!this.loginData.number) {
          this.$toast('请输入验证码')
          return
        }
        this.register()
      } else {
        this.loginInfo()
      }
    },
    loginInfo () {
      this.userLogin({ ...this.loginData,
        password: md5(this.loginData.password).toUpperCase()
      }, true)
        .then(res => {
          console.log('登录成功')
          userInfoUpdatePush({phone: this.loginData.phone, pushId: this.$store.state.pushId})
          if (this.$store.state.beforePath) {
            let path = this.$store.state.beforePath
            this.$store.commit('updateBeforePath', null)
            this.$router.replace(path)
          } else {
            this.$router.back()
          }
        })
    },
    register () {
      user({ ...this.loginData,
        password: md5(this.loginData.password).toUpperCase()
      }, true).then((code) => {
        this.loginInfo()
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
      commonSms(this.loginData, true).then(({
        data = {}
      }) => {
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

    .login {
      background: #ffffff;
        .login-form {
            padding: 0 10px;
            .loginbtn {
                margin-top: 20px;
                border-radius: 30px;

                color: #ffffff
            }
        }
        .rg {
            width: 100%;
            text-align: center;
            margin-top: 12px;
            span {
                cursor: pointer;
            }

        }
    }
</style>
