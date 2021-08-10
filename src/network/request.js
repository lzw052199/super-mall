import axios from 'axios'



export function request(config) {
      //1、创建axios实例
    const instance = axios.create({//axios内部有promise
      baseURL:'http://152.136.185.210:7878/api/m5',
      timeout:5000
    })

    // 2、axios拦截器 请求拦截 响应拦截
    instance.interceptors.request.use(config => {
      // console.log(config);//拦截成功
      // 1、比如config中一些配置信息不不符合服务器的要求，对其进行修改再返回

      //2、比如每次发送网络请求是，都希望再界面中显示加载动画或图标

      //3、某些网络请求（比如登入(token)  ,必须携带一些特殊信息

      return config//将拦截返回
    }, err =>{//拦截失败
      // console.log(err);
    })

    //响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data//返回响应数据
    },err => {
      // console.log(err);
    })

    //3、发送真正的网络请求
   return instance(config)//内部返回的就是一个promise
  }