/**
 * Positions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    positionName: {
      type: 'string',
    },
/////////////////////
    shops: {
      model: 'Shops',
      columnName: 'positionShopId',
      required: true,
    },
////////////////////
    users: {
      collection: 'Users',
      via:'positions'
    }
  },

};

