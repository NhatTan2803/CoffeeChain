/**
 * HistoryBuy.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    historyTotal: {
      type: 'number',
      columnType: 'decimal(16,0)'
    },
    customer: {
      model: 'Customer',
      columnName: 'historyCustomerId',
      required: true,
    },
    shops: {
      model: 'Shops',
      columnName: 'historyShopId',
      required: true,
    }


  },

};

