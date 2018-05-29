<template>
  <header class="header">
    <div slot="left" class="header-left">
      <slot name="right">
        <icon @click="handleBack" name='back' v-if="showBack"></icon>
        <!-- <i @click="handleBack" class="cubeic-back" v-if="showBack"></i> -->
      </slot>
    </div>
    <slot name="title">
      <h3>{{title||$route.meta.title}}</h3>
    </slot>
    <div slot="right" class="header-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    back: Function,
    title: String,
    showBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBack () {
      if (this.back) {
        this.back()
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    z-index: 90;
    padding: 0 8px;
    box-sizing: border-box;
    margin-bottom: 3px;
    background-color: #ffffff;
    color: black;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    width: 100%;
    .header-left,
    .header-right {
      min-width: 50px;
      line-height: 100%;
      .svg-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
