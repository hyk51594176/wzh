<template>
    <div >
        <m-header :title="tempObj.title" showBack/>
        <div  class="page-conner" ref='pageConner'>
            <img :src="tempObj.url||'./static/13/watting.png'" style="width:100%">
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    tempObj () {
      return this.$store.state.template.tempObj
    }
  }
}
</script>

<style>

</style>
