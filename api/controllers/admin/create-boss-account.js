module.exports = {


  friendlyName: 'Upload boss of shop avatar',


  description: '',

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
      isEmail: true,
      unique: true
    },
    password: {
      type: 'string',
      maxLength: 200
    },
    idCard: {
      type: 'string',
      maxLength: 15
    },
    birthday: {
      type: 'ref',
      columnType: 'date'
    },
    gender: {
      type: 'string'
    },
    avatar: {
      type: 'string',
      maxLength: 255
    },
    phone: {
      type: 'string',
      maxLength: 15
    },
    address: {
      type: 'string',
      maxLength: 100
    },
    active: {
      type: 'string',
      isIn: ['on', 'off']
    },
    shops: {
      type: 'string'
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
    User.create({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      idCard: inputs.idCard,
      birthday: inputs.birthday,
      gender: inputs.gender,
      phone: inputs.phone,
      address: inputs.address,
      active: inputs.active,
      permission: 'boss',
      shops: inputs.shops,
    }).fetch()
      .exec((err, created) => {
        if (err) {
          return exits.error('/main/addAccount-Boss');
        }
        inputs.photo.upload({
          dirname: require('path').resolve(sails.config.appPath, 'assets/images/users'),
          saveAs: function (__newFileStream, next) { return next(undefined, inputs.shops + '-boss-avatar.png'); },
          maxBytes: 1000000
        }, function (err, uploadedFiles) {
          if (err) {
            return exits.error('/main/addAccount-Boss');
          }
          if (uploadedFiles.length > 0) {
            User.update({
              id: created.id
            }, {
                avatar: require('path').basename(uploadedFiles[0].fd)
              }).exec((err, updated) => {
                if (err) {
                  return exits.error('/main/addAccount-Boss');
                }
                return exits.success('/main/listAccount-Boss');
              });
          }
        });
      });
  }
};