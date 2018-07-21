const Parse = require('parse/node');

class User extends Parse.User {
  constructor() {
    super('_User');
  }

  toJSON(attrs = [
    'lastName',
    'fullName',
    'photo',
    'sex',
    'email',
    'firstName',
    'phone',
    'sessionToken',
    'username'
  ]) {

    const json = { id: this.id };

    if (typeof attrs === 'string') {
      return json;
    }

    attrs.forEach(name => {
      if (this.get(name)) {
        json[name] = this.get(name);
      }
    });

    return json;
  }
}

module.exports = User;
Parse.Object.registerSubclass('_User', User);
