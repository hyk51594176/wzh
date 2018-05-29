<template>
<div class="nodata" >
    {{message}}
</div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '暂无数据'
    }
  }

}
</script>

<style  lang='less'>
 .nodata{
     text-align:center;
     line-height:100px;
     color:#728089;
    height: 320px;
 }

</style>
