const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    //uri:'mongodb://localhost:27017/mean-angular-2',
    uri:'mongodb://hello:tricerotops123@ds259109.mlab.com:59109/angular-app',
    secret:crypto,
    db:'angular-app'
}