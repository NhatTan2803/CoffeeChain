/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    user_shop_id: {
      type: 'number'
    },
    user_name: {
      type: 'string',
      maxLength: 50
    },
    user_email: {
      type: 'string',
      isEmail: true,
      unique: true
    },
    user_password: {
      type: 'string',
      maxLength: 200
    },
    user_idcard: {
      type: 'string',
      maxLength: 15
    },
    user_birthday: {
      type: 'ref',
      columnType: 'date'
    },
    user_gender: {
      type: 'string'
    },
    user_avatar: {
      type: 'string',
      maxLength: 255
    },
    user_phone: {
      type: 'string',
      maxLength: 15
    },
    user_address: {
      type: 'string',
      maxLength: 100
    },
    user_active: {
      type: 'string',
      isIn: ['on','off']
    },
    user_position_id: {
      type: 'number'
    },
    user_permission: {
      type: 'string',
      isIn: ['admin', 'boss', 'staff']
    }
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.user_password, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        if (hash) {
          user.user_password = hash;
          return cb(null, user);
        }
      });
    });
  },
  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.user_password, function (err, match) {
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

