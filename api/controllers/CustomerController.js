/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
        return res.view('./pages/customer/profile-customer', { layout: 'layouts/layout-intro' })
    },
    showRateCus: async function (req, res) {
        return res.view('./pages/customer/rate-customer', { layout: 'layouts/layout-intro' })
    },
    showPointCus: async function (req, res) {
        return res.view('./pages/customer/point-customer', { layout: 'layouts/layout-intro' })
    }

};

