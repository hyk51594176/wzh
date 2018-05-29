<template>
    <div class="consumptionRecords" >
        <m-header title="消费记录" showBack/>
        <div class="page-conner" ref='pageConner'>
            <CellGroup >
                <Cell title="积分消费记录" is-link  to='/cspRecordDetail/积分消费记录'>
                    <img slot="icon" class="iconimg" src="~@/assets/img/score_out.png" alt="">
                </Cell>
                <Cell title="金额消费记录" is-link to='/cspRecordDetail/金额消费记录'>
                    <img slot="icon" class="iconimg" src="~@/assets/img/money_out.png" alt="">
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
  name: 'consumptionRecords',
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
