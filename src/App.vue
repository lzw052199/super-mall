<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <!-- exclude需要在组件处配置name -->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="tabbar" v-if="this.$route.meta.show"/>
  </div>
</template>

<script>
   import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";

/* #app{
  padding-bottom: 49px;
}
.tabbar{
  z-index: 10;
} */
</style>
