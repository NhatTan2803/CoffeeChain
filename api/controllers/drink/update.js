module.exports = {


  friendlyName: 'Create',


  description: 'Create drink.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string',
      required: true
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
      description: 'ID of shop to look up',
      required: true
    }
  },

  exits: {
    success: {

    },
    notFound: {
      description: 'No drink was found',
      respondType: 'notFound'
    }
  },


  fn: function (inputs, exits) {

    Drink.update({ id: inputs.id, shops: inputs.shop }, {
      name: inputs.name,
      price: inputs.price,
      avatar: inputs.avatar
    }).fetch()
      .exec(function (err, updated) {
        if (err) {
          return exits.error(err)
        }
        if (updated.length == 0)
          return exits.notFound();
        else
          return exits.success(updated);
      })
  }
};
