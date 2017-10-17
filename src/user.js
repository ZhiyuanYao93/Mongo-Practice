const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name:{
    type:String,
    validate:{
      validator:(name)=> name.length > 2,
      message:'Name must be longer than 2 characters.'
    },
    required:[true,'Name is required.']
  },
  // postCount:Number,
  posts:[PostSchema],
  blogposts:[{
    type:Schema.Types.ObjectId,
    ref:'blogpost'
  }],
  likes:Number
});

UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});

UserSchema.pre('remove',function(next){
    const blogpost = mongoose.model('blogpost');

    blogpost.remove({_id : {$in : this.blogposts}})
    .then(()=>next());


});

const User = mongoose.model('user',UserSchema);
module.exports = User;
