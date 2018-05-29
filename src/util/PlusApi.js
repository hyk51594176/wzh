import { defaultMsg } from '@/config'
class PlusApi {
  constructor (Vue, store) {
    this.store = store
    document.addEventListener('plusready', e => {
      this.init()
      window.plus.nativeUI.toast.loading = function ({ message, ...others }) {
        window.plus.nativeUI.showWaiting.clear = window.plus.nativeUI.showWaiting.close
        let obj = window.plus.nativeUI.showWaiting(message, others)
        obj.clear = obj.close
        return obj
      }
      this.store.commit('updatePushId', window.plus.push.getClientInfo().clientid)
      Vue.prototype.$toast = window.plus.nativeUI.toast
    })
  }
  backButton (callback) {
    document.addEventListener('plusready', e => {
      window.plus.key.addEventListener('backbutton', callback.bind(null, window.plus.runtime.quit), false)
    })
  }
  init () {
    this.updateShares()
    window.plus.runtime.getProperty(window.plus.runtime.appid, (inf) => {
      this.store.commit('updateVersion', inf.version)
    })
    document.addEventListener('resume', e => {
      if (this.store.state.payInfo.payType) {
        this.store.dispatch('payInfoBingDingInfo')
        this.store.commit('updatePayType', null)
      }
      window.plus.geolocation.getCurrentPosition(p => {
        this.store.commit('updatePosition', p.coords)
        this.store.dispatch('shopGetAreaShop')
      }, err => {
        console.log(JSON.stringify(err))
      })
    }, false)
  }
  updateShares () {
    window.plus.share.getServices((services) => {
      this.shares = {}
      this.shareBts = []
      services.forEach(obj => {
        this.shares[obj.id] = obj
        if (obj.id === 'weixin') {
          this.shareBts.push({ title: '微信朋友圈', service: obj, x: 'WXSceneTimeline' })
          this.shareBts.push({ title: '微信好友', service: obj, x: 'WXSceneSession' })
        } else {
          this.shareBts.push({ title: obj.description, service: obj })
        }
      })
    })
  }
  shareHref (msg = defaultMsg) {
    if (!window.plus) {
      return '当前环境不支持分享操作，请下载App'
    }
    let shareBts = this.shareBts
    if (shareBts.length > 0) {
      window.plus.nativeUI.actionSheet({
        cancel: '取消',
        buttons: shareBts
      }, (e) => {
        if (e.index > 0) this.shareAction(shareBts[e.index - 1].service, msg)
      })
    } else {
      window.plus.nativeUI.toast('当前环境无法支持分享链接操作!')
    }
  }
  shareAction (sb, msg) {
    if (sb) {
      msg.extra = {
        scene: sb.x || ''
      }
      if (sb.authenticated) {
        this.shareMessage(sb, msg)
      } else {
        sb.authorize(e => {
          this.shareMessage(sb, msg)
        }, (e) => {
          window.plus.nativeUI.toast('认证授权失败：' + e.code + ' - ' + e.message)
        })
      }
    } else {
      window.plus.nativeUI.toast('获取分享服务失败')
    }
  }
  shareMessage (sb, msg) {
    sb.send(msg, e => {
      window.plus.nativeUI.toast('分享到' + e.description + '成功！ ')
    }, (e) => {
      window.plus.nativeUI.toast('分享失败：' + e.code + ' - ' + e.message)
    })
  }
  download (url) {
    if (!url) return
    const task = window.plus.downloader.createDownload(url, {
      filename: '_doc/update/'
    }, (d, status) => {
      if (status === 200) {
        console.error(d.filename)
        console.error('下载wgt成功：' + d.filename)
        this.installWgt(d.filename) // 安装wgt包
      } else {
        window.plus.nativeUI.toast('下载更新包失败！')
      }
    })
    task.addEventListener('statechanged', ({filename, downloadedSize, totalSize}, status) => {
      if (status !== 200) return
      if (downloadedSize === totalSize) this.store.commit('updateDownloader', null)
      else this.store.commit('updateDownloader', {filename, downloadedSize, totalSize, status})
    }, false)
    task.start()
  }
  // // 更新应用资源
  installWgt (path) {
    window.plus.nativeUI.showWaiting('安装更新包...')
    window.plus.runtime.install(path, {}, () => {
      window.plus.nativeUI.closeWaiting()
      console.error('安装wgt文件成功！')
      window.plus.io.resolveLocalFileSystemURL(path, fileEntry => {
        fileEntry.remove()
        window.plus.nativeUI.alert('版本更新完成,重启应用程序', () => window.plus.runtime.restart())
      })
    }, e => {
      window.plus.io.resolveLocalFileSystemURL(path, fileEntry => fileEntry.remove())
      window.alert(JSON.stringify(e))
      window.plus.nativeUI.closeWaiting()
      console.error(JSON.stringify(e))
    })
  }
}

export default {
  install (Vue, store) {
    Vue.prototype.$plus = new PlusApi(Vue, store)
  }
}
