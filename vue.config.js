module.exports = {
  configureWebpack:{
    resolve:{
      extensions:[],//忽略后缀
      alias:{//路径别名配置
        '@' : 'src',
        'assets': '@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}