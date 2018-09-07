module.exports = {


  friendlyName: 'Update shipping',


  description: 'Update shipping boss.',


  inputs: {
    id: {
      type: 'number'
    },
    status: {
      type: 'string',
    }
  },


  exits: {
  },


  fn: async function (inputs, exits) {
    try {
      await OnlineOrder.update({
        id: inputs.id
      }).set({
        bills: inputs.bills,
        status: inputs.status
      })

      sails.sockets.broadcast('shipping', 'confirm', { status: inputs.status, id: inputs.id });
      return exits.success({
        update: 'success'
      });

    } catch (err) {
      return exits.error(err);
    }
  }


};

