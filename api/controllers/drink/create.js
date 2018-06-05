module.exports = {


  friendlyName: 'Create',


  description: 'Create drink.',


  inputs: {
    name: {
      type: 'string'
    },
    price: {
      type: 'number',
      columnType: 'decimal'
    },
    avatar: {
      type: 'string'
    },
    shop: {
      type: 'number',
      description: 'ID of shop to look up'
    }
  },
  exits: {
    success: {

    },
    error: {
      description: 'No drink was created'
    }
  },
  fn: async function (inputs, exits) {
    
    await Drink.create({
      name: inputs.name,
      price: inputs.price,
      avatar: inputs.avatar,
      shops: inputs.shop
    }).fetch()
      .exec(function (err, created) {
        if (err)
          return exits.error(err)
        else
          return exits.success(created)
      })
  }
};
