
var jwt = require('jsonwebtoken');
var key = 'abcasfasgvezsefewfwefnreiughfekvufdhvk';
module.exports = {
    encode: function (data) {
        return jwt.sign({
            info: data
        }, key);
    },
    decode: function (token) {
        try {
            var decoded = jwt.verify(token, key);
            return decoded;
        } catch (err) {
            return false;
        }
    }
}