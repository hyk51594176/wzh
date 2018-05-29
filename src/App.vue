<template>
  <div>
    <transition :name="className">
      <keep-alive :include='$store.state.keepRooters'>
        <router-view class="mapp" :style="{height:this.$store.state.windowSize.height+'px'}" />
        <van-loading type="spinner" color="black" v-show="$store.state.loading" />
      </keep-alive>
    </transition>
    <van-dialog v-model="dialogShow" :show-confirm-button='false' v-if='downloader' title='版本更新中'>
      <div class="mprogress">

        <Progress :percentage="percentage" color='#4cd5cb' :pivot-text="percentage+'%'"/>
        <br>
        <span>
          {{(downloader.downloadedSize/(1024*1024)).toFixed(2)}}MB / {{(downloader.totalSize/(1024*1024)).toFixed(2)}}MB
        </span>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  checkUpdate
} from '@/api'
import { Progress } from 'vant'
let toast = null
let backButtonPress = null
export default {
  name: 'app',
  computed: {
    className () {
      return this.$store.state.direction === 'back' ? 'pop-out' : 'pop-in'
    },
    loading () {
      return this.$store.state.loading
    },
    windowSize () {
      return this.$store.state.windowSize
    },
    tempObj () {
      return this.$store.state.template.tempObj
    },
    version () {
      return this.$store.state.version
    },
    downloader () {
      return this.$store.state.downloader
    },
    dialogShow () {
      return !!this.downloader
    },
    percentage () {
      if (!this.downloader) return 0
      return parseInt((this.downloader.downloadedSize / this.downloader.totalSize) * 100)
    }
  },
  watch: {
    loading (v) {
      if (v) {
        toast = this.$toast.loading({
          message: '加载中...'
        })
      } else {
        toast.clear()
      }
    },
    tempObj (v) {
      if (v && this.$route.path !== '/template') {
        this.$router.push('/template')
      }
    },
    version (v) {
      if (v) this.checkUpdate()
    }
  },
  created () {
    let windowSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
    this.$store.commit('updateWindowSize', windowSize)
    if (this.$store.state.apiHeader) this.$store.dispatch('userInfo')
    this.$store.dispatch('shopGetAreaShop')
    this.$plus.backButton(next => {
      if (this.downloader) return
      if (this.$route.meta.exit) {
        if (!backButtonPress) {
          backButtonPress = new Date().getTime()
          this.$toast('再按一次退出应用')
          setTimeout(_ => {
            backButtonPress = null
          }, 2000)
        } else {
          if (new Date().getTime() - backButtonPress < 2000) {
            next()
          }
        }
      } else {
        this.$router.back()
      }
    })
  },
  components: {
    Progress
  },
  methods: {
    checkUpdate () {
      checkUpdate().then(res => {
        const localVersion = this.version.replace(/\./g, '')
        const KEY = window.plus.os.name
        const {
          version,
          downUrl,
          updateNote,
          wgt
        } = res[KEY]

        if (version.replace(/\./g, '') - localVersion > 0) {
          // 全量
          if (updateNote) {
            this.$dialog.confirm({
              title: '更新提示',
              message: updateNote
            }).then(res => {
              this.$plus.download(downUrl)
            })
          } else {
            this.$plus.download(downUrl)
          }
        } else if (wgt.version.replace(/\./g, '') - localVersion > 0) {
          // 增量
          if (wgt.updateNote) {
            this.$dialog.confirm({
              title: '更新提示',
              message: wgt.updateNote
            }).then(res => {
              this.$plus.download(wgt.downUrl)
            })
          } else {
            this.$plus.download(wgt.downUrl)
          }
        }
      })
    }
  }
}
</script>
<style>
  .mprogress{
    height: 100px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    justify-content: center;
    padding: 0 8PX
  }
</style>
