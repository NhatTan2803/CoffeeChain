/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
      maxLength: 100
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
      isIn: ['admin','boss','staff']
    }
  }

};

