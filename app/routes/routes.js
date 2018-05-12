/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachRoutes = (app, controllers) => {
    fs.readdirSync(__dirname)
        .filter((fileName) => fileName.includes('.routes'))
        .forEach((routeFile) => {
            const routeModulePath = path.join(__dirname, routeFile);

            require(routeModulePath)(app, controllers);
        });
};

module.exports = attachRoutes;