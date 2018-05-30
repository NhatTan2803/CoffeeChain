/**
 * BillDetails.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    detailDrinkName : {
      type : 'string',
      required : true
    },

    detailQuantity : {
      type : 'number',
      columnType : 'decimal'
    },

    detailPrice : {
      type : 'number',
      columnType : 'decimal'
    },

    detailDrinkSubtotal : {
      type : 'number',
      columnType : 'decimal'
    },
//////////////////////////
    bills : {
      model : 'Bills',
      columnName : 'detaiBillId',
      required : true
    },

    drinks : {
      model: 'Drinks',
      columnName: 'detailDrinkId',
      required:true,
    }
  },
};

