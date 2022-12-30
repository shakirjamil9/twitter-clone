const express = require('express');
const router = express.Router();
const {
  getTweets,
  newTweet,
  followeeTweets,
  searchTweet,
  likeTweet,
  userLiked,
  likedBy,
  deleteTweet,
} = require('../controller/tweetController');

router.route('/').get(getTweets).post(newTweet);
router.route(':/id').delete(deleteTweet);

router.route('/followee').get(followeeTweets);
router.route('/search').get(searchTweet);
router.route('/like').post(likeTweet).get(userLiked);
router.route('/likedBy').get(likedBy);

module.exports = router;
