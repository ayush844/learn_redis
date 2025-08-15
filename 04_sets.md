

## **4. Redis Sets (In-Depth)**

### **What is a Redis Set?**

* An **unordered collection** of **unique** strings.
* No duplicate values allowed.
* Automatically removes duplicates when adding.
* Order is **not guaranteed** (different from Lists).
* Useful for:

  * **Tags** (e.g., user interests)
  * **Unique visitors**
  * **Membership checks**
  * **Common/unique items between datasets**

---

### **Common Set Commands**

#### **1. Add Elements to a Set**

```sh
SADD key value [value ...]
```

```sh
SADD fruits "apple" "banana" "cherry"
SADD fruits "apple"   # Duplicate ignored
```

#### **2. Get All Members**

```sh
SMEMBERS key
```

```sh
SMEMBERS fruits   # Output: ["apple", "banana", "cherry"]
```

#### **3. Check if Value Exists**

```sh
SISMEMBER key value
```

```sh
SISMEMBER fruits "apple"  # Output: 1 (true)
SISMEMBER fruits "mango"  # Output: 0 (false)
```

#### **4. Remove Elements**

```sh
SREM key value [value ...]
```

```sh
SREM fruits "banana"
```

#### **5. Get Number of Elements**

```sh
SCARD key
```

```sh
SCARD fruits   # Output: 2
```

#### **6. Pop Random Elements**

```sh
SPOP key [count]
```

```sh
SPOP fruits 2   # Removes and returns 2 random elements
```

#### **7. Get Random Elements (without removal)**

```sh
SRANDMEMBER key [count]
```

```sh
SRANDMEMBER fruits 2
```

#### **8. Set Operations**

These are **mathematical set operations**:

* **Intersection** (common elements)

```sh
SINTER key1 key2
```

```sh
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"
SINTER set1 set2   # Output: ["b", "c"]
```

* **Union** (all unique elements)

```sh
SUNION key1 key2
```

```sh
SUNION set1 set2   # Output: ["a", "b", "c", "d"]
```

* **Difference** (elements in set1 but not in set2)

```sh
SDIFF key1 key2
```

```sh
SDIFF set1 set2    # Output: ["a"]
```

---

### **Node.js Example Using redis Package**

```javascript
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// Add elements
await client.sAdd('fruits', 'apple', 'banana', 'cherry');
await client.sAdd('fruits', 'apple'); // Duplicate ignored

// Get all members
console.log(await client.sMembers('fruits')); // [ 'apple', 'banana', 'cherry' ]

// Check membership
console.log(await client.sIsMember('fruits', 'banana')); // true

// Remove an element
await client.sRem('fruits', 'banana');

// Get set size
console.log(await client.sCard('fruits')); // 2

// Random pop
console.log(await client.sPop('fruits', 1));

// Set operations
await client.sAdd('set1', 'a', 'b', 'c');
await client.sAdd('set2', 'b', 'c', 'd');
console.log(await client.sInter('set1', 'set2')); // [ 'b', 'c' ]
console.log(await client.sUnion('set1', 'set2')); // [ 'a', 'b', 'c', 'd' ]
console.log(await client.sDiff('set1', 'set2'));  // [ 'a' ]

await client.quit();
```

---

✅ **Key Takeaways**

* **Unique elements** only (duplicates automatically ignored).
* No guaranteed order of elements.
* Perfect for **tags, memberships, unique tracking**.
* Powerful **set operations** for intersections, unions, and differences.

---
