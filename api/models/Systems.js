/**
 * Systems.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    systemName: {
      type: 'string'
    },
    systemAddress: {
      type: 'string'
    },
/////////////
    shops: {
      collection: 'Shops',
      via:'systems'
    },
    point: {
      collection: 'Point',
      via:'systems'
    }

  }

};

