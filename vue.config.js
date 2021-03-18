const path = require('path');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        proxy: 'http://coincoin.me/duolingros/',
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/sass/variables.sass"',
            }
        },
    },
}
