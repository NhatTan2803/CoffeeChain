module.exports = {


  friendlyName: 'Create bill detail',


  description: '',


  inputs: {
    name: {
      type: 'string',
    },
    quantity: {
      type: 'number',
    },
    drinkSubtotal: {
      type: 'number',
    },
    price: {
      type: 'number',
    },
    bills: {
      type: 'number'
    },
    drinks: {
      type: 'number'
    }
  },

  exits: {

  },


  fn: async function (inputs, exits) {
    let newdrink = await BillDetail.create({
      drinkName: inputs.name,
      quantity: inputs.quantity,
      drinkSubtotal: inputs.drinkSubtotal,
      price: inputs.price,
      bills: inputs.bills,
      drinks: inputs.drinks
    }).fetch()
    return exits.success(newdrink);
  }
};
