module.exports = {


  friendlyName: 'Create',


  description: 'Create system.',


  inputs: {
    name: {
      description: 'The name of company',
      type: 'string',
      required: true
    },
    address: {
      description: 'Address of company',
      type: 'string'
    }
  },


  exits: {
    success: {
      responseType: ''
    },
  },


  fn: async function (inputs, exits) {

    await System.create({
      name: inputs.name,
      address: inputs.address
    }).fetch()
      .exec((err, result) => {
        if (err) {
          return exits.error(err)
        }
        return exits.success(result);
      });

  }
}
