<template>
    <div class="consumptionRecords">
        <m-header title="电话客服" showBack/>
        <div class="page-conner" ref='pageConner'>
            <CellGroup>
                <Cell :title="obj.name" v-for="obj in dataList" :key="obj.name" >
                    <a :href="'tel:'+obj.tel" style="color:#333">{{obj.tel}}</a>
                    <icon slot="icon" name='moble' style="width:15px;padding-right:8px"/>
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
  name: 'telService',
  data () {
    return {
      dataList: [{
        name: '万中广场博兴店',
        tel: '0543-5034666'
      }, {
        name: '万中广场滨州店',
        tel: '0543-5087999'
      }, {
        name: '天元地产',
        tel: '0543-2122009'
      }, {
        name: '万中泊林酒店',
        tel: '0543-2289999'
      }, {
        name: '天元物业',
        tel: '0543-2267440'
      }, {
        name: '万中物流',
        tel: '0543-2122388'
      }, {
        name: '大万商贸',
        tel: '0543-2122388'
      } ]
    }
  },
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
