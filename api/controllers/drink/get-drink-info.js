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
    try {
      const boss = await User.findOne({ id: this.req.cookies.id }).populate('shops');
      const shop = await Shop.find({ id: boss.shops.id }).populate('drinks');
      const drink = await Drink.find({ shops: boss.shops.id })
      return exits.success(drink);
    }
    catch (err) {
      return exits.error();
    }
  }
}
