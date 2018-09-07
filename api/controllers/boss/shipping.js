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
  },


  exits: {
  },


  fn: async function (inputs, exits) {
    try {
      let newOrder = await OnlineOrder.create({
        shippingAddress: inputs.shippingAddress,
        cart: inputs.cart,
        phone: inputs.phone,
      }).fetch();

      if (newOrder) {
        sails.sockets.broadcast('shipping', 'new', newOrder);
        return exits.success({
          orderId: newOrder.id
        });
      }
    } catch (err) {
      return exits.error(err);
    }
  }


};
