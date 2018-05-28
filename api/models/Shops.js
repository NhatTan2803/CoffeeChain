/**
 * Shops.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    shop_name: {
      type: 'string',
      maxLength: 50
    },
    shop_system_id: {
      type: 'number',
      unique: true
    },
    shop_email: {
      type: 'string',
      isEmail: true
    },
    shop_address: {
      type: 'string'
    },
    shop_phone: {
      type: 'string',
      maxLength: 15
    },
    shop_avatar: {
      type: 'string'
    },
    shop_dayFrom: {
      type: 'ref',
      columnType: 'date'
    },
    shop_dayTo: {
      type: 'ref',
      columnType: 'date'
    }

  },

};

