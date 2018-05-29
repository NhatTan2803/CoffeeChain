var jwt = require('../services/jsonwebtoken');
module.exports = function (req, res, next) {
    if (req.headers.token && req.headers.token != '') {
        var decoded = jwt.decode(req.headers.token);
        if (decoded.email) // decoded....,tiep theo la cai key khai bao trong jsonwebtoken
        {
            req.headers.authEmail = decoded.email;   // lay cai j ma hoa thi chấm cái đó
            return next();
        }
        if (decoded === false) {
            return res.json({
                status: 'error',
                message: 'Token khong hop le',
                isAuth: false,
            });
        }
    } else {
        return res.json({
            status: 'error',
            message: 'Bạn không đủ quyền truy cập',
            isAuth: false,
        })
    }
}