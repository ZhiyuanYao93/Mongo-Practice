//assert from Mocha
const assert = require('assert');
//access to User.js
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');

describe('Associations',()=>{
  let joe,blogPost,comment;

  beforeEach((done)=>{
    joe = new User({name:'Joe'});
    blogpost = new BlogPost({title:'JS and me.',content:"Hello World"});
    comment = new Comment({content:'Hi,great post!'});

    joe.blogposts.push(blogpost);

    blogpost.comments.push(comment);

    comment.user = joe;



      Promise.all([joe.save(),

                  blogpost.save(),

                  comment.save()
    ])
    .then(()=>done());
  });

  it('saves a relation between a user and a blogpost',(done)=>{
    User.findOne({name:'Joe'})
    .populate('blogposts')
    .then((user)=>{
      console.log(user.blogposts[0]);
      assert(user.blogposts[0].title === 'JS and me.');
      done();
    });
  });


  it('saves a full relation graph',(done)=>{
    User.findOne({name:'Joe'})
    .populate({
      path:'blogposts',
      populate: {
        path:'comments',
        model:'comment',
        populate:{
          path:'user',
          model:'user'
        }
      }
    })
    .then((user)=>{
      console.log(user);
      assert(user.name === 'Joe');
      assert(user.blogposts[0].title === 'JS and me.');
      assert(user.blogposts[0].comments[0].content === 'Hi,great post!');
      assert(user.blogposts[0].comments[0].user.name === 'Joe');
      done();
    });
  });
});
