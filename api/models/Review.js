/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Review_cus_id: {
      type:'number',
    },
    Review_shop_id: {
      type:'number',
    },
    Review_star: {
      type:'number',
    },
    Review_content: {
      type:'string'
    }
  },

};

