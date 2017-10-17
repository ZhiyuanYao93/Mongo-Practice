const assert = require('assert');
const User = require('../src/user');

describe('Update records',()=>{
  let joe;

  beforeEach((done)=>{
    joe = new User({name:'Joe'});
    joe.save()
      .then(()=>done());
  });

  function assertName(operation,done){
    operation
      .then(() => User.find({}))
      .then((users)=>{
        assert(users.length === 1);
        assert(users[0].name === 'Mike');
        done();
      });
  }

  it('instance using set and save',(done)=>{
      // console.log(joe);
      joe.set('name','Mike')

      assertName(joe.save(),done);

  });

  it('instance using update',(done)=>{
    assertName(joe.update({name:'Mike'}),done);
  });

  it('Class using update to all records ',(done)=>{
    assertName(User.update({name:'Joe'},{name:'Mike'}),done);
  });

  it('Class using update to one record ',(done)=>{
      assertName(User.findOneAndUpdate({name:'Joe'},{name:'Mike'}),done);
  });

  it('Class find by Id and update',(done)=>{
      assertName(User.findByIdAndUpdate(joe._id,{name:'Mike'}),done);
  });
});
