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
    },
    systems: {
      type: 'number'
    },
  },


  exits: {
    success: {

    }
  },


  fn: async function (inputs, exits) {
    var newShop = await Shop.create({
      name: inputs.name,
      email: inputs.email,
      address: inputs.address,
      phone: inputs.phone,
      avatar: inputs.avatar,
      dayFrom: inputs.dayFrom,
      dayTo: inputs.dayTo,
      systems: inputs.systems
    }).fetch()
      .exec(function (err, created) {
        if (err)
          return exits.error(err);
        else
          return exits.success(created);
      })



  }


};
