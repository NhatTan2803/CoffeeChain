module.exports = {


  friendlyName: 'Upload boss of shop avatar',


  description: '',

  files: ['photo'],

  inputs: {
    photo: {
      example: '===',
      required: true
    },
    id: {
      type: 'number',
      required: true
    }
  },
  exits: {
    missing: {
      description: 'No photo was uploaded'
    },
    success: {
      description: 'Photo uploaded'
    }
  },


  fn: async function (inputs, exits) {

    await User.find({ shops: inputs.id, permission: 'boss' })
      .exec(function (err, found) {
        if (err) {
          return exits.error(err)
        }
        sails.log(found.length);
        if (found.length === 0) {
          return exits.success('This shop is missing boss');
        } else {
          inputs.photo.upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/users'),
            saveAs: function (__newFileStream, next) { return next('boss-of-shop-' + inputs.id + '.png'); },
            maxBytes: 1000000
          }, async function (err, uploadedFiles) {
            if (err) {
              return exits.error(err);
            }
            if (uploadedFiles > 0) {
              await User.update({
                permission: 'boss', shops: inputs.id
              }, {
                  avatar: require('path').basename(uploadedFiles[0].fd)
                })
              return exits.success({
                message: 'Uploading avatar for boss successed'
              });
            }
            return exits.missing({
              message: 'Missing photo'
            })
          })
        }
      })
  }
};