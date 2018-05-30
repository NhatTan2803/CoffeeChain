/**
 * Drinks.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    drinkName: {
      type: 'string',
      required: true
    },

    drinkPrice: {
      type: 'number',
      columnType: 'decimal'
    },

    drinkAvatar: {
      type: 'string'
    },
///////////////////
    shops : {
      model:'Shops',
      columnName: 'drinkShopId',
      required: true
    },
//////////////////
    billdetails: {
      collection: 'BillDetails',
      via:'drinks'
    }
    
  },

};

