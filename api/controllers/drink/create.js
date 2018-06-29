module.exports = {


  friendlyName: 'Create',


  description: 'Create drink.',

  files: ['photo'],

  inputs: {
    photo: {
      example: '===',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      columnType: 'decimal'
    },
    shops: {
      type: 'number'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      var createdDrink = await Drink.create({
        name: inputs.name,
        price: inputs.price,
        avatar: inputs.avatar,
        shops: inputs.shops
      }).fetch();
    } catch (error) {
      return exits.error(error);
    }
    sails.log("SHOPSID : " + createdDrink.shops);
    inputs.photo.upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/drinks'),
      saveAs: function (__newFileStream, next) {
        return next(undefined, createdDrink.id + '-drink.jpg');
      },
      maxBytes: 1000000
    }, (uploadingError, uploadedFiles) => {
      if (uploadingError) {
        return exits.error(uploadingError);
      }
      if (uploadedFiles.length > 0) {
        Drink.update({
            id: createdDrink.id
          }, {
            avatar: require('path').basename(uploadedFiles[0].fd)
          })
          .exec((updatedError, updatedDrink) => {
            if (updatedError){
              return exits.error(updatedError);
            }
            return exits.success(updatedDrink);
          })
      }
    });

  }


};
