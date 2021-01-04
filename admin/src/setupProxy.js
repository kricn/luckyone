const proxy = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        `${process.env.REACT_APP_API}`, 
        proxy.createProxyMiddleware({
            target: process.env.REACT_APP_BASE_URL,
            changeOrigin: true,
            pathRewrite:{[`^${process.env.REACT_APP_API}`]:''}
        })
    )
};