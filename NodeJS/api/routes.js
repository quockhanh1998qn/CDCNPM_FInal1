'use strict';
module.exports = function(app) {
  let controller = require('./controller');
  app.route('/pdf').post(controller.post)
};