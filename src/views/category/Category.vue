<template>
  <div class="wrapper" ref="aaa">
    <ul>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
      <li>列表￥</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      scroll:null
    }
  },
  //组建创建后调用
  mounted(){
    // console.log('mounted');
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType:3,
      pullUpLoad:true//上拉加载更多
    })

    this.scroll.on('scroll', (position) => {
      // console.log(position);
    })

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载');
    })
  }
}
</script>

<style scoped>
  div.wrapper{
    height: 150px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>