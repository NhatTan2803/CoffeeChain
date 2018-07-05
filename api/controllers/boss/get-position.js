module.exports = {


  friendlyName: 'Get position',


  description: '',


  inputs: {
    id: {
      type: 'number'
    }

  },
  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const boss = await User.findOne({ id: this.req.cookies.id }).populate('shops');
      const shop = await Shop.find({ id: boss.shops.id }).populate('positions');
      return exits.success(shop);
    }
    catch (err) {
      return exits.error();
    }
  }
};
