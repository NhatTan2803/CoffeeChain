module.exports = {


  friendlyName: 'Pass positions into staff page',


  description: '',


  inputs: {
  
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/coffee/boss/addStaff',
    }
  },


  fn: async function (inputs, exits) {
    try {
      const shopId = (await User.findOne({
        where: { id: this.req.cookies.id },
        select: ['shops']
      })).shops;
      const positions = await Role.find({
        where: { shops: shopId },
        select: ['name']
      });
      return exits.success({ positions });
    } catch (error) {
      return exits.error(error);
    }
  }


};
