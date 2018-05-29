<template>
<div>
   <keep-alive>
      <router-view class="homeview"></router-view>
   </keep-alive>
    <Tabbar v-model="active">
        <TabbarItem replace v-for="obj in tabs" :key="obj.icon" :to='obj.path' >
            {{obj.name}}
            <icon slot="icon" :name='obj.icon'></icon>
        </TabbarItem>
    </Tabbar>
</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      tabs: [{
        name: '首页',
        path: '/home',
        icon: 'home'
      }, {
        name: '领券中心',
        path: '/couponsCenter',
        icon: 'couponsCenter'
      }, {
        name: '万中币',
        path: '/leadingCurrency',
        icon: 'leadingCurrency'
      }, {
        name: '我的',
        path: '/mine',
        icon: 'mine'
      }]
    }
  },
  components: {
    Tabbar, TabbarItem
  },
  created () {
    this.tabs.some((obj, index) => {
      if (this.$route.path === obj.path) {
        this.active = index
        return true
      }
    })
  }
}
</script>

<style lang='less'>
.van-tabbar {
  box-shadow: 0 1px 6px #ccc;
}

</style>
