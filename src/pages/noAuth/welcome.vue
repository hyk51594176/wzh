<template>
   <Swipe >
        <SwipeItem v-for="(obj,index) in welcome" :key="index" >
          <img :src="obj.img" style="width:100%;height:100%" >
            <Button size="small" v-if="index===welcome.length-1" class="mbtn" @click="$router.replace('/')">立即体验</Button>
        </SwipeItem>
      </Swipe>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Button
} from 'vant'
import { welcome } from '@/api/service'
export default {
  name: 'welcome',
  data () {
    return {
      welcome
    }
  },
  components: {
    Swipe,
    SwipeItem,
    Button
  }
}
</script>

<style >
.mbtn{
    position: absolute;
    background:rgba(76, 213, 203,1) ;
    color: #ffffff;
    border-radius: 15px;
    width: 90px;
    bottom: 50px;
    left: 50%;
    right: 50%;
    transform: translate(-50%);
}
</style>
