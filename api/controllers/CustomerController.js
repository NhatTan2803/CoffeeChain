/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('../services/jsonwebtoken');

module.exports = {
    showLoginCus: async function (req, res) {
        return res.view('./pages/customer/login-customer', { layout: 'layouts/layout-intro' });
    },
    showSignUpCus: async function (req, res) {
        return res.view('./pages/customer/signup-customer', { layout: 'layouts/layout-intro' })
    },
    showMainCus: async function (req, res) {
        return res.view('./pages/customer/main-customer', { layout: 'layouts/layout-intro' })
    },
    showProfileCus: async function (req, res) {
        
        let { id } = req.cookies;
        var info = await User.find({ id })
        return res.view('./pages/customer/profile-customer', { info: info, layout: 'layouts/layout-intro' })
    },
    showRateCus: async function (req, res) {
        return res.view('./pages/customer/rate-customer', { layout: 'layouts/layout-intro' })
    },
    showPointCus: async function (req, res) {
        return res.view('./pages/customer/point-customer', { layout: 'layouts/layout-intro' })
    },
    showOrderShop: async function (req, res) {
        var listOrderShop = await Shop.find()
        

        return res.view('./pages/customer/listShopOrder-customer', { listOrderShop: listOrderShop, layout: 'layouts/layout-intro' })
    },
    showOrderForCus: async function (req, res) {
        try {
            let params = req.allParams();
            await res.cookie('idSelect', params.id)
            return res.view('./pages/customer/orderForCustomer-customer', { idShop: params.id, layout: 'layouts/layout-intro' })
        } catch (error) {

        }

    },
    customerGetList: async function (req, res) {
        let { idSelect } = req.cookies;

        const drink = await Drink.find({ where: { shops: idSelect }, select: ['name', 'id', 'price'] })

        return res.json(drink)
        
    },
    customerLogIn: async (req, res) => {
        let { email, password, repeat } = req.allParams();
        try {

            var customer = await Customer.findOne({ email });

            if (customer) {

                Customer.comparePassword(password, customer, (err, valid) => {
                    if (valid) {
                        req.session.userId = customer.id
                        res.cookie('id', customer.id)
                        res.cookie('token', jwt.encode(customer))
                        return res.redirect('/main-customer')
                    }
                    return res.redirect('/login-customer')
                })
            }
            else {
                return res.redirect('/login-customer')
            }
        } catch (error) {
            return console.log(error);

        }
    },
    customerSignUp: async (req, res) => {
        let { email, password } = req.allParams();

        var Isemail = await Customer.findOne({ email });
        if (!Isemail) {
            try {
                await Customer.create({
                    email,
                    password,
                })
                    .then(() => {

                        res.redirect('/login-customer');
                    });

            } catch (error) {
                return console.log(error);

            }
        }
    },
    customerRate: async (req, res) => {
        let { idbill, star, feedback } = req.allParams();
        const idUser = await Bill.findOne({ id: idbill })
        const idShop = await User.findOne({ id: idUser.id })
        try {
            await Review.create({
                star: star,
                content: feedback,
                shops: idShop.shops
            })
                .then(() => {
                    res.redirect('main-customer/rate')
                });


        } catch (error) {
            return console.log(error);

        }
    }


};

