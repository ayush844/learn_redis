
## **6. Redis Sorted Sets (ZSets) – In-Depth**

### **What is a Sorted Set?**

* Similar to a **Set** (unique values, no duplicates)
* **Each value has an associated score** (floating-point number).
* **Ordered** by score (ascending by default).
* Useful for:

  * Leaderboards (games, competitions)
  * Ranking systems
  * Priority queues
  * Time-based sorting

---

### **How It Works**

* You store **member** + **score** pairs.
* Members are **unique**, scores can be **duplicate**.
* Sorting is **based on score**, not value.

---

### **Common Sorted Set Commands**

#### **1. Add Elements**

```sh
ZADD key score member [score member ...]
```

```sh
ZADD leaderboard 100 "Ayush"
ZADD leaderboard 150 "Sharma"
```

#### **2. Get Elements by Rank**

* Ascending order:

```sh
ZRANGE key start stop [WITHSCORES]
```

```sh
ZRANGE leaderboard 0 -1 WITHSCORES
# Output: Ayush 100, Sharma 150
```

* Descending order:

```sh
ZREVRANGE key start stop [WITHSCORES]
```

#### **3. Get Elements by Score**

```sh
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
```

```sh
ZRANGEBYSCORE leaderboard 50 120 WITHSCORES
```

#### **4. Remove Elements**

```sh
ZREM key member [member ...]
```

```sh
ZREM leaderboard "Ayush"
```

#### **5. Get Rank of Member**

* Ascending rank:

```sh
ZRANK key member
```

* Descending rank:

```sh
ZREVRANK key member
```

```sh
ZRANK leaderboard "Sharma"    # Output: 1
```

#### **6. Increment a Member’s Score**

```sh
ZINCRBY key increment member
```

```sh
ZINCRBY leaderboard 20 "Ayush"  # Ayush's score increases by 20
```

#### **7. Remove by Score**

```sh
ZREMRANGEBYSCORE key min max
```

```sh
ZREMRANGEBYSCORE leaderboard 0 100
```

#### **8. Remove by Rank**

```sh
ZREMRANGEBYRANK key start stop
```

```sh
ZREMRANGEBYRANK leaderboard 0 0   # Removes lowest score
```

#### **9. Count Members by Score**

```sh
ZCOUNT key min max
```

```sh
ZCOUNT leaderboard 100 200
```

---

### **Node.js Example Using redis Package**

```javascript
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// Add elements with scores
await client.zAdd('leaderboard', [
  { score: 100, value: 'Ayush' },
  { score: 150, value: 'Sharma' },
  { score: 120, value: 'Neha' }
]);

// Get all in ascending order
console.log(await client.zRangeWithScores('leaderboard', 0, -1));
// [ { value: 'Ayush', score: 100 }, { value: 'Neha', score: 120 }, { value: 'Sharma', score: 150 } ]

// Get top scorer
console.log(await client.zRevRangeWithScores('leaderboard', 0, 0));
// [ { value: 'Sharma', score: 150 } ]

// Increase Ayush's score
await client.zIncrBy('leaderboard', 50, 'Ayush');

// Get rank of Ayush (descending)
console.log(await client.zRevRank('leaderboard', 'Ayush')); // 0 (now top)

await client.quit();
```

---

✅ **Key Takeaways**

* Sorted Sets = **Set + Score + Sorted Order**.
* Perfect for **leaderboards, rankings, time-based lists**.
* Supports range queries by **score** or **rank**.
* Scores are **floating-point numbers**, so you can store fractional priorities.

---
