const assert = require('assert');
const User = require('../src/user');

describe('Validation for records',()=>{
  it('requires a user name',()=>{
    const user = new User({name:undefined});
    const validationResult = user.validateSync();
    // console.log(validationResult);
    const {message} = validationResult.errors.name;
    assert(message === 'Name is required.')
   });

   it('requires a name to be longer than 2 characters',()=>{
     const user = new User({name:"AB"});
     const validationResult = user.validateSync();
     const {message} = validationResult.errors.name;
     assert(message === 'Name must be longer than 2 characters.');
   });

   it('disallow invalid record to be saved',(done)=>{
     const user = new User({name:"AB"});
     user.save()
      .catch((validationResult)=>{
        const {message} = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
   });
});
