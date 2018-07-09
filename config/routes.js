/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'intro/intro-page'
  },
  '/': 'ShowController.index',

  '/login-customer': 'CustomerController.showLoginCus',
  '/signUp-customer': 'CustomerController.showSignUpCus',
  '/main-customer': 'CustomerController.showMainCus',
  '/main-customer/profile': 'CustomerController.showProfileCus',
  '/main-customer/rate': 'CustomerController.showRateCus',
  '/main-customer/point': 'CustomerController.showPointCus',



  ////////////////////////// admin view
  '/main': 'ShowController.showMain',
  '/login': 'ShowController.showLogin',
  '/signup': 'ShowController.showSignUp',
  '/main/addShop': 'ShowController.showAddShop',
  '/main/addAccount-Boss': { action: 'admin/add-shop-info' },
  '/main/listShop': { action: 'admin/get-shop-info' },
  '/main/listAccount-Boss': 'ShowController.showListAccount',
  '/main/add-listSystem': 'ShowController.showAddListSystem',
  ///////////////////////// boss
  '/main-shop': 'ShowController.showMainShop',
  '/main-shop/list-position': 'ShowController.showAddListPosition',
  '/main-shop/add-drink': 'ShowController.showAddDrink',
  '/main-shop/add-staff': 'ShowController.showAddStaff',
  '/main-shop/sell': 'ShowController.showSell',
  '/main-shop/list-drink': 'ShowController.showListDrink',
  '/main-shop/list-staff': 'ShowController.showListStaff',
  '/main-shop/report': 'ShowController.showReport',
  '/main-staff': 'ShowController.showSellStaff',
  ////////////////////////// API 

  'GET /main-shop/list-staff': {
    action: 'staff/get-staffs',
    locals: {
      layout: 'layouts/layout-boss'
    }
  },
  'GET /main-shop/preprocess': {
    action: 'staff/pass-positions-into-staff-page',
    locals: {
      layout: 'layouts/layout-boss'
    }
  },
  'POST /main-shop/staff': {
    action: 'staff/create',
    locals: {
      layout: 'layouts/layout-boss'
    }
  },
  'GET /main-shop/list-drink': {
    action: 'boss/get-drink-list',
    locals: {
      layout: 'layouts/layout-boss'
    }
  },
  'POST /admin/newboss': { action: 'admin/create-boss-account' },
  'GET /main/list-drink': 'boss/get-drink-list',
  'POST /login': 'UsersController.user_login',
  'GET /logout':'UsersController.user_logOut',
  'GET /user': 'UsersController.user_profile',
  'POST /signup': 'UsersController.user_SignUp',
  //systemController
  'POST /system': 'SystemController.create',
  'GET /system': 'SystemController.getList',
  'GET /system/:id': 'SystemController.getSystemInfo',
  'GET /main/listAccount-Boss': 'admin/get-account-list',

  'POST /drink/create': { action: 'drink/create' },
  'PUT /drink/update': { action: 'drink/update' },
  'GET /shop/drinks': { action: 'drink/get-drink-info' },
  // 'GET /drink/info': { action: 'drink/get-drink-info' },

  'POST /admin/newshop': { action: 'admin/create-shop' },
  'GET /admin/shopinfo': { action: 'admin/get-shop-info' },
  'GET  /shop/position': { action: 'boss/get-position' },
  'POST /shop/position': { action: 'boss/create-position' },
  'POST /shop/sell': { action: 'boss/create-bill' },
  'POST /shop/sell/billdetail': { action: 'boss/create-bill-detail' },
  'GET /system' : {action:'boss/get-system-info'},
  'POST /system': { action: 'boss/create-system' },


  // 'POST /user/login': 'UsersController.user_login',

  /////////////////////////// API customer
  'POST /login-customer': 'CustomerController.customerLogIn',
  'POST /signup-customer': 'CustomerController.customerSignUp',

  /***************************************************************************
*                                                                          *
* More custom routes here...                                               *
* (See https://sailsjs.com/config/routes for examples.)                    *
*                                                                          *
* If a request to a URL doesn't match any of the routes in this file, it   *
* is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
* not match any of those, it is matched against static assets.             *
*                                                                          *
***************************************************************************/





};
