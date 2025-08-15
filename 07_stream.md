

## **7. Redis Streams – In-Depth**

### **What is a Redis Stream?**

* A **log-like data structure** for storing **time-ordered messages**.
* Think of it like a **Kafka-lite** inside Redis.
* Each entry has:

  * **ID** (auto-generated or manual) → usually `timestamp-sequence`
  * **Field-Value pairs** (like a small JSON object)

📌 **Perfect for:**

* Event logging
* Chat messages
* Sensor data / IoT feeds
* Job queues where you need history

---

### **Key Properties**

* **Append-only**: New messages are added at the end.
* **Ordered**: Messages stay in the order they were added.
* **Persistent**: Stays until you delete it (not like Pub/Sub which is transient).
* Supports **consumer groups** for processing messages by multiple consumers.

---

## **Common Redis Stream Commands**

---

### **1. Add a Message**

```sh
XADD key ID field value [field value ...]
```

* `*` → auto-generate ID.

```sh
XADD mystream * name "Ayush" action "login"
# Output: "1723633823021-0" (auto ID)
```

---

### **2. Read Messages**

```sh
XRANGE key start end [COUNT n]
```

* `-` = first message
* `+` = last message

```sh
XRANGE mystream - +  
# Output: [ [ "1723633823021-0", [ "name", "Ayush", "action", "login" ] ] ]
```

---

### **3. Read in Reverse**

```sh
XREVRANGE key end start [COUNT n]
```

```sh
XREVRANGE mystream + -  # Reads latest first
```

---

### **4. Read New Messages (like a live feed)**

```sh
XREAD COUNT n BLOCK ms STREAMS key ID
```

* `$` = read only new messages after now
* `0` = read from start

```sh
XREAD BLOCK 0 STREAMS mystream $
# Waits for new messages
```

---

### **5. Create a Consumer Group**

* Lets multiple consumers share a stream without processing the same message twice.

```sh
XGROUP CREATE key groupname ID
```

```sh
XGROUP CREATE mystream mygroup 0
```

---

### **6. Read from a Consumer Group**

```sh
XREADGROUP GROUP groupname consumername COUNT n STREAMS key ID
```

```sh
XREADGROUP GROUP mygroup Ayush STREAMS mystream >
# ">" means new messages not yet delivered to this group
```

---

### **7. Acknowledge a Message**

```sh
XACK key groupname ID [ID ...]
```

```sh
XACK mystream mygroup 1723633823021-0
```

---

### **8. Delete a Message**

```sh
XDEL key ID [ID ...]
```

```sh
XDEL mystream 1723633823021-0
```

---

### **9. Get Stream Info**

```sh
XINFO STREAM key
XINFO GROUPS key
XINFO CONSUMERS key groupname
```

---

## **Node.js Example Using redis Package**

```javascript
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// Add messages to a stream
const id1 = await client.xAdd('mystream', '*', { name: 'Ayush', action: 'login' });
const id2 = await client.xAdd('mystream', '*', { name: 'Neha', action: 'purchase' });

console.log('Added messages with IDs:', id1, id2);

// Read all messages
console.log(await client.xRange('mystream', '-', '+'));

// Create a consumer group
try {
    await client.xGroupCreate('mystream', 'mygroup', '0', { MKSTREAM: true });
} catch (err) {
    if (!err.message.includes('BUSYGROUP')) throw err; // Ignore if already exists
}

// Read messages for a specific consumer
console.log(await client.xReadGroup('mygroup', 'Ayush', { key: 'mystream', id: '>' }));

// Acknowledge a message
await client.xAck('mystream', 'mygroup', id1);

await client.quit();
```

---

✅ **Key Takeaways**

* Streams = **time-ordered logs** with IDs and field-value data.
* Persistent (unlike Pub/Sub).
* Supports **consumer groups** for parallel processing.
* Great for **event sourcing**, **chat systems**, and **data pipelines**.

---

If you want, I can now explain **Redis Pub/Sub** next, so your notes will also cover **real-time messaging** (which is different from Streams). That way, you’ll have both **persistent (Streams)** and **ephemeral (Pub/Sub)** messaging in your notes.

Do you want me to do that next?
