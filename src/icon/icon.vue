<template>

  <svg class="svg-icon" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="iconName"></use>

  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      if (this.name.startsWith('icon')) return `#${this.name}`
      return `#icon-${this.name}`
    }
  }
}
</script>
<style  >
.svg-icon {
  width: 25px;
  height: 25px;
  fill: currentColor;
  overflow: hidden;
  font-size:15px;
  cursor: pointer;
  vertical-align: middle;
}
</style>
