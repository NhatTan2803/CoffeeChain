/**
 * HistoryBuy.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    total: {
      type: 'number',
      columnType: 'decimal(16,0)'
    },
    customers: {
      model: 'Customer',
      columnName: 'CustomerId',
      required: true,
    },
    shops: {
      model: 'Shop',
      columnName: 'ShopId',
      required: true,
    }


  },

};

