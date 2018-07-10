/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    star: {
      type: 'number',
    },
    content: {
      type: 'string'
    },
    shops: {
      model: 'Shop',
      columnName: 'ShopId',
      required: true,
    },
    customers: {
      model: 'Customer',
      columnName: 'CustomerId',
    }
  },

};

