<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>
            <h3>购物街</h3>
      </template>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
                      ref="tabControl1" 
                      @tabClick="tabClick" 
                      class="fade-tab-control" v-show="isTabFixed"/>        

    <scroll class="content" ref="scroll" 
                            :probe-type="3" 
                            @scroll="contentScroll" 
                            :pull-up-load='true' @pullingUp='loadMore'>

        <home-swiper :banner="banner" @swiperImageLoad='swiperImageLoad'/>

        <recommend-view :recommend='recommend'></recommend-view>

        <feature-view></feature-view>

        <tab-control :titles="['流行', '新款', '精选']" 
                      ref="tabControl2" 
                      @tabClick="tabClick"></tab-control>

        <goods-list :goods="showGoods"></goods-list>

        
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- 监听当前组件需要使用.native修饰符 -->

  

  </div>
</template>
<script>
  import HomeSwiper from './childComponents/HomeSwiper.vue'
  import RecommendView from './childComponents/RecommendView.vue'
  import FeatureView from './childComponents/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import {GoodsList, GoodsListItem} from 'components/content/goods'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  import {debounce} from 'common/utils'

 
  export default {
    name:'Home',
    components:{
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,

      GoodsList,
      GoodsListItem
    },
    data(){
      return {
        //存放请求数据
        banner:[],
        recommend:[],
        goods:{//上拉加载数据结构
          pop:{page: 0, list: []},
          new:{page: 0, list: []},
          sell:{page: 0, list: []}
        },
        curryType:'pop',
        isShowBackTop:false,
        TabControlOffSetTop:0,
        isTabFixed:false
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.curryType].list
      }
    },
    created () {
      //1、请求多个数据
      this.getHomeMultidata()// this.getHomeMultidata()调用的是methods中的方法

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  
    },
    destroyed(){
        console.log('销毁');
      },
    mounted(){
      //监听item中图片是否加载完成
      const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 20)
      this.$bus.$on('itemImageLoad', () => {
        // console.log(this.$bus);
       refresh()//监听图片的加载，每加载一张都重新刷新可滚动高度
        // console.log('----');
      })

      //获取TabControlOffSetTop
      // this.TabControlOffSetTop = this.$refs.TabControl.$el.offsetTop
    },
    methods:{
      // 事件监听相关方法

      tabClick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.curryType = 'pop'
            break
          case 1:
            this.curryType = 'new'
            break
          case 2:
            this.curryType = 'sell'
            break
        }
        this.$refs.tabControl1.curryIndex = index //当前点击取到对应的下标
        this.$refs.tabControl2.curryIndex = index
        console.log(this.$refs.tabControl1.curryIndex);
      },
      backClick(){
        // console.log('backtop');
        this.$refs.scroll.scrollTo(0, 0, 500)//调用子组件scroll的scrollTo方法返回顶部
      },
      contentScroll(position){
        // console.log(position);
        // 1.决定tabFixed是否显示 tabControl是否吸顶
        this.isTabFixed = -position.y > this.TabControlOffSetTop//滚动距离大于距顶时显示该隐藏组件
        // console.log(this.isTabFixed);

        //判断backtop是否显示
        this.isShowBackTop = -(position.y) > 1000

        //决定tabcontrol
      },
      loadMore(){//上拉加载
        // console.log('上拉加载');
        this.getHomeGoods(this.curryType)

        // this.$refs.scroll.refresh()
      },
      swiperImageLoad(){//$el 拿到组件的元素
        console.log(this.$refs.tabControl2.$el.offsetTop);
        // console.log(this.$refs.tabControl.$el);
        this.TabControlOffSetTop = this.$refs.tabControl2.$el.offsetTop
        
      },
      

      // 网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {//getHomeMultidata()调用的是home.js中的方法
          // console.log(res);
          // this.result = res
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHomeGoods(type){//商品数据请求封装
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data.list);
          this.goods[type].list.push(...res.data.list)//存储多个list数组 数组合并
          // console.log(this.goods[type].list);
          this.goods[type].page += 1
        })
      }

    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
  }
  .icon-fontsize{
    width: 20px;
    height: 20px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 只适用于原生滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* .tab-control{ */
    /* position: sticky; */
    /* 一开始是static 当前元素达到top值时，将position变为fixed  移动端适配 浏览器端会有兼容问题*/
    /* top: 44px;
    z-index: 9; */
  /* } */
  .fade-tab-control{
    position: relative;
    z-index: 9;
  }
  /* .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>