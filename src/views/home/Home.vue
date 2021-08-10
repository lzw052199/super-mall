<template>
  <div>
   <nav-bar class="home-nav">
     <template v-slot:center>
          <h3>购物街</h3>
     </template>
   </nav-bar>
   <home-swiper :banner="banner"></home-swiper>

  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComponents/HomeSwiper.vue'

  import {getHomeMultidata} from 'network/home'
 

  export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper
    },
    data(){
      return {
        //存放请求数据
        banner:[],
        recommend:[]
      }
    },
    created () {
      //1、请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result = res
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    }
  }
</script>

<style>
  .icon-fontsize{
    width: 20px;
    height: 20px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>