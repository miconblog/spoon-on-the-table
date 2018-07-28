const Parse = require('parse/node');

class Table extends Parse.Object {
  constructor(user) {
    super('Table');

    if (user) {
      const acl = new Parse.ACL(user);
      acl.setPublicReadAccess(true);
      this.set('host', user);
      this.setACL(acl);
    }
  }

  toJSON() {
    const json = { id: this.id };
    const attrs = [
      'title',
      'alcohol',
      'startDate',
      'endDate',
      'eventType',
      'explainTheWay',
      'explainTheMenu',
      'minPerson',
      'maxPerson',
      'address',
      'geoPoint',
      'photos',
      'price',
      'host',
    ];

    attrs.forEach(name => {
      if (this.get(name)) {
        json[name] = this.get(name);
      }
    });

    return json;
  }
}

module.exports = Table;
Parse.Object.registerSubclass('Table', Table);
