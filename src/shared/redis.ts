/* eslint-disable no-unused-vars */
import { createClient, SetOptions } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});
const redisPubClient = createClient({
  url: config.redis.url,
});
const redisSubClient = createClient({
  url: config.redis.url,
});
redisClient.on('error', error => console.log('redis error:', error));
redisClient.on('connect', error => console.log('redis Connect'));
const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};
const set = async (
  key: string,
  value: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options);
};
const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};
const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token: ${userId}`;
  await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
};
const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token: ${userId}`;
  return await redisClient.get(key);
};
const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token: ${userId}`;
  await redisClient.del(key);
};
const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};
export const RedisClinet = {
  connect,
  disconnect,
  get,
  set,
  del,
  getAccessToken,
  delAccessToken,
  setAccessToken,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscriber: redisSubClient.subscribe.bind(redisSubClient),
};
