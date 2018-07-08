module.exports = {


  friendlyName: 'Create system',


  description: '',


  inputs: {
    name: {
      type: 'string'
    },
    address: {
      type: 'string'
    }
  },


  exits: {
    success: {

    },
    error: {

    }
  },


  fn: async function (inputs, exits) {
    System.create({
      name: inputs.name,
      address: inputs.address
    }).fetch()
      .exec((err, created) => {
        if (err) {
          return exits.error();
        }
        return exits.success(created);
      })


  }


};
