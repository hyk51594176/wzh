<template>
    <div class="consumptionRecords">
        <m-header :title="$route.params.title" showBack/>
        <div class="page-conner" ref='pageConner'>
            <CellGroup >
                  <Cell :title="obj.misc_txt" :label="obj.add_dt|date" :value='obj.amount*0.01|currency("￥")'  v-for="obj in dataList" :key="obj.trans_no">

                </Cell>
            </CellGroup>
            <nodata v-if="!dataList.length"/>
        </div>
    </div>
</template>

<script>
import {
  Cell,
  CellGroup
} from 'vant'
import {
  dateFormat
} from '@/util'
import {
  payInfoPointRecordInfo,
  payInfoMoneyRecordInfo
} from '@/api'
export default {
  name: 'regRecordDetail',
  data () {
    let date = new Date()
    return {
      dataList: [],
      query: {
        startDate: dateFormat(new Date(date.getTime() - 1000 * 60 * 60 * 24 * 30)),
        endDate: dateFormat(date),
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  computed: {

    bingDingInfo () {
      return this.$store.state.payInfo.bingDingInfo
    }
  },
  components: {
    Cell,
    CellGroup
  },
  watch: {
    bingDingInfo (n, o) {
      if (!o && n) this.dataInit()
    }
  },
  created () {
    if (this.bingDingInfo) this.dataInit()
  },
  methods: {
    dataInit () {
      const params = {
        ...this.query,
        cardId: this.bingDingInfo.cardId,
        password: 123456
      }
      switch (this.$route.params.title) {
        case '金额充值记录':
          payInfoMoneyRecordInfo(params).then(res => {
            this.dataList = res.data
          })
          break
        case '积分充值记录':
          payInfoPointRecordInfo(params).then(res => {
            this.dataList = res.data
          })
          break
        default:
      }
    }
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
