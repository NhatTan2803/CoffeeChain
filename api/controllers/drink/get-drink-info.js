module.exports = {


  friendlyName: 'Get drink info',


  description: 'Get drink info from shop ',


  inputs: {
    shop: {
      type: 'number',
      description: 'ID of shop to look up'
    }

  },

  exits: {
    success: {

    },
    notFound: {
      description: 'No shop with the specified ID was found',
      respondType: 'notFound'
    }
  },
  fn: async function (inputs, exits) {
    await Shop.find({ id: inputs.shop })
    .populate('drinks')
    .exec(function (err, found) {
      if (err) return exits.error(err);
      if (found.length==0) {
        return exits.notFound();
      }
      return exits.success(found);
    })
}
}
