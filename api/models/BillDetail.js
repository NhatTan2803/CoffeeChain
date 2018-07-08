/**
 * BillDetails.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    drinkName: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      columnType: 'decimal'
    },
    quantity: {
      type: 'number',
      columnType: 'decimal'
    },
    drinkSubtotal: {
      type: 'number',
      columnType: 'decimal'
    },
    bills: {
      model: 'Bill',
      columnName: 'BillId',
      required: true
    },
    drinks: {
      model: 'Drink',
      columnName: 'DrinkId',
      
    }
  },
};

