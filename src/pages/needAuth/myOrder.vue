<template>
    <div class="consumptionRecords" >
        <m-header title="我的订单" showBack/>
     <div class="page-conner" ref='pageConner'>
            <Tabs :active="active" :swipeable='true'>
                <Tab title='待付款'>
                    <div class="collection" :style="{height:$store.state.windowSize.height-90+'px'}">
                        <p>
                            现在还没有订单，快去下单吧~
                        </p>
                    </div>
                </Tab>
                <Tab title='已付款'>
                    <div class="collection" :style="{height:$store.state.windowSize.height-90+'px'}">
                        <p>
                             现在还没有订单，快去下单吧~
                        </p>
                    </div>
                </Tab>
                <Tab title='已签收'>
                    <div class="collection" :style="{height:$store.state.windowSize.height-90+'px'}">
                        <p>
                             现在还没有订单，快去下单吧~
                        </p>
                    </div>
                </Tab>
            </Tabs>
        </div>
    </div>
</template>

<script>
import {
  Tab,
  Tabs
} from 'vant'
export default {
  name: 'myOrder',
  data () {
    return {
      active: 0
    }
  },
  components: {
    Tab,
    Tabs
  }
}
</script>

<style lang='less'>
    .consumptionRecords {
        .iconimg {
            height: 20px;
            margin-right: 8px;
            vertical-align: middle !important;
        }
        .collection {
            background: #ffffff
        }
    }
</style>
