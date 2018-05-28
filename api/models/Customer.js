/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cus_name: {
      type:'string',
    },
    cus_phone: {
      type:'string',
    },
    cus_birthday: {
      type: 'ref',
      columnType:'date'
    },
    cus_email: {
      type:'string',
    }

  },

};

