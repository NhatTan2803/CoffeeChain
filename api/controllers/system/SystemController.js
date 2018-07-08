/**
 * SystemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  inputs: {
    name: {
      description: 'The name of company',
      type: 'string',
      required: true
    },
    address: {
      description: 'Address of company',
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: ''
    },

  },
  /**
   * `SystemController.create()`
   */
  create: async function (inputs, exits) {
    var system = await system.create({
      name: inputs.name,
      address: inputs.address
    }).fetch();
    return exits.success();
  },

  /**
   * `SystemController.getList()`
   */
  getList: async function (inputs, exits) {
    try {
      const systems = await System.find()
        .populate('shops')
        .populate('points')
        .fetch();
      return this.exits.success(systems);
    } catch (error) {
      return this.exits.error(error);
    }
  },

  /**
   * `SystemController.getSystemInfo()`
   */
  getSystemInfo: async function (inputs, exits) {
    try {
      const result = await System.findOne({
        id: req.param('id')
      }).populate('shops')
        .populate('points')
        .fetch();
    } catch (error) {
      return this.exits.errror(error);
    }
  }

};

