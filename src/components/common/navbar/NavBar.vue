<template>
<!-- 顶部导航 -->
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style>
  .nav-bar{
    display: flex;
    /* 标准导航高度 加状态栏为64px */
    height: 44px;
    line-height: 44px;
    text-align: center;

    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left,.right{
    width: 60px;
    /* background-color: red; */
  }
  .center{
    flex: 1;
    /* background-color: yellow; */
  }
</style>