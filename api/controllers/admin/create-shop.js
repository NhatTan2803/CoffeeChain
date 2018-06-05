module.exports = {


  friendlyName: 'Create shop',


  description: 'Create new shop',


  inputs: {
    name: {
      type: 'string',
      maxLength: 50
    },
    email: {
      type: 'string',
      isEmail: true
    },
    address: {
      type: 'string'
    },
    phone: {
      type: 'string',
      maxLength: 15
    },
    avatar: {
      type: 'string'
    },
    dayFrom: {
      type: 'ref',
      columnType: 'date'
    },
    dayTo: {
      type: 'ref',
      columnType: 'date'
    }
  },


  exits: {
    success: {

    },
    error: {
      description: 'No shop was created'
    }
  },


  fn: async function (inputs, exits) {

    await Shop.create({
      name: inputs.name,
      email: inputs.email,
      address: inputs.address,
      phone: inputs.phone,
      avatar: inputs.avatar,
      dayFrom: inputs.dayFrom,
      dayTo: inputs.dayTo
    }).fetch()
      .exec(function (err, created) {
        if (err)
          return exits.error(err);
        else
          return exits.success(created);
      })
  }
};
