<template>
    <span class="m-search">
        <slot name="prepend"> </slot>
        <input type="text" v-model="searchText" >
        <slot name="append"> </slot>
    </span>
</template>

<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      searchText: this.value
    }
  },
  watch: {
    searchText () {
      this.$emit('input', this.searchText)
    },
    value (v) {
      this.searchText = v
    }
  }
}
</script>

<style lang='less'>
.m-search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  height: 30px;
  padding: 0 8px;
  border-radius:15px;
  flex-grow:1;
  box-sizing: border-box;
  input{
      width: inherit
  }
}
</style>
