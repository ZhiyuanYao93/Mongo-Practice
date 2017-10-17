// Deprecation Warning:
// const mongoose = require('mongoose');
//
// mongoose.connect('mongodb://localhost/users_test');
//
// mongoose.connection
//   .once('open',()=>{console.log('All good to go!')})
//   .on('error',(error)=>{
//     console.warn('Warning: ', error);
//   });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done)=>{
  mongoose.connect('mongodb://localhost/users_test', {
   useMongoClient: true
  })
  .then((db) => {done();})
  .catch((error) => console.warn('Warning', error));
});



// add a hook to clean before test.
//need to tell Mocha to have a little pause
beforeEach((done)=>{
  const {users,comments,blogposts} = mongoose.connection.collections;

  //drop collections sequentially because MongoDB cannot drop multiple collections at the same time 
  users.drop(()=>{
      comments.drop(()=>{
          blogposts.drop(()=>{
            done();
          });
      });
  });
});
