/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');
var jwt = require('../services/jsonwebtoken');
module.exports = {

    // user_login: async function (req, res) {

    //     let { email, password } = req.allParams();
    //     if (!email) {
    //         return res.json({
    //             status: 'error',
    //             message: 'Email của bạn chưa được nhập'
    //         });
    //     }
    //     if (!password) {
    //         return res.json({
    //             status: 'error',
    //             message: 'Bạn chưa nhập Password'
    //         });
    //     }
    //     Users.findOne({ email }).exec(function (err, found) {
    //         if (err) { console.log(err) }
    //         if (found) {
    //             Users.comparePassword(password, found, function (err, valid) {
    //                 if (err) {
    //                     return res.json({
    //                         status: 'error',
    //                         message: 'Lỗi'
    //                     })
    //                 }
    //                 else {
    //                     if (valid) {
    //                         return res.json({
    //                             status: 'success',
    //                             message: 'Đăng nhập thành công',
    //                             token: jwt.encode(found.email),
    //                             user: found,
    //                         })

    //                     }
    //                     else {
    //                         if (!valid) {
    //                             return res.json({
    //                                 status: 'error',
    //                                 message: 'Account không tồn tại'
    //                             })
    //                         }
    //                     }
    //                 }
    //             })
    //         }
    //     })
    // },
    user_login: async function (req, res) {
        let email = req.body.email,
            password = req.body.password;
        try {

            var user = await User.findOne({ email });

            if (user) {
                User.comparePassword(password, user, (err, valid) => {
                    if (valid) {
                        req.session.userId = user.id
                        res.cookie('id', user.id)
                        res.cookie('token', jwt.encode(user))
                        if (user.permission === 'admin') {
                            return res.redirect('/main')
                        }
                        if (user.permission === 'boss') {
                            return res.redirect('/main-shop')
                        }
                        if (user.permission === 'staff') {
                            return res.redirect('/main-staff/shipping')
                        }
                    }
                    res.redirect('/login')
                })
            }
            else {
                res.redirect('/login')
            }
        } catch (error) {
            return console.log(error);

        }
    },
    user_SignUp: async function (req, res) {
        let email = req.body.email,
            password = req.body.password,
            name = req.body.name;

        var Isemail = await User.findOne({ email });
        if (!Isemail) {
            try {
                await User.create({
                    email,
                    password,
                    name
                })
                    .then(() => {

                        res.redirect('/login');
                    });

            } catch (error) {
                return console.log(error);

            }
        }
    },
    user_logOut: async (req, res) => {
        res.clearCookie('token')
        res.redirect('/login')
    }


};

