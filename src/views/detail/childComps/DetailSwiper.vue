<template>
    <swiper class="swiper-detail" v-if="topImages.length">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="" @load="imageLoad">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'DetailSwipe',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
    
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit("detailSwiperImageLoad")
      }
      this.isLoad = true
    }
  }
}
</script>

<style scoped>
  .swiper-detail{
    height: 300px;
    overflow: hidden;
  }
  
</style>