const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new PrerenderSpaPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/login'],
                renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
                    inject: {kiki: 'coucou'},
                    renderAfterDocumentEvent: 'render-event',
                    headless: true,
                }),
            }),
        ],
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        proxy: 'http://coincoin.me/duolingros/',
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
