const crypto = require('crypto');
const request = require('supertest');
const baseURL = 'http://localhost:3500/api/v1';

describe('GET /tweets', () => {
  const newTweet = {
    _id: crypto.randomUUID(),
    user_id: 'new user',
    tweet: 'this is my new tweet',
  };

  beforeAll(async () => {
    await request(baseURL).post('/tweets').send(newTweet);
  });

  afterAll(async () => {
    await request(baseURL).delete(`/tweets/${newTweet._id}`);
  });

  test('should return 200', async () => {
    const response = await request(baseURL).get('/tweets');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
  });

  test('should return tweets', async () => {
    const response = await request(baseURL).get('/tweets');
    expect(response.body.tweets.length >= 1).toBe(true);
  });
});
