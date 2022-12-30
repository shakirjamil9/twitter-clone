const superagent = require('superagent');
const retryOperation = require('../utils/retry');

const externalApi = () => {
  return superagent
    .put('/api/tweets')
    .send({ name: 'Shakir', tweet: 'This is my tweet' });
};

const externalApi2 = () => {
  return superagent
    .put('/api/meta')
    .send({ tweetid: 'tweetID', meta: 'metaInfo' });
};

exports.updateDataVisualization = async (req, res, next) => {
  const response = await retryOperation(externalApi);
  if (!response.code === 'ECONNREFUSED') {
    const response2 = await retryOperation(externalApi2);

    if (response2.code === 'ECONNREFUSED') {
      superagent.delete({ tweetid: 'tweetId' }); // first operation deleting
      res.status(400).json({
        status: 'fail',
        message: `Couldn't complete operation`,
      });
    }
  }
  res.status(400).json({
    status: 'fail',
    message: `Couldn't start operation`,
  });
};
