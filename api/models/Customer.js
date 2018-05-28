/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    customer_name: {
      type:'string',
    },
    customer_phone: {
      type:'string',
    },
    customer_birthday: {
      type: 'ref',
      columnType:'date'
    },
    customer_email: {
      type:'string',
    }

  },

};

