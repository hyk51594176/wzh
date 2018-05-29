<template>
    <div class="consumptionRecords" >
        <m-header title="修改密码" showBack/>
        <div class="page-conner" ref='pageConner'>
            <CellGroup>
                <Cell title="修改登录密码" is-link to='/changePass/修改登录密码'>
                    <img slot="icon" class="iconimg" src="~@/assets/img/login_pass.png" alt="">
                </Cell>
                <Cell title="修改支付密码" is-link to='/changePass/修改支付密码'>
                    <img slot="icon" class="iconimg" src="~@/assets/img/pay_pass.png" alt="">
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
  name: 'securityCenter',
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
