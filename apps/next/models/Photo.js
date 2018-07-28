const Parse = require('parse/node');

class Photo extends Parse.Object {
  constructor(user) {
    super('Photo');
  }

  toJSON() {
    const json = { id: this.id };
    const attrs = ['image', 'key', 'size'];

    attrs.forEach(name => {
      if (this.get(name)) {
        json[name] = this.get(name);
      }
    });

    return json;
  }
}

module.exports = Photo;
Parse.Object.registerSubclass('Photo', Photo);
