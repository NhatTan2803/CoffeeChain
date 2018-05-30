/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    reviewStar: {
      type: 'number',
    },
    reviewContent: {
      type: 'string'
    },
    shops: {
      model: 'Shops',
      columnName: 'reviewShopId',
      required: true,
    },
    customer: {
      model: 'Customer',
      columnName: 'reviewCustomerId',
      required: true
    }
  },

};

