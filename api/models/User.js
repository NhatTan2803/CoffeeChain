/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {

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

    permission: {
      type: 'string',
      isIn: ['admin', 'boss', 'staff']
    },
////////////////
    shops: {
      model: 'Shop',
      columnName: 'ShopId',
    },

    positions: {
      model: 'Roll' ,
      columnName: 'PositionId',

    },
/////////////////
    bills: {
      collection: 'Bill',
      via:'users'
    }


  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        if (hash) {
          user.password = hash;
          return cb(null, user);
        }
      });
    });
  },
  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
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

