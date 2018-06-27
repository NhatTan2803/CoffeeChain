const moment = require('moment');
module.exports = {


  friendlyName: 'Get shop info',


  description: '',


  inputs: {
    shop: {
      type: 'number',
      description: 'ID of shop to look up'
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/coffee/admin/listShop',
    },
    notFound: {
      description: 'No shop with the specified ID was found',
      respondType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    await Shop.find({
      select: ['id','name', 'address','phone', 'dayFrom', 'dayTo']
    }).populate('systems')
      .exec(function (err, found) {
        if (err) return exits.error(err);
        return exits.success({found,moment});
      })
  }


};
