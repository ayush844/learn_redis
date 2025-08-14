
## **3. Redis Lists (In-Depth)**

### **What is a Redis List?**

* A **linked list** of strings.
* Elements are **ordered** (insertion order is preserved).
* Supports **push** and **pop** operations from both ends (head/tail).
* Can hold up to **4 billion** elements.
* Perfect for **queues, stacks, message streams, recent activity logs**.

---

### **Common List Commands**

#### **1. Push to a List**

* **Left push (LPUSH)** → Adds to the head (start).
* **Right push (RPUSH)** → Adds to the tail (end).

```sh
LPUSH mylist "A" "B" "C"   # mylist = C, B, A
RPUSH mylist "D" "E"       # mylist = C, B, A, D, E
```

#### **2. Pop from a List**

* **Left pop (LPOP)** → Removes from the head.
* **Right pop (RPOP)** → Removes from the tail.

```sh
LPOP mylist  # Removes C → mylist = B, A, D, E
RPOP mylist  # Removes E → mylist = B, A, D
```

#### **3. Get List Elements**

```sh
LRANGE key start stop
```

```sh
LRANGE mylist 0 -1  # Get all elements
LRANGE mylist 0 2   # First 3 elements
```

#### **4. List Length**

```sh
LLEN key
```

```sh
LLEN mylist  # Output: 3
```

#### **5. Remove Elements by Value**

```sh
LREM key count value
```

* `count > 0` → remove first `count` occurrences from head.
* `count < 0` → remove from tail.
* `count = 0` → remove all occurrences.

```sh
LREM mylist 1 "A"  # Removes first "A"
```

#### **6. Trim a List**

Keeps only the elements between `start` and `stop` indexes.

```sh
LTRIM key start stop
```

```sh
LTRIM mylist 0 1  # Keep only first 2 elements
```

#### **7. Get/Set element at index**

```sh
LINDEX key index
LSET key index value
```

```sh
LINDEX mylist 0       # Get first element
LSET mylist 1 "Z"     # Change second element to "Z"
```

#### **8. Blocking Pop**

Waits until a value is available before popping.

```sh
BLPOP key timeout
BRPOP key timeout
```

```sh
BLPOP queue 0  # Wait indefinitely for a new item
```

#### **9. Move Element Between Lists**

```sh
RPOPLPUSH source destination
```

```sh
RPOPLPUSH tasks processing
```

---

### **Node.js Example (redis package)**

```javascript
import { createClient } from 'redis';

// Create Redis client
const client = createClient();
client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// Push items
await client.lPush('mylist', 'A', 'B', 'C'); // List = C, B, A
await client.rPush('mylist', 'D', 'E');      // List = C, B, A, D, E

// Pop items
console.log(await client.lPop('mylist')); // C
console.log(await client.rPop('mylist')); // E

// Get all elements
console.log(await client.lRange('mylist', 0, -1)); // [ 'B', 'A', 'D' ]

// List length
console.log(await client.lLen('mylist')); // 3

// Set and Get by index
await client.lSet('mylist', 1, 'Z');
console.log(await client.lIndex('mylist', 1)); // Z

// Trim list to first 2 elements
await client.lTrim('mylist', 0, 1);

await client.quit();
```

---

✅ **Key Takeaways**

* **LPUSH/RPUSH** for adding elements at either end.
* **LPOP/RPOP** for removing elements.
* **Blocking pops** (`BLPOP`, `BRPOP`) are useful for **message queues**.
* Ideal for **FIFO (queue)** and **LIFO (stack)** patterns.

---

