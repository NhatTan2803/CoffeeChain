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

    User.find({ shops: inputs.id, permission: 'boss' })
      .exec((err, found) => {
        if (err) {
          return exits.error(err);
        }
        if (found.length === 0) {
          return exits.success({
            message: 'This shop has no boss'
          });
        } else {
          inputs.photo.upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/users'),
            saveAs: function (__newFileStream, next) { return next(undefined, inputs.id + '-boss-avatar.png'); },
            maxBytes: 1000000
          }, function (err, uploadedFiles) {
            if (err) {
              return exits.error(err);
            }
            if (uploadedFiles.length > 0) {
              User.update({
                permission: 'boss', shops: inputs.id
              }, {
                  avatar: require('path').basename(uploadedFiles[0].fd)
                }).exec((err, update) => {
                  if (err) {
                    return exits.error(err);
                  }
                  return exits.success({
                    message: 'Uploading avatar for boss successed'
                  });
                })
            } else {
              return exits.missing({
                message: 'Missing photo'
              });
            }
          })
        }
      })
  }
};