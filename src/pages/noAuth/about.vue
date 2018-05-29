<template>
    <div class="about" >
        <m-header title="关于万中汇" showBack/>
        <div class="page-conner" ref='pageConner' style="background:#ffffff">
        <img src="~@/assets/img/new_banner.png" alt="" style="width:100%">
        <CellGroup>
          <Cell class="custom">
            <div slot="title" style="width: 100%;text-align: center">{{version}}</div>
          </Cell>
            <Cell title="应用介绍" is-link to='/introduce'/>

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
  name: 'about',
  components: {
    Cell,
    CellGroup
  },
  computed: {
    version () {
      return 'V' + this.$store.state.version
    }
  }
}
</script>

<style lang='less'>
.about {
  .iconimg {
    height: 20px;
    margin-right: 8px;
    vertical-align: middle !important;
  }
  .custom{
    .van-cell__title{
      width: 100%;
      text-align: center
    }
  }
}
</style>
