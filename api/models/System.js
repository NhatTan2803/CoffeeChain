/**
 * Systems.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique:true
    },
    address: {
      type: 'string'
    },
/////////////
    shops: {
      collection: 'Shop',
      via:'systems'
    },
    points: {
      collection: 'Point',
      via:'systems'
    }

  }

};

