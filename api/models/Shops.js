/**
 * Shops.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    shopName: {
      type: 'string',
      maxLength: 50
    },
    shopEmail: {
      type: 'string',
      isEmail: true
    },
    shopAddress: {
      type: 'string'
    },
    shopPhone: {
      type: 'string',
      maxLength: 15
    },
    shopAvatar: {
      type: 'string'
    },
    shopDayFrom: {
      type: 'ref',
      columnType: 'date'
    },
    shopDayTo: {
      type: 'ref',
      columnType: 'date'
    },
///////////////
    systems: {
      model: 'Systems',
      columnName: 'shopSystemId',
      required: true,
    },
///////////////
    positions: {
      collection: 'Positions',
      via:'shops'
    },
    users: {
      collection: 'Users',
      via:'shops'
    },
    drinks: {
      collection: 'drinks',
      via:'shops'
    },
    point: {
      collection: 'Point',
      via:'shops'
    },
    review: {
      collection: 'Review',
      via:'shops'
    },
    history: {
      collection: 'HistoryBuy',
      via:'shops'
    }

  },

};

