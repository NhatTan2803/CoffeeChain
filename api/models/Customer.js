/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    customerName: {
      type: 'string',
    },
    customerPhone: {
      type: 'string',
    },
    customerBirthday: {
      type: 'ref',
      columnType: 'date'
    },
    customerEmail: {
      type: 'string',
    },
    //////////////
    point: {
      collection: 'Point',
      via: 'customer'
    },
    review: {
      collection: 'Review',
      via: 'customer'
    },
    historybuy: {
      collection: 'HistoryBuy',
      via: 'customer'
    }

  },

};

