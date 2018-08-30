module.exports = {


  friendlyName: 'Shipping',


  description: 'Shipping boss.',


  inputs: {
    shippingAddress: {
      type: 'string'
    },
    billId: {
      type: 'number'
    }
  },


  exits: {
  },


  fn: async function (inputs, exits) {
    try {
      let newOrder = await OnlineOrder.create({
        shippingAddress: inputs.shippingAddress,
        bills: inputs.billId
      }).fetch();

      let lastBill = OnlineOrder.find({ sort: 'id DESC', limit: 1 });
      if (newOrder) {
        OnlineOrder.publish(lastBill, {
          verb: 'created',
          address: inputs.shippingAddress
        });
        return exits.success({
          order: 'success'
        });
      }
    } catch (err) {
      return exits.error(err);
    }
  }


};
