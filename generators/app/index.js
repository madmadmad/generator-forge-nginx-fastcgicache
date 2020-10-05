'use strict';
const Generator = require('yeoman-generator');
const os = require('os');
const util = require('util');
const chalk = require('chalk');


module.exports = class extends Generator {

  async initializing() {
    this.props = {};
    this.props.config = {
      siteName: '',     //string
      webroot: '',      //string 
      phpVersion: '',   //string
      maxPostSize: 16,  //int
      cacheKey: '',     //string
      sslCert: '',      //string
      sslKey: '',       //string
      gzipOn: true,     //bool
      wordpress: true,  //bool
    }
  }

  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'outputDir',
        message: 'Where should the files be output to?',
        default: '/Desktop',
        store: true,
      },
      {
        type: 'input',
        name: 'siteName',
        message: 'What is your site name in Forge?',
        store: true,
      },
      {
        type: 'input',
        name: 'webroot',
        message: 'What is your project webroot?',
        default: 'public',
        store: true,
      },
      {
        type: 'list',
        name: 'phpVersion',
        message: 'What version of PHP are you using?',
        choices: [
          'PHP 7.4',
          'PHP 7.3',
          'PHP 7.2',
          'PHP 7.1',
          'PHP 7.0',
          'PHP 5.6'
        ],
        filter: function(val){
          const version = val.split(' ')[1];
          
          return version;
        }
      },
      {
        type: 'input',
        name: 'maxPostSize',
        message: 'What is the maximum allowed size of the client request body? (Set to 0 for unlimited).',
        default: 16,
        store: true,
      },
      {
        type: 'input',
        name: 'cacheKey',
        message: 'What is your FastCGI Cache Key? One word, please.',
        store: true,
        filter: function(val){
          return val.toUpperCase();
        }
      },
      {
        type: 'input',
        name: 'sslCert',
        message: 'SSL Certificate line, e.g. ssl_certificate /etc/nginx/ssl/example.com/1234567/server.crt;',
        default: '',
        store: true,
      },
      {
        type: 'input',
        name: 'sslKey',
        message: 'SSL Key line, e.g. ssl_certificate /etc/nginx/ssl/example.com/1234567/server.key;',
        default: '',
        store: true,
      },
      {
        type: 'confirm',
        name: 'gzipOn',
        message: 'Do you want to enable use of static gzip files?',
        default: true,
        store: true,
      },
      {
        type: 'confirm',
        name: 'wordpress',
        message: `Send WordPress users/bots home? (Redirects any matching WP login/admin/config link to the official WP site.)`,
        default: true,
      },
    ];

    const props = await this.prompt(prompts);
    // To access props later use this.props.someAnswer;
    this.props.config = props;
  }

  writing() {
    this.log(chalk.blue("Writing template files with project information..."));

    const output = this.props.config.outputDir;
    this.fs.copyTpl(
      this.templatePath('nginx.conf'),
      this.destinationPath(`${os.homedir()}/${output}/nginx.conf`),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${os.homedir()}/${output}/README.md`),
      this.props
    )
  }

  async end(){ 
    this.log(chalk.green("Files written successfully."));
  }
};
