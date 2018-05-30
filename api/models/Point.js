/**
 * Point.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pointPoint: {
      type: 'number',
    },
    pointIsActive: {
      type: 'string',
      isIn: ['on', 'off']
    },
    //////////////
    shops: {
      model: 'Shops',
      columnName: 'pointShopId',
      required: false,
    },
    systems: {
      model: 'Systems',
      columnName: 'pointSystemId',
      required: false
    },
    customer: {
      model: 'Customer',
      columnName: 'pointCustomerId',
      required: true
    }
  }, 

};

