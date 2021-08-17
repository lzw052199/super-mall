<template>
  <div>
    <nav-bar>
      
      <template v-slot:left>
        <div @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      
      <template v-slot:center>
        <div class="detail-navbar-center">
          <div v-for="(item ,index) in titles" :key="item.name" 
          class="title-item"
          :class="{active: index === curryIndex}"
          @click="titleClick(index)">
          {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数', '评论','推荐'],
      curryIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.curryIndex = index
    },
    backClick(){
      this.$router.back()
      // this.$router.go(-1)
    }
  }
}
</script>

<style>
  .detail-navbar-center{
    display: flex;
    text-align: center;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .left img{
    vertical-align: middle;
  }
</style>