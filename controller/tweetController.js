const Tweet = require('../models/tweetModel');
const Follower = require('../models/followerModel');
const Like = require('../models/likeModel');

const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getTweets = catchAsync(async (req, res, next) => {
  const tweets = await Tweet.find().populate('user_id');
  if (!tweets.length) return next(new AppError('Tweets not found', 404));
  res.status(200).json({
    status: 'success',
    tweets,
  });
});

exports.newTweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweet.create(req.body);
  res.status(201).json({
    status: 'success',
    tweet,
  });
});

exports.deleteTweet = catchAsync(async (req, res, next) => {
  await Tweet.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'Tweet deleted',
  });
});

exports.followeeTweets = catchAsync(async (req, res, next) => {
  const followees = await Follower.find({ user_id: req.body.user_id });
  const listOfFolloweesId = followees.map((followee) => followee.following_id);
  const followeeTweets = await Tweet.find({
    user_id: { $in: listOfFolloweesId },
  }).populate('user_id');

  res.status(200).json({
    status: 'success',
    result: followeeTweets.length,
    followeeTweets,
  });
});

exports.searchTweet = catchAsync(async (req, res, next) => {
  const tweets = await Tweet.find({ $text: { $search: req.body.tweet } });
  if (!tweets.length) {
    return next(new AppError('No tweets found', 404));
  }
  res.status(200).json({
    status: 'success',
    tweets,
  });
});

exports.likeTweet = catchAsync(async (req, res, next) => {
  await Like.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Tweet liked',
  });
});

exports.userLiked = catchAsync(async (req, res, next) => {
  const likedTweets = await Like.find({ user_id: req.body.user_id }).populate(
    'tweet_id'
  );
  res.status(200).json({
    status: 'success',
    likedTweets,
  });
});

exports.likedBy = catchAsync(async (req, res, next) => {
  const tweetsLikedBy = await Like.find({
    tweet_id: req.body.tweet_id,
  }).populate('user_id');
  res.status(200).json({
    status: 'success',
    tweetsLikedBy,
  });
});
