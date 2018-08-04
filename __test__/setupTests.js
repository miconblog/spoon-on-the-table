const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

Enzyme.configure({ adapter: new Adapter() });
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
  userAgent: 'node.js',
};
