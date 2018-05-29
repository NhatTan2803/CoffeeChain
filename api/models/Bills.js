/**
 * Bills.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    bill_subTotal : {
      type : 'number',
      columnType : 'decimal'
    },

    bill_vat : {
      type : 'number',
      columnType : 'float'
    },

    bill_total : {
      type : 'number',
      columnType : 'decimal'
    },

    bill_cash : {
      type : 'number',
      columnType : 'decimal'
    },

    bill_change : {
      type : 'number',
      columnType : 'decimal'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    bill_details : {
      collection : 'BillDetails',
      via : 'bill'
    },
    //can xem lai model user chinh xac chua ?
    //One to One
    customer : {
      model : 'user',
      unique : true
    }
  },

  beforeCreate: function(valuesToSet, proceed) {
    //Caculate subtotal
    //Caculate VAT
    //Caculate total = subtotal + vat 10%;
    valuesToSet.bill_total = bill_subTotal + bill_vat;
    return proceed();
  }

};

