/**
 * ShowController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function (req, res) {
        res.view('./intro/intro-page', { layout: 'layouts/layout-intro' });
    },
    showLogin: async function (req, res) {
        return res.view('./pages/coffee/login', { layout: 'layouts/layout-SignLog' })
    },
    showSignUp: async function (req, res) {
        return res.view('./pages/coffee/admin/signUpAdmin', { layout: 'layouts/layout-SignLog' })
    },
    showMain: async function (req, res) {
        return res.view('./pages/coffee/main')
    },
    showAddShop: function (req, res) {
        res.view('./pages/coffee/admin/addShop')
    },
    showAddAccount: async function (req, res) {
        res.view('./pages/coffee/admin/addAccountBoss')
    },
    showListShop: function (req, res) {
        res.view('./pages/coffee/admin/listShop')
    },
    showListAccount: function (req, res) {
        res.view('./pages/coffee/admin/listAccount')
    },
    showAddListSystem: function (req, res) {
        res.view('./pages/coffee/admin/add-listSystem')
    },

    /////////////////////// Boss
    showMainShop: (req, res) => {
        res.view('./pages/coffee/Boss/main-shop', { layout: 'layouts/layout-boss' })
    },
    showAddListPosition: function (req, res) {
        res.view('./pages/coffee/Boss/add-listPosition', { layout: 'layouts/layout-boss', id: req.cookies.id })
    },
    showAddDrink: function (req, res) {
        res.view('./pages/coffee/Boss/addDrink', { layout: 'layouts/layout-boss' })
    },
    showAddStaff: function (req, res) {
        res.view('./pages/coffee/Boss/addStaff', { layout: 'layouts/layout-boss' });
    },
    showSell: function (req, res) {
        res.view('./pages/coffee/Boss/sell', { layout: 'layouts/layout-boss' })
    },
    showListDrink: function (req, res) {
        res.view('./pages/coffee/Boss/listDrink', { layout: 'layouts/layout-boss' });
    },
    showListStaff: function (req, res) {
        res.view('./pages/coffee/Boss/listStaff', { layout: 'layouts/layout-boss' })
    },
    showReport: function (req, res) {
        res.view('./pages/coffee/Boss/report', { layout: 'layouts/layout-boss' })
    },

    showSellStaff: (req, res) => {
        res.view('./pages/coffee/Boss/main-staff', { layout: 'layouts/layout-staff' })
    }

};

