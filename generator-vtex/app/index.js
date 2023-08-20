'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var vtexsay = require('vtexsay');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../templates'));

    this.vtexignore = {
      'ignore': ['.git']
    };
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  _ask: function() {
    var done = this.async();
    var self = this;

    this.log(vtexsay(
      'Welcome to the tremendous ' + chalk.red('VTEX') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s your VTEX app name?',
      validate: function(input) {
        var done = this.async();
        if (!new RegExp(/^[a-z\-\_]+$/).test(input)) {
          done(null, "The app name should only contain letters, '-' or '_'.");
        } else {
          done(null, true);
        }
      }
    }, {
      type: 'input',
      name: 'vendor',
      message: 'What\'s your VTEX account (vendor)?'
    }];

    this.prompt(prompts).then(function(props) {
      self.name = props.name;
      self.vendor = props.vendor;

      done();
    });
  },

  prompting: function () {
    this._ask();
  },

  _copyBasic: function() {
    this.fs.copyTpl(
      this.templatePath('_manifest.json'),
      this.destinationPath('manifest.json'),
      {
        name: this.name,
        vendor: this.vendor
      }
    );
    this.fs.copyTpl(
      this.templatePath('_vtexignore'),
      this.destinationPath('.vtexignore')
    );
    this.fs.copyTpl(
      this.templatePath('_storefront/src/utils/reporterOptions.js'),
      this.destinationPath('src/utils/reporterOptions.js')
    );
  },

  writing: function() {
    this._copyBasic();
  },

  install: function () {
    /*this.installDependencies({
      skipInstall: this.options['skip-install']
    });*/
  }
});
