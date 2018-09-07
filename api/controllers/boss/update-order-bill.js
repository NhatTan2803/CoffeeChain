module.exports = {


  friendlyName: 'Update order bill',


  description: '',


  inputs: {
    id: {
      type: 'number'
    },
    bills: {
      type: 'number'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    try {
      await OnlineOrder.update({
        id: inputs.id
      }).set({
        bills: inputs.bills,
      });
      sails.sockets.broadcast('shipping', 'billId', { id: inputs.id, billId: inputs.bills });
      return exits.success({
        update: 'success'
      });


    } catch (err) {
      return exits.error(err);
    }
  }


};
