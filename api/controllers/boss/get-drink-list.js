module.exports = {


  friendlyName: 'Get drink list',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: "view",
      viewTemplatePath: './pages/coffee/Boss/listDrink',
      
    },
    notFound: {
      description: 'The data of drinks are empty',
      respondType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    try {

      const shopId = (await User.findOne({
        where: { id: this.req.cookies.id },
        select: ['shops']
      })).shops;

      const drinkList = await Drink.find({
        where: {
          shops: shopId
        },
        select: ['name', 'price', 'avatar']
      });
      
      return exits.success({drinkList : drinkList});
    } catch (err) {
      return exits.error(err);
    }
  }


};
