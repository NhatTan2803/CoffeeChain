module.exports = {


  friendlyName: 'Update shop',


  description: '',


  inputs: {
    name: {
      type: 'string',
      maxLength: 50
    },
    email: {
      type: 'string',
      isEmail: true
    },
    address: {
      type: 'string'
    },
    phone: {
      type: 'string',
      maxLength: 15
    },
    avatar: {
      type: 'string'
    },
    dayFrom: {
      type: 'ref',
      columnType: 'date'
    },
    dayTo: {
      type: 'ref',
      columnType: 'date'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
