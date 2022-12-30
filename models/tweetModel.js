const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  tweet: {
    type: String,
    required: [true, 'Empty tweet is not allowed'],
  },
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;
