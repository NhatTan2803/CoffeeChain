/**
 * Bills.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // subTotal: {
    //   type: 'number',
    //   columnType: 'decimal'
    // },

    // vat: {
    //   type: 'number',
    //   columnType: 'float'
    // },

    total: {
      type: 'number',
      columnType: 'decimal'
    },

    cash: {
      type: 'number',
      columnType: 'decimal'
    },

    change: {
      type: 'number',
      columnType: 'decimal'
    },
    /////////////////
    users: {
      model: 'User',
      columnName: 'UserId',
    },
    /////////////////
    drinks: {
      collection: 'Drink',
      via: 'bills',
      through: 'BillDetail'
    },
  },

  // beforeCreate: function (valuesToSet, proceed) {
  //   //Caculate subtotal
  //   //Caculate VAT
  //   //Caculate total = subtotal + vat 10%;
  //   valuesToSet.total = subTotal * vat;
  //   return proceed();
  // }

};

