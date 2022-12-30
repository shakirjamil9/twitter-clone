const mongoose = require('mongoose');

const retryOperation = async (fn) => {
  let retryCount = 0;
  while (true) {
    try {
      await fn();
      console.log('Succeeded');
    } catch (error) {
      retryCount++;
      console.log(`Attempted count ${retryCount}`);

      if (retryCount >= 3) {
        console.log('Maximum Retry Reached');

        console.log(error, 'error');
        break;
      }
      await sleep(2000 * retryCount);
    }
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

// const callMyApi = async () => {
//   return mongoose.connect(
//     'mongodb+srv://shakir:shakir@practice-cluster.wjq6c.mongodb.net/twitter-clone?retryWrites=true&w=majority'
//   );
// };
// retryOperation(callMyApi).then((val) => {
//   console.log(val);
// });

module.exports = retryOperation;
