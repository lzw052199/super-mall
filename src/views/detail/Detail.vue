<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="wrapper" 
            ref="scroll"
            :probe-type="3" 
            
            @scroll="detailScroll">
      <div>
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <!-- <detail-goods-info :detail-info="detailInfo"></detail-goods-info> -->
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :commentInfo='commentInfo'/>
      <goods-list :goods='recommend' />
    </div>
    </scroll>
  </div>
</template>
s
<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from  './childComps/DetailSwiper.vue'
  import DetailBaseInfo from  "./childComps/DetailBaseInfo.vue"
  import DetailShopInfo from './childComps/DetailShopInfo.vue' 
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
  import DetailParamInfo from "./childComps/DetailParamInfo.vue"
  import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"

  import GoodsList from "components/content/goods/GoodsList.vue"

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

  import {debounce} from 'common/utils'
  import {refreshMixin} from 'common/mixin'
export default {
  name:'Detail',
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],

      isReload:false
    }
  },
  mixins:[refreshMixin],
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,

    Scroll,
    GoodsList,

  },
  created(){
    //保存商品传入的iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // console.log(res.result.itemInfo.topImages);
      //获取顶部轮播数据
      const data = res.result
      // console.log(data);
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情信息
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //取出评论信息
      if(data.rate.cRate !== 0){
        //取出一条评论
        this.commentInfo = data.rate.list[0]
      }
    }),

    //请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommend = res.data.list
    })

  },
  mounted(){
    // console.log(0);
    // 监听item中图片是否加载完成
    // const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 100)
    // this.$bus.$on('detailItemImageLoad', () => {
    //   // console.log(this.$bus);
    //   refresh()//监听图片的加载，每加载一张都重新刷新可滚动s高度
    //   console.log('----');
    // })
  },
  methods:{
    // detailSwiperImageLoad(){
    //   this.$refs.Scroll
    // }
    detailScroll(position){
      // console.log(position);
      // console.log($event);
      if(position.y > 30)
      this.$router.go(0)
    },
    // imageLoad(){//监听蹄片加载进行刷新
    //   this.$refs.scroll.refresh()
    //   // console.log(1);
    // }
  },
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
  .wrapper{
    
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>