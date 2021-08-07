<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
    <!-- 多有的item都展示一个图片一个文字 -->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    
    <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    path:String,
    activeColor:{
      type:String,
      default:"red"
    }
  },
  computed:{
    isActive(){
      //home -> item1(/home) = true 当前路由的path与点击的path相匹配，一致为true 
      return this.$route.path.indexOf(this.path) !== -1//indexOf()方法值为-1则不匹配 不包含该字符串 这个时候则不处于active状态
    },
    activeStyle(){//动态传递item颜色
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  data(){
    return {
      // isActive:false,
     
    }
  },
  methods:{
    itemClick(){
      console.log("itemClick");
      this.$router.replace(this.path).catch(err => {})//处理点击异常err
    }
  }
}
</script>

<style>
   .tab-bar-item{
    flex: 1;
    text-align: center;
    /* tabbar标准高度 */
    height: 49px;
    font-size: 14px;
  }
 .tab-bar-item img{
   width: 24px;
   height: 24px;
   margin: 3px 0 2px 0;
   vertical-align: middle;
 }
 
</style>