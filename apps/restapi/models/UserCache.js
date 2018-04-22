const Parse = require('parse/node');
class UserCache extends Parse.Object {
  constructor() {
    super('UserCache');
  }

  toJSON(attrs = ['table', 'test']) {

    const json = { id: this.id };

    attrs.forEach(name => {
      json[name] = this.get(name);
    });

    return json;
  }
}

module.exports = UserCache;
Parse.Object.registerSubclass('UserCache', UserCache);
