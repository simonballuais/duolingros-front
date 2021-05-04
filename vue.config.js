const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    configureWebpack: {
        devServer: {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            }
        },
        plugins: [
            new Dotenv(),
            new PrerenderSpaPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/'],
                renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
                    renderAfterDocumentEvent: 'render-event',
                    headless: true,
                }),
            }),
        ],
    },
    devServer: {
        host: 'coincoin.me',
        hot: true,
        disableHostCheck: true,
        proxy: 'https://coincoin.me/duolingros/',
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/sass/variables.sass"
                    @import "@/sass/base.sass"
                `,
            }
        },
    },
}
