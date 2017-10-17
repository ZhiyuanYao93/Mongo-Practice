const assert = require('assert');
const User = require('../src/user');

describe('retrieve users from DB',()=>{
  let joe;
  beforeEach((done)=>{
    joe = new User({name:'Joe'})
    joe.save()
      .then(()=>done());
  });
  it('find all users with name of Joe',(done)=>{
    User.find({name:'Joe'})
      .then((users)=>{
        console.log(users[0]._id);
        console.log(joe._id);
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particvular ID', (done)=>{
    User.findOne({_id: joe._id})
      .then((user)=>{
        assert(user.name === 'Joe');
        done();
      })
  });


});
