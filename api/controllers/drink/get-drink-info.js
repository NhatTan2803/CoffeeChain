module.exports = {


  friendlyName: 'Get drink info',


  description: 'Get drink info from shop ',


  inputs: {
    shopId: {
      type: 'number',
      description: 'ID of shop to look up',
      required: true

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

  fn: function (inputs, exits) {

    Shop.find({ id: inputs.shopId })
      .populate('drinks')
      .exec((err, found) => {
        if (err) return exits.error(err);
        if (found.length == 0) {
          return exits.notFound();
        }
        return exits.success(found);
      })
  }
}
