const Parse = require('parse/node');

class UserCache extends Parse.Object {
  constructor(user) {
    super('UserCache');

    if (user) {
      const acl = new Parse.ACL(user);
      this.set('member', user);
      this.setACL(acl);
    }
  }

  toJSON(attrs = ['table', 'tablePhotos']) {
    const json = { id: this.id };

    attrs.forEach(name => {
      json[name] = this.get(name);
    });

    return json;
  }
}

module.exports = UserCache;
Parse.Object.registerSubclass('UserCache', UserCache);
