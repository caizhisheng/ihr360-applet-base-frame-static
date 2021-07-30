const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/gateway', { target: 'http://192.168.1.184:6666' }));
    app.use(proxy('/mock/5b30e9bd27418a001c301c2d/api', {
        target: 'https://easymock.ihr360.com',
        secure: false
    }));
    app.use(proxy('/attendanceTeamApp', {
        target: 'http://192.168.1.184:41501',
        secure: false
    }));
    app.use(proxy('/gateway/roster/api', {
        target: 'http://192.168.1.184:6666'
    }));
};
