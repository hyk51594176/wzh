<template>
    <svg ref='barcode' style="width:100%" class="barcode-svg">

    </svg>
</template>
<script>
let JsBarcode = require('jsbarcode')
export default {
  props: {
    option: {
      type: Object,
      default () {
        return {}
      }
    },
    text: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      id: Date.now()
    }
  },
  watch: {
    text (v) {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (!this.text) return
      JsBarcode(this.$refs.barcode, this.text, this.option)
    }
  }
}
</script>
<style>
.barcode-svg{
  width: 100% !important
}
</style>
