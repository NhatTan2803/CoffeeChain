module.exports = {


  friendlyName: 'Create position for shop',


  description: '',


  inputs: {
    name: {
      type: 'string',
      required: true
    },
    shopId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Position was created'
    },
    error: {
      description: 'Position creation failed'
    },
    existed: {
      description: 'Position existed'
    },
    missing: {
      description: 'No shop was found'
    }

  },


  fn: function (inputs, exits) {

    Shop.findOne({
      id: inputs.shopId
    }).exec((err, found) => {
      if (err) return exits.error(err);
      if (!found) return exits.missing({
        message: 'Nonexistent shop'
      });
    });
    Roll.findOrCreate({
      name: inputs.name
    }, {
        name: inputs.name,
        shops: inputs.shopId
      }).exec(async (err, roll, created) => {
        if (err) return exits.error(err);
        if (created) {
          return exits.success({
            message: 'Roll was created'
          })
        } else {
          return exits.existed({
            message: 'Existed roll'
          });
        }
      })
  }
};
