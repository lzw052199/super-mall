import Vue from "vue"
import VueRouter from "vue-router"

//懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

//安装插件
Vue.use(VueRouter)

//创建router

const routes = [
  {
    path:'',
    redirect:'/home',
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:Home,
      show:true//定义在不同路由tabbar的显示与隐藏
    }
  },
  {
    path:'/category',
    component:Category,
    meta:{
      title:Category,
      show:true//定义在不同路由tabbar的显示与隐藏
    }
  },
  {
    path:'/shopcart',
    component:Shopcart,
    meta:{
      title:Shopcart,
      show:true//定义在不同路由tabbar的显示与隐藏
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      title:Profile,
      show:true//定义在不同路由tabbar的显示与隐藏
    }
  },
  {
    path:'/detail/:iid',
    component:Detail,
    meta:{
      title:'detail',
      show:false
    }
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router