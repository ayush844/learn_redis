# Redis

---

## 🔹 What is Redis?

Redis (**RE**mote **DI**ctionary **S**erver) is:

* An **open-source**, **in-memory**, **key–value data store**.
* Often called a **NoSQL database** because it doesn’t use tables/rows like SQL.
* Extremely **fast** (millions of requests/sec) because all data is stored in RAM.
* Can be used as:

  * **Database** (primary store, especially for caching and quick lookups)
  * **Cache** (reduce load on a relational DB by storing frequently accessed data)
  * **Message Broker** (using Pub/Sub or Streams)
  * **Session Store** (commonly in web apps)

---

## 🔹 Key Features of Redis

1. **In-Memory Storage**

   * Data lives in RAM (very fast).
   * Can persist data to disk using **RDB snapshots** or **AOF logs**.

2. **Data Structures** (not just strings!)
   Redis supports advanced data types:

   * **Strings** → simple key-value (`"username" → "Ayush"`)
   * **Hashes** → like objects/dictionaries
   * **Lists** → linked lists, good for queues
   * **Sets** → unique unordered collections
   * **Sorted Sets** → sets ordered by a score (great for leaderboards)
   * **Bitmaps, HyperLogLogs, Streams, Geospatial indexes**

3. **Persistence Options**

   * **RDB (Redis Database Backup)** → saves snapshots at intervals
   * **AOF (Append Only File)** → logs every write operation for durability
   * Can use both for safety.

4. **Replication & High Availability**

   * **Master-Slave replication** → multiple copies of the DB
   * **Redis Sentinel** → automatic failover and monitoring
   * **Redis Cluster** → sharding + distributed storage

5. **Pub/Sub Messaging System**

   * Publish messages to channels, multiple clients can subscribe.

6. **Atomic Operations**

   * All operations on a single key are atomic (no race conditions).

7. **Extremely Fast**

   * Response time in microseconds.
   * Written in C, optimized for speed.

---

## 🔹 Redis Architecture

At a high level:

```
Client <-----> Redis Server <-----> Storage (RAM + optional disk persistence)
```

* **Client** → can be Node.js, Python, Java, etc.
* **Redis Server** → handles requests (default port: `6379`)
* **Memory** → stores keys and values
* **Optional Disk** → for persistence

---

## 🔹 How Data Flows

Let’s say you’re caching user profile data:

1. User requests profile → your backend checks **Redis**.
2. If the data is **in Redis (cache hit)** → return instantly.
3. If **not in Redis (cache miss)**:

   * Fetch from MySQL/Postgres
   * Store in Redis for next time (with optional TTL)
   * Return to user

👉 This pattern is called **cache-aside** (common with Redis).

---

## 🔹 Redis Commands (Common Examples)

### 1. Strings

```sh
SET user:1 "Ayush"
GET user:1
```

### 2. Hashes

```sh
HSET user:1 name "Ayush" age 21
HGET user:1 name
HGETALL user:1
```

### 3. Lists

```sh
LPUSH tasks "task1"
LPUSH tasks "task2"
LRANGE tasks 0 -1
```

### 4. Sets

```sh
SADD tags "nodejs"
SADD tags "redis"
SMEMBERS tags
```

### 5. Sorted Sets

```sh
ZADD leaderboard 100 "Ayush"
ZADD leaderboard 200 "Rohan"
ZRANGE leaderboard 0 -1 WITHSCORES
```

### 6. Pub/Sub

```sh
SUBSCRIBE news
PUBLISH news "Redis 7.0 released!"
```

---

## 🔹 Redis Use Cases

1. **Caching** → Speed up DB queries & API responses
2. **Session Store** → Store login sessions in web apps
3. **Leaderboards & Ranking** → Sorted sets make this easy
4. **Real-time Analytics** → Track counts, likes, views in real time
5. **Pub/Sub Messaging** → Chat apps, notifications
6. **Queues / Task Processing** → With lists and streams
7. **Rate Limiting** → Control API requests per user

---

## 🔹 Example: Using Redis in Node.js

```js
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

// Set a value
await client.set('username', 'Ayush');

// Get the value
const value = await client.get('username');
console.log(value); // Ayush

// Set a value with expiration (60s)
await client.setEx('otp:1234', 60, '9876');
```

---

## 🔹 Performance Stats

* **Latency:** <1 ms
* **Throughput:** millions of ops/sec
* **Memory Efficiency:** Highly optimized
* **Best for:** Data that’s accessed **frequently and updated often**

---

## 🔹 Quick Analogy

Think of Redis like a **super-fast notepad** on your desk (RAM),
while your SQL database is a **big cupboard of files** (disk).
If you need something **quickly**, you first check the notepad.
If it’s not there, you open the cupboard, find it, and jot it down in your notepad for next time.

---
