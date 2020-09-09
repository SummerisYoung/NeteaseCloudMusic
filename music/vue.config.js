const path = require("path");

function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack:(config)=>{
      config.resolve.alias
      .set('assets',resolve('./src/assets'))
      .set('components',resolve('./src/components'))
      .set('network',resolve('./src/network'))
      .set('views',resolve('./src/views'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/assets/css/base.less")]
    }
  }
}
