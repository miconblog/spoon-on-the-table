const Parse = require('parse/node');
class UserCache extends Parse.Object {
  constructor() {
    super('UserCache');
  }

  toJSON() {
    const table = this.get('table');
    return {
      id: this.id,
      table
    }
  }
}

module.exports = UserCache;
Parse.Object.registerSubclass('UserCache', UserCache);
