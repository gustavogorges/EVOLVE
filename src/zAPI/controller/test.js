module.exports = () => {
    const appComponent = require("../../app/app.component")
    const customerWalletsDB = require('../data/test.json');
    const controller = {};
  
    controller.errorLogs = (req, res) => {
        console.log(req.body);
        appComponent.callErrorLogModal()
        req.body
        res.status(200)
    };

    // controller.errorLogs = (req, res) => res.status(200).json(customerWalletsDB);
    return controller;
  }