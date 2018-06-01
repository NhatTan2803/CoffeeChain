/**
 * Drinks.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    price: {
      type: 'number',
      columnType: 'decimal'
    },

    avatar: {
      type: 'string'
    },
///////////////////
    shops : {
      model:'Shop',
      columnName: 'ShopId',
      required: true
    },
//////////////////
    billdetails: {
      collection: 'BillDetail',
      via:'drinks'
    }
    
  },

};

