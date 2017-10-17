//assert from Mocha
const assert = require('assert');
//access to User.js
const User = require('../src/user');

describe('Creating records',()=>{
  it('saves a user',(done)=>{
    const jose = new User({name:'Trump'});
    jose.save()
      .then(
        ()=>{
          //Is jose a new object in DB?
          assert(!jose.isNew);
          done();
        }
      );
  });
});
