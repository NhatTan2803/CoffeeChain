module.exports = {


  friendlyName: 'Shipping',


  description: 'Shipping boss.',


  inputs: {
    cart: {
      type: 'json'
    },
    shippingAddress: {
      type: 'string'
    },
    phone: {
      type: 'number'
    },
    bills: {
      type: 'number'
    }
  },


  exits: {
  },


  fn: async function (inputs, exits) {
    try {
      let newOrder = await OnlineOrder.create({
        shippingAddress: inputs.shippingAddress,
        cart: inputs.cart,
        phone: inputs.number,
        bills: inputs.bills
      }).fetch();

      let lastBill = await OnlineOrder.find({ where: { idConfirmed: false }, sort: 'id DESC', limit: 3, select: 'id' });

      if (newOrder) {
        sails.sockets.broadcast('shipping', 'new', newOrder);
        return exits.success({
          order: 'success'
        });
      }
    } catch (err) {
      return exits.error(err);
    }
  }


};
