<template>
  <div ref="wrapper">
    <!-- ref如果绑定在组件上，通过this.$refs.refname拿到的是一个组件对象 -->
    <!-- ref如果绑定在元素上，通过this.$refs.refname拿到的是一个dom对象 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

export default {
  name:'Scroll',
  data(){
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      deault:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    //创建bsrcoll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType:this.probeType,//对监听进行查询 而不是所有scroll组件都处于监听状态
      click:true,//会否可点击
      taps: true,
      pullUpLoad:this.pullUpLoad,//上拉加载 是否上拉监听
      mouseWheel:true,
      observeDOM:true,
      observeImage:true
    })

    //监听滚动位置
    if(this.probeType == 2 || this.probeType == 3) {//只有在发生实质性滚动时才进行侦测
      this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit("scroll", position)//将滚动的位置传到父组件home
      })
    }

    //监听上拉事件
   if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
      console.log("上拉加载");
      this.$emit("pullingUp")//将上拉请求传出

      setTimeout(() => {//请求一次上拉后关闭上拉 以此多次请求上拉事件
        this.finishPullUp()
      }, 2000)
    })
   }
  },
  methods:{
    scrollTo(x, y, time=300) {//将scroll的scrollTo方法进行封装
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log('防抖');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>

<style>

</style>