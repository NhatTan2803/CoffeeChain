var jwt = require('../services/jsonwebtoken');
module.exports = function (req, res, next) {
    if (req.cookies.token && req.cookies.token != '') {
        var decoded = jwt.decode(req.cookies.token);

        if (decoded.info.permission === 'boss') {
            return next();
        }
        if (decoded.info.permission !== 'boss') {
            return res.json({
                status: 'error',
                message: 'Token khong hop le',
                isAuth: false,
            });
        }

    } else {
        // return res.json({
        //     status: 'error',
        //     message: 'Bạn không đủ quyền truy cập',
        //     isAuth: false,
        // })
        return res.view('./404', { layout: 'layouts/layout-SignLog' })
    }
}