<template>
  <div class="leading-currency">
    <m-header title="领万中币" />
    <div class="home page-conner"  ref='pageConner'>
      <CellGroup>
        <Cell style="height:100px" :style="titeStyle" class="titleImg">
          <div slot="title" class="title-login">
            <div v-if="!userInfo" @click="$router.push('/login')">
              <img src="@/assets/img/logo.png" alt="">
              <span> 注册 </span> |
              <span> 登陆 </span>
            </div>
            <img :src="userInfo.headPortrait||require('@/assets/img/my-photo1.png')" alt="" v-else>&nbsp;&nbsp;&nbsp;
            <span v-if="userInfo">
                    {{userInfo.phone}}
                    <p style="color: #ffffff;">
                        {{userInfo.nickname}} &nbsp;&nbsp;&nbsp;{{userInfo.sex && ( userInfo.sex==='0'?'女':'男')}}
                    </p>
                </span>
          </div>
        </Cell>
        <Cell label="请登录后，领取万中币">
          <div slot="title">
            我的万中币
            <font color='red'>0</font>
            <P class="m-label">请登录后，领取万中币</P>
          </div>
          <Button size="small" type="danger" class="banyuan ">签到</Button>
        </Cell>
      </CellGroup>
      <CellGroup style="margin-top:10px">
        <Cell title="福利狂欢趴"> </Cell>
        <Cell style="height:100px">
          <div slot="title" class="flkhp">
            <img :src="obj.img" alt="" v-for="obj in flkhp" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)"/>
          </div>
        </Cell>
      </CellGroup>
      <CellGroup style="margin-top:10px">
        <Cell title="万中币赚好运">
        </Cell>
        <Cell>
          <div slot="title" class="wzbzhy">
            <img :src="wzbzhy.left.img" :style="{width:wzbzhy.left.width}"    @click="$store.dispatch('updatedTempObj',wzbzhy.left)">
            <span class="wzbzhy-right">
             <img :src="obj.img" alt="" v-for="obj in wzbzhy.right" :style="{width:obj.width}" :key="obj.img" @click="$store.dispatch('updatedTempObj',obj)"/>
            </span>
          </div>
        </Cell>
      </CellGroup>
      <CellGroup style="margin-top:10px">
        <Cell title="任务中心">
        </Cell>
          <img :src="obj.img"    style="width:100%" v-for="obj in mission" :key="obj.img"  @click="$store.dispatch('updatedTempObj',obj)"/>
        <!-- <Cell>
          <div slot="title" class="mission">
            <img src="@/assets/img/hyzx.png" alt="" slot="icon" style="width:40px">
            <div>
              设置性别
              <P class="m-label">奖励 10 万中币</P>
            </div>
          </div>
          <Button size="small" type="danger" class="banyuan ">去做任务</Button>
       </Cell> -->
         <!-- <Cell>
          <div slot="title" class="mission">
            <img src="@/assets/img/hyzx.png" alt="" slot="icon" style="width:40px">
            <div>
              设置昵称
              <P class="m-label">奖励 10 万中币</P>
            </div>
          </div>
          <Button size="small" type="danger" class="banyuan ">去做任务</Button>
        </Cell>
        <Cell>
          <div slot="title" class="mission">
            <img src="@/assets/img/hyzx.png" alt="" slot="icon" style="width:40px">
            <div>
              设置教育背景
              <P class="m-label">奖励 10 万中币</P>
            </div>
          </div>
          <Button size="small" type="danger" class="banyuan ">去做任务</Button>
        </Cell>
        <Cell>
          <div slot="title" class="mission">
            <img src="@/assets/img/hyzx.png" alt="" slot="icon" style="width:40px">
            <div>
              设置常驻城市
              <P class="m-label">奖励 10 万中币</P>
            </div>
          </div>
          <Button size="small" type="danger" class="banyuan ">去做任务</Button>
        </Cell>
        <Cell>
          <div slot="title" class="mission">
            <img src="@/assets/img/hyzx.png" alt="" slot="icon" style="width:40px">
            <div>
              设置常头像
              <P class="m-label">奖励 10 万中币</P>
            </div>
          </div>
          <Button size="small" type="danger" class="banyuan ">去做任务</Button>
        </Cell> -->
      </CellGroup>
      <div style="text-align:center;padding:8px">
        <img :src="cbb.img" alt=""  style="width:100%" @click="$store.dispatch('updatedTempObj',cbb)">
      </div>
      <CellGroup style="margin-top:10px">
        <Cell title="会员必抢">
        </Cell>
      </CellGroup>
      <div style="text-align:center;padding:8px">
          <img :src="obj.img"    style="width:100%" v-for="obj in hybq" :key="obj.img"  @click="$store.dispatch('updatedTempObj',obj)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Button
} from 'vant'
import { flkhp, wzbzhy, mission, cbb, hybq } from '@/api/service'
export default {
  name: 'leadingCurrency',
  data () {
    return {
      flkhp,
      wzbzhy,
      mission,
      hybq,
      cbb,
      titeStyle: {
        backgroundImage: `url(${require('@/assets/img/lwzb.png')})`
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  components: {
    Cell,
    CellGroup,
    Button
  }
}
</script>

<style lang='less'>
.leading-currency {
  .titleImg {
    background-size: 100% 100%;
    .title-login {
      height: 100%;
      color: #ffffff;
      display: flex;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        span {
          margin: 0 8px;
          font-size: 18px;
        }
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .leading-ul {
    li {
      background: #ffffff;
    }
  }
  .flkhp {
    display: flex;
    justify-content: space-around;
    img {
      width: 48%;
      height: 48%;
    }
    .van-cell van-hairline {
      display: none;
    }
  }
  .wzbzhy {

    .wzbzhy-right {
      width: 60%;
      display: inline-block;
      img{
        margin-right: 2px;
      }

    }
  }
  .mission {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }
}
</style>
