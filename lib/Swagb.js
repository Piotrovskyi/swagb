const SwagbPath = require('./SwagbPath');
const SwagbRequest = require('./SwagbRequest');
const SwagbResponse = require('./SwagbResponse');

class Swagb {
  constructor(version) {
    this._openapi = version;
    this._info = {};
    this._paths = {};
    this._components = {};
  }

  static api(version) {
    return new Swagb(version);
  }

  info(info) {
    this._info = info;
    return this;
  }

  paths(paths) {
    this._paths = paths;
    return this;
  }

  components(components) {
    this._components = components;
    return this;
  }

  _compilePaths(paths) {
    const compiledPaths = {};
    for (const [path, pathObj] of Object.entries(paths)) {
      compiledPaths[path] = pathObj.compile();
    }
    return compiledPaths;
  }

  compile() {
    return {
      openapi: this._openapi,
      info: this._info,
      paths: this._compilePaths(this._paths),
      components: this._components,
    };
  }

  static get() {
    return new SwagbPath('get');
  }

  static post() {
    return new SwagbPath('post');
  }

  static put() {
    return new SwagbPath('put');
  }

  static delete() {
    return new SwagbPath('delete');
  }

  static patch() {
    return new SwagbPath('patch');
  }

  static request() {
    return new SwagbRequest();
  }

  static response() {
    return new SwagbResponse();
  }
}

module.exports = Swagb;
