import Database from 'better-sqlite3';
import Jackd from 'jackd';

const beanstalkd = new Jackd();
const db = new Database('bot-node.db');

async function foo() {

  // get all feeds from DB
  let feeds = db.prepare('select feed from feeds').all();

  // console.log('!!!',feeds.length);

  let count = 0;

  await beanstalkd.connect()

  for (let feed of feeds) {
    await beanstalkd.put(feed.feed)
  }

  await beanstalkd.disconnect()

}

foo();
