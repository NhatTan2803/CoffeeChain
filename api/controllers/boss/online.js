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

    sails.sockets.join(this.req, 'shipping', (err) => {
      if (err) {
        return exits.error(err);
      }

      return exits.success({
        message: 'Subscribed to a fun room called shipping !'
      });
    });

  }

};
