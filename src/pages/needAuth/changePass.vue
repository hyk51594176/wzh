<template>
    <div class="findPass">
        <m-header :title="$route.params.title" showBack/>
        <div class="page-conner login-form" >
            <Field placeholder='请输入原始密码' v-model="loginData.oldPassword"  type='password'>
                <icon name='suo' slot="icon" style="color:#3CDD9F"></icon>
            </Field>
            <Field placeholder='请输入新密码' type='password' v-model="loginData.newPassword">
                <icon name='suo' slot="icon" style="color:#3CDD9F"></icon>
            </Field>
            <Field placeholder='请确认新密码' type='password' v-model="loginData.password">
                <icon name='suo' slot="icon" style="color:#3CDD9F"></icon>
            </Field>
            <Button size="large" class="loginbtn" @click='login'>确认</Button>
        </div>
    </div>
</template>

<script>
import { Field, Button } from 'vant'
import { mapActions } from 'vuex'
import { userPasswordUpdate, payInfoChangPassword } from '@/api'
import md5 from 'js-md5'
export default {
  name: 'changePass',
  data () {
    return {
      loginData: {
        oldPassword: '',
        password: '',
        newPassword: ''

      }
    }
  },
  components: {
    Field,
    Button
  },
  methods: {
    ...mapActions(['logOut']),
    login () {
      if (!this.loginData.newPassword) {
        this.$toast('请输入旧密码')
        return
      }
      if (!this.loginData.newPassword) {
        this.$toast('请输入新密码')
        return
      }
      if (this.loginData.password !== this.loginData.newPassword) {
        this.$toast('两次密码不一致')
        return
      }
      if (this.$route.params.title === '修改登录密码') {
        userPasswordUpdate({
          phone: this.$store.state.apiHeader.phone,
          newPassword: md5(this.loginData.newPassword).toUpperCase(),
          oldPassword: md5(this.loginData.oldPassword).toUpperCase()
        }, true).then(res => {
          this.logOut().then(_ => {
            this.$router.replace('/login')
          })
        })
      } else {
        payInfoChangPassword({
          cardId: this.$store.state.payInfo.bingDingInfo.cardId,
          newPassword: md5(this.loginData.newPassword).toUpperCase(),
          oldPassword: md5(this.loginData.oldPassword).toUpperCase()
        }).then(res => {
          this.payInfoBingDingInfo()
        })
      }
    }
  }
}
</script>

<style lang='less'>
.findPass {
  .login-form {
    text-align: center;
    .loginbtn {
      margin-top: 20px;
      border-radius: 30px;
      background: #3cdd9f;
      color: #ffffff;
      width: 80%;
    }
  }
  .rg {
    width: 100%;
    text-align: center;
    margin-top: 12px;
    span {
      cursor: pointer;
    }
    .action {
      color: #0fe19e;
    }
  }
}
</style>
