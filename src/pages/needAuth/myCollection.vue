<template>
    <div class="consumptionRecords">
        <m-header title="我的收藏" showBack/>
        <div class="page-conner" ref='pageConner'>
            <Tabs :active="active" :swipeable='true'>
                <Tab title='活动'>
                    <div class="collection" :style="{height:$store.state.windowSize.height-90+'px'}">
                        <p>
                            现在还没有活动收藏哟，快去逛逛吧~
                        </p>
                    </div>
                </Tab>
                <Tab title='品牌'>
                    <div class="collection" :style="{height:$store.state.windowSize.height-90+'px'}">
                        <p>
                            现在还没有品牌收藏哟，快去逛逛吧~
                        </p>
                    </div>
                </Tab>
                <Tab title='商品'>
                    <div class="collection" :style="{height:$store.state.windowSize.height-90+'px'}">
                        <p>
                            现在还没有商品收藏哟，快去逛逛吧~
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
  name: 'myCollection',
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
