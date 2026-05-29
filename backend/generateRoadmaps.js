/**
 * COMPLETE ROADMAP GENERATOR + SEEDER
 * Generates 12 new roadmaps + keeps existing ones
 * Run: node generateRoadmaps.js
 */
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

if (!process.env.MONGODB_URI) { console.error('❌ MONGODB_URI missing in .env'); process.exit(1); }

// ─── Helper ───────────────────────────────────────────────────
const L = (title, summary, diff, mins, content, resources, tasks) => ({
  _id: new ObjectId(), title, summary, difficulty: diff,
  estimatedTime: mins, order: 0, content,
  resources: (resources || []),
  tasks: (tasks || []).map(d => ({ description: d }))
});
const M = (title, level, icon, lessons) => ({ _id: new ObjectId(), title, level, icon, order: 0, lessons });

// ═══════════════════════════════════════════════════════════════
// ALL 12 NEW ROADMAPS
// ═══════════════════════════════════════════════════════════════
const newRoadmaps = [

// ─────────────────────────────────────────────────────────────
// 1. DATA STRUCTURES & ALGORITHMS
// ─────────────────────────────────────────────────────────────
{
  title: 'Data Structures & Algorithms',
  description: 'Master DSA from arrays to graphs, dynamic programming, and FAANG-style problem solving. Essential for placements and top tech interviews.',
  type: 'skill', category: 'DSA',
  icon: '🧩', color: '#6366f1',
  tags: ['Arrays','Linked Lists','Trees','Graphs','DP','LeetCode','FAANG'],
  estimatedHours: 150, totalLessons: 16,
  modules: [
    M('Foundations', 'beginner', '📦', [
      L('Arrays & Strings', 'Two pointers, sliding window, prefix sums', 'beginner', 90,
`## Arrays & Strings

### Why Arrays First?
Arrays are the most fundamental data structure. 70% of LeetCode problems use arrays.

### Core Patterns

#### Two Pointers
\`\`\`python
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:   return [left, right]
        elif s < target:  left += 1
        else:             right -= 1
    return []

# Palindrome check
def is_palindrome(s):
    s = ''.join(c.lower() for c in s if c.isalnum())
    return s == s[::-1]
\`\`\`

#### Sliding Window
\`\`\`python
def max_subarray_length_k(nums, k):
    """Maximum sum subarray of size k"""
    window_sum = sum(nums[:k])
    max_sum    = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

def longest_unique_substring(s):
    """Longest substring without repeating characters"""
    char_idx = {}
    max_len  = left = 0
    for right, ch in enumerate(s):
        if ch in char_idx and char_idx[ch] >= left:
            left = char_idx[ch] + 1
        char_idx[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len
\`\`\`

#### Prefix Sums
\`\`\`python
def subarray_sum_equals_k(nums, k):
    """Count subarrays with sum = k (LeetCode 560)"""
    count  = prefix = 0
    seen   = {0: 1}  # prefix_sum -> frequency
    for n in nums:
        prefix += n
        count  += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count
\`\`\`

### Big O Complexity
| Operation | Array | Dynamic Array |
|-----------|-------|---------------|
| Access    | O(1)  | O(1)          |
| Search    | O(n)  | O(n)          |
| Insert    | O(n)  | O(1) amortized|
| Delete    | O(n)  | O(n)          |`,
        [{title:'NeetCode Arrays', url:'https://neetcode.io/roadmap', type:'course'},{title:'LeetCode Top 150', url:'https://leetcode.com/studyplan/top-interview-150/', type:'course'}],
        ['Solve Two Sum, Best Time to Buy Stock, Contains Duplicate','Implement sliding window for max sum subarray','Solve 10 LeetCode Easy array problems']),

      L('Linked Lists', 'Singly, doubly, fast/slow pointers, reversals', 'beginner', 80,
`## Linked Lists

### Node Structure
\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val  = val
        self.next = next

# Build: 1 -> 2 -> 3 -> 4 -> 5
def build_list(vals):
    dummy = ListNode(0)
    cur   = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next
\`\`\`

### Essential Operations
\`\`\`python
def reverse_list(head):
    """Iterative reversal - O(n) time, O(1) space"""
    prev, cur = None, head
    while cur:
        nxt       = cur.next
        cur.next  = prev
        prev, cur = cur, nxt
    return prev

def has_cycle(head):
    """Floyd's cycle detection - fast/slow pointers"""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

def find_middle(head):
    """Find middle node"""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

def merge_sorted_lists(l1, l2):
    """Merge two sorted linked lists"""
    dummy = ListNode(0)
    cur   = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next, l1 = l1, l1.next
        else:
            cur.next, l2 = l2, l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next
\`\`\``,
        [{title:'Linked List Patterns', url:'https://leetcode.com/tag/linked-list/', type:'course'}],
        ['Reverse a linked list iteratively and recursively','Detect and remove a cycle','LRU Cache implementation']),

      L('Stacks & Queues', 'Monotonic stack, BFS queue, deque patterns', 'beginner', 70,
`## Stacks & Queues

### Stack - LIFO
\`\`\`python
def valid_parentheses(s):
    """LeetCode 20 - Valid Parentheses"""
    stack  = []
    pairs  = {')':'(', '}':'{', ']':'['}
    for ch in s:
        if ch in '({[':
            stack.append(ch)
        elif not stack or stack[-1] != pairs[ch]:
            return False
        else:
            stack.pop()
    return not stack

def daily_temperatures(temps):
    """Monotonic decreasing stack - LeetCode 739"""
    n      = len(temps)
    result = [0] * n
    stack  = []  # indices
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j          = stack.pop()
            result[j]  = i - j
        stack.append(i)
    return result
\`\`\`

### Queue - BFS
\`\`\`python
from collections import deque

def bfs_level_order(root):
    """Level-order traversal of binary tree"""
    if not root:
        return []
    queue  = deque([root])
    result = []
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result
\`\`\``,
        [],
        ['Implement a stack that supports getMin() in O(1)','Solve Next Greater Element using monotonic stack','Implement a circular queue']),
    ]),

    M('Trees & Graphs', 'intermediate', '🌳', [
      L('Binary Trees & BST', 'DFS, BFS, traversals, BST operations', 'intermediate', 90,
`## Binary Trees & BST

### Tree Node
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val   = val
        self.left  = left
        self.right = right
\`\`\`

### DFS Traversals
\`\`\`python
def inorder(root):    # Left → Root → Right (gives sorted order for BST)
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []

def preorder(root):   # Root → Left → Right
    return [root.val] + preorder(root.left) + preorder(root.right) if root else []

def postorder(root):  # Left → Right → Root
    return postorder(root.left) + postorder(root.right) + [root.val] if root else []

def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

def is_balanced(root):
    def height(node):
        if not node: return 0
        lh, rh = height(node.left), height(node.right)
        if lh == -1 or rh == -1 or abs(lh - rh) > 1: return -1
        return 1 + max(lh, rh)
    return height(root) != -1

def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q: return root
    left  = lowest_common_ancestor(root.left,  p, q)
    right = lowest_common_ancestor(root.right, p, q)
    return root if left and right else left or right
\`\`\``,
        [{title:'Binary Tree Visualizer', url:'https://visualgo.net/en/bst', type:'article'}],
        ['Validate a Binary Search Tree','Find the diameter of a binary tree','Serialize and deserialize a tree']),

      L('Graphs: BFS, DFS, Shortest Paths', 'Graph representation, BFS, DFS, Dijkstra, Union-Find', 'intermediate', 100,
`## Graphs

### Representations
\`\`\`python
# Adjacency list (most common)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
\`\`\`

### BFS - Shortest path (unweighted)
\`\`\`python
from collections import deque

def bfs(graph, start, target):
    visited = {start}
    queue   = deque([(start, [start])])
    while queue:
        node, path = queue.popleft()
        if node == target: return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None

def num_islands(grid):
    """BFS flood fill - LeetCode 200"""
    rows, cols = len(grid), len(grid[0])
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                queue = deque([(r, c)])
                grid[r][c] = '0'
                while queue:
                    row, col = queue.popleft()
                    for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                        nr, nc = row+dr, col+dc
                        if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]=='1':
                            grid[nr][nc] = '0'
                            queue.append((nr, nc))
    return count
\`\`\`

### Dijkstra - Shortest path (weighted)
\`\`\`python
import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(heap, (dist[v], v))
    return dist
\`\`\``,
        [{title:'Graph Algorithms Visualizer', url:'https://visualgo.net/en/dfsbfs', type:'article'}],
        ['Find all connected components in a graph','Solve Course Schedule (topological sort)','Implement Dijkstra for network delay time']),
    ]),

    M('Dynamic Programming', 'advanced', '⚡', [
      L('DP Fundamentals', 'Memoization, tabulation, common patterns', 'advanced', 110,
`## Dynamic Programming

### The Two Approaches

#### 1. Top-Down (Memoization)
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Coin Change - LeetCode 322
def coin_change(coins, amount):
    @lru_cache(maxsize=None)
    def dp(remaining):
        if remaining == 0: return 0
        if remaining < 0:  return float('inf')
        return 1 + min(dp(remaining - c) for c in coins)
    result = dp(amount)
    return result if result != float('inf') else -1
\`\`\`

#### 2. Bottom-Up (Tabulation)
\`\`\`python
def longest_common_subsequence(s1, s2):
    """LeetCode 1143"""
    m, n = len(s1), len(s2)
    dp   = [[0] * (n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

def knapsack_01(weights, values, capacity):
    n  = len(weights)
    dp = [[0] * (capacity+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(capacity+1):
            dp[i][w] = dp[i-1][w]  # don't take item i
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], values[i-1] + dp[i-1][w - weights[i-1]])
    return dp[n][capacity]

def house_robber(nums):
    """LeetCode 198"""
    if not nums: return 0
    prev2 = prev1 = 0
    for n in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + n)
    return prev1
\`\`\``,
        [{title:'DP Patterns - NeetCode', url:'https://neetcode.io/roadmap', type:'course'},{title:'DP Visualizer', url:'https://dp-visualizer.vercel.app', type:'article'}],
        ['Solve 0/1 Knapsack with both approaches','Implement Edit Distance (LeetCode 72)','Solve Longest Increasing Subsequence']),
    ]),

    M('Advanced Algorithms', 'advanced', '🏆', [
      L('Sorting & Searching', 'QuickSort, MergeSort, Binary Search patterns', 'intermediate', 80,
`## Sorting & Searching

### Binary Search (Master This!)
\`\`\`python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2  # avoid overflow
        if   nums[mid] == target: return mid
        elif nums[mid] <  target: left  = mid + 1
        else:                     right = mid - 1
    return -1

def search_rotated(nums, target):
    """Search in Rotated Sorted Array - LeetCode 33"""
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        if nums[left] <= nums[mid]:  # left half sorted
            if nums[left] <= target < nums[mid]: right = mid - 1
            else:                                left  = mid + 1
        else:                        # right half sorted
            if nums[mid] < target <= nums[right]: left = mid + 1
            else:                                 right = mid - 1
    return -1

def find_peak(nums):
    """Find Peak Element - LeetCode 162"""
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[mid+1]: right = mid
        else:                       left  = mid + 1
    return left
\`\`\`

### Merge Sort
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid   = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j  = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]);  i += 1
        else:                   result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
\`\`\``,
        [],
        ['Implement QuickSort with median-of-3 pivot','Binary search on answer (Koko Eating Bananas)','Merge K sorted lists']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 2. SYSTEM DESIGN
// ─────────────────────────────────────────────────────────────
{
  title: 'System Design',
  description: 'Learn to design scalable, reliable distributed systems. From URL shorteners to Twitter-scale architectures. Essential for senior engineering interviews.',
  type: 'skill', category: 'System Design',
  icon: '🏗️', color: '#0ea5e9',
  tags: ['Scalability','Microservices','Redis','Kafka','Load Balancing','CAP Theorem'],
  estimatedHours: 100, totalLessons: 10,
  modules: [
    M('Foundations', 'beginner', '📐', [
      L('Scalability Fundamentals', 'Horizontal vs vertical scaling, CAP theorem, consistency', 'beginner', 70,
`## Scalability Fundamentals

### Horizontal vs Vertical Scaling
\`\`\`
Vertical (Scale Up):
  Add more CPU/RAM to one machine
  ✅ Simple   ❌ Has limits   ❌ Single point of failure

Horizontal (Scale Out):
  Add more machines
  ✅ Infinite scale   ✅ Fault tolerant   ❌ More complex
\`\`\`

### CAP Theorem
Every distributed system can only guarantee 2 of 3:
- **C**onsistency: All nodes see same data
- **A**vailability: System always responds
- **P**artition Tolerance: Works despite network failures

\`\`\`
CP Systems: MongoDB, HBase, Zookeeper
  → Consistent but may be unavailable during partition

AP Systems: Cassandra, DynamoDB, CouchDB
  → Available but may return stale data

CA Systems: MySQL, PostgreSQL (single node)
  → Not partition tolerant (traditional RDBMS)
\`\`\`

### Key Metrics
\`\`\`
Latency:    Time for one request                 (target: < 100ms p99)
Throughput: Requests per second (RPS)            (e.g., 10,000 RPS)
SLA:        99.9% uptime = 8.7 hours downtime/yr
            99.99% = 52 minutes/yr
            99.999% = 5 minutes/yr

Estimation (back-of-envelope):
  1M DAU × 10 reads/day = 10M reads/day
  10M / 86,400 sec = ~116 RPS peak
  Peak = average × 3 = ~350 RPS
\`\`\``,
        [{title:'System Design Primer', url:'https://github.com/donnemartin/system-design-primer', type:'article'},{title:'ByteByteGo', url:'https://bytebytego.com', type:'course'}],
        ['Estimate QPS for a Twitter-like system','Design a rate limiter algorithm','Draw a basic 3-tier architecture']),

      L('Load Balancing & Caching', 'Load balancers, CDN, Redis caching strategies', 'intermediate', 80,
`## Load Balancing & Caching

### Load Balancing Algorithms
\`\`\`
Round Robin:       Request 1→Server1, 2→Server2, 3→Server3, 4→Server1
Least Connections: Route to server with fewest active connections
IP Hash:           hash(client_ip) % n_servers (session sticky)
Weighted:          Server1(weight=3), Server2(weight=1) → 75%/25% split
\`\`\`

### Redis Caching Patterns
\`\`\`python
import redis
import json

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Cache-Aside Pattern (most common)
def get_user(user_id):
    cache_key = f"user:{user_id}"
    
    # 1. Check cache
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # 2. Cache miss - query DB
    user = db.query("SELECT * FROM users WHERE id = ?", user_id)
    
    # 3. Store in cache with TTL
    r.setex(cache_key, 3600, json.dumps(user))  # 1 hour TTL
    return user

# Write-Through Pattern
def update_user(user_id, data):
    db.update("UPDATE users SET ... WHERE id = ?", user_id, data)
    r.setex(f"user:{user_id}", 3600, json.dumps(data))

# Cache Invalidation
def delete_user(user_id):
    db.delete("DELETE FROM users WHERE id = ?", user_id)
    r.delete(f"user:{user_id}")  # invalidate cache

# Rate Limiting with Redis
def is_rate_limited(user_id, limit=100, window=60):
    key   = f"rate:{user_id}:{int(time.time() // window)}"
    count = r.incr(key)
    r.expire(key, window)
    return count > limit
\`\`\``,
        [{title:'Redis Docs', url:'https://redis.io/docs/', type:'docs'}],
        ['Set up Redis locally and implement cache-aside pattern','Design a CDN strategy for a media platform']),
    ]),

    M('Core Designs', 'intermediate', '🔧', [
      L('Design URL Shortener', 'Complete design: TinyURL / Bitly', 'intermediate', 80,
`## Design URL Shortener (TinyURL)

### Requirements
\`\`\`
Functional:
  - Shorten a URL → generate short code
  - Redirect short URL → original URL
  - Custom aliases (optional)
  - Analytics (optional)

Non-functional:
  - 100M URLs created/day
  - 10:1 read:write ratio = 1B redirects/day
  - URLs stored for 5 years
  - Low latency redirects (< 10ms)

Scale Estimates:
  Writes:    100M/day = ~1,200 writes/sec
  Reads:     1B/day   = ~12,000 reads/sec
  Storage:   100M × 365 × 5 × 500 bytes = ~91 TB
\`\`\`

### Short Code Generation
\`\`\`python
import base62  # install: pip install pybase62
import hashlib

def generate_short_code(url, length=7):
    # MD5 hash then base62 encode
    hash_val = int(hashlib.md5(url.encode()).hexdigest(), 16)
    code     = base62.encode(hash_val)
    return code[:length]  # e.g., "dM3bkL9"

# Or use auto-increment ID + base62
def id_to_short(id):
    chars  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    result = []
    while id > 0:
        result.append(chars[id % 62])
        id //= 62
    return ''.join(reversed(result))
\`\`\`

### Architecture
\`\`\`
Client → Load Balancer → App Servers
                             ↓           ↓
                         Write DB    Redis Cache
                         (MySQL)     (hot URLs)
                             ↓
                       Object Storage (S3)
                       (URL mappings)
\`\`\``,
        [],
        ['Implement a working URL shortener with Node.js + Redis','Add click analytics and expiry features']),

      L('Design Twitter/Instagram Feed', 'Fan-out, news feed, ranking', 'advanced', 90,
`## Design Social Media Feed

### Fan-Out Strategies
\`\`\`
Fan-Out on Write (Push Model):
  When user posts → immediately push to all followers' feeds
  ✅ Fast reads   ❌ Slow writes   ❌ Storage intensive
  Best for: Users with < 1M followers

Fan-Out on Read (Pull Model):
  When user opens feed → pull from all followings
  ✅ Less storage  ❌ Slow reads
  Best for: Celebrity accounts (millions of followers)

Hybrid (Twitter's approach):
  Regular users:   Fan-out on write
  Celebrities:     Fan-out on read, merged at query time
\`\`\`

### Data Models
\`\`\`sql
-- Users
CREATE TABLE users (id BIGINT PRIMARY KEY, username VARCHAR(50), follower_count INT);

-- Tweets
CREATE TABLE tweets (
  id         BIGINT PRIMARY KEY,
  user_id    BIGINT,
  content    TEXT,
  media_url  VARCHAR(255),
  created_at TIMESTAMP,
  like_count INT DEFAULT 0
);

-- Follows
CREATE TABLE follows (follower_id BIGINT, followee_id BIGINT, PRIMARY KEY(follower_id, followee_id));

-- Feed (pre-computed, stored in Redis as sorted set)
-- Key: feed:{user_id}
-- Score: timestamp
-- Member: tweet_id
\`\`\``,
        [],
        ['Design the data model for a social feed','Implement fan-out on write with a message queue']),
    ]),

    M('Advanced Patterns', 'advanced', '🚀', [
      L('Microservices & Message Queues', 'Service decomposition, Kafka, event-driven architecture', 'advanced', 90,
`## Microservices & Message Queues

### When to Use Microservices
\`\`\`
Monolith → Microservices when:
  ✅ Team > 10 engineers
  ✅ Need independent scaling
  ✅ Different release cycles per service
  ❌ NOT for small teams / simple apps

Example decomposition for E-commerce:
  user-service    → auth, profiles
  product-service → catalog, inventory
  order-service   → cart, checkout
  payment-service → transactions
  notification-service → emails, SMS
\`\`\`

### Kafka for Event-Driven Architecture
\`\`\`python
from kafka import KafkaProducer, KafkaConsumer
import json

# Producer - Order Service
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def place_order(order_data):
    # Save to DB
    order_id = db.insert_order(order_data)
    
    # Publish event
    producer.send('orders', {
        'event':    'ORDER_PLACED',
        'order_id': order_id,
        'user_id':  order_data['user_id'],
        'amount':   order_data['total'],
    })
    return order_id

# Consumer - Payment Service
consumer = KafkaConsumer(
    'orders',
    bootstrap_servers=['localhost:9092'],
    group_id='payment-service',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    event = message.value
    if event['event'] == 'ORDER_PLACED':
        process_payment(event['order_id'], event['amount'])
\`\`\``,
        [{title:'Martin Fowler Microservices', url:'https://martinfowler.com/articles/microservices.html', type:'article'}],
        ['Decompose a monolith into 3 microservices','Implement async communication with Kafka']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 3. SOFTWARE TESTING
// ─────────────────────────────────────────────────────────────
{
  title: 'Software Testing',
  description: 'Master unit testing, integration testing, E2E testing, and TDD. Learn to write bulletproof code with Jest, Cypress, and modern testing practices.',
  type: 'skill', category: 'Testing',
  icon: '🧪', color: '#10b981',
  tags: ['Jest','Cypress','TDD','Unit Testing','E2E','React Testing Library'],
  estimatedHours: 80, totalLessons: 8,
  modules: [
    M('Unit Testing', 'beginner', '🔬', [
      L('Jest Fundamentals', 'Unit tests, mocking, coverage, best practices', 'beginner', 70,
`## Jest Fundamentals

### Your First Tests
\`\`\`javascript
// utils/math.js
export const add      = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const divide   = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

// utils/math.test.js
import { add, multiply, divide } from './math';

describe('Math Utils', () => {
  describe('add()', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    test('handles negative numbers', () => {
      expect(add(-1, 1)).toBe(0);
    });
    test('handles floats', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('divide()', () => {
    test('divides correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });
    test('throws on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});
\`\`\`

### Mocking
\`\`\`javascript
// api/users.js
import axios from 'axios';
export const fetchUser = (id) => axios.get(\`/api/users/\${id}\`);

// api/users.test.js
import axios from 'axios';
import { fetchUser } from './users';

jest.mock('axios');  // mock entire module

test('fetchUser returns user data', async () => {
  const mockUser = { id: 1, name: 'Alice', email: 'alice@test.com' };
  axios.get.mockResolvedValueOnce({ data: mockUser });
  
  const result = await fetchUser(1);
  expect(result.data).toEqual(mockUser);
  expect(axios.get).toHaveBeenCalledWith('/api/users/1');
});

test('fetchUser handles network error', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));
  await expect(fetchUser(1)).rejects.toThrow('Network Error');
});
\`\`\``,
        [{title:'Jest Docs', url:'https://jestjs.io/docs/getting-started', type:'docs'},{title:'Testing JavaScript', url:'https://testingjavascript.com', type:'course'}],
        ['Write tests for a calculator module with 100% coverage','Mock an API and test error handling']),

      L('React Testing Library', 'Component testing, user interactions, accessibility', 'intermediate', 70,
`## React Testing Library

### Philosophy: Test behavior, not implementation
\`\`\`jsx
// components/LoginForm.jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('All fields required'); return; }
    try { await onSubmit({ email, password }); }
    catch (err) { setError(err.message); }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Login form">
      {error && <p role="alert">{error}</p>}
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

// components/LoginForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('shows error when submitted empty', async () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('All fields required');
  });

  test('calls onSubmit with credentials', async () => {
    const mockSubmit = jest.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'alice@test.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ email: 'alice@test.com', password: 'password123' });
    });
  });
});
\`\`\``,
        [{title:'Testing Library Docs', url:'https://testing-library.com/docs/', type:'docs'}],
        ['Test a complete form with validation','Test async data fetching component']),
    ]),

    M('E2E & TDD', 'intermediate', '🎭', [
      L('Cypress E2E Testing', 'Browser automation, real user flows, CI integration', 'intermediate', 70,
`## Cypress E2E Testing

### Complete User Journey
\`\`\`javascript
// cypress/e2e/auth.cy.js
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('registers a new user', () => {
    cy.get('[data-cy=nav-register]').click();
    cy.url().should('include', '/register');
    
    cy.get('[data-cy=name-input]').type('Alice Johnson');
    cy.get('[data-cy=email-input]').type('alice@test.com');
    cy.get('[data-cy=password-input]').type('securePassword123');
    cy.get('[data-cy=register-btn]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=welcome-message]').should('contain', 'Welcome, Alice');
  });

  it('shows error for invalid login', () => {
    cy.get('[data-cy=nav-login]').click();
    cy.get('[data-cy=email-input]').type('wrong@email.com');
    cy.get('[data-cy=password-input]').type('wrongpassword');
    cy.get('[data-cy=login-btn]').click();
    
    cy.get('[data-cy=error-message]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('completes checkout flow', () => {
    cy.login('alice@test.com', 'password123');  // custom command
    cy.get('[data-cy=product-1]').click();
    cy.get('[data-cy=add-to-cart]').click();
    cy.get('[data-cy=cart-icon]').click();
    cy.get('[data-cy=checkout-btn]').click();
    cy.get('[data-cy=order-confirmation]').should('be.visible');
  });
});

// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/auth/login', { email, password })
    .then(({ body }) => {
      window.localStorage.setItem('token', body.token);
    });
  cy.visit('/dashboard');
});
\`\`\``,
        [{title:'Cypress Docs', url:'https://docs.cypress.io', type:'docs'}],
        ['Write E2E tests for a login flow','Test a complete checkout process']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 4. MACHINE LEARNING ENGINEER
// ─────────────────────────────────────────────────────────────
{
  title: 'Machine Learning Engineer',
  description: 'Build production ML systems from data preprocessing to model deployment. Master TensorFlow, PyTorch, MLOps, and real-world ML pipelines.',
  type: 'role', category: 'Machine Learning Engineer',
  icon: '🤖', color: '#8b5cf6',
  tags: ['Python','TensorFlow','PyTorch','Scikit-learn','MLOps','Docker'],
  estimatedHours: 180, totalLessons: 12,
  modules: [
    M('ML Foundations', 'beginner', '📊', [
      L('Mathematics for ML', 'Linear algebra, calculus, probability for ML', 'beginner', 80,
`## Mathematics for ML

### Linear Algebra in NumPy
\`\`\`python
import numpy as np

# Vectors and matrices
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])

# Dot product (used in neural networks)
dot = np.dot(v1, v2)        # 32

# Matrix multiplication
W = np.random.randn(3, 4)   # weight matrix
x = np.random.randn(4)      # input vector
y = W @ x                   # matrix-vector product, shape (3,)

# Eigenvalues (PCA, SVD)
A    = np.array([[3, 1], [1, 3]])
vals, vecs = np.linalg.eig(A)

# Gradient descent manually
def gradient_descent(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    theta = np.zeros(n)
    for _ in range(epochs):
        predictions = X @ theta
        errors      = predictions - y
        gradient    = (2/m) * X.T @ errors
        theta      -= lr * gradient
    return theta
\`\`\``,
        [{title:'3Blue1Brown Linear Algebra', url:'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2ZAgoEIiuuoZjg', type:'video'}],
        ['Implement linear regression from scratch','Visualize gradient descent']),

      L('Supervised Learning', 'Regression, classification, model evaluation', 'intermediate', 90,
`## Supervised Learning

### Complete ML Workflow
\`\`\`python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing   import StandardScaler, LabelEncoder
from sklearn.pipeline        import Pipeline
from sklearn.ensemble        import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model    import LogisticRegression
from sklearn.metrics         import classification_report, roc_auc_score, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load and explore
df = pd.read_csv('churn_data.csv')
print(df.info())
print(df['churn'].value_counts(normalize=True))  # class balance

# 2. Feature engineering
df['tenure_years']     = df['tenure'] / 12
df['charges_per_month'] = df['total_charges'] / (df['tenure'] + 1)
df = pd.get_dummies(df, columns=['contract_type', 'payment_method'])

# 3. Split
X = df.drop(['churn', 'customer_id'], axis=1)
y = df['churn']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 4. Build pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  GradientBoostingClassifier(n_estimators=200, max_depth=4, learning_rate=0.05))
])

# 5. Cross-validation
cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='roc_auc')
print(f"CV ROC-AUC: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# 6. Train and evaluate
pipeline.fit(X_train, y_train)
y_pred  = pipeline.predict(X_test)
y_proba = pipeline.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred))
print(f"ROC-AUC: {roc_auc_score(y_test, y_proba):.3f}")

# 7. Feature importance
importances = pipeline.named_steps['model'].feature_importances_
feat_imp = pd.Series(importances, index=X.columns).sort_values(ascending=False)
feat_imp[:15].plot(kind='bar', title='Top 15 Feature Importances')
\`\`\``,
        [{title:'Kaggle ML Course', url:'https://www.kaggle.com/learn/intro-to-machine-learning', type:'course'}],
        ['Build a customer churn predictor','Create a spam classifier with 95%+ accuracy']),
    ]),

    M('Deep Learning', 'advanced', '🧠', [
      L('Neural Networks with PyTorch', 'Tensors, autograd, training loops, CNNs', 'advanced', 110,
`## Neural Networks with PyTorch

### Building a Neural Network
\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# Define model
class ChurnPredictor(nn.Module):
    def __init__(self, input_dim, hidden_dims, dropout=0.3):
        super().__init__()
        layers = []
        prev_dim = input_dim
        for h in hidden_dims:
            layers.extend([
                nn.Linear(prev_dim, h),
                nn.BatchNorm1d(h),
                nn.ReLU(),
                nn.Dropout(dropout),
            ])
            prev_dim = h
        layers.append(nn.Linear(prev_dim, 1))
        self.net = nn.Sequential(*layers)
    
    def forward(self, x):
        return torch.sigmoid(self.net(x)).squeeze()

# Training
def train_model(model, train_loader, val_loader, epochs=50):
    optimizer = optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
    criterion = nn.BCELoss()
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5)
    
    for epoch in range(epochs):
        model.train()
        train_loss = 0
        for X_batch, y_batch in train_loader:
            optimizer.zero_grad()
            preds = model(X_batch)
            loss  = criterion(preds, y_batch)
            loss.backward()
            optimizer.step()
            train_loss += loss.item()
        
        # Validate
        model.eval()
        with torch.no_grad():
            val_losses = [criterion(model(X), y).item() for X, y in val_loader]
        val_loss = sum(val_losses) / len(val_losses)
        scheduler.step(val_loss)
        
        if epoch % 10 == 0:
            print(f"Epoch {epoch}: Train={train_loss/len(train_loader):.4f}, Val={val_loss:.4f}")
\`\`\``,
        [{title:'PyTorch Tutorials', url:'https://pytorch.org/tutorials/', type:'docs'},{title:'fast.ai', url:'https://www.fast.ai', type:'course'}],
        ['Train an image classifier on CIFAR-10','Build a sentiment analysis model']),
    ]),

    M('MLOps', 'advanced', '🚀', [
      L('Model Deployment and MLOps', 'FastAPI serving, Docker, MLflow, monitoring', 'advanced', 90,
`## Model Deployment and MLOps

### Serve Model with FastAPI
\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mlflow
import numpy as np

app = FastAPI(title="ML Model API")

# Load model from MLflow registry
model = mlflow.sklearn.load_model("models:/ChurnPredictor/Production")

class PredictionRequest(BaseModel):
    tenure: float
    monthly_charges: float
    total_charges: float
    contract_type: str

class PredictionResponse(BaseModel):
    churn_probability: float
    will_churn: bool
    confidence: str

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        features = preprocess(request.dict())
        proba    = float(model.predict_proba([features])[0, 1])
        return {
            "churn_probability": proba,
            "will_churn":        proba > 0.5,
            "confidence":        "high" if abs(proba - 0.5) > 0.3 else "low",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health(): return {"status": "ok"}
\`\`\`

### MLflow Experiment Tracking
\`\`\`python
import mlflow
import mlflow.sklearn

with mlflow.start_run(run_name="GradientBoosting-v2"):
    mlflow.log_params({
        "n_estimators": 200,
        "max_depth":    4,
        "learning_rate": 0.05,
    })
    
    model.fit(X_train, y_train)
    
    mlflow.log_metrics({
        "train_auc": roc_auc_score(y_train, model.predict_proba(X_train)[:,1]),
        "test_auc":  roc_auc_score(y_test,  model.predict_proba(X_test)[:,1]),
        "precision": precision_score(y_test, model.predict(X_test)),
    })
    
    mlflow.sklearn.log_model(model, "model",
        registered_model_name="ChurnPredictor")
\`\`\``,
        [{title:'MLflow Docs', url:'https://mlflow.org/docs/latest/', type:'docs'}],
        ['Deploy a model as a REST API with FastAPI','Set up MLflow experiment tracking']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 5. GENERATIVE AI / LLM
// ─────────────────────────────────────────────────────────────
{
  title: 'Generative AI / LLM Engineer',
  description: 'Build AI-powered applications using LLMs, prompt engineering, LangChain, RAG systems, and OpenAI APIs. The most in-demand skill of 2024.',
  type: 'role', category: 'Generative AI',
  icon: '🧠', color: '#ec4899',
  tags: ['OpenAI','LangChain','RAG','Prompt Engineering','Vector DB','GPT-4'],
  estimatedHours: 100, totalLessons: 10,
  modules: [
    M('LLM Fundamentals', 'beginner', '🤖', [
      L('Prompt Engineering Mastery', 'Zero-shot, few-shot, chain-of-thought, system prompts', 'beginner', 70,
`## Prompt Engineering Mastery

### Core Techniques

#### Zero-Shot Prompting
\`\`\`python
from openai import OpenAI
client = OpenAI()

def zero_shot(task):
    return client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": task}]
    ).choices[0].message.content

result = zero_shot("Classify this review as positive/negative/neutral: 'The product is okay but delivery was slow.'")
\`\`\`

#### Few-Shot Prompting
\`\`\`python
def few_shot_sentiment(review):
    messages = [
        {"role": "system", "content": "You are a sentiment analyzer. Respond with only: POSITIVE, NEGATIVE, or NEUTRAL"},
        {"role": "user",      "content": "Amazing product, exceeded expectations!"},
        {"role": "assistant", "content": "POSITIVE"},
        {"role": "user",      "content": "Terrible quality, broke after 2 days"},
        {"role": "assistant", "content": "NEGATIVE"},
        {"role": "user",      "content": "It arrived on time"},
        {"role": "assistant", "content": "NEUTRAL"},
        {"role": "user",      "content": review},
    ]
    return client.chat.completions.create(model="gpt-3.5-turbo", messages=messages).choices[0].message.content

#### Chain-of-Thought
\`\`\`python
COT_SYSTEM = """Solve problems step by step:
1. Understand the problem
2. Break it into smaller parts
3. Solve each part
4. Combine for final answer
Always show your reasoning."""

def chain_of_thought(problem):
    return client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": COT_SYSTEM},
            {"role": "user",   "content": problem}
        ]
    ).choices[0].message.content

# Structured Output
\`\`\`python
import json

def extract_structured(text):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": f"""Extract info from this text. Return ONLY JSON:
{{"name": "string", "email": "string", "company": "string", "role": "string"}}

Text: {text}"""
        }],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)
\`\`\``,
        [{title:'OpenAI Prompt Guide', url:'https://platform.openai.com/docs/guides/prompt-engineering', type:'docs'},{title:'Prompt Engineering Guide', url:'https://www.promptingguide.ai', type:'article'}],
        ['Build a prompt that extracts JSON from unstructured text','Create a few-shot classifier for customer support tickets']),

      L('OpenAI API Complete', 'Chat, embeddings, function calling, streaming', 'intermediate', 80,
`## OpenAI API Complete

### Chat with Function Calling
\`\`\`python
import json
from openai import OpenAI
client = OpenAI()

# Define tools (functions the model can call)
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city":  {"type": "string",  "description": "City name"},
                    "units": {"type": "string",  "enum": ["celsius", "fahrenheit"]},
                },
                "required": ["city"]
            }
        }
    }
]

def chat_with_tools(user_message):
    messages = [{"role": "user", "content": user_message}]
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )
    
    msg = response.choices[0].message
    if msg.tool_calls:
        tool_call = msg.tool_calls[0]
        args      = json.loads(tool_call.function.arguments)
        
        # Execute the actual function
        weather_data = get_weather(args['city'], args.get('units', 'celsius'))
        
        messages.extend([
            msg,  # assistant message with tool_call
            {"role": "tool", "tool_call_id": tool_call.id, "content": json.dumps(weather_data)}
        ])
        
        # Get final response
        final = client.chat.completions.create(model="gpt-4", messages=messages)
        return final.choices[0].message.content
    
    return msg.content

### Embeddings for Semantic Search
\`\`\`python
def get_embedding(text, model="text-embedding-ada-002"):
    return client.embeddings.create(input=text, model=model).data[0].embedding

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# Semantic search
def semantic_search(query, documents, top_k=3):
    query_emb = get_embedding(query)
    doc_embs  = [get_embedding(doc) for doc in documents]
    scores    = [cosine_similarity(query_emb, emb) for emb in doc_embs]
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]
    return [(documents[i], scores[i]) for i in top_indices]
\`\`\``,
        [{title:'OpenAI API Docs', url:'https://platform.openai.com/docs', type:'docs'}],
        ['Build a function-calling AI assistant','Create a semantic search engine with embeddings']),
    ]),

    M('RAG & LangChain', 'advanced', '🔗', [
      L('RAG Systems with LangChain', 'Vector databases, document retrieval, Q&A systems', 'advanced', 90,
`## RAG (Retrieval Augmented Generation)

### Why RAG?
\`\`\`
Problem: LLMs have a knowledge cutoff and can't access your private data
Solution: RAG = Retrieve relevant docs → Augment the prompt → Generate answer
\`\`\`

### Complete RAG Pipeline
\`\`\`python
from langchain.document_loaders   import PyPDFLoader, WebBaseLoader
from langchain.text_splitter      import RecursiveCharacterTextSplitter
from langchain.embeddings         import OpenAIEmbeddings
from langchain.vectorstores       import Chroma
from langchain.chat_models        import ChatOpenAI
from langchain.chains             import RetrievalQA
from langchain.prompts            import PromptTemplate

# 1. Load documents
loader    = PyPDFLoader("company_handbook.pdf")
documents = loader.load()

# 2. Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size    = 1000,
    chunk_overlap = 200,  # overlap for context continuity
)
chunks = splitter.split_documents(documents)

# 3. Embed and store in vector DB
embeddings = OpenAIEmbeddings()
vectordb   = Chroma.from_documents(
    documents  = chunks,
    embedding  = embeddings,
    persist_directory = "./chroma_db"
)

# 4. Create retriever
retriever = vectordb.as_retriever(
    search_type = "mmr",  # Maximum Marginal Relevance
    search_kwargs = {"k": 5, "fetch_k": 10}
)

# 5. Custom prompt
prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""You are a helpful assistant. Use the context to answer the question.
If you don't know the answer from the context, say so clearly.

Context: {context}

Question: {question}

Answer:"""
)

# 6. Build QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm            = ChatOpenAI(model="gpt-4", temperature=0),
    chain_type     = "stuff",
    retriever      = retriever,
    chain_type_kwargs = {"prompt": prompt},
    return_source_documents = True,
)

# 7. Query
result = qa_chain({"query": "What is the vacation policy?"})
print("Answer:", result["result"])
print("Sources:", [doc.metadata['source'] for doc in result["source_documents"]])
\`\`\``,
        [{title:'LangChain Docs', url:'https://python.langchain.com/docs/', type:'docs'},{title:'RAG from Scratch', url:'https://github.com/langchain-ai/rag-from-scratch', type:'article'}],
        ['Build a PDF Q&A system using RAG','Create a chatbot that answers from your own documents']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 6. CLOUD ENGINEER (AWS)
// ─────────────────────────────────────────────────────────────
{
  title: 'Cloud Engineer (AWS)',
  description: 'Master AWS services from EC2 to serverless. Deploy scalable, secure cloud infrastructure and prepare for AWS Solutions Architect certification.',
  type: 'role', category: 'Cloud Engineer',
  icon: '☁️', color: '#f97316',
  tags: ['AWS','EC2','S3','Lambda','RDS','Terraform','CloudFormation'],
  estimatedHours: 140, totalLessons: 10,
  modules: [
    M('AWS Foundations', 'beginner', '☁️', [
      L('AWS Core Services', 'EC2, S3, VPC, IAM, RDS fundamentals', 'beginner', 90,
`## AWS Core Services

### EC2 - Virtual Servers
\`\`\`bash
# Launch EC2 instance via AWS CLI
aws ec2 run-instances \\
  --image-id      ami-0c55b159cbfafe1f0 \\
  --instance-type t3.micro \\
  --key-name      MyKeyPair \\
  --security-group-ids sg-xxxxx \\
  --subnet-id     subnet-xxxxx \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer}]'

# User data script (runs on first boot)
--user-data '#!/bin/bash
apt-get update -y
apt-get install -y nodejs npm nginx
npm install -g pm2
'
\`\`\`

### S3 - Object Storage
\`\`\`python
import boto3

s3 = boto3.client('s3')

# Upload file
s3.upload_file('local_file.jpg', 'my-bucket', 'uploads/file.jpg')

# Upload with metadata
s3.put_object(
    Bucket='my-bucket',
    Key='uploads/file.jpg',
    Body=file_content,
    ContentType='image/jpeg',
    Metadata={'user_id': '123', 'original_name': 'photo.jpg'},
)

# Generate pre-signed URL (temporary access)
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'uploads/file.jpg'},
    ExpiresIn=3600  # 1 hour
)

# S3 bucket policy for static website
bucket_policy = {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect":    "Allow",
        "Principal": "*",
        "Action":    "s3:GetObject",
        "Resource":  "arn:aws:s3:::my-bucket/*"
    }]
}
\`\`\`

### IAM - Identity & Access Management
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":   "Allow",
      "Action":   ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-app-bucket/*"
    },
    {
      "Effect":   "Allow",
      "Action":   ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-app-bucket"
    }
  ]
}
\`\`\``,
        [{title:'AWS Free Tier', url:'https://aws.amazon.com/free/', type:'docs'},{title:'AWS Skill Builder', url:'https://explore.skillbuilder.aws', type:'course'}],
        ['Deploy a Node.js app on EC2','Set up S3 bucket with proper IAM permissions']),

      L('Serverless with AWS Lambda', 'Lambda, API Gateway, DynamoDB, SAM', 'intermediate', 90,
`## Serverless with AWS Lambda

### Lambda Function
\`\`\`python
import json
import boto3
import os
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table    = dynamodb.Table(os.environ['TABLE_NAME'])

def handler(event, context):
    """Handle API Gateway events"""
    http_method = event['httpMethod']
    path        = event['path']
    
    try:
        if http_method == 'POST' and path == '/items':
            body    = json.loads(event['body'])
            item_id = str(datetime.now().timestamp())
            table.put_item(Item={
                'id':         item_id,
                'name':       body['name'],
                'created_at': datetime.now().isoformat(),
            })
            return respond(201, {'id': item_id, 'message': 'Created'})
        
        elif http_method == 'GET' and path == '/items':
            result = table.scan()
            return respond(200, {'items': result['Items']})
        
        else:
            return respond(404, {'message': 'Not found'})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return respond(500, {'message': 'Internal server error'})

def respond(status_code, body):
    return {
        'statusCode': status_code,
        'headers':    {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body':       json.dumps(body),
    }
\`\`\`

### SAM Template
\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Runtime: python3.11
    Timeout: 30
    Environment:
      Variables:
        TABLE_NAME: !Ref ItemsTable

Resources:
  ItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: handler.handler
      Events:
        Api:
          Type: Api
          Properties:
            Path: /items
            Method: ANY
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ItemsTable

  ItemsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
\`\`\``,
        [{title:'AWS Lambda Docs', url:'https://docs.aws.amazon.com/lambda/', type:'docs'}],
        ['Build a serverless CRUD API with Lambda + DynamoDB','Deploy using SAM or Serverless Framework']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 7. CYBERSECURITY
// ─────────────────────────────────────────────────────────────
{
  title: 'Cybersecurity Engineer',
  description: 'Master ethical hacking, network security, OWASP vulnerabilities, penetration testing, and build secure applications from the ground up.',
  type: 'role', category: 'Cybersecurity',
  icon: '🔐', color: '#ef4444',
  tags: ['Ethical Hacking','OWASP','Network Security','Kali Linux','Pen Testing','CTF'],
  estimatedHours: 140, totalLessons: 10,
  modules: [
    M('Security Foundations', 'beginner', '🛡️', [
      L('Network Security Fundamentals', 'TCP/IP, DNS, HTTP, firewalls, VPNs, Wireshark', 'beginner', 80,
`## Network Security Fundamentals

### TCP/IP Model
\`\`\`
Layer 4 - Application:  HTTP, HTTPS, DNS, FTP, SSH
Layer 3 - Transport:    TCP (reliable), UDP (fast)
Layer 2 - Internet:     IP addressing, routing
Layer 1 - Network:      Ethernet, WiFi (physical)
\`\`\`

### Common Ports (memorize these)
\`\`\`
21  FTP       22  SSH        23  Telnet
25  SMTP      53  DNS        80  HTTP
443 HTTPS    3306 MySQL     5432 PostgreSQL
27017 MongoDB 6379 Redis    8080 HTTP-Alt
\`\`\`

### Wireshark Analysis with Python
\`\`\`python
from scapy.all import *

# Capture packets
def analyze_packet(pkt):
    if pkt.haslayer(HTTP):
        if pkt[HTTP].Method == b'POST':
            print(f"POST request to: {pkt[HTTP].Host}")
            if pkt.haslayer(Raw):
                print(f"Data: {pkt[Raw].load[:200]}")

# Monitor network
sniff(filter="tcp port 80", prn=analyze_packet, count=100)

# Port scanner
def port_scan(target, ports):
    open_ports = []
    for port in ports:
        pkt    = IP(dst=target)/TCP(dport=port, flags='S')
        resp   = sr1(pkt, timeout=1, verbose=0)
        if resp and resp[TCP].flags == 'SA':  # SYN-ACK
            open_ports.append(port)
            send(IP(dst=target)/TCP(dport=port, flags='R'), verbose=0)  # RST
    return open_ports
\`\`\``,
        [{title:'TryHackMe', url:'https://tryhackme.com', type:'course'},{title:'HackTheBox', url:'https://www.hackthebox.com', type:'course'}],
        ['Analyze a PCAP file with Wireshark','Scan a local network with Nmap']),

      L('OWASP Top 10 & Secure Coding', 'SQL injection, XSS, CSRF, auth flaws, fixes', 'intermediate', 90,
`## OWASP Top 10

### 1. SQL Injection
\`\`\`python
# VULNERABLE ❌
def get_user_bad(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    # If username = "' OR '1'='1", returns ALL users!
    return db.execute(query)

# SECURE ✅ - Parameterized queries
def get_user_safe(username):
    query = "SELECT * FROM users WHERE username = ?"
    return db.execute(query, (username,))  # auto-escaped

# SECURE ✅ - ORM
user = User.query.filter_by(username=username).first()
\`\`\`

### 2. XSS (Cross-Site Scripting)
\`\`\`javascript
// VULNERABLE ❌ - Reflected XSS
app.get('/search', (req, res) => {
  res.send(\`<p>Results for: \${req.query.q}</p>\`);
  // Attack: ?q=<script>document.cookie</script>
});

// SECURE ✅ - Escape output
const escape = require('escape-html');
app.get('/search', (req, res) => {
  res.send(\`<p>Results for: \${escape(req.query.q)}</p>\`);
});

// SECURE ✅ - Content Security Policy header
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc:  ["'self'", "'nonce-RANDOM'"],
    styleSrc:   ["'self'", "'unsafe-inline'"],
    imgSrc:     ["'self'", "data:", "https:"],
  }
}));
\`\`\`

### 3. Broken Authentication
\`\`\`python
# SECURE password storage
from argon2 import PasswordHasher
ph = PasswordHasher(time_cost=2, memory_cost=65536, parallelism=2)

def hash_password(password):
    return ph.hash(password)

def verify_password(hash, password):
    try:
        return ph.verify(hash, password)
    except:
        return False

# Secure JWT
import jwt
from datetime import datetime, timedelta

def create_tokens(user_id):
    access_token  = jwt.encode({"sub": user_id, "exp": datetime.utcnow() + timedelta(minutes=15)}, ACCESS_SECRET, "HS256")
    refresh_token = jwt.encode({"sub": user_id, "exp": datetime.utcnow() + timedelta(days=7)},    REFRESH_SECRET, "HS256")
    return access_token, refresh_token
\`\`\``,
        [{title:'OWASP Top 10', url:'https://owasp.org/www-project-top-ten/', type:'article'},{title:'PortSwigger Web Security', url:'https://portswigger.net/web-security', type:'course'}],
        ['Find and fix SQL injections in a demo app','Implement CSP headers and test with scanner']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 8. E-COMMERCE DEVELOPER
// ─────────────────────────────────────────────────────────────
{
  title: 'E-commerce Developer',
  description: 'Build complete e-commerce platforms with product catalogs, shopping carts, secure payments via Stripe, order management, and admin dashboards.',
  type: 'role', category: 'E-commerce Developer',
  icon: '🛒', color: '#10b981',
  tags: ['Stripe','React','Node.js','MongoDB','Payment Gateway','Cart System'],
  estimatedHours: 120, totalLessons: 10,
  modules: [
    M('E-commerce Fundamentals', 'beginner', '🏪', [
      L('Product Catalog & Cart System', 'Product management, cart logic, inventory', 'beginner', 80,
`## Product Catalog & Cart System

### Product Schema
\`\`\`javascript
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, unique: true },
  description: String,
  price:       { type: Number, required: true, min: 0 },
  salePrice:   { type: Number, min: 0 },
  images:      [{ url: String, alt: String }],
  category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags:        [String],
  sku:         { type: String, unique: true },
  stock:       { type: Number, default: 0, min: 0 },
  isActive:    { type: Boolean, default: true },
  attributes:  mongoose.Schema.Types.Mixed,  // size, color, etc.
}, { timestamps: true });

// Auto-generate slug from name
productSchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]/g, '');
  next();
});
\`\`\`

### Cart Logic (React Context)
\`\`\`jsx
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + qty, product.stock) }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty === 0) return removeFromCart(productId);
    setCart(prev => prev.map(item =>
      item._id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const totals = cart.reduce((acc, item) => ({
    subtotal: acc.subtotal + (item.salePrice || item.price) * item.quantity,
    items:    acc.items + item.quantity,
  }), { subtotal: 0, items: 0 });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, ...totals }}>
      {children}
    </CartContext.Provider>
  );
}
\`\`\``,
        [{title:'Stripe Docs', url:'https://stripe.com/docs', type:'docs'}],
        ['Build a product listing with filters and search','Implement a persistent shopping cart with localStorage']),

      L('Stripe Payment Integration', 'Payment intents, webhooks, subscriptions, refunds', 'intermediate', 90,
`## Stripe Payment Integration

### Backend: Payment Intent
\`\`\`javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
app.post('/api/payment/create-intent', protect, async (req, res) => {
  try {
    const { cartItems } = req.body;
    
    // Calculate amount server-side (NEVER trust client)
    const products = await Product.find({ _id: { $in: cartItems.map(i => i._id) } });
    const amount   = cartItems.reduce((sum, item) => {
      const product = products.find(p => p._id.toString() === item._id);
      return sum + (product.salePrice || product.price) * item.quantity * 100; // cents
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency:             'usd',
      customer:             req.user.stripeCustomerId,
      metadata:             { userId: req.user._id.toString() },
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Webhook handler
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await fulfillOrder(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handleFailedPayment(event.data.object);
      break;
  }

  res.json({ received: true });
});
\`\`\`

### Frontend: Stripe Elements
\`\`\`jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ clientSecret }) {
  const stripe   = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });
    if (error) setError(error.message);
    else       navigate('/order-success/' + paymentIntent.id);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      {error && <p style={{color:'red'}}>{error}</p>}
      <button disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pay Now'}</button>
    </form>
  );
}
\`\`\``,
        [{title:'Stripe Integration Guide', url:'https://stripe.com/docs/payments/accept-a-payment', type:'docs'}],
        ['Implement complete checkout with Stripe','Handle payment webhooks and update order status']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 9. INTERVIEW PREPARATION
// ─────────────────────────────────────────────────────────────
{
  title: 'Interview Preparation Roadmap',
  description: 'Complete preparation for tech interviews at FAANG and top companies. DSA, system design, behavioral questions, resume building, and mock interviews.',
  type: 'career', category: 'Interview Preparation',
  icon: '💼', color: '#f59e0b',
  tags: ['LeetCode','DSA','System Design','Behavioral','Resume','FAANG'],
  estimatedHours: 120, totalLessons: 10,
  modules: [
    M('Resume & Application', 'beginner', '📄', [
      L('Building a Strong Tech Resume', 'ATS optimization, project showcasing, LinkedIn', 'beginner', 50,
`## Building a Strong Tech Resume

### Resume Structure (1 page!)
\`\`\`
[Your Name] | City, Country | email@domain.com | github.com/username | linkedin.com/in/username

EXPERIENCE
Company Name | Role Title | Month Year – Month Year
• Achieved X by doing Y, resulting in Z (quantify!)
• Built/Led/Improved [specific technology] that [outcome]
• Reduced [metric] by [X%] through [approach]

PROJECTS
Project Name | github.com/you/project | live-demo.com
• What it is and what problem it solves (1 line)
• Key technical decisions: React, Node.js, MongoDB, Redis
• Metrics: 1000+ users, 99.9% uptime, < 200ms response time

SKILLS
Languages:   JavaScript, Python, TypeScript, Java
Frameworks:  React, Node.js, Express, FastAPI
Databases:   MongoDB, PostgreSQL, Redis
Cloud/DevOps: AWS, Docker, GitHub Actions, Kubernetes
\`\`\`

### ATS Keywords
\`\`\`
Match keywords from job description!

Job says: "REST API development"
Resume says: "Built RESTful APIs" ← exact match

Job says: "Agile methodology"
Resume says: "Worked in Agile/Scrum teams with 2-week sprints"

Common keywords:
- React.js / Node.js / Express.js (include .js)
- REST API, GraphQL
- CI/CD, Docker, Kubernetes
- Agile, Scrum, Test-Driven Development
\`\`\`

### STAR Method for Projects
\`\`\`
Situation: "Our e-commerce app had 8s page load times"
Task:      "I needed to reduce load time to under 2 seconds"
Action:    "Implemented Redis caching, image CDN, lazy loading"
Result:    "Reduced load time by 75% → 2s → 40% increase in conversions"

Resume bullet: "Reduced page load time by 75% (8s→2s) via Redis caching 
               and CDN integration, resulting in 40% conversion increase"
\`\`\``,
        [{title:'Tech Resume Guide', url:'https://www.techinterviewhandbook.org/resume/', type:'article'}],
        ['Rewrite your resume with STAR-based bullets','Set up LinkedIn with same content as resume']),
    ]),

    M('Technical Interview Prep', 'intermediate', '💻', [
      L('DSA Interview Patterns', 'Top 15 patterns for LeetCode and FAANG', 'intermediate', 100,
`## DSA Interview Patterns

### The 15 Essential Patterns

#### 1. Two Pointers
\`\`\`python
# Container With Most Water - LeetCode 11
def max_area(heights):
    left, right = 0, len(heights) - 1
    max_water = 0
    while left < right:
        max_water = max(max_water, min(heights[left], heights[right]) * (right - left))
        if heights[left] < heights[right]: left += 1
        else:                              right -= 1
    return max_water
\`\`\`

#### 2. Sliding Window
\`\`\`python
# Minimum Window Substring - LeetCode 76
from collections import Counter

def min_window(s, t):
    need  = Counter(t)
    have  = {}
    have_count = req_count = len(need)
    left = res_len = float('inf')
    l = result = 0
    for r, ch in enumerate(s):
        have[ch] = have.get(ch, 0) + 1
        if ch in need and have[ch] == need[ch]:
            have_count -= 1
        while have_count == 0:
            if r - l + 1 < res_len:
                res_len = r - l + 1
                result  = l
            have[s[l]] -= 1
            if s[l] in need and have[s[l]] < need[s[l]]:
                have_count += 1
            l += 1
    return s[result:result+res_len] if res_len != float('inf') else ""
\`\`\`

#### 3. Fast & Slow Pointers
\`\`\`python
# Find duplicate number - LeetCode 287
def find_duplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast: break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow
\`\`\`

#### 4. Merge Intervals
\`\`\`python
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
\`\`\``,
        [{title:'NeetCode.io', url:'https://neetcode.io', type:'course'},{title:'Blind 75', url:'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions', type:'article'}],
        ['Solve all 15 patterns with at least 2 problems each','Complete the Blind 75 list']),

      L('System Design Interview', 'Framework for answering, common questions, tips', 'intermediate', 90,
`## System Design Interview Framework

### RESHADED Framework
\`\`\`
R - Requirements clarification (5 min)
E - Estimation (back-of-envelope) (2 min)
S - Storage schema (3 min)
H - High-level design (10 min)
A - APIs (3 min)
D - Deep dive into components (15 min)
E - Edge cases (2 min)
D - Done - summarize
\`\`\`

### How to Answer: Design Instagram
\`\`\`
1. CLARIFY (ask these questions):
   "Should users be able to upload videos too?"
   "How many daily active users? 100M? 1B?"
   "Do we need direct messaging?"
   "What's the read:write ratio?" (mostly reads for social media)

2. ESTIMATE:
   100M DAU × 2 posts/day = 200M posts/day = 2,300 posts/sec
   100M DAU × 50 views/day = 5B views/day = 58,000 reads/sec
   Storage: 200M × 1MB = 200TB/day → CDN is essential

3. HIGH-LEVEL DESIGN:
   Client → CDN → Load Balancer → App Servers
                                       ↓         ↓
                                   Postgres   Object Storage (S3)
                                       ↓
                                     Redis (cache hot posts)
                                       ↓
                                   Kafka (async processing)
                                       ↓
                                 Feed Service

4. DEEP DIVE: "Let me dive deeper into the feed generation..."
   - Fan-out on write for regular users
   - Fan-out on read for celebrities
   - Redis sorted sets for user feeds

5. EDGE CASES:
   - User with 100M followers (celebrity problem)
   - Spam/abuse detection
   - Data consistency during failures
\`\`\``,
        [{title:'Grokking System Design', url:'https://www.educative.io/courses/grokking-the-system-design-interview', type:'course'}],
        ['Practice designing 5 systems from start to finish','Time yourself: 45 min per design']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 10. OPEN SOURCE CONTRIBUTOR
// ─────────────────────────────────────────────────────────────
{
  title: 'Open Source Contributor',
  description: 'Learn Git, GitHub workflows, contributing to open source projects, maintaining your own library, and building a developer brand through contributions.',
  type: 'career', category: 'Open Source',
  icon: '🧑‍💻', color: '#6366f1',
  tags: ['Git','GitHub','Open Source','Pull Requests','CI/CD','Community'],
  estimatedHours: 60, totalLessons: 8,
  modules: [
    M('Git & GitHub Mastery', 'beginner', '📁', [
      L('Git Advanced Workflow', 'Branching, rebasing, cherry-pick, git flow', 'beginner', 70,
`## Git Advanced Workflow

### Git Flow Branching Strategy
\`\`\`
main        ─────────────────────────── production
              ↑merge                  ↑merge
develop   ──────────────────────────────────────── integration
              ↑merge         ↑merge
feature/  feature-branch-1  feature-branch-2
hotfix/                             hotfix-branch
release/                    release/v1.2
\`\`\`

### Essential Git Commands
\`\`\`bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/add-user-auth

# Work and commit
git add -p                    # interactive staging (review each hunk)
git commit -m "feat: add JWT auth middleware"

# Keep feature branch updated
git fetch origin
git rebase origin/develop     # cleaner than merge

# Fix conflicts during rebase
git rebase --continue         # after fixing conflicts
git rebase --abort            # to cancel

# Squash commits before PR (clean history)
git rebase -i origin/develop  # interactive rebase
# Change 'pick' to 'squash' for commits to combine

# Cherry-pick a specific commit
git cherry-pick abc1234       # apply commit to current branch

# Undo mistakes
git revert HEAD               # safe undo (creates new commit)
git reset --soft HEAD~1       # undo commit, keep changes staged
git reset --hard HEAD~1       # undo commit AND changes (dangerous!)

# Stash work in progress
git stash push -m "WIP: user auth"
git stash list
git stash pop
\`\`\`

### Conventional Commits
\`\`\`
feat:     new feature
fix:      bug fix
docs:     documentation only
style:    formatting, no logic change
refactor: code change without feat/fix
test:     adding or fixing tests
chore:    build process, dependency updates

Examples:
feat(auth): add Google OAuth login
fix(api): handle null user in getProfile
docs: update README with setup instructions
feat!: BREAKING CHANGE - rename API endpoint
\`\`\``,
        [{title:'Pro Git Book', url:'https://git-scm.com/book/en/v2', type:'docs'},{title:'Oh Shit, Git!', url:'https://ohshitgit.com', type:'article'}],
        ['Practice interactive rebase on a test repo','Set up conventional commits with commitlint']),

      L('Contributing to Open Source', 'Finding issues, PR workflow, code review etiquette', 'intermediate', 70,
`## Contributing to Open Source

### Finding Your First Contribution
\`\`\`
Great labels to filter by:
  good-first-issue       → beginner friendly
  help-wanted            → maintainers want help
  documentation          → easy wins
  bug                    → show your debugging skills

Great sites to find issues:
  goodfirstissue.dev
  github.com/explore
  up-for-grabs.net
  codetriage.com

Start with projects you already USE:
  → You understand the codebase
  → You can test your changes
  → You're motivated
\`\`\`

### Perfect PR Workflow
\`\`\`bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/PROJECT.git
cd PROJECT
git remote add upstream https://github.com/ORIGINAL/PROJECT.git

# 2. Create branch
git checkout -b fix/navbar-mobile-overflow

# 3. Make changes, write tests, update docs
npm test       # make sure tests pass
npm run lint   # follow project style

# 4. Commit with conventional format
git commit -m "fix(navbar): prevent overflow on mobile screens"

# 5. Push to your fork
git push origin fix/navbar-mobile-overflow

# 6. Open PR on GitHub with template:
\`\`\`

### PR Description Template
\`\`\`markdown
## What does this PR do?
Fixes the navigation bar overflow on mobile devices (< 375px).

## Why is this needed?
Fixes #1234 - Navigation items were being cut off on iPhone SE.

## How was this tested?
- Tested on Chrome, Firefox, Safari
- Tested on iPhone SE (375px), iPhone 12 (390px), Pixel 6
- All existing tests pass

## Screenshots
[Before] [After]

## Checklist
- [x] Tests added/updated
- [x] Documentation updated
- [x] No breaking changes
\`\`\``,
        [{title:'First Contributions', url:'https://firstcontributions.github.io', type:'article'},{title:'Open Source Guide', url:'https://opensource.guide', type:'docs'}],
        ['Make your first open source contribution','Review 3 other contributors PRs with constructive feedback']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 11. IoT DEVELOPER
// ─────────────────────────────────────────────────────────────
{
  title: 'IoT Developer',
  description: 'Build Internet of Things solutions with Arduino, Raspberry Pi, MQTT, and real-time data processing. Perfect for ECE/EEE backgrounds.',
  type: 'role', category: 'IoT Developer',
  icon: '📡', color: '#06b6d4',
  tags: ['Arduino','Raspberry Pi','MQTT','Python','Node.js','Sensors','Real-time'],
  estimatedHours: 120, totalLessons: 10,
  modules: [
    M('IoT Fundamentals', 'beginner', '🔌', [
      L('Arduino & Sensors', 'GPIO, analog sensors, I2C, SPI, basic circuits', 'beginner', 80,
`## Arduino & Sensors

### Arduino Basics (C++)
\`\`\`cpp
// Temperature & Humidity Monitor
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define DHT_PIN    2
#define DHT_TYPE   DHT22
#define LED_RED    8
#define LED_GREEN  9
#define BUZZER     10

DHT           dht(DHT_PIN, DHT_TYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

const float TEMP_HIGH = 30.0;
const float HUMI_HIGH = 70.0;

void setup() {
  Serial.begin(9600);
  dht.begin();
  lcd.init();
  lcd.backlight();
  pinMode(LED_RED,   OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(BUZZER,    OUTPUT);
  lcd.print("IoT Monitor Ready");
  delay(2000);
}

void loop() {
  float temp = dht.readTemperature();
  float humi = dht.readHumidity();
  
  if (isnan(temp) || isnan(humi)) {
    Serial.println("Sensor error!");
    return;
  }
  
  // Display on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: "); lcd.print(temp, 1); lcd.print(" C");
  lcd.setCursor(0, 1);
  lcd.print("Humi: "); lcd.print(humi, 1); lcd.print(" %");
  
  // Alert if threshold exceeded
  bool alert = temp > TEMP_HIGH || humi > HUMI_HIGH;
  digitalWrite(LED_RED,   alert);
  digitalWrite(LED_GREEN, !alert);
  if (alert) { tone(BUZZER, 2000, 500); }
  
  // Send to serial for Python/Node.js to read
  Serial.print("{");
  Serial.print("\\"temp\\":"); Serial.print(temp);
  Serial.print(",\\"humi\\":"); Serial.print(humi);
  Serial.println("}");
  
  delay(2000);
}
\`\`\``,
        [{title:'Arduino Getting Started', url:'https://www.arduino.cc/en/Guide', type:'docs'},{title:'Tinkercad Circuits', url:'https://www.tinkercad.com/circuits', type:'course'}],
        ['Build a temperature alert system with LED and buzzer','Create a soil moisture monitor for plants']),

      L('MQTT and Real-time Data', 'MQTT protocol, Node.js broker, dashboard, alerts', 'intermediate', 90,
`## MQTT and Real-time IoT

### MQTT Protocol
\`\`\`
MQTT = Message Queuing Telemetry Transport
Designed for IoT: lightweight, low bandwidth, pub/sub model

Architecture:
  Sensor → PUBLISH → Broker → SUBSCRIBE → Dashboard
               topic: home/living/temp        (subscribes to all)

QoS Levels:
  0 = At most once  (fire and forget)
  1 = At least once (guaranteed delivery, may duplicate)
  2 = Exactly once  (guaranteed, no duplicates)
\`\`\`

### Node.js MQTT Bridge
\`\`\`javascript
const mqtt       = require('mqtt');
const { Server } = require('socket.io');
const serial     = require('serialport');
const express    = require('express');

const app    = express();
const server = require('http').createServer(app);
const io     = new Server(server, { cors: { origin: '*' } });

// Connect to MQTT broker
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

// Read from Arduino serial port
const port = new serial.SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
const parser = port.pipe(new serial.parsers.Readline({ delimiter: '\\n' }));

parser.on('data', (line) => {
  try {
    const data = JSON.parse(line.trim());
    data.timestamp = new Date().toISOString();
    data.deviceId  = 'arduino-01';
    
    // Publish to MQTT
    mqttClient.publish('iot/sensors/dht22', JSON.stringify(data), { qos: 1 });
    
    // Emit to WebSocket clients (live dashboard)
    io.emit('sensor_data', data);
    
    console.log(\`📡 Temp: \${data.temp}°C | Humi: \${data.humi}%\`);
  } catch (e) {}
});

// Subscribe to commands (e.g., turn on/off devices remotely)
mqttClient.subscribe('iot/commands/arduino-01');
mqttClient.on('message', (topic, message) => {
  const cmd = JSON.parse(message.toString());
  if (cmd.action === 'set_threshold') {
    port.write(\`THRESHOLD:\${cmd.value}\\n\`);
  }
});

server.listen(3000);
\`\`\``,
        [{title:'MQTT.org', url:'https://mqtt.org', type:'docs'},{title:'HiveMQ MQTT Essentials', url:'https://www.hivemq.com/mqtt-essentials/', type:'article'}],
        ['Set up Mosquitto MQTT broker locally','Build a real-time sensor dashboard with Socket.io']),
    ]),
  ],
},

// ─────────────────────────────────────────────────────────────
// 12. GAME DEVELOPER
// ─────────────────────────────────────────────────────────────
{
  title: 'Game Developer',
  description: 'Build 2D and 3D games from scratch. Master Unity, game physics, collision detection, AI, and publish your game to PC and mobile platforms.',
  type: 'role', category: 'Game Developer',
  icon: '🎮', color: '#a855f7',
  tags: ['Unity','C#','Game Physics','2D','3D','Animation','Mobile Games'],
  estimatedHours: 160, totalLessons: 10,
  modules: [
    M('Game Dev Fundamentals', 'beginner', '🎮', [
      L('Unity & C# Basics', 'Game objects, components, physics, input handling', 'beginner', 90,
`## Unity & C# Fundamentals

### Core Unity Concepts
\`\`\`csharp
// PlayerController.cs
using UnityEngine;

[RequireComponent(typeof(Rigidbody2D))]
public class PlayerController : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float moveSpeed  = 5f;
    [SerializeField] private float jumpForce  = 12f;
    [SerializeField] private float groundCheckRadius = 0.2f;
    [SerializeField] private LayerMask groundLayer;

    [Header("References")]
    [SerializeField] private Transform groundCheck;
    [SerializeField] private Animator animator;

    private Rigidbody2D rb;
    private bool isGrounded;
    private float horizontalInput;

    void Awake() => rb = GetComponent<Rigidbody2D>();

    void Update()
    {
        horizontalInput = Input.GetAxis("Horizontal");
        isGrounded = Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, groundLayer);
        
        // Jump
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.velocity = new Vector2(rb.velocity.x, jumpForce);
            animator.SetTrigger("Jump");
        }

        // Flip sprite
        if (horizontalInput > 0)      transform.localScale = new Vector3(1, 1, 1);
        else if (horizontalInput < 0) transform.localScale = new Vector3(-1, 1, 1);
        
        // Animations
        animator.SetFloat("Speed", Mathf.Abs(horizontalInput));
        animator.SetBool("IsGrounded", isGrounded);
    }

    void FixedUpdate()
    {
        rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Enemy"))
        {
            GameManager.Instance.PlayerDied();
        }
    }
}
\`\`\`

### Game Manager (Singleton Pattern)
\`\`\`csharp
public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }
    
    [SerializeField] private int score = 0;
    [SerializeField] private int lives = 3;
    
    public event System.Action<int> OnScoreChanged;
    public event System.Action OnGameOver;
    
    void Awake()
    {
        if (Instance == null) { Instance = this; DontDestroyOnLoad(gameObject); }
        else Destroy(gameObject);
    }
    
    public void AddScore(int points)
    {
        score += points;
        OnScoreChanged?.Invoke(score);
        PlayerPrefs.SetInt("HighScore", Mathf.Max(score, PlayerPrefs.GetInt("HighScore", 0)));
    }
    
    public void PlayerDied()
    {
        lives--;
        if (lives <= 0) OnGameOver?.Invoke();
    }
}
\`\`\``,
        [{title:'Unity Learn', url:'https://learn.unity.com', type:'course'},{title:'Unity Docs', url:'https://docs.unity3d.com/Manual/', type:'docs'}],
        ['Build a simple 2D platformer with player movement and jumping','Add collectibles, enemies, and a score system']),
    ]),
  ],
},

];

// ─── Run seeder ───────────────────────────────────────────────
async function seedAll() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    console.log('✅ Connected to:', db.databaseName);

    // Get existing roadmaps (don't delete them)
    const existing = await db.collection('roadmaps').find({}).project({title:1}).toArray();
    console.log(`📚 Existing roadmaps: ${existing.length}`);
    existing.forEach(r => console.log('  -', r.title));

    // Check which new ones already exist
    const existingTitles = new Set(existing.map(r => r.title));
    const toInsert = newRoadmaps.filter(r => !existingTitles.has(r.title));

    if (toInsert.length === 0) {
      console.log('\n⚠️  All new roadmaps already exist. Replacing them...');
      await db.collection('roadmaps').deleteMany({
        title: { $in: newRoadmaps.map(r => r.title) }
      });
    }

    const result = await db.collection('roadmaps').insertMany(toInsert.length > 0 ? toInsert : newRoadmaps);
    console.log('\n✅ Inserted', result.insertedCount, 'new roadmaps:\n');
    newRoadmaps.forEach(r => {
      const modules = r.modules || [];
      const lessons = modules.reduce((sum, m) => sum + (m.lessons||[]).length, 0);
      console.log(`  ${r.icon} ${r.title} - ${lessons} lessons (${r.type})`);
    });

    const total = await db.collection('roadmaps').countDocuments();
    console.log(`\n🎉 Total roadmaps in database: ${total}`);
    console.log('Open http://localhost:5000/api/roadmaps to verify\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
  } finally {
    await client.close();
  }
}

seedAll();