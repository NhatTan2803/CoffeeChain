module.exports = {


  friendlyName: 'Create position',


  description: '',


  inputs: {
    name: {
      type: 'string'
    },
    shops: {
      type: 'number'
    }
  },


  exits: {
    success: {

    },
    error: {

    }
  },

  fn: async function (inputs, exits) {
    Role.findOrCreate({
      name: inputs.name
    }, {
        name: inputs.name,
        shops: inputs.shops
      }).exec(async (err, role, created) => {
        if (err) return exits.success();
        const shop = await Shop.find({ id: inputs.shops }).populate('positions')
        return exits.success(shop)
      })
  }
};
