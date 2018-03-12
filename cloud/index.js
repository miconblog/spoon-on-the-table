const Parse = require('parse/node');
const duplicateUser = require('./duplicateUser');

/**
 * 중복 유저 확인
 */
Parse.Cloud.define('duplicateUser', duplicateUser);
