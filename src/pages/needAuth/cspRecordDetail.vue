<template>
    <div class="consumptionRecords">
        <m-header :title="$route.params.title" showBack/>
        <div class="page-conner" ref='pageConner'>
            <CellGroup>

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
  payInfoMoneyConsumeInfo,
  payInfoPointSconsumeInfo
} from '@/api'
export default {
  name: 'cspRecordDetail',
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
    cardInfo () {
      return this.$store.state.payInfo.cardInfo
    },
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
        case '金额消费记录':
          payInfoMoneyConsumeInfo(params).then(res => {
          })
          break
        case '积分消费记录':
          payInfoPointSconsumeInfo(params).then(res => {
          })
          break
        default:
          Promise.reject(new Error())
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
