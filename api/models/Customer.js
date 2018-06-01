/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    birthday: {
      type: 'ref',
      columnType: 'date'
    },
    email: {
      type: 'string',
    },
    //////////////
    points: {
      collection: 'Point',
      via: 'customers'
    },
    reviews: {
      collection: 'Review',
      via: 'customers'
    },
    historybuys: {
      collection: 'HistoryBuy',
      via: 'customers'
    }

  },

};

