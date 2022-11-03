module.exports = {
    plugins: {
        /*'autoprefixer': {
          browsers: ['Android >= 4.0', 'iOS >= 7']
        },*/
        'postcss-pxtorem': {
            rootValue: 16,  
            selectorBlackList  : [], 
            propList: ['*'],
            minPixelValue: 3, // 最小像素值
        }
    }
}