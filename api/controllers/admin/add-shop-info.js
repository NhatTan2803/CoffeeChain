module.exports = {


  friendlyName: 'Add shop info to create boss view',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/coffee/admin/addAccountBoss',
    }

  },


  fn: async function (inputs, exits) {
    await Shop.find({
      select: ['id', 'name']
    }).exec(function (err, found) {
      if (err) return exits.error(err);
      return exits.success({ found });
    })
  }
};

