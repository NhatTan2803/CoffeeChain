/**
 * Bills.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    billSubTotal : {
      type : 'number',
      columnType : 'decimal'
    },

    billVat : {
      type : 'number',
      columnType : 'float'
    },

    billTotal : {
      type : 'number',
      columnType : 'decimal'
    },

    billCash : {
      type : 'number',
      columnType : 'decimal'
    },

    billChange : {
      type : 'number',
      columnType : 'decimal'
    },
/////////////////
    users: {
      model: 'Users',
      columnName: 'billUserId',
      required:true,
    } ,   
/////////////////
    billdetails : {
      collection : 'BillDetails',
      via : 'bills'
    },
  },

  beforeCreate: function(valuesToSet, proceed) {
    //Caculate subtotal
    //Caculate VAT
    //Caculate total = subtotal + vat 10%;
    valuesToSet.bill_total = bill_subTotal + bill_vat;
    return proceed();
  }

};

