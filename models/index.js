const db = require('./database');
const User = require('./user');
const World = require('./world');
const Post = require('./post');
const Comment = require('./comment');

World.belongsTo(User);
User.hasMany(World);

Post.belongsTo(World);
World.hasMany(Post);

Post.belongsTo(User);
User.hasMany(Post);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

module.exports = {
  db,
  User,
  World,
  Post,
  Comment
};
