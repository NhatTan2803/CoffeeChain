module.exports = {


  friendlyName: 'Get system info',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    System.find().exec((err, found) => {
      return exits.success(found);
    })
  }


};
