/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {

    userName: {
      type: 'string',
      maxLength: 50
    },
    userEmail: {
      type: 'string',
      isEmail: true,
      unique: true
    },
    userPassword: {
      type: 'string',
      maxLength: 200
    },
    userIdCard: {
      type: 'string',
      maxLength: 15
    },
    userBirthday: {
      type: 'ref',
      columnType: 'date'
    },
    userGender: {
      type: 'string'
    },
    userAvatar: {
      type: 'string',
      maxLength: 255
    },
    userPhone: {
      type: 'string',
      maxLength: 15
    },
    userAddress: {
      type: 'string',
      maxLength: 100
    },
    userActive: {
      type: 'string',
      isIn: ['on', 'off']
    },

    userPermission: {
      type: 'string',
      isIn: ['admin', 'boss', 'staff']
    },
////////////////
    shops: {
      model: 'Shops',
      columnName: 'userShopId',
      required: true
    },

    positions: {
      model: 'Positions',
      columnName: 'userPositionId',
      required: true,
    },
/////////////////
    bills: {
      collection: 'Bills',
      via:'users'
    }


  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.userPassword, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        if (hash) {
          user.userPassword = hash;
          return cb(null, user);
        }
      });
    });
  },
  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.userPassword, function (err, match) {
      if (err) {
        return cb(err);
      }
      if (match) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    });
  }
};

