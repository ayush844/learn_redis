
---

## **5. Redis Hashes (In-Depth)**

### **What is a Redis Hash?**

* A **map/dictionary** stored inside a Redis key.
* Contains **field → value** pairs (both are strings).
* Ideal for storing **objects** (like a user profile) without creating multiple Redis keys.
* Similar to a **JSON object** but much lighter.

---

### **Why Use Redis Hashes?**

* Groups related data under **one Redis key**.
* Allows **partial updates** (change one field without touching others).
* Efficient memory usage when storing many small values.

---

### **Common Hash Commands**

#### **1. Set a Field**

```sh
HSET key field value
```

```sh
HSET user:1 name "Ayush"
HSET user:1 age "21"
```

#### **2. Set Multiple Fields**

```sh
HMSET key field1 value1 field2 value2 ...
```

```sh
HMSET user:1 name "Ayush" age "21" city "Delhi"
```

*(Note: In newer Redis versions, `HSET` can also take multiple field-value pairs, replacing `HMSET`.)*

```sh
HSET user:1 name "Ayush" age "21" city "Delhi"
```

#### **3. Get a Field**

```sh
HGET key field
```

```sh
HGET user:1 name   # Output: "Ayush"
```

#### **4. Get Multiple Fields**

```sh
HMGET key field1 field2 ...
```

```sh
HMGET user:1 name age   # Output: "Ayush", "21"
```

#### **5. Get All Fields and Values**

```sh
HGETALL key
```

```sh
HGETALL user:1
# Output: name Ayush age 21 city Delhi
```

#### **6. Check if a Field Exists**

```sh
HEXISTS key field
```

```sh
HEXISTS user:1 city   # Output: 1 (true)
```

#### **7. Get All Field Names**

```sh
HKEYS key
```

```sh
HKEYS user:1   # Output: ["name", "age", "city"]
```

#### **8. Get All Values**

```sh
HVALS key
```

```sh
HVALS user:1   # Output: ["Ayush", "21", "Delhi"]
```

#### **9. Increment a Numeric Field**

```sh
HINCRBY key field increment
```

```sh
HINCRBY user:1 age 1   # age = 22
```

#### **10. Increment by Float**

```sh
HINCRBYFLOAT key field increment
```

```sh
HINCRBYFLOAT user:1 score 5.5
```

#### **11. Delete a Field**

```sh
HDEL key field [field ...]
```

```sh
HDEL user:1 city
```

#### **12. Get Number of Fields**

```sh
HLEN key
```

```sh
HLEN user:1   # Output: 2
```

---

### **Node.js Example Using redis Package**

```javascript
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// Set multiple fields
await client.hSet('user:1', { name: 'Ayush', age: '21', city: 'Delhi' });

// Get one field
console.log(await client.hGet('user:1', 'name')); // Ayush

// Get multiple fields
console.log(await client.hGetAll('user:1')); 
// { name: 'Ayush', age: '21', city: 'Delhi' }

// Increment age
await client.hIncrBy('user:1', 'age', 1);

// Check if a field exists
console.log(await client.hExists('user:1', 'city')); // true

// Delete a field
await client.hDel('user:1', 'city');

await client.quit();
```

---

✅ **Key Takeaways**

* Hashes are **ideal for storing related attributes** under a single key.
* You can **update specific fields** without rewriting the whole object.
* Great for **user profiles, configurations, settings**.
* Keep in mind: all fields and values are still **strings**.

---
