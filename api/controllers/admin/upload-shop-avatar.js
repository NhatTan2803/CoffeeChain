module.exports = {


  friendlyName: 'Upload shop avatar',


  description: 'Upload new avatar or change it',

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


  fn: function (inputs, exits) {

    inputs.photo.upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/shops'),
      saveAs: function (__newFileStream, next) { return next(undefined, inputs.id + '-shop-avatar.png'); },
      maxBytes: 1000000
    }, async function (err, uploadedFiles) {
      if (err) return exits.error(err);
      if (uploadedFiles.lenghth > 0) {
        await Shop.update({
          id: inputs.id
        }, {
            avatar: require('path').basename(uploadedFiles[0].fd)
          }).fetch()
          .exec(function (err, update) {
            if (err) {
              exits.error(err)
            }
          })
        return exits.success({
          message: 'Uploading avatar successed'
        });
      }
      return exits.missing({
        message: 'Missing photo'
      })
    })
  }
};
