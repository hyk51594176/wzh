<template>
    <div class="consumptionRecords" >
        <m-header title="充值记录" showBack/>
        <div class="page-conner" ref='pageConner'>
            <CellGroup >
                <Cell title="积分充值记录" is-link to='/regRecordDetail/积分充值记录'>
                    <img slot="icon" class="iconimg" src="~@/assets/img/score_in.png" alt="">
                </Cell>
                <Cell title="金额充值记录" is-link to='/regRecordDetail/金额充值记录'>
                    <img slot="icon" class="iconimg" src="~@/assets/img/money_in.png" alt="">
                </Cell>
            </CellGroup>
        </div>
    </div>
</template>

<script>
import {
  Cell,
  CellGroup
} from 'vant'
export default {
  name: 'rechargeRecord',
  components: {
    Cell,
    CellGroup
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
}
</style>
