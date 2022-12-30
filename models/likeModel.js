const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
  tweet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tweet',
    // required: true,
  },
});

const Like = mongoose.model('like', likeSchema);

module.exports = Like;
