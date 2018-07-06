module.exports = {


  friendlyName: 'Create',


  description: 'Create staff.',

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
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    idCard: {
      type: 'string',
    },
    birthday: {
      type: 'ref',
      columnType: 'date'
    },
    gender: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    active: {
      type: 'string',
      isIn: ['on', 'off']
    },
    position: {
      type: 'number'
    },
    shop: {
      type: 'number'
    },
    avatar: {
      type: 'string'
    }
  },


  exits: {
    success: {
      responseType: 'redirect',
    }
  },


  fn: async function (inputs, exits) {
    try {
      const shopId = (await User.findOne({
        where: { id: this.req.cookies.id },
        select: ['shops']
      })).shops;

      var createdStaff = await User.create({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        idCard: inputs.idCard,
        birthday: inputs.birthday,
        gender: inputs.gender,
        phone: inputs.phone,
        address: inputs.address,
        active: inputs.active,
        permission: 'staff',
        shops: shopId,
        positions: inputs.position,
        avatar: inputs.avatar
      }).fetch();
    } catch (error) {
      return exits.error(error);
    }
    sails.log("here");
    inputs.photo.upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images/users'),
      saveAs: function (__newFileStream, next) {
        return next(undefined, createdStaff.id + '-staff.png');
      },
      maxBytes: 1000000
    }, (uploadingError, uploadedFiles) => {
      if (uploadingError) {
        return exits.error(uploadingError);
      }
      if (uploadedFiles.length > 0) {
        User.update({
          id: createdStaff.id
        }, {
            avatar: require('path').basename(uploadedFiles[0].fd)
          })
          .exec((updatedError, updated) => {
            if (updatedError) {
              return exits.error(updatedError);
            }
            return exits.success('/main-shop/list-staff');
          })
      }
    });

  }


};
