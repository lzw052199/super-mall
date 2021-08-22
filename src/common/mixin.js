//混入 用于不同组件相同options中相同代码的复用
//只需引入混入文件并设置minxins属性就能在不同组件的options中使用

import {debounce} from 'common/utils'
export const refreshMixin = {
  //Vue options
  mounted(){
    // console.log(1);
   //监听item中图片是否加载完成
   const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 100)
   this.$bus.$on('detailItemImageLoad', () => {
     // console.log(this.$bus);
     refresh()//监听图片的加载，每加载一张都重新刷新可滚动s高度
     // console.log('----');
     console.log('mixin');
   })
  }
}