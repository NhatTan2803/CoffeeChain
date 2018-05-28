/**
 * Systems.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    system_name: {
      type: 'string'
    },
    system_address: {
      type: 'string'
    }
  }

};

