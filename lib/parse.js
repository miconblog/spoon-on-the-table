import {
  appId,
  serverURL
} from './parse_env';

import Parse from 'parse';

Parse.initialize(appId);
Parse.serverURL = serverURL;

export default Parse;