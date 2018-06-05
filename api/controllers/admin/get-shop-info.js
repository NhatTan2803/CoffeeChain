module.exports = {


  friendlyName: 'Get shop info',


  description: '',


  inputs: {
    shopId: {
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
    
    await Shop.find({
      where: { id: inputs.shopId },
      select: ['name', 'address', 'dayFrom', 'dayTo']
    })
      .exec(function (err, found) {
        if (err) return exits.error(err);
        if (found.length == 0) {
          return exits.notFound();
        }
        return exits.success(found);
      })
  }
};
