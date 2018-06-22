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
    showLoginForm: async function (req, res) {
        return res.view('./pages/coffee/login', { layout: 'layouts/layout-SignLog' })
    },
    showMain: async function (req, res) {
        return res.view('./pages/coffee/main')
    },
    showAddShop: function (req, res) {
        res.view('./pages/coffee/admin/addShop')
    },
    showAddAccount: function (req, res) {
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
};

