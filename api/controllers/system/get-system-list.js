module.exports = {


  friendlyName: 'Get system list',


  description: '',


  inputs: {

  },


  exits: {
    success: {

    }
  },


  fn: async function (inputs, exits) {
    await System.find()
    .populate('shops')
    .populate('points')
    .exec((err, result)=>{
      if (err) {
        return exits.error(err);
      }
      return exits.success(result);
    }); 

  }


};
