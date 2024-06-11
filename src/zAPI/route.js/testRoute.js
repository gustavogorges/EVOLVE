module.exports = app => {
    const controller = require('../controller/test')();
  
    app.route('/evolve/api/errors')
      .post(controller.errorLogs);
  }