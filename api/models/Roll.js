/**
 * Positions.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true
    },
/////////////////////
    shops: {
      model: 'Shop',
      columnName: 'ShopId',
      required: true, 
    },
////////////////////
    users: {
      collection: 'User',
      via:'rolls'
    }
  },

};

