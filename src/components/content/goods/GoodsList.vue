<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.name" :goods-item='item'/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{//从父组建home中拿到对应版块全部数据
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around
  }
</style>