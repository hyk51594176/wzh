<template>
  <div class="consumptionRecords">
    <m-header title="修改个人信息" showBack/>
    <div class="page-conner" ref='pageConner'>
      <CellGroup>
        <Cell title="头像" is-link @click="imgUpdate=true">
          <img :src="userInfo.imageUrl || require('@/assets/img/my-photo1.png')" alt="" style="height:30px;width:30px" class="header-img">
        </Cell>
        <Cell title="昵称" clickable>
          <input type="text" class="customer-input" v-model="userInfo.nickname">
        </Cell>
        <Cell title="性别" clickable is-link @click="(showSelect=true)&&(selecType='sex')" :value='userInfo.sex_text' />
        <Cell title="生日" clickable :value="userInfo.birthday" @click="(showSelect=true)&&(selecType='birthday')" />
        <Cell title="身份证号" clickable>
          <input type="text" class="customer-input" v-model="userInfo.identityCard">
        </Cell>
        <Cell title="学历" clickable is-link @click="(showSelect=true)&&(selecType='education')" :value='userInfo.education_text' />
        <Cell title="籍贯" clickable>
          <input type="text" class="customer-input" v-model="userInfo.districtCn">
        </Cell>
        <Cell title="详细地址" clickable>
          <input type="text" class="customer-input" v-model="userInfo.detailAddress">
        </Cell>
        <Cell title="子女" clickable is-link @click="(showSelect=true)&&(selecType='hasChild')" :value='userInfo.hasChild_text' />
      </CellGroup>
      <br>
      <br>
      <br>
      <div style="text-align:center">
        <Button size="large" class="cust-btn primary" @click="submit">确认</Button>
      </div>
    </div>
    <Actionsheet v-model="showSelect">
      <DatetimePicker v-if="selecType==='birthday'" title='生日' type='date' @cancel='cancel' @confirm='confirm'></DatetimePicker>
      <Picker v-else :columns='selectObject.columns' @cancel='cancel' @confirm='confirm' :title="selectObject.title" show-toolbar></Picker>
    </Actionsheet>
    <Actionsheet cancel-text="取消" :actions='actions' v-model="imgUpdate"></Actionsheet>
  </div>
</template>
<script>
// imageUrl |头像链接地址
// nickname | 昵称
// sex | 性别  1男 0女
// identityCard | 身份证
// birthday | 生日
// education | 学历
// provinceId | 省ID
// cityId | 市ID
// countyId | 区县ID
// districtCn | 省市区全名
// detailAddress | 详细地址
// username      | 用户名
// hasChild      |是否有孩子 1有 0没有
import {
  Button,
  Cell,
  CellGroup,
  Picker,
  Actionsheet,
  DatetimePicker
} from 'vant'
import {
  dateFormat
} from '@/util'
import {
  userInfoEdit
} from '@/api'
import {
  baseUrl
} from '@/config'
import {
  USER_INFO_UPDATEIMAGE
} from '@/api/types'
let wating = null
// userInfoUpdateImage
export default {
  name: 'personInfo',
  data () {
    return {
      userInfo: {},
      sex: [{
        text: '男',
        value: 1
      }, {
        text: '女',
        value: 0
      }],
      showSelect: false,
      selectData: {
        sex: {
          columns: [{
            text: '男',
            value: 1
          }, {
            text: '女',
            value: 0
          }],
          title: '性别'
        },
        education: {
          title: '学历',
          columns: [{
            text: '高中',
            value: 60
          }, {
            text: '大专',
            value: 30
          }, {
            text: '本科',
            value: 20
          }, {
            text: '研究生',
            value: 10
          }, {
            text: '硕士',
            value: 14
          }, {
            text: '博士',
            value: 11
          }, {
            text: '其他',
            value: 90
          }]
        },
        hasChild: {
          title: '子女',
          columns: [{
            text: '有',
            value: 1
          }, {
            text: '无',
            value: 0
          }]
        }
      },
      selecType: 'sex',
      imgUpdate: false,
      actions: [{
        name: '相机拍照',
        callback: this.fromcCarmer
      },
      {
        name: '从相册选取',
        callback: this.fromPhotos
      }
      ]
    }
  },
  watch: {
    oldUserInfo () {
      this.dataInit()
    }
  },
  created () {
    this.dataInit()
    console.log(process.env)
  },
  computed: {
    selectObject () {
      return this.selectData[this.selecType]
    },
    oldUserInfo () {
      return this.$store.state.userInfo
    }
  },
  components: {
    Button,
    Cell,
    CellGroup,
    Picker,
    Actionsheet,
    DatetimePicker
  },
  methods: {
    dataInit () {
      const {
        headPortrait,
        sex,
        education,
        hasChild
      } = this.$store.state.userInfo || {}
      let educationObj = this.selectData.education.columns.find(obj => obj.value === Number(education)) || {}
      this.userInfo = {
        ...this.$store.state.userInfo,
        imageUrl: headPortrait,
        sex_text: sex === '0' ? '女' : '男',
        education_text: educationObj.text,
        hasChild_text: hasChild === '0' ? '无' : '有'
      }
    },
    submit () {
      let {
        imageUrl,
        ...others
      } = this.userInfo
      userInfoEdit({ ...others,
        imageUrl: imageUrl.split('?')[0]
      }, true).then(res => {
        this.$store.dispatch('userInfo')
      })
    },
    cancel () {
      this.showSelect = false
    },
    fromcCarmer () {
      this.imgUpdate = false
      if (!window.plus) this.$toast('当前环境不支持头像上传，请下载app')
      let cmr = window.plus.camera.getCamera()
      let res = cmr.supportedImageResolutions[0]
      let fmt = cmr.supportedImageFormats[0]
      cmr.captureImage((p) => {
        wating = window.plus.nativeUI.showWaiting('上传中...')
        this.uploadfile(window.plus.io.convertLocalFileSystemURL(p))
      }, error => {
        wating && wating.close()
        console.log(error)
      }, {
        resolution: res,
        format: fmt
      })
    },
    fromPhotos () {
      this.imgUpdate = false
      if (!window.plus) this.$toast('当前环境不支持头像上传，请下载app')
      window.plus.gallery.pick(path => {
        wating = window.plus.nativeUI.showWaiting('上传中...')
        this.uploadfile(path)
      }, (e) => {
        wating && wating.close()
      }, {
        filter: 'image',
        multiple: false
      })
    },
    uploadfile (file) {
      if (!file.startsWith('file://')) file = 'file://' + file
      let defaultUlr = baseUrl
      if (process.env.NODE_ENV === 'development') defaultUlr = 'http://api.vankingroup.com:8090' + baseUrl
      var task = window.plus.uploader.createUpload(defaultUlr + USER_INFO_UPDATEIMAGE, {
        method: 'post',
        blocksize: 204800,
        priority: 100
      },
      (t, status) => {
        wating && wating.close()
        if (status === 200) {
          var {
            data = {}, code, message
          } = JSON.parse(t.responseText)
          if (code === 'OK') {
            this.userInfo.imageUrl = data.imageUrl + `?${Date.now()}`
          }
          message && this.$toast(message)
        }
      },
      (e) => {
        wating && wating.close()
      })
      task.addFile(file, {
        key: 'file'
      })
      task.addData('phone', this.$store.state.apiHeader.phone)
      task.start()
    },
    confirm (value) {
      if (this.selecType === 'birthday') {
        this.userInfo.birthday = dateFormat(value, 'yyyy-MM-dd')
      } else {
        this.userInfo[this.selecType] = value.value
        this.userInfo[this.selecType + '_text'] = value.text
      }
      this.cancel()
    }
  }
}
</script>

<style lang='less'>
.consumptionRecords {
  .header-img {
    border-radius: 50px;
    height: 50px;
    width: 50px;
  }
  .iconimg {
    height: 20px;
    margin-right: 8px;
    vertical-align: middle !important;
  }
  .customer-input {
    text-align: right;
  }
  .cust-btn {
    color: #ffffff;
    width: 80%;
  }
}
</style>
