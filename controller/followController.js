const Follower = require('../models/followerModel');
const { catchAsync } = require('../utils/catchAsync');

exports.follow = catchAsync(async (req, res) => {
  await Follower.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Successfully followed',
  });
});
