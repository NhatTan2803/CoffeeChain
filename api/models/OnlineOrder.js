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
    },
    status: {
      type: 'string',
      isIn: ['refund', 'completed', 'unconfirmed','confirmed'],
      defaultsTo: 'unconfirmed'

    }
  },

};

