/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    birthday: {
      type: 'ref',
      columnType: 'date'
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    //////////////
    points: {
      collection: 'Point',
      via: 'customers'
    },
    reviews: {
      collection: 'Review',
      via: 'customers'
    },
    historybuys: {
      collection: 'HistoryBuy',
      via: 'customers'
    }

  },
  beforeCreate: function (customer, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(customer.password, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        if (hash) {
          customer.password = hash;
          return cb(null, customer);
        }
      });
    });
  },
  comparePassword: function (password, customer, cb) {
    bcrypt.compare(password, customer.password, function (err, match) {
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

