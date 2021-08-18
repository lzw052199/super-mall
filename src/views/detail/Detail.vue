<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="content" 
            ref="scroll"
            :probe-type="3" 
            :pull-up-load='true'
            @scroll="detailScroll">

      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad='imageLoad'/>
      <detail-param-info :param-info="paramInfo"/>
     
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from  './childComps/DetailSwiper.vue'
  import DetailBaseInfo from  "./childComps/DetailBaseInfo.vue"
  import DetailShopInfo from './childComps/DetailShopInfo.vue' 
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
  import DetailParamInfo from "./childComps/DetailParamInfo.vue"

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

export default {
  name:'Detail',
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{}
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,

    Scroll,

  },
  created(){
    //保存商品传入的iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // console.log(res.result.itemInfo.topImages);
      //获取顶部轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情信息
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })

  },
  methods:{
    // detailSwiperImageLoad(){
    //   this.$refs.Scroll
    // }
    detailScroll(position){

    },
    imageLoad(){//监听蹄片加载进行刷新
      this.$refs.scroll.refresh()
    }
  },
  update(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  /* .content{
    height: calc(100vh - 44px);
    overflow: hidden;
  } */
  .content{
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>