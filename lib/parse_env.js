const port = process.env.PORT || 3000;
const appId = 'MY_APP_ID_IS_HERE';
const serverURL = `http://localhost:${port}/parse`;
const masterKey = 'This is master key';
const fileKey = 'This is optional';

module.exports = {
  appId,
  serverURL,
  masterKey,
  fileKey
};
