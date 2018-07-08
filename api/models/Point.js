/**
 * Point.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    point: {
      type: 'number',
    },
    isActive: {
      type: 'boolean'
    },
    //////////////
    shops: {
      model: 'Shop',
      columnName: 'ShopId',
      required: false,
    },
    systems: {
      model: 'System',
      columnName: 'SystemId',
      required: false
    },
    customers: {
      model: 'Customer',
      columnName: 'CustomerId',
      required: true
    }
  },

};

