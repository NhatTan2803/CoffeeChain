module.exports = {


  friendlyName: 'Update shop',


  description: '',


  inputs: {
    id: {
      type: 'number'
    },
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

  },


  fn: async function (inputs, exits) {
    
    Shop.update({ id: inputs.id }, {
      name: inputs.name,
      email: inputs.email,
      address: inputs.address,
      phone: inputs.phone,
      dayFrom: inputs.dayFrom,
      dayTo: inputs.dayTo
    }).fetch()
      .exec(function (err, updated) {
        if (err) {
          exits.error(err);
        }
        return exits.success(updated);
      })
  }


};
