/**
 * Shops.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      maxLength: 50
    },
    email: {
      type: 'string',
      isEmail: true
    },
    address: {
      type: 'string'
    },
    phone: {
      type: 'string',
      maxLength: 15
    },
    avatar: {
      type: 'string'
    },
    dayFrom: {
      type: 'ref',
      columnType: 'date'
    },
    dayTo: {
      type: 'ref',
      columnType: 'date'
    },
///////////////
    systems: {
      model: 'System',
      columnName: 'systemId'
    },
///////////////
    positions: {
      collection: 'Position',
      via:'shops'
    },
    users: {
      collection: 'User',
      via:'shops'
    },
    drinks: {
      collection: 'Drink',
      via:'shops'
    },
    points: {
      collection: 'Point',
      via:'shops'
    },
    reviews: {
      collection: 'Review',
      via:'shops'
    },
    historys: {
      collection: 'HistoryBuy',
      via:'shops'
    }

  },

};

