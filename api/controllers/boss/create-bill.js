module.exports = {


  friendlyName: 'Create bill',


  description: '',


  inputs: {
    total: {
      type: 'number',

    },
    cash: {
      type: 'number',
    },
    change: {
      type: 'number',
    },
    /////////////////
    users: {
      type: 'ref',
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    if (inputs.users === 'Unknown') {
      Bill.create({
        total: inputs.total,
        cash: inputs.cash,
        change: inputs.change,
      }).fetch()
        .exec((err, created) => {
          if (err) {
            return exits.error({
              success: 'fail'
            })
          }
          return exits.success({ success: 'ok', billId: created.id });
        })
    }
    else {
      Bill.create({
        total: inputs.total,
        cash: inputs.cash,
        change: inputs.change,
        users: inputs.users
      }).fetch()
        .exec((err, created) => {
          if (err) {
            return exits.error({
              success: 'fail'
            })
          }
          return exits.success({ success: 'ok', billId: created.id });
        })
    }

  }


};
