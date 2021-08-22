<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
    <!-- @load=''fun' vue监听图片加载  原生监听 img.onload = FUN -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
props:{
  goodsItem:{//传递单个商品对象
    type:Object,
    default(){
      return {}
    }
  }
},
computed:{
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
methods:{
  imageLoad(){
    // this.$bus.$emit('itemImageLoad')//事件总线发射一个事件
    if(this.$route.path.indexOf('/home') !== -1){
      this.$bus.$emit('homeItemImageLoad')//事件总线发射一个事件
    }else if(this.$route.path.indexOf('/detail') !== -1){
      this.$bus.$emit('detailItemImageLoad')//事件总线发射一个事件
    }
  },
  itemClick(){
    console.log('跳转详情页');
    this.$router.push('/detail/' + this.goodsItem.iid)
  }
}
}
</script>

<style>
   .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>