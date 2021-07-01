module.exports = {
  // publicPath决定了 静态资源 和 url 的 "baseurl"
  publicPath: process.env.NODE_ENV === 'production' ? '/timetodo/' : '/', 
  // local server（仅仅用于本地development环境）
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 80,
    https: false,
    hotOnly: false,    
    disableHostCheck: true,
    proxy: {
      '/timetodo/api': {
          target: 'http://39.108.2.117:8102', // target host
          // ws: true,
          changeOrigin: true,
          // pathRewrite: {
          //   '^/api': '', // rewrite path
          // },
          // router: {
          //   // when request.headers.host == 'dev.localhost:3000',
          //   // override target 'http://www.example.org' to 'http://localhost:8000'
          //   'http://127.0.0.1:80': 'http://39.108.2.117:8102',
          // },

      },
    }
  },
  
  configureWebpack: config =>{
    if(process.env.NODE_ENV === 'production'){
      // mutate config for production...
    }else{
      // mutate for development...
    }
  },
// 配置高于chainWebpack中关于 css loader 的配置
}