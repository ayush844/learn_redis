

## **1. Redis Data Types Overview**

Redis is an **in-memory key-value store** that supports multiple **data structures**, not just plain strings.
Each **key** in Redis can store **one type** of value.
Here are the main Redis data types:

| Data Type             | Description                                       | Common Use Cases                         |
| --------------------- | ------------------------------------------------- | ---------------------------------------- |
| **String**            | Binary-safe text or data (up to 512MB)            | Caching, counters, session tokens        |
| **List**              | Ordered collection of strings (linked list)       | Queues, stacks, recent activity logs     |
| **Set**               | Unordered collection of unique strings            | Tags, unique visitors, membership checks |
| **Sorted Set (ZSet)** | Like Set, but each value has a score for ordering | Leaderboards, rankings                   |
| **Hash**              | Key-value pairs inside a Redis key                | User profiles, objects                   |
| **Bitmap**            | Binary bit arrays stored inside strings           | Tracking online users, flags             |
| **HyperLogLog**       | Approximate cardinality counting                  | Unique visitor count                     |
| **Stream**            | Log-like data structure                           | Event logging, message queues            |

---

## **2. Redis Strings (In-Depth)**

### **What is a Redis String?**

* A **binary-safe** sequence of bytes.
* Can store text, numbers, or even binary data (like images).
* **Max size**: 512 MB per string.
* Values are **atomic** (you can replace the entire value in one operation).

---

### **Common String Commands**

#### **1. Set a value**

```sh
SET key value
```

```sh
SET name "Ayush"
GET name   # Output: "Ayush"
```

#### **2. Get a value**

```sh
GET key
```

```sh
GET name   # Output: "Ayush"
```

#### **3. Set value only if key does not exist**

```sh
SETNX key value
```

```sh
SETNX name "Sharma"   # Will NOT overwrite because `name` already exists
```

#### **4. Set value with expiration (seconds)**

```sh
SETEX key seconds value
```

```sh
SETEX session:123 60 "user_data"   # Expires in 60 seconds
```

#### **5. Increment / Decrement a number**

```sh
INCR key
DECR key
INCRBY key number
DECRBY key number
```

```sh
SET counter 10
INCR counter     # counter = 11
INCRBY counter 5 # counter = 16
DECR counter     # counter = 15
```

#### **6. Append to existing string**

```sh
APPEND key value
```

```sh
SET greet "Hello"
APPEND greet " World"  # greet = "Hello World"
```

#### **7. Get string length**

```sh
STRLEN key
```

```sh
SET msg "Hello"
STRLEN msg   # Output: 5
```

#### **8. Get substring**

```sh
GETRANGE key start end
```

```sh
SET name "Ayush Sharma"
GETRANGE name 0 4  # Output: "Ayush"
```

#### **9. Set substring**

```sh
SETRANGE key offset value
```

```sh
SET greet "Hello World"
SETRANGE greet 6 "Redis"  # greet = "Hello Redis"
```

#### **10. Multiple set / get**

```sh
MSET key1 value1 key2 value2 ...
MGET key1 key2 ...
```

```sh
MSET name "Ayush" age "21"
MGET name age   # Output: "Ayush", "21"
```

#### **11. Increase/Decrease floating-point numbers**

```sh
INCRBYFLOAT key value
```

```sh
SET price 19.99
INCRBYFLOAT price 5.01  # price = 25.00
```

---

### **Node.js Example Using redis Package**

```javascript
import { createClient } from 'redis';

// Create Redis client
const client = createClient();
client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// Set and Get a String
await client.set('name', 'Ayush');
console.log(await client.get('name')); // Ayush

// Increment counter
await client.set('counter', 10);
await client.incr('counter'); // counter = 11

// Append text
await client.append('name', ' Sharma');
console.log(await client.get('name')); // Ayush Sharma

// Set with expiration
await client.setEx('session:123', 60, 'user_data');

// Get multiple keys
await client.mSet({ key1: 'value1', key2: 'value2' });
console.log(await client.mGet('key1', 'key2'));

await client.quit();
```

---

✅ **Key Takeaways**

* Redis strings are **not just plain text** — they can store numbers, binary data, JSON, etc.
* They are **atomic** — operations are safe even in concurrent environments.
* **Versatile use cases**: caching, counters, sessions, and message passing.

