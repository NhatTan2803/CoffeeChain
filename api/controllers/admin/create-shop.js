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
    Shop.create({
      name: inputs.name,
      email: inputs.email,
      address: inputs.address,
      phone: inputs.phone,
      avatar: inputs.avatar,
      dayFrom: inputs.dayFrom,
      dayTo: inputs.dayTo,
      systems: inputs.systems
    }).fetch()
      .exec(function (err, created) {
        if (err) {
          return exits.error('/main/addShop');
        }
        inputs.photo.upload({
          dirname: require('path').resolve(sails.config.appPath, 'assets/images/shops'),
          saveAs: function (__newFileStream, next) { return next(undefined, created.id + '-shop-avatar.png'); },
          maxBytes: 1000000
        }, function (err, uploadedFiles) {
          if (err) {
            return exits.error('/main/addShop');
          }
          if (uploadedFiles.length > 0) {
            Shop.update({
              id: created.id
            }, {
                avatar: require('path').basename(uploadedFiles[0].fd)
              }).exec((err, updated) => {
                if (err) {
                  return exits.error('/main/addShop');
                }
                return exits.success('/main/listShop');
              });
          }
        });
      })
  }
};
