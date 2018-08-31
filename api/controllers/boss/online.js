module.exports = {


  friendlyName: 'Online',


  description: 'Online boss.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    if (!this.req.isSocket) {
      return exits.error('Only a client socket can subscribe to Louies.  But you look like an HTTP request to me.');
    }
    let lastBill = await OnlineOrder.find({ sort: 'id DESC', limit: 1 });
    OnlineOrder.subscribe(this.req, lastBill);
    return exits.success('Okay');
  }


};
