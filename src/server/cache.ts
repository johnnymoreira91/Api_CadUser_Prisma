//@ts-ignore
import redis from 'promise-redis'
//@ts-ignore
const client = redis.createClient({
  port: 6379,
  host: process.env.REDIS_URL
})
//@ts-ignore
client.on("error", function () {
  console.error('error on redis');
});

export default client