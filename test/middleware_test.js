//assert from Mocha
const assert = require('assert');
//access to User.js
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const mongoose = require('mongoose');

describe('Middleware',()=>{
  let joe,blogpost;
  beforeEach((done)=>{
    joe = new User({name:'Joe'});
    blogpost = new BlogPost({title:'JS and me.',content:"Hello World"});

    joe.blogposts.push(blogpost);

    Promise.all([
      joe.save(),
      blogpost.save()
    ])
    .then(()=>done());
  });

  it('users cleanup dangling blogposts on removal', (done)=>{
    joe.remove()
    .then(()=> BlogPost.count())
    .then((count)=>{
      assert(count === 0);
      done();
    })
  });
});
