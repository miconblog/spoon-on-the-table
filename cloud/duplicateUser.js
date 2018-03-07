const Parse = require('parse/node');

module.exports = function (request, response) {

  const {
    email
  } = request.params;

  const query = new Parse.Query(Parse.User);
  query.equalTo("email", email);
  query.find()
    .then((users) => {

      if (users.length === 0) {
        response.success("NO")
      } else {
        response.success("YES");
      }
    })
    .catch(() => {
      response.error("movie lookup failed");
    });
}