var assert = require('assert');
var ohaithere = require('../lib/ohaithere.js');

assert.equal(
  ohaithere.hello(),
  'Hello from the ohiathere module',
  'Expected "Hello from the ohiathere module". Got '+ohaithere.hello()+''
);
