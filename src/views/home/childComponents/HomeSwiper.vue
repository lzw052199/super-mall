<template>
  <!-- 轮播图 -->
   <swiper v-if="banner.length">
     <!-- 解决有关swiper放入项目中,不滚动,只能显示第一张图片的问题 出现问题的原因:因为swiper提前初始化了，那个时候还没有数据，当数据调出来时已经没用了 网络请求较慢时会出现 -->
     <swiper-item v-for="item in banner" :key="item.acm">
       <a :href="item.link">
         <img :src="item.image" alt="" @load="imageLoad">
       </a>
     </swiper-item>
   </swiper>
</template>

<script>
   // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    props:{
      banner:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false//定义img是否被加载 节流阀
      }
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){//只进行一次操作 避免无效或重复操作 节流
          this.$emit('swiperImageLoad')
          this.isLoad = true
          // console.log(1);
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style>

</style>