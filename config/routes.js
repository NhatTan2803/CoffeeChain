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
  '/': {
    controller: 'Users',
    action: 'index',
  },
  '/login':'UsersController.showLoginForm',
  'post /login': 'UsersController.user_login',
  'get /user': 'UsersController.user_profile',

  'post /drink/create': { action: 'drink/create' },
  'put /drink/update': { action: 'drink/update' },
  'get /drink/info': { action: 'drink/get-drink-info' },
  'post /admin/newshop': { action: 'admin/create-shop' },
  'get /admin/shopinfo': { action: 'admin/get-shop-info' },
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

//systemController
  'POST /system' : 'SystemController.create',
  'GET /system' : 'SystemController.getList',
  'GET /system/:id' : 'SystemController.getSystemInfo',

//userController
  'POST /user/login': 'UsersController.user_login'



};
