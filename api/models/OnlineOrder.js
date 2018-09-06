/**
 * OnlineOrder.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cart: {
      type: 'string'
    },
    shippingAddress: {
      type: 'string'
    },
    phone: {
      type: 'number'
    },
    bills: {
      model: 'Bill',
      columnName: 'BillId',
      required: true
    },
    idConfirmed: {
      type: 'boolean',
      defaultsTo : false
    },
    isShipped: {
      type: 'boolean',
      defaultsTo : false
    }
  },

};

