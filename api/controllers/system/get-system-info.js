module.exports = {


  friendlyName: 'Get system info',


  description: '',


  inputs: {
    systemId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {

    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    await System.findOne({
      id: inputs.systemId
    })
      .populate('shops')
      .populate('points')
      .exec((err, result) => {
        if (!result) {
          return exits.notFound();
        }
        if (err) {
          return exits.error(err);
        }
        return exits.success(result);
      })

  }


};
