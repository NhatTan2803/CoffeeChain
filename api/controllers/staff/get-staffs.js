module.exports = {


  friendlyName: 'Get staff list',


  description: '',


  inputs: {

  },


  exits: {
    success:{
      responseType: "view",
      viewTemplatePath: './pages/coffee/Boss/listStaff',
    }
  },


  fn: async function (inputs, exits) {
    try {
      const shopId = (await User.findOne({
        where: { id: this.req.cookies.id },
        select: ['shops']
      })).shops;

      const staffs = await User.find({
        where: { shops: shopId, permission: 'staff' },
        select: ['avatar', 'name', 'positions', 'phone', 'email', 'active']
      }).populate('positions');

      return exits.success({'staffs' : staffs});
    } catch (err) {
      return exits.console.error(err);

    }
  }


};
