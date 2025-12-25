const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/mock/5b30e9bd27418a001c301c2d/api', {
        target: 'https://easymock.ihr360.com',
        secure: false
    }));
};
