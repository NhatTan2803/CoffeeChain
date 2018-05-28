/**
 * Point.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    Point_shop_id: {
      type:'number',
    },
    Point_system_id: {
      type:'number',
    },
    Point_shop_id: {
      type:'number',
    },
    Point_cus_id: {
      type:'number',
    },
    Point_point: {
      type:'number',
    },
    Point_isActive: {
      type: 'string',
      isIn:['on','off']
    }

  },

};

