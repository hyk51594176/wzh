<template>
    <div>
      <m-header :title="iframeInfo.title" showBack/>
      <iframe :src="iframeInfo.src" frameborder="no" border="0"  :height="height" width="100%" @load='onload' ref='iframe'></iframe>
    </div>
</template>

<script>
export default {
  name: 'payIframe',
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  },
  computed: {
    iframeInfo () {
      const { payType } = this.$route.params
      if (payType === 'unipay') {
        return {
          title: '银联支付',
          src: './static/uniPay.html'
        }
      } else if (payType === '0001') {
        return {
          title: '支付宝支付',
          src: this.aliPayInfo.payUrl
        }
      }
    },
    uniPayInfo () {
      return this.$store.state.payInfo.uniPayInfo
    },
    aliPayInfo () {
      return this.$store.state.payInfo.aliPayInfo
    }
  },
  methods: {
    onload (e) {
      if (this.$route.params.payType === 'unipay') {
        e.target.contentWindow.postMessage(this.uniPayInfo, '*')
      }
    }
  }
}
</script>

<style scoped>

</style>
