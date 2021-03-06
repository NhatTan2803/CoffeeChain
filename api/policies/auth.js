var jwt = require('../services/jsonwebtoken');
module.exports = function (req, res, next) {
    if (req.cookies.token && req.cookies.token != '') {
        var decoded = jwt.decode(req.cookies.token);
        
         if (decoded.info) // decoded....,tiep theo la cai key khai bao trong jsonwebtoken
        {
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
        // return res.json({
        //     status: 'error',
        //     message: 'Bạn không đủ quyền truy cập',
        //     isAuth: false,
        // })
        return res.view('./404', { layout: 'layouts/layout-SignLog' })
    }
}