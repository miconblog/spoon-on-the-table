const Parse = require('parse/node');
const Photo = require('../models/Photo');

module.exports = nextApp => async (req, res) => {
  const { params: { section }, query } = req;
  const sectionName = section || query.section;

  if (!req.user) {
    return res.redirect('/sign');
  }

  // 유저 사진을 다 불러서 넣어준다.
  let photos = null;
  if (sectionName === 'media') {
    const pq = new Parse.Query(Photo);
    pq.equalTo('author', req.user);
    pq.containedIn('tags', ['profile']);

    try {
      const results = await pq.find();
      photos = results.map(r => r.toJSON());
    } catch (ex) {
      photos = [];
    }
  }

  return nextApp.render(req, res, '/users/edit', {
    section: sectionName,
    photos,
  });
};
