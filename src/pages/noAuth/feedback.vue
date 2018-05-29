<template>
  <div class="consumptionRecords">
    <m-header title="意见反馈" showBack/>
    <div class="page-conner" ref='pageConner'>
      <Field v-model="formData.msg" type="textarea" placeholder="请输入您对万中汇的意见及建议，我们会尽快处理" rows="3" autosize></Field>
      <br>
      <Field v-model="formData.phone" placeholder="请输入手机号"></Field>
      <br>
      <CellGroup>
        <Cell title="请选择广场" is-link :value='formData.type' @click="showSelect=true">
        </Cell>
      </CellGroup>
      <br>
      <br>
      <Button size="large" class="primary loginbtn" @click='submit'>提交</Button>
      <Actionsheet v-model="showSelect">
        <Picker :columns='columns' @cancel='showSelect=false' @confirm='obj=>(formData.type=obj.value)&&(showSelect=false)' show-toolbar></Picker>
      </Actionsheet>
    </div>
  </div>
</template>

<script>
import {
  Cell,
  Field,
  CellGroup,
  Button,
  Actionsheet,
  Picker
} from 'vant'
import {feedBackAdd} from '@/api'
export default {
  name: 'feedback',
  data () {
    return {
      showSelect: false,
      formData: {
        type: '',
        msg: '',
        phone: ''
      },
      columns: [{
        value: '万中广场',
        text: '万中广场'
      }, {
        value: '天元物业',
        text: '天元物业'
      }, {
        value: '万中超市',
        text: '万中超市'
      }, {
        value: '万中泊林酒店',
        text: '万中泊林酒店'
      }, {
        value: '天元地产',
        text: '天元地产'
      }, {
        value: '万中物流',
        text: '万中物流'
      }, {
        value: '大万商贸',
        text: '大万商贸'
      }]
    }
  },
  components: {
    Field,
    Cell,
    CellGroup,
    Button,
    Actionsheet,
    Picker
  },
  methods: {
    submit () {
      if (!this.formData.msg) {
        this.$toast('请填写反馈信息内容')
        return
      }
      if (!this.formData.phone) {
        this.$toast('请填写你的联系电话！')
        return
      }
      if (!this.formData.type) {
        this.$toast('请选择反馈信息类型！')
      }
      feedBackAdd(this.formData).then(res => {
        this.$toast('感谢你的反馈')
        this.$router.back()
      })
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
