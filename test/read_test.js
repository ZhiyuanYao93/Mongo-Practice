const assert = require('assert');
const User = require('../src/user');

describe('retrieve users from DB',()=>{

  let joe,maria,alex,zach;

  beforeEach((done)=>{

    alex = new User({name:'Alex'});
    maria = new User({name:'Maria'});
    zach = new User({name:'Zach'});
    joe = new User({name:'Joe'});

    Promise.all([joe.save(),maria.save(),zach.save(),alex.save()])
    .then(()=> done());
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

  it.only('Skip and limit the result set',(done)=>{
      User.find({})
      .sort({name:1})
      .skip(1)
      .limit(2)
      .then((users)=>{
        console.log(users);

        done();
      })
  });


});
