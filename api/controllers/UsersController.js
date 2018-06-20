/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
var jwt = require('../services/jsonwebtoken');
module.exports = {
    showLoginForm: async function (req, res) {
        return res.view('./pages/login')
    },
    showLoginCusForm: async function (req,res) {
        return res.view('./pages/login-customer')
    },
    index: function (req, res) {
        res.view('./intro/intro-page', { layout: 'layouts/layout-intro' });
    },
    user_login: async function (req, res) {

        let { user_email, user_password } = req.allParams();
        if (!user_email) {
            return res.json({
                status: 'error',
                message: 'Email của bạn chưa được nhập'
            });
        }
        if (!user_password) {
            return res.json({
                status: 'error',
                message: 'Bạn chưa nhập mật khẩu'
            });
        }
        Users.findOne({ user_email }).exec(function (err, found) {
            if (err) { console.log('Bị lỗi') }
            if (found) {
                Users.comparePassword(user_password, found, function (err, valid) {
                    if (err) {
                        return res.json({
                            status: 'error',
                            message: 'Lỗi'
                        })
                    }
                    else {
                        if (valid) {
                            return res.json({
                                status: 'success',
                                message: 'Đăng nhập thành công',
                                token: jwt.encode(found.user_email),
                                user: found,
                            })

                        }
                        else {
                            if (!valid) {
                                return res.json({
                                    status: 'error',
                                    message: 'Tài khoản không tồn tại'
                                })
                            }
                        }
                    }
                })
            }
        })
    },
    
};

