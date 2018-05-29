<template>
  <div class="shop">
    <m-header title="选择店铺" showBack/>
    <CellGroup>
      <Cell :title="obj.shopname" @click="setShopCode(obj.shopcode)" is-link clickable v-for="obj in shopList" :key="obj.shopcode" :value='getValue(obj.distance)'>
        <icon name='location' class="primary-color locaiton" v-if="shopcode===obj.shopcode" slot="icon"></icon>
      </Cell>
    </CellGroup>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup
} from 'vant'
export default {
  name: 'shop',
  computed: {
    shopList () {
      return this.$store.state.shopList
    },
    shopcode () {
      return this.$store.state.shopcode
    }
  },
  components: {
    Cell,
    CellGroup
  },
  methods: {
    getValue (num) {
      return (num / 1000).toFixed(2) + 'lm'
    },
    setShopCode (code) {
      this.$store.dispatch('setShopCode', code)
      // this.$router.back()
    }
  }
}
</script>

<style lang='less'>
  .shop {
    .locaiton {
      width: 20px;
      padding-right: 5px;
    }
  }
</style>
