const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments',()=>{
  it('create a subdocument',(done)=>{
    const joe = new User({name:'Joe',
                posts:[{title:'Hello World!'}]
              });
    joe.save()
      .then(()=> User.findOne({name:'Joe'}))
      .then((user)=>{
        assert(user.posts[0].title === 'Hello World!');
        done();
      });
  });


  it('add subdocument to existing record',(done)=>{
    const joe = new User({name:'Joe',
                posts:[]
              });
    // save -> fetch -> modify -> save -> fetch -> verify
    joe.save()
    .then(()=> User.findOne({name:'Joe'}))
    .then((user)=>{
        user.posts.push({title:'FirstPost'});
        return user.save();
    })
    .then(()=> User.findOne({name:'Joe'}))
    .then((user)=>{
      assert(user.posts[0].title === 'FirstPost');
      done();
    });
  });


  it('remove subdocument from existing record',(done)=>{
    const joe = new User({
      name:'Joe',
      posts:[{title:'FirstPost'}]
    });
    // save -> fetch -> modify -> save -> fetch -> verify
    joe.save()
    .then(()=> User.findOne({name:'Joe'}))
    .then((user)=>{
        const post = user.posts[0];
        user.posts.remove(post);

        return user.save();
    })
    .then(()=> User.findOne({name:'Joe'}))
    .then((user)=>{
      assert(user.posts.length === 0);
      done();
    });
  });

});
