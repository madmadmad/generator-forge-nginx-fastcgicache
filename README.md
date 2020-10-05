# generator-forge-nginx-fastcgicache

A simple yeoman generator for creating nginx config files that utilize FastCGI cache, gzipping, and other helpful settings. Made specifically for sites hosted on Laravel Forge.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-forge-nginx-fastcgicache using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-forge-nginx-fastcgicache
```

Then generate your new project:

```bash
yo forge-nginx-fastcgicache
```


## License

MIT

## Acknowledgments 

Special thanks to Andrew Welch at [nystudio107](https://nystudio107.com/) for the boilerplate, instruction, and inspiration. [Forge Nginx Example](https://github.com/nystudio107/nginx-craft/blob/master/forge-example/NginxConfiguration.conf) | [Static Page Caching with Craft CMS](https://nystudio107.com/blog/static-caching-with-craft-cms)