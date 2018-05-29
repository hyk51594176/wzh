<template>
    <div class="coupons-center">
        <m-header title="领券中心" />
        <div class="home page-conner"  ref='pageConner'>
            <Tabs :active="active" :swipeable='true' >
                <Tab v-for="tab in tabs" :title="tab" :key="tab">
                    <ul class="tab-item" v-for="obj in coupCenter" :key="obj.img">
                        <li :src="obj.img" @click="$store.dispatch('updatedTempObj',obj)">
                            <img :src="obj.img" style="width:100%"/>
                        </li>

                    </ul>
                </Tab>
            </Tabs>

        </div>
    </div>
</template>

<script>
import {
  Tab,
  Tabs,
  Button
} from 'vant'
import {coupCenter} from '@/api/service'
export default {
  data () {
    return {
      active: 0,
      coupCenter,
      tabs: ['日用百货', '食品饮料', '酒店餐饮', '社区服务', '母婴用品']
    }
  },
  components: {
    Tab,
    Tabs,
    Button
  }
}
</script>

<style lang='less'>
.coupons-center {
  .tab-item {
    margin-top: 9px;
    li {
    }
    .tab-item-top {
      height: 135px;
      border-bottom: 2px dashed #dfdfdf;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      position: relative;
      background: #ffffff;
      img {
        height: 135px;
        width: 100%;
      }
      .top-btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
        // height: 25px;
        background: #00c9b8;
        border-radius: 15px;
        padding: 1px 18px;
        color: #e9fbf9;
        border: none;
      }
    }
    .tab-item-bottom {
      height: 45px;
      line-height: 45px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      background: #ffffff;
      padding: 0 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .good-type {
        border: 1px solid #39d4c7;
        color: #39d4c7;
        padding: 5px;
        border-radius: 20px;
        height: 25px;
        line-height: 25px;
        padding: 0 5px;
        font-size: 12px;
      }
      .good-count {
        color: #737373;
        display: flex;
        align-items: center;
      }
    }
  }
  .van-tab__pane {
    padding: 0 15px;
  }
}
</style>
