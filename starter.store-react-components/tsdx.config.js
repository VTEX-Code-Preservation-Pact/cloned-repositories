const json = require('@rollup/plugin-json');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  rollup(config, options) {
    config.plugins.push(json(),);
    return config;
  },
};
