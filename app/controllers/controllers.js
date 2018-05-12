/* globals __dirname */

const fs = require('fs');
const path = require('path');

const getControllers = (data) => {
    const controllersObject = {};

    fs.readdirSync(path.join(__dirname, './api.controllers'))
        .filter((fileName) => fileName.includes('.controller'))
        .forEach((controllerFile) => {
            const modulePath =
                path.join(__dirname, `./api.controllers/${controllerFile}`);

            const currentController = require(modulePath);
            controllersObject[currentController.name] = currentController(data);
        });

    return controllersObject;
};

module.exports = getControllers;