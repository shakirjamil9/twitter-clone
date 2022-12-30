const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  following_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Follower = mongoose.model('follower', followerSchema);

module.exports = Follower;
