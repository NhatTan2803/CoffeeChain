module.exports = {


  friendlyName: 'Get account list',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
        viewTemplatePath: './pages/coffee/admin/listAccount'
    },
    notFound: {
      // description: 'The data of accounts are empty',
      // respondType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    await User.find({
      where: { id: this.req.cookies.id },
      select: ['name', 'email', 'shops','active', 'phone']
    })
      .populate('shops')
      .exec(function (err, account) {
        if (err) return exits.error(err);
        if (account.length == 0) {
          return exits.notFound();
        }
        return exits.success({account:account});
      })
  }


};
