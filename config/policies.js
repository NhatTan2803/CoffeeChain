/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'ShowController': {
    'index': true,
    'showLogin': true,
    'showSignUp': true,
    'showMain': 'authadmin',
    '*': 'authadmin',

    'showMainShop': 'authboss',
    'showAddListPosition': 'authboss',
    'showAddDrink': 'authboss',
    'showAddStaff': 'authboss',
    'showSell': 'auth',
    'showListDrink': 'authboss',
    'showListStaff': 'authboss',
    'showReport': 'authboss',
    'showSellStaff': 'auth'
  },
  'admin/add-shop-info': 'authadmin',
  'admin/get-shop-info': 'authadmin',


};
