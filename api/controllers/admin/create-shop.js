const path = require('path')

module.exports = {


  friendlyName: 'Create shop',


  description: 'Create new shop',

  files: ['photo'],

  inputs: {
    photo: {
      example: '===',
      required: true
    },
    name: {
      type: 'string',
      maxLength: 50
    },
    email: {
      type: 'string',
      isEmail: true
    },
    address: {
      type: 'string'
    },
    phone: {
      type: 'string',
      maxLength: 15
    },
    avatar: {
      type: 'string'
    },
    dayFrom: {
      type: 'ref',
      columnType: 'date'
    },
    dayTo: {
      type: 'ref',
      columnType: 'date'
    },
    systems: {
      type: 'number'
    },
  },


  exits: {
    error: {
      responseType: 'redirect',
    },
    success: {
      responseType: 'redirect',
    }
  },


  fn: async function (inputs, exits) {
    const shop = await Shop.create({
      name: inputs.name,
      email: inputs.email,
      address: inputs.address,
      phone: inputs.phone,
      avatar: inputs.avatar,
      dayFrom: inputs.dayFrom,
      dayTo: inputs.dayTo,
      systems: inputs.systems
    }).fetch()
    
    if (!shop) {
      return exits.error('/main/addShop')
    }

    const files = await new Promise((resolve, reject) => {
      inputs.photo.upload({
        dirname: path.resolve(sails.config.appPath, 'uploads/shops'),
        saveAs: shop.id + '-shop-avatar.png',
        maxBytes: 1000000
      }, (error, result) => {
        error ? reject(error) : resolve(result)
      })
    })

    const result = await Shop.update({ id: shop.id }, { avatar: path.basename(files[0].fd) }).fetch()

    if (!result) {
      return exits.error('/main/addShop')
    }

    return exits.success('/main/listShop')
  }
};
