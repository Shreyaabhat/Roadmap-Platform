require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

if (!process.env.MONGODB_URI) { console.error('❌ MONGODB_URI missing'); process.exit(1); }

// Helper to make a lesson with _id
function lesson(title, summary, difficulty, minutes, content, resources, tasks) {
  return { _id: new ObjectId(), title, summary, difficulty, estimatedTime: minutes, order: 0, content, resources: resources||[], tasks: (tasks||[]).map(d=>({description:d})) };
}
function mod(title, level, icon, lessons) {
  return { _id: new ObjectId(), title, level, icon, order: 0, lessons };
}

const roadmaps = [

// ═══════════════════════════════════════════
// JOB ROLES
// ═══════════════════════════════════════════

{
  title: 'Frontend Developer',
  description: 'Master HTML, CSS, JavaScript, and React to build stunning, responsive web applications.',
  type: 'role', category: 'Frontend Developer',
  icon: '🎨', color: '#f59e0b',
  tags: ['HTML','CSS','JavaScript','React','Tailwind'],
  estimatedHours: 120, totalLessons: 12,
  modules: [
    mod('Web Fundamentals','beginner','🏗️',[
      lesson('HTML5 Essentials','Semantic markup, forms, accessibility','beginner',45,
`## HTML5 Essentials

HTML is the skeleton of every website. HTML5 introduced semantic elements that give meaning to structure.

### Semantic Elements
\`\`\`html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Content goes here</p>
  </article>
  <aside>Related content</aside>
</main>
<footer>© 2024</footer>
\`\`\`

### Forms
\`\`\`html
<form action="/submit" method="POST">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required placeholder="John Doe">
  
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  
  <label for="role">Role</label>
  <select id="role" name="role">
    <option value="dev">Developer</option>
    <option value="design">Designer</option>
  </select>
  
  <button type="submit">Submit</button>
</form>
\`\`\`

### Best Practices
- Use semantic tags: header, main, footer, article, section, nav
- Always add alt text to images
- Use proper heading hierarchy (h1 → h2 → h3)
- Add lang attribute to html tag
- Make forms accessible with labels`,
        [{title:'MDN HTML',url:'https://developer.mozilla.org/en-US/docs/Learn/HTML',type:'docs'},{title:'W3Schools HTML',url:'https://www.w3schools.com/html/',type:'article'}],
        ['Build a personal portfolio page with header, main sections, and footer','Create a multi-field form with validation']),

      lesson('CSS Mastery','Flexbox, Grid, animations, custom properties','beginner',60,
`## CSS Mastery

### CSS Custom Properties (Variables)
\`\`\`css
:root {
  --primary: #6366f1;
  --secondary: #10b981;
  --text: #1f2937;
  --bg: #ffffff;
  --radius: 0.75rem;
}

.button {
  background: var(--primary);
  border-radius: var(--radius);
  color: white;
}
\`\`\`

### Flexbox Layout
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 300px; /* grow, shrink, basis */
}
\`\`\`

### CSS Grid
\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
\`\`\`

### Animations
\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.3s ease-out;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
\`\`\``,
        [{title:'CSS Tricks Flexbox',url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',type:'article'},{title:'Grid Garden',url:'https://cssgridgarden.com',type:'course'}],
        ['Build a responsive dashboard layout with CSS Grid','Create an animated card component with hover effects']),

      lesson('Responsive Design','Media queries, mobile-first, viewport units','beginner',45,
`## Responsive Design

### Mobile-First Approach
\`\`\`css
/* Base: mobile styles */
.container { width: 100%; padding: 1rem; }
.grid { grid-template-columns: 1fr; }
.sidebar { display: none; }

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container { max-width: 768px; margin: 0 auto; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container { max-width: 1280px; }
  .grid { grid-template-columns: repeat(3, 1fr); }
  .sidebar { display: block; }
}
\`\`\`

### Viewport Units
\`\`\`css
.hero      { height: 100vh; }        /* full viewport height */
.sidebar   { width: 25vw; }         /* 25% viewport width  */
.font-hero { font-size: clamp(2rem, 5vw, 4rem); } /* fluid typography */
\`\`\`

### Responsive Images
\`\`\`html
<img src="image.jpg" alt="Description"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy">
\`\`\``,
        [{title:'Responsive Design - freeCodeCamp',url:'https://www.freecodecamp.org/learn/2022/responsive-web-design/',type:'course'}],
        ['Convert a fixed layout to fully responsive','Build a responsive image gallery']),
    ]),

    mod('JavaScript','beginner','⚡',[
      lesson('JavaScript Fundamentals','Variables, types, functions, control flow','beginner',60,
`## JavaScript Fundamentals

### Variables and Types
\`\`\`javascript
// Modern variable declarations
const PI    = 3.14159;     // immutable
let count   = 0;           // mutable
// avoid var - function scoped and hoisted

// Types
const str   = "Hello World";
const num   = 42;
const float = 3.14;
const bool  = true;
const arr   = [1, 2, 3];
const obj   = { name: "Alice", age: 25 };
const empty = null;
let  undef; // undefined

console.log(typeof str);  // "string"
console.log(typeof num);  // "number"
console.log(typeof obj);  // "object"
\`\`\`

### Functions
\`\`\`javascript
// Function declaration (hoisted)
function add(a, b) {
  return a + b;
}

// Arrow function (modern, preferred)
const multiply = (a, b) => a * b;

// Default parameters
const greet = (name = "World") => \`Hello, \${name}!\`;

// Rest parameters
const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
console.log(sum(1, 2, 3, 4, 5)); // 15
\`\`\`

### Array Methods
\`\`\`javascript
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob",   age: 17, active: false },
  { name: "Carol", age: 30, active: true },
];

// map - transform each item
const names = users.map(u => u.name);
// ["Alice", "Bob", "Carol"]

// filter - keep items matching condition
const adults = users.filter(u => u.age >= 18);
// [Alice, Carol]

// find - get first match
const alice = users.find(u => u.name === "Alice");

// reduce - accumulate into single value
const totalAge = users.reduce((sum, u) => sum + u.age, 0); // 72

// every / some
const allAdult  = users.every(u => u.age >= 18);  // false
const someAdult = users.some(u => u.age >= 18);   // true
\`\`\``,
        [{title:'javascript.info',url:'https://javascript.info',type:'docs'},{title:'Eloquent JavaScript',url:'https://eloquentjavascript.net',type:'article'}],
        ['Build a todo list with add, delete, filter, and sort','Create a product catalog with search and filter']),

      lesson('Async JavaScript','Callbacks, Promises, async/await, Fetch API','intermediate',70,
`## Async JavaScript

### The Problem: JavaScript is Single-Threaded
JavaScript runs on one thread, so async operations (network, timers) would block everything without async patterns.

### Promises
\`\`\`javascript
// Creating a Promise
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) reject(new Error("ID required"));
    setTimeout(() => resolve({ id, name: "Alice" }), 1000);
  });
};

// Using Promises
fetchUser(1)
  .then(user => console.log(user))
  .catch(err => console.error(err))
  .finally(() => console.log("Done"));
\`\`\`

### Async/Await (cleaner syntax)
\`\`\`javascript
async function loadUserData(userId) {
  try {
    const res  = await fetch(\`/api/users/\${userId}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const user = await res.json();
    
    // Parallel requests
    const [posts, followers] = await Promise.all([
      fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
      fetch(\`/api/followers/\${userId}\`).then(r => r.json()),
    ]);
    
    return { user, posts, followers };
  } catch (err) {
    console.error("Failed:", err.message);
    throw err;
  }
}
\`\`\`

### Fetch API
\`\`\`javascript
// GET
const data = await fetch('/api/items').then(r => r.json());

// POST
const created = await fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New Item' }),
}).then(r => r.json());

// PUT
await fetch('/api/items/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated' }),
});

// DELETE
await fetch('/api/items/1', { method: 'DELETE' });
\`\`\``,
        [{title:'Async JS - javascript.info',url:'https://javascript.info/async',type:'docs'}],
        ['Build a weather app using OpenWeather API','Create a GitHub user profile viewer']),
    ]),

    mod('React.js','intermediate','⚛️',[
      lesson('React Core Concepts','JSX, components, props, state','intermediate',90,
`## React Core Concepts

### What is React?
React is a JavaScript library for building UIs from reusable components.

### JSX - JavaScript + HTML
\`\`\`jsx
// JSX looks like HTML but is JavaScript
function UserCard({ name, role, avatar }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="card">
      {avatar ? (
        <img src={avatar} alt={name} />
      ) : (
        <div className="avatar">{initials}</div>
      )}
      <h2>{name}</h2>
      <p className="role">{role}</p>
    </div>
  );
}

// Usage
<UserCard name="Alice Johnson" role="Frontend Dev" />
\`\`\`

### useState - Managing State
\`\`\`jsx
import { useState } from 'react';

function ShoppingCart() {
  const [items, setItems]       = useState([]);
  const [discount, setDiscount] = useState(0);

  const addItem = (product) => {
    setItems(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const discounted = total * (1 - discount / 100);

  return (
    <div>
      <p>Items: {items.length} | Total: \${discounted.toFixed(2)}</p>
      {items.map(item => (
        <div key={item.id}>
          {item.name} - \${item.price}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### useEffect - Side Effects
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false; // prevent stale updates
    
    setLoading(true);
    setError(null);
    
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    
    return () => { cancelled = true; }; // cleanup
  }, [userId]); // re-run when userId changes

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error}</div>;
  return <h1>{user?.name}</h1>;
}
\`\`\``,
        [{title:'React Official Docs',url:'https://react.dev',type:'docs'},{title:'React Tutorial',url:'https://react.dev/learn',type:'course'}],
        ['Build a task management app with add, delete, filter features','Create a product catalog with search, filter, and cart']),

      lesson('React Hooks and Patterns','Custom hooks, Context, useRef, useMemo','intermediate',90,
`## React Hooks and Patterns

### Custom Hooks
\`\`\`jsx
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

// useDebounce hook
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}

// Usage
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery    = useDebounce(query, 500);
  
  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
\`\`\`

### Context API
\`\`\`jsx
// ThemeContext.js
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// Using it
function NavBar() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Current: {theme}</button>;
}
\`\`\``,
        [{title:'React Hooks Ref',url:'https://react.dev/reference/react',type:'docs'}],
        ['Build a custom useFetch hook with loading, error, data','Create a theme switcher using Context API']),

      lesson('React Router and Forms','Navigation, protected routes, form handling','intermediate',60,
`## React Router and Forms

### React Router v6
\`\`\`jsx
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useParams } from 'react-router-dom';

// App.jsx
function App() {
  const { user } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          user ? <Dashboard /> : <Navigate to="/login" replace />
        } />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// UserDetail.jsx
function UserDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  
  return (
    <div>
      <h1>User {id}</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
\`\`\`

### Form Handling
\`\`\`jsx
function LoginForm() {
  const [form,   setForm]   = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading,setLoading]= useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email)    errs.email    = 'Email required';
    if (!form.password) errs.password = 'Password required';
    if (form.password.length < 6) errs.password = 'Min 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <p className="error">{errors.general}</p>}
      <input value={form.email}    onChange={e => setForm({...form, email: e.target.value})} />
      {errors.email && <p>{errors.email}</p>}
      <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} type="password" />
      {errors.password && <p>{errors.password}</p>}
      <button disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
    </form>
  );
}
\`\`\``,
        [{title:'React Router Docs',url:'https://reactrouter.com',type:'docs'}],
        ['Add authentication with protected routes to a React app','Build a multi-step form with validation']),
    ]),
  ],
},

{
  title: 'Backend Developer',
  description: 'Master Node.js, Express, databases, authentication, and API design to build production-ready backends.',
  type: 'role', category: 'Backend Developer',
  icon: '⚙️', color: '#10b981',
  tags: ['Node.js','Express','MongoDB','PostgreSQL','REST','GraphQL'],
  estimatedHours: 150, totalLessons: 10,
  modules: [
    mod('Node.js & Express','beginner','📡',[
      lesson('Node.js Deep Dive','Event loop, streams, modules, worker threads','beginner',70,
`## Node.js Deep Dive

### The Event Loop
\`\`\`
Call Stack → Node APIs → Callback Queue → Event Loop → Call Stack
\`\`\`

### File System (Async)
\`\`\`javascript
const fs   = require('fs').promises;
const path = require('path');

// Read file
const content = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8');
const data    = JSON.parse(content);

// Write file
await fs.writeFile('output.json', JSON.stringify(data, null, 2));

// Read directory
const files = await fs.readdir('./src');
const jsFiles = files.filter(f => f.endsWith('.js'));

// Watch for changes
fs.watch('./src', (event, filename) => {
  console.log(\`\${event}: \${filename}\`);
});
\`\`\`

### Creating Modules
\`\`\`javascript
// utils/math.js
const add      = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

module.exports = { add, subtract, multiply };

// ES Module syntax (with "type": "module" in package.json)
export const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

// usage
const { add } = require('./utils/math');
\`\`\`

### Environment Variables
\`\`\`javascript
require('dotenv').config();

const PORT      = process.env.PORT      || 5000;
const DB_URI    = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!DB_URI) {
  console.error('MONGODB_URI is required');
  process.exit(1);
}
\`\`\``,
        [{title:'Node.js Docs',url:'https://nodejs.org/en/docs',type:'docs'},{title:'Node.js Crash Course',url:'https://www.youtube.com/watch?v=fBNz5xF-Kx4',type:'video'}],
        ['Build a CLI file manager with read, write, list, delete','Create a CSV parser that transforms data']),

      lesson('Express REST API','Routing, middleware, error handling, validation','intermediate',80,
`## Express REST API

### Project Structure
\`\`\`
backend/
├── server.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── controllers/
│   ├── authController.js
│   └── postController.js
├── middleware/
│   ├── auth.js
│   └── validate.js
└── models/
    └── User.js
\`\`\`

### Complete CRUD API
\`\`\`javascript
const express = require('express');
const router  = express.Router();
const Post    = require('../models/Post');

// GET /api/posts?page=1&limit=10&sort=createdAt
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', search } = req.query;
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    
    const [posts, total] = await Promise.all([
      Post.find(query)
          .sort(sort)
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .populate('author', 'name email'),
      Post.countDocuments(query),
    ]);
    
    res.json({ success: true, posts, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/posts
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Validation
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
    if (title.length > 100) return res.status(400).json({ message: 'Title too long' });
    
    const post = await Post.create({ title, content, tags, author: req.user._id });
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
\`\`\``,
        [{title:'Express Docs',url:'https://expressjs.com',type:'docs'}],
        ['Build a blog API with CRUD, pagination, and search','Add request validation middleware']),
    ]),

    mod('Databases','intermediate','🗄️',[
      lesson('MongoDB Advanced','Aggregation, indexing, transactions, Atlas','intermediate',80,
`## MongoDB Advanced

### Aggregation Pipeline
\`\`\`javascript
// Get top 5 authors by post count with average likes
const results = await Post.aggregate([
  { $match: { published: true } },          // filter
  { $group: {
      _id: '$author',
      postCount: { $sum: 1 },
      avgLikes:  { $avg: '$likes' },
      totalViews:{ $sum: '$views' },
    }
  },
  { $sort: { postCount: -1 } },             // sort by most posts
  { $limit: 5 },                            // top 5
  { $lookup: {                              // join with users
      from:         'users',
      localField:   '_id',
      foreignField: '_id',
      as:           'author',
    }
  },
  { $unwind: '$author' },
  { $project: {
      name:       '$author.name',
      postCount:  1,
      avgLikes:   { $round: ['$avgLikes', 1] },
      totalViews: 1,
    }
  },
]);
\`\`\`

### Indexing for Performance
\`\`\`javascript
const postSchema = new Schema({
  title:     String,
  content:   String,
  author:    { type: ObjectId, ref: 'User' },
  tags:      [String],
  views:     Number,
  createdAt: Date,
});

// Single field index
postSchema.index({ author: 1 });

// Compound index
postSchema.index({ author: 1, createdAt: -1 });

// Text search index
postSchema.index({ title: 'text', content: 'text' });

// Unique index
postSchema.index({ slug: 1 }, { unique: true });
\`\`\``,
        [{title:'MongoDB Aggregation',url:'https://www.mongodb.com/docs/manual/aggregation/',type:'docs'}],
        ['Write 3 aggregation pipelines for real analytics queries','Add indexes to optimize slow queries']),

      lesson('PostgreSQL and SQL','Schemas, joins, transactions, optimization','intermediate',80,
`## PostgreSQL and SQL

### Schema Design
\`\`\`sql
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  name       VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT NOT NULL,
  author_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
  views      INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
\`\`\`

### Complex Joins and Queries
\`\`\`sql
-- Get posts with author info and comment count
SELECT 
  p.id,
  p.title,
  p.views,
  p.created_at,
  u.name    AS author_name,
  u.email   AS author_email,
  COUNT(c.id) AS comment_count
FROM posts p
JOIN users u ON p.author_id = u.id
LEFT JOIN comments c ON c.post_id = p.id
WHERE p.created_at > NOW() - INTERVAL '30 days'
GROUP BY p.id, u.id
ORDER BY p.views DESC
LIMIT 20;
\`\`\`

### Transactions
\`\`\`javascript
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function transferFunds(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
    await client.query('COMMIT');
    console.log('Transfer successful');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
\`\`\``,
        [{title:'PostgreSQL Tutorial',url:'https://www.postgresqltutorial.com',type:'article'},{title:'SQLZoo',url:'https://sqlzoo.net',type:'course'}],
        ['Design a database schema for a social media app','Write 5 complex SQL queries with JOINs and aggregations']),
    ]),

    mod('Auth & Security','intermediate','🔒',[
      lesson('JWT Auth and OAuth','Tokens, refresh, OAuth2, security best practices','intermediate',70,
`## JWT Auth and OAuth

### Complete Auth System
\`\`\`javascript
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate tokens
function generateTokens(userId) {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }  // short lived
  );
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }   // long lived
  );
  return { accessToken, refreshToken };
}

// Refresh token rotation
async function refreshTokens(req, res) {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const tokens  = generateTokens(decoded.id);
    // Invalidate old refresh token (store used tokens in DB)
    res.json(tokens);
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}
\`\`\`

### Security Middleware
\`\`\`javascript
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      100,             // 100 requests per window
  message:  'Too many requests, please try again later.',
});
app.use('/api/', limiter);

// Prevent NoSQL injection
app.use(mongoSanitize());

// CORS
app.use(cors({
  origin:      process.env.CLIENT_URL,
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'DELETE'],
}));
\`\`\``,
        [{title:'JWT.io',url:'https://jwt.io',type:'docs'},{title:'OWASP Security',url:'https://owasp.org/www-project-top-ten/',type:'article'}],
        ['Implement refresh token rotation','Add rate limiting and security headers to your API']),
    ]),
  ],
},

{
  title: 'Full Stack Developer',
  description: 'Combine frontend and backend skills to build complete web applications from database to UI.',
  type: 'role', category: 'Full Stack Developer',
  icon: '🚀', color: '#6366f1',
  tags: ['React','Node.js','MongoDB','REST API','Deployment'],
  estimatedHours: 160, totalLessons: 8,
  modules: [
    mod('Full Stack Architecture','intermediate','🏗️',[
      lesson('Full Stack App Architecture','Project structure, MVC, API design, state management','intermediate',80,
`## Full Stack Architecture

### Project Structure
\`\`\`
fullstack-app/
├── backend/
│   ├── config/        database, env
│   ├── controllers/   request handlers
│   ├── middleware/    auth, validation, errors
│   ├── models/        database schemas
│   ├── routes/        API endpoints
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/       axios calls
│       ├── components/
│       ├── context/   global state
│       ├── hooks/     custom hooks
│       └── pages/
└── docker-compose.yml
\`\`\`

### API Design Best Practices
\`\`\`
REST Conventions:
GET    /api/posts          - list all
GET    /api/posts/:id      - get one
POST   /api/posts          - create
PUT    /api/posts/:id      - full update
PATCH  /api/posts/:id      - partial update
DELETE /api/posts/:id      - delete

Status Codes:
200 - OK (GET, PUT, PATCH)
201 - Created (POST)
204 - No Content (DELETE)
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
422 - Unprocessable Entity (validation errors)
500 - Internal Server Error

Response Format:
{ success: true,  data: {...},    message: "..." }
{ success: false, error: "...",   code: 400 }
\`\`\``,
        [{title:'REST API Best Practices',url:'https://restfulapi.net',type:'article'}],
        ['Design a complete API spec for a social media app','Build a full stack CRUD app from scratch']),

      lesson('Authentication Full Stack','JWT on frontend + backend, protected routes','intermediate',80,
`## Full Stack Authentication

### Backend: Auth Middleware
\`\`\`javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};

module.exports = { protect, adminOnly };
\`\`\`

### Frontend: Auth Context
\`\`\`jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Auto-login on mount
  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token } })
        .then(r => r.json())
        .then(data => data.success && setUser(data.user))
        .catch(() => { localStorage.removeItem('token'); setToken(null); });
    }
  }, []);

  const login = async (email, password) => {
    const res  = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => { localStorage.removeItem('token'); setToken(null); setUser(null); };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
\`\`\``,
        [],
        ['Implement complete login/register flow full stack','Add role-based access control (admin vs user)']),
    ]),

    mod('Deployment','advanced','☁️',[
      lesson('Docker and Deployment','Docker, CI/CD, Render, Vercel deployment','advanced',90,
`## Docker and Deployment

### Dockerfile for Node.js
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
\`\`\`

### Docker Compose (Full Stack)
\`\`\`yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ['5000:5000']
    environment:
      - MONGODB_URI=mongodb://mongo:27017/myapp
      - JWT_SECRET=\${JWT_SECRET}
    depends_on: [mongo]
    
  frontend:
    build: ./frontend
    ports: ['3000:3000']
    environment:
      - REACT_APP_API_URL=http://backend:5000/api
      
  mongo:
    image: mongo:6
    volumes: [mongo_data:/data/db]
    ports: ['27017:27017']

volumes:
  mongo_data:
\`\`\`

### Deploy to Render (Backend)
\`\`\`
1. Push code to GitHub
2. render.com → New Web Service
3. Connect GitHub repo
4. Build: npm install
5. Start: node server.js
6. Add environment variables in dashboard
\`\`\`

### Deploy to Vercel (Frontend)
\`\`\`
1. Push frontend to GitHub
2. vercel.com → Import Project
3. Set REACT_APP_API_URL to your Render URL
4. Deploy → auto-deploys on every push
\`\`\``,
        [{title:'Docker Docs',url:'https://docs.docker.com/get-started/',type:'docs'},{title:'Render Docs',url:'https://render.com/docs',type:'docs'}],
        ['Dockerize your full stack app','Deploy backend to Render, frontend to Vercel']),
    ]),
  ],
},

{
  title: 'Data Scientist',
  description: 'Master statistics, data analysis, machine learning, and AI to extract insights and build predictive models.',
  type: 'role', category: 'Data Scientist',
  icon: '📊', color: '#8b5cf6',
  tags: ['Python','NumPy','Pandas','Scikit-learn','TensorFlow','SQL'],
  estimatedHours: 180, totalLessons: 8,
  modules: [
    mod('Data Analysis','intermediate','🔬',[
      lesson('NumPy and Pandas Mastery','Arrays, DataFrames, cleaning, transformation','intermediate',90,
`## NumPy and Pandas Mastery

### NumPy Fundamentals
\`\`\`python
import numpy as np

# Array creation
arr       = np.array([1, 2, 3, 4, 5])
zeros     = np.zeros((3, 4))
ones      = np.ones((2, 3))
rand      = np.random.rand(3, 3)
arange    = np.arange(0, 10, 0.5)     # 0 to 10, step 0.5
linspace  = np.linspace(0, 1, 100)    # 100 evenly spaced points

# Vectorized operations (no loops!)
arr * 2          # [2, 4, 6, 8, 10]
arr ** 2         # [1, 4, 9, 16, 25]
np.sqrt(arr)     # element-wise sqrt
arr.sum()        # 15
arr.mean()       # 3.0
arr.std()        # 1.41
arr.reshape(5,1) # change shape

# Boolean indexing
arr[arr > 2]     # [3, 4, 5]
arr[(arr > 1) & (arr < 4)] # [2, 3]
\`\`\`

### Pandas Data Cleaning
\`\`\`python
import pandas as pd

df = pd.read_csv('data.csv')

# Explore
print(df.shape)       # rows, cols
print(df.dtypes)      # column types
print(df.isnull().sum()) # count nulls
print(df.duplicated().sum()) # count dups
print(df.describe())  # statistics

# Clean
df = df.drop_duplicates()
df['age'].fillna(df['age'].median(), inplace=True)
df['name'].fillna('Unknown', inplace=True)
df = df.dropna(subset=['email'])  # drop rows where email is null
df['date'] = pd.to_datetime(df['date'])
df['salary'] = df['salary'].str.replace('$','').astype(float)

# Feature engineering
df['age_group']     = pd.cut(df['age'], bins=[0,18,35,60,100], labels=['teen','young','mid','senior'])
df['salary_per_yr'] = df['salary'] * 12
df['full_name']     = df['first_name'] + ' ' + df['last_name']
\`\`\``,
        [{title:'NumPy Docs',url:'https://numpy.org/doc/',type:'docs'},{title:'Pandas Docs',url:'https://pandas.pydata.org/docs/',type:'docs'},{title:'Kaggle Pandas',url:'https://www.kaggle.com/learn/pandas',type:'course'}],
        ['Perform complete EDA on the Titanic dataset','Clean a messy real-world dataset']),

      lesson('Data Visualization','Matplotlib, Seaborn, Plotly interactive charts','intermediate',70,
`## Data Visualization

### Matplotlib
\`\`\`python
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(15, 10))
gs  = gridspec.GridSpec(2, 3, figure=fig)

# Line chart
ax1 = fig.add_subplot(gs[0, :2])
ax1.plot(months, revenue, 'b-o', linewidth=2, label='Revenue')
ax1.fill_between(months, revenue, alpha=0.1)
ax1.set_title('Monthly Revenue', fontsize=14)
ax1.legend()

# Bar chart
ax2 = fig.add_subplot(gs[0, 2])
bars = ax2.bar(categories, values, color=['#6366f1','#10b981','#f59e0b'])
for bar, val in zip(bars, values):
    ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height(), f'{val}', ha='center', va='bottom')

plt.tight_layout()
plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
plt.show()
\`\`\`

### Seaborn for Statistical Plots
\`\`\`python
import seaborn as sns
sns.set_theme(style='darkgrid', palette='husl')

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Distribution
sns.histplot(df['salary'], bins=30, kde=True, ax=axes[0,0])

# Correlation heatmap
corr = df[['age','salary','experience','rating']].corr()
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, ax=axes[0,1])

# Box plot
sns.boxplot(x='department', y='salary', data=df, ax=axes[1,0])
axes[1,0].tick_params(axis='x', rotation=45)

# Scatter with regression
sns.regplot(x='experience', y='salary', data=df, ax=axes[1,1],
            scatter_kws={'alpha':0.5}, line_kws={'color':'red'})
\`\`\``,
        [{title:'Matplotlib',url:'https://matplotlib.org/stable/tutorials/',type:'docs'},{title:'Seaborn Gallery',url:'https://seaborn.pydata.org/examples/',type:'docs'}],
        ['Create a complete 4-chart analytics dashboard','Build an interactive visualization with Plotly']),
    ]),

    mod('Machine Learning','advanced','🤖',[
      lesson('Scikit-learn Complete','Regression, classification, clustering, pipelines','advanced',110,
`## Scikit-learn Complete Guide

### ML Pipeline
\`\`\`python
from sklearn.pipeline           import Pipeline
from sklearn.preprocessing      import StandardScaler, LabelEncoder
from sklearn.model_selection    import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble           import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model       import LogisticRegression
from sklearn.metrics            import classification_report, confusion_matrix, roc_auc_score

# Prepare data
X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Build pipeline (preprocessing + model)
pipeline = Pipeline([
  ('scaler', StandardScaler()),
  ('model',  RandomForestClassifier(n_estimators=100, random_state=42))
])

# Hyperparameter tuning
param_grid = {
  'model__n_estimators': [100, 200],
  'model__max_depth':    [None, 10, 20],
  'model__min_samples_split': [2, 5],
}
grid_search = GridSearchCV(pipeline, param_grid, cv=5, scoring='f1', n_jobs=-1)
grid_search.fit(X_train, y_train)

best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)

print('Best params:', grid_search.best_params_)
print(classification_report(y_test, y_pred))
print('ROC AUC:', roc_auc_score(y_test, best_model.predict_proba(X_test)[:,1]))
\`\`\``,
        [{title:'Scikit-learn Guide',url:'https://scikit-learn.org/stable/user_guide.html',type:'docs'},{title:'Kaggle ML Course',url:'https://www.kaggle.com/learn/intro-to-machine-learning',type:'course'}],
        ['Build a churn prediction model with full pipeline','Create a recommendation system']),
    ]),
  ],
},

{
  title: 'DevOps Engineer',
  description: 'Master CI/CD, containerization, cloud infrastructure, monitoring, and automation to ship software reliably.',
  type: 'role', category: 'DevOps Engineer',
  icon: '🐳', color: '#06b6d4',
  tags: ['Docker','Kubernetes','CI/CD','AWS','Linux','Terraform'],
  estimatedHours: 160, totalLessons: 8,
  modules: [
    mod('Linux and Shell','beginner','🐧',[
      lesson('Linux Mastery','File system, processes, networking, bash scripting','beginner',70,
`## Linux Mastery

### Essential Commands
\`\`\`bash
# Navigation
pwd                    # print working directory
ls -la                 # list with permissions
cd /path/to/dir        # change directory
mkdir -p a/b/c         # create nested dirs
rm -rf folder          # delete folder (careful!)
cp -r src/ dest/       # copy directory
mv file.txt newname.txt # move/rename

# File Operations
cat file.txt           # print file content
head -n 20 file.txt    # first 20 lines
tail -f app.log        # follow log in real time
grep -rn "error" logs/ # search recursively
sed -i 's/old/new/g' file  # replace text
awk '{print $2}' file  # print column 2

# Process Management
ps aux                 # list all processes
top                    # live process monitor
htop                   # prettier top
kill -9 PID            # force kill process
nohup command &        # run in background
\`\`\`

### Bash Scripting
\`\`\`bash
#!/bin/bash
set -e  # exit on error

APP_NAME="myapp"
VERSION=\${1:-"latest"}  # first arg or "latest"
DEPLOY_DIR="/var/www/\$APP_NAME"

echo "🚀 Deploying \$APP_NAME v\$VERSION"

# Check if running as root
if [ "\$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

# Backup current version
if [ -d "\$DEPLOY_DIR" ]; then
  cp -r "\$DEPLOY_DIR" "\${DEPLOY_DIR}.backup.\$(date +%Y%m%d_%H%M%S)"
  echo "✅ Backup created"
fi

# Deploy
git pull origin main
npm ci --only=production
pm2 restart \$APP_NAME || pm2 start server.js --name \$APP_NAME

echo "✅ Deployment complete!"
\`\`\``,
        [{title:'Linux Command Line',url:'https://linuxcommand.org',type:'article'},{title:'Bash Scripting Guide',url:'https://www.gnu.org/software/bash/manual/',type:'docs'}],
        ['Write a backup script that compresses and uploads to S3','Create a monitoring script that alerts on high CPU']),

      lesson('Docker Complete','Images, containers, compose, networking, best practices','intermediate',90,
`## Docker Complete Guide

### Core Concepts
\`\`\`
Image     = Template (read-only)
Container = Running instance of an image
Registry  = Stores images (Docker Hub, ECR, GCR)
\`\`\`

### Production Dockerfile
\`\`\`dockerfile
# Multi-stage build for Node.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage (smaller image)
FROM node:18-alpine AS production
WORKDIR /app

# Security: don't run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:5000/health || exit 1
CMD ["node", "dist/server.js"]
\`\`\`

### Docker Compose Production
\`\`\`yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports: ['80:80', '443:443']
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - certbot-certs:/etc/letsencrypt
    depends_on: [backend]

  backend:
    build: { context: ./backend, target: production }
    restart: unless-stopped
    environment:
      NODE_ENV: production
      PORT: 5000
    env_file: .env.production
    depends_on: [mongo, redis]

  mongo:
    image: mongo:6
    restart: unless-stopped
    volumes: [mongo-data:/data/db]
    environment:
      MONGO_INITDB_ROOT_USERNAME: \${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: \${MONGO_PASS}

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes: [redis-data:/data]

volumes:
  mongo-data:
  redis-data:
  certbot-certs:
\`\`\``,
        [{title:'Docker Docs',url:'https://docs.docker.com',type:'docs'},{title:'Docker for Beginners',url:'https://docker-curriculum.com',type:'article'}],
        ['Containerize a Node.js + MongoDB app','Set up Docker Compose with nginx reverse proxy']),
    ]),

    mod('CI/CD and Cloud','advanced','☁️',[
      lesson('GitHub Actions CI/CD','Automated testing, building, and deployment pipelines','advanced',80,
`## GitHub Actions CI/CD

### Complete Pipeline
\`\`\`yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # Run tests
  test:
    runs-on: ubuntu-latest
    services:
      mongo:
        image: mongo:6
        ports: ['27017:27017']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
        env:
          MONGODB_URI: mongodb://localhost:27017/test
          JWT_SECRET:  test-secret

  # Build and push Docker image
  build:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest

  # Deploy to production
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host:     \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key:      \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ghcr.io/\${{ github.repository }}:latest
            docker-compose up -d
\`\`\``,
        [{title:'GitHub Actions Docs',url:'https://docs.github.com/en/actions',type:'docs'}],
        ['Set up CI pipeline that runs tests on every PR','Create CD pipeline that deploys on merge to main']),
    ]),
  ],
},

{
  title: 'Mobile Developer',
  description: 'Build cross-platform mobile apps with React Native for iOS and Android from a single codebase.',
  type: 'role', category: 'Mobile Developer',
  icon: '📱', color: '#ec4899',
  tags: ['React Native','JavaScript','iOS','Android','Expo','Redux'],
  estimatedHours: 140, totalLessons: 8,
  modules: [
    mod('React Native Basics','beginner','📱',[
      lesson('React Native Fundamentals','Core components, styling, navigation','beginner',90,
`## React Native Fundamentals

### Core Components
\`\`\`jsx
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, FlatList, Image, StyleSheet,
  Platform, Dimensions, SafeAreaView,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function UserCard({ user, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection:  'row',
    alignItems:     'center',
    padding:        16,
    margin:         8,
    backgroundColor:'#fff',
    borderRadius:   12,
    shadowColor:    '#000',
    shadowOffset:   { width: 0, height: 2 },
    shadowOpacity:  0.1,
    shadowRadius:   8,
    elevation:      3, // Android shadow
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  info:   { marginLeft: 12, flex: 1 },
  name:   { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  role:   { fontSize: 14, color: '#666', marginTop: 2 },
});
\`\`\`

### FlatList for Long Lists
\`\`\`jsx
function PostList({ posts }) {
  const renderItem = ({ item, index }) => (
    <PostCard post={item} index={index} />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2}              // grid layout
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={loadMore}     // infinite scroll
      onEndReachedThreshold={0.3}
      ListHeaderComponent={<Header />}
      ListEmptyComponent={<EmptyState />}
      contentContainerStyle={{ padding: 8 }}
    />
  );
}
\`\`\``,
        [{title:'React Native Docs',url:'https://reactnative.dev/docs/getting-started',type:'docs'},{title:'Expo Docs',url:'https://docs.expo.dev',type:'docs'}],
        ['Build a todo app with FlatList and local storage','Create a profile screen with image picker']),
    ]),
  ],
},

// ═══════════════════════════════════════════
// PROGRAMMING LANGUAGES
// ═══════════════════════════════════════════

{
  title: 'Python Programming',
  description: 'Master Python from basics to advanced: OOP, data structures, algorithms, web development, and automation.',
  type: 'language', category: 'Python',
  icon: '🐍', color: '#3b82f6',
  tags: ['Python','OOP','Flask','Django','Automation','Data Science'],
  estimatedHours: 110, totalLessons: 9,
  modules: [
    mod('Python Fundamentals','beginner','🌱',[
      lesson('Python Basics','Syntax, variables, types, control flow, functions','beginner',50,
`## Python Basics

### Variables and Types
\`\`\`python
# Dynamic typing
name    = "Alice"          # str
age     = 25               # int
height  = 1.75             # float
is_dev  = True             # bool
nothing = None             # NoneType

# Type hints (Python 3.5+)
def greet(name: str, age: int) -> str:
    return f"Hi {name}, you are {age} years old"

# Type checking
print(type(name))    # <class 'str'>
print(isinstance(age, int))  # True
\`\`\`

### String Methods
\`\`\`python
s = "  Hello, World!  "
print(s.strip())         # "Hello, World!"
print(s.lower())         # "  hello, world!  "
print(s.upper())         # "  HELLO, WORLD!  "
print(s.split(","))      # ["  Hello", " World!  "]
print(s.replace("World", "Python"))
print(",".join(["a","b","c"]))  # "a,b,c"
print(f"Name: {name!r}")  # repr format

# String slicing
s = "Hello World"
print(s[0:5])    # "Hello"
print(s[-5:])    # "World"
print(s[::-1])   # "dlroW olleH" (reversed)
\`\`\`

### Control Flow
\`\`\`python
# Match statement (Python 3.10+)
match status_code:
    case 200: print("OK")
    case 404: print("Not Found")
    case 500: print("Server Error")
    case _:   print("Unknown")

# Comprehensions
squares    = [x**2 for x in range(10)]
even_sq    = [x**2 for x in range(10) if x % 2 == 0]
word_len   = {w: len(w) for w in ["hello","world","python"]}
unique_sq  = {x**2 for x in range(-5, 6)}  # set comprehension
\`\`\``,
        [{title:'Python Tutorial',url:'https://docs.python.org/3/tutorial/',type:'docs'},{title:'Real Python',url:'https://realpython.com',type:'article'}],
        ['Build a text adventure game','Write a script that processes a CSV file']),

      lesson('Python OOP','Classes, inheritance, magic methods, dataclasses','intermediate',65,
`## Python OOP

### Complete Class Example
\`\`\`python
from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class Author:
    name:  str
    email: str
    bio:   Optional[str] = None

@dataclass
class Post:
    title:      str
    content:    str
    author:     Author
    tags:       List[str] = field(default_factory=list)
    views:      int       = 0
    created_at: datetime  = field(default_factory=datetime.now)
    
    def __post_init__(self):
        if not self.title:
            raise ValueError("Title cannot be empty")
        self.title = self.title.strip()
    
    @property
    def summary(self) -> str:
        return self.content[:100] + "..." if len(self.content) > 100 else self.content
    
    @property
    def read_time(self) -> int:
        return max(1, len(self.content.split()) // 200)
    
    def add_view(self):
        self.views += 1
    
    def __repr__(self):
        return f"Post('{self.title}', by {self.author.name})"

# Magic methods
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    
    def __add__(self, other):     return Vector(self.x + other.x, self.y + other.y)
    def __mul__(self, scalar):    return Vector(self.x * scalar, self.y * scalar)
    def __len__(self):            return int((self.x**2 + self.y**2)**0.5)
    def __repr__(self):           return f"Vector({self.x}, {self.y})"
    def __eq__(self, other):      return self.x == other.x and self.y == other.y

v1, v2 = Vector(1, 2), Vector(3, 4)
print(v1 + v2)      # Vector(4, 6)
print(v1 * 3)       # Vector(3, 6)
print(len(v2))      # 5
\`\`\``,
        [{title:'Python OOP',url:'https://realpython.com/python3-object-oriented-programming/',type:'article'}],
        ['Build a library management system with OOP','Create a bank account simulation with inheritance']),
    ]),

    mod('Python Web and Automation','advanced','🤖',[
      lesson('Flask Web Framework','REST APIs, templates, SQLAlchemy, authentication','advanced',90,
`## Flask Web Framework

### Complete Flask App
\`\`\`python
from flask import Flask, jsonify, request, g
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
import jwt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db  = SQLAlchemy(app)

# Models
class User(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    email    = db.Column(db.String(255), unique=True, nullable=False)
    name     = db.Column(db.String(100), nullable=False)
    posts    = db.relationship('Post', backref='author', lazy='dynamic')

class Post(db.Model):
    id        = db.Column(db.Integer, primary_key=True)
    title     = db.Column(db.String(255), nullable=False)
    content   = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# Auth decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        try:
            data  = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            g.user = User.query.get(data['id'])
        except:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

# Routes
@app.route('/api/posts', methods=['GET'])
def get_posts():
    page  = request.args.get('page', 1, type=int)
    posts = Post.query.paginate(page=page, per_page=10)
    return jsonify({
        'posts': [{'id': p.id, 'title': p.title} for p in posts.items],
        'total': posts.total, 'pages': posts.pages
    })

@app.route('/api/posts', methods=['POST'])
@token_required
def create_post():
    data  = request.get_json()
    post  = Post(title=data['title'], content=data['content'], author_id=g.user.id)
    db.session.add(post)
    db.session.commit()
    return jsonify({'id': post.id}), 201
\`\`\``,
        [{title:'Flask Docs',url:'https://flask.palletsprojects.com',type:'docs'},{title:'Flask Mega Tutorial',url:'https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world',type:'article'}],
        ['Build a blog API with Flask and SQLAlchemy','Add JWT authentication to your Flask API']),
    ]),
  ],
},

{
  title: 'JavaScript Mastery',
  description: 'Master JavaScript deeply: closures, prototypes, async patterns, TypeScript, and modern ES2024 features.',
  type: 'language', category: 'JavaScript',
  icon: '💛', color: '#eab308',
  tags: ['JavaScript','TypeScript','ES6+','Closures','Async','Patterns'],
  estimatedHours: 100, totalLessons: 8,
  modules: [
    mod('Core JavaScript','intermediate','🔬',[
      lesson('Closures and Scope','Lexical scope, closures, IIFE, module pattern','intermediate',70,
`## Closures and Scope

### Scope Chain
\`\`\`javascript
const global = 'I am global';

function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    const innerVar = 'I am inner';
    console.log(global);   // ✅ accessible
    console.log(outerVar); // ✅ accessible (closure!)
    console.log(innerVar); // ✅ accessible
  }
  
  inner();
  // console.log(innerVar); // ❌ ReferenceError
}
\`\`\`

### Practical Closures
\`\`\`javascript
// 1. Factory function with private state
function createBankAccount(initialBalance) {
  let balance  = initialBalance;
  const history = [];
  
  return {
    deposit(amount) {
      balance += amount;
      history.push({ type: 'deposit', amount, balance });
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      history.push({ type: 'withdraw', amount, balance });
    },
    get balance() { return balance; },
    getHistory() { return [...history]; },
  };
}

const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.balance);     // 1300
console.log(account.getHistory()); // [{...}, {...}]

// 2. Memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // pretend this takes 1 second
  return n * n * n;
});

// 3. Currying
const curry = fn => {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

const add = curry((a, b, c) => a + b + c);
const add5 = add(5);     // partial application
console.log(add5(3)(2)); // 10
\`\`\``,
        [{title:"You Don't Know JS",url:'https://github.com/getify/You-Dont-Know-JS',type:'article'}],
        ['Implement a rate limiter using closures','Build a pub/sub event system']),

      lesson('TypeScript Fundamentals','Types, interfaces, generics, decorators','intermediate',80,
`## TypeScript Fundamentals

### Type System
\`\`\`typescript
// Basic Types
const name:    string  = "Alice";
const age:     number  = 25;
const active:  boolean = true;
const tags:    string[] = ["dev", "react"];
const tuple:   [string, number] = ["Alice", 25];

// Union Types
type Status = "pending" | "active" | "inactive";
type ID     = string | number;

// Interfaces
interface User {
  readonly id:    number;
  name:           string;
  email:          string;
  role?:          "admin" | "user"; // optional
  createdAt:      Date;
}

interface UserWithPosts extends User {
  posts: Post[];
}

// Generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<T>;
}

// Usage
const user = await fetchData<User>('/api/user/1');
const names = first<string>(["Alice", "Bob"]);

// Utility Types
type PartialUser  = Partial<User>;    // all optional
type RequiredUser = Required<User>;   // all required
type UserPreview  = Pick<User, 'id' | 'name'>;
type NoIdUser     = Omit<User, 'id'>;
type UserRecord   = Record<string, User>;
\`\`\``,
        [{title:'TypeScript Handbook',url:'https://www.typescriptlang.org/docs/handbook/',type:'docs'}],
        ['Convert a JavaScript project to TypeScript','Build a type-safe API client with generics']),
    ]),
  ],
},

{
  title: 'Java Programming',
  description: 'Master Java for enterprise development, Android, Spring Boot microservices, and system programming.',
  type: 'language', category: 'Java',
  icon: '☕', color: '#f97316',
  tags: ['Java','OOP','Spring Boot','Maven','JVM','Android'],
  estimatedHours: 130, totalLessons: 8,
  modules: [
    mod('Java Fundamentals','beginner','☕',[
      lesson('Java Core','Syntax, OOP, collections, streams, exceptions','beginner',80,
`## Java Core

### Object-Oriented Java
\`\`\`java
// Abstract base class
public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    public abstract double area();
    public abstract double perimeter();
    
    @Override
    public String toString() {
        return String.format("%s[color=%s, area=%.2f]",
            getClass().getSimpleName(), color, area());
    }
}

// Concrete class
public class Circle extends Shape {
    private final double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override public double area()      { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}

// Interface
public interface Printable {
    void print();
    default String getFormat() { return "default"; }
}
\`\`\`

### Java Streams (Functional Programming)
\`\`\`java
import java.util.*;
import java.util.stream.*;

List<Employee> employees = getEmployees();

// Chain of operations - like Array methods in JS
Map<String, Double> avgSalaryByDept = employees.stream()
    .filter(e -> e.isActive())                   // filter
    .collect(Collectors.groupingBy(
        Employee::getDepartment,                  // group by dept
        Collectors.averagingDouble(Employee::getSalary)  // average salary
    ));

// Get top 3 earners
List<String> topEarners = employees.stream()
    .filter(e -> e.getSalary() > 50000)
    .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
    .limit(3)
    .map(Employee::getName)
    .collect(Collectors.toList());

// Statistics
DoubleSummaryStatistics stats = employees.stream()
    .mapToDouble(Employee::getSalary)
    .summaryStatistics();
System.out.println("Min: " + stats.getMin());
System.out.println("Max: " + stats.getMax());
System.out.println("Avg: " + stats.getAverage());
\`\`\``,
        [{title:'Oracle Java Tutorial',url:'https://docs.oracle.com/javase/tutorial/',type:'docs'},{title:'Baeldung Java',url:'https://www.baeldung.com',type:'article'}],
        ['Build a student grade management system','Create a bank account system with OOP']),

      lesson('Spring Boot','REST APIs, dependency injection, JPA, security','advanced',100,
`## Spring Boot

### REST Controller
\`\`\`java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping
    public ResponseEntity<Page<UserDTO>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        Page<UserDTO> users = userService.findAll(pageable, search);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserDTO created = userService.create(request);
        URI location = URI.create("/api/users/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
\`\`\`

### JPA Entity
\`\`\`java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();
}
\`\`\``,
        [{title:'Spring Boot Docs',url:'https://spring.io/projects/spring-boot',type:'docs'}],
        ['Build a REST API with Spring Boot and H2 database','Add Spring Security with JWT authentication']),
    ]),
  ],
},

{
  title: 'C++ Programming',
  description: 'Master C++ for systems programming, game development, competitive programming, and high-performance applications.',
  type: 'language', category: 'C++',
  icon: '⚡', color: '#0ea5e9',
  tags: ['C++','OOP','STL','Memory Management','Algorithms','Systems'],
  estimatedHours: 140, totalLessons: 8,
  modules: [
    mod('C++ Fundamentals','beginner','🔧',[
      lesson('Modern C++','Syntax, smart pointers, STL, lambdas, templates','beginner',90,
`## Modern C++ (C++17/20)

### Smart Pointers (no memory leaks!)
\`\`\`cpp
#include <memory>
#include <string>
#include <iostream>

class Database {
public:
    Database(const std::string& url) : url_(url) {
        std::cout << "Connecting to " << url_ << "\\n";
    }
    ~Database() { std::cout << "Disconnected\\n"; }
    
    void query(const std::string& sql) {
        std::cout << "Query: " << sql << "\\n";
    }

private:
    std::string url_;
};

// unique_ptr - single ownership (auto-deleted)
auto db = std::make_unique<Database>("localhost:5432");
db->query("SELECT * FROM users");
// db is automatically deleted when out of scope

// shared_ptr - shared ownership (reference counted)
auto shared_db = std::make_shared<Database>("cloud:5432");
auto another   = shared_db; // reference count = 2
// deleted when all references are gone
\`\`\`

### STL Containers and Algorithms
\`\`\`cpp
#include <vector>
#include <map>
#include <algorithm>
#include <numeric>

std::vector<int> nums = {5, 3, 1, 4, 2};

// Sort
std::sort(nums.begin(), nums.end());  // {1,2,3,4,5}

// Lambda with STL
std::sort(nums.begin(), nums.end(), [](int a, int b) {
    return a > b; // descending
});

// Transform
std::vector<int> squared;
std::transform(nums.begin(), nums.end(), std::back_inserter(squared),
    [](int n) { return n * n; });

// Accumulate
int sum = std::accumulate(nums.begin(), nums.end(), 0);

// Find
auto it = std::find_if(nums.begin(), nums.end(), [](int n) { return n > 3; });
if (it != nums.end()) std::cout << "Found: " << *it << "\\n";

// Map
std::map<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"]   = 87;
for (const auto& [name, score] : scores) {  // C++17 structured bindings
    std::cout << name << ": " << score << "\\n";
}
\`\`\``,
        [{title:'cppreference',url:'https://en.cppreference.com',type:'docs'},{title:'LearnCPP',url:'https://www.learncpp.com',type:'article'}],
        ['Implement a generic stack with templates','Build a simple memory allocator']),
    ]),
  ],
},

{
  title: 'Go Programming',
  description: 'Learn Go for building fast, reliable, and scalable backend services, CLIs, and cloud-native applications.',
  type: 'language', category: 'Go',
  icon: '🐹', color: '#00add8',
  tags: ['Go','Goroutines','Channels','REST API','Microservices','Docker'],
  estimatedHours: 100, totalLessons: 8,
  modules: [
    mod('Go Fundamentals','beginner','🐹',[
      lesson('Go Core Concepts','Syntax, goroutines, channels, interfaces, error handling','beginner',80,
`## Go Core Concepts

### Go Basics
\`\`\`go
package main

import (
    "fmt"
    "strings"
    "strconv"
)

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Structs (no classes in Go)
type User struct {
    ID    int
    Name  string
    Email string
    Age   int
}

// Method on struct
func (u User) IsAdult() bool {
    return u.Age >= 18
}

func (u *User) UpdateName(name string) {
    u.Name = name  // pointer receiver to modify
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Result: %.2f\\n", result)
    
    user := User{ID: 1, Name: "Alice", Email: "alice@example.com", Age: 25}
    fmt.Println(user.IsAdult()) // true
}
\`\`\`

### Goroutines and Channels (Concurrency)
\`\`\`go
package main

import (
    "fmt"
    "sync"
    "time"
)

// Goroutines are lightweight threads
func fetchData(id int, wg *sync.WaitGroup, results chan<- string) {
    defer wg.Done()
    time.Sleep(time.Duration(id) * 100 * time.Millisecond)
    results <- fmt.Sprintf("Data from source %d", id)
}

func main() {
    var wg sync.WaitGroup
    results := make(chan string, 5)
    
    // Launch 5 goroutines concurrently
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go fetchData(i, &wg, results)
    }
    
    // Close channel when all done
    go func() {
        wg.Wait()
        close(results)
    }()
    
    // Collect results
    for result := range results {
        fmt.Println(result)
    }
}
\`\`\`

### HTTP Server with net/http
\`\`\`go
package main

import (
    "encoding/json"
    "net/http"
    "log"
)

type Response struct {
    Success bool        \`json:"success"\`
    Data    interface{} \`json:"data"\`
    Message string      \`json:"message,omitempty"\`
}

func jsonResponse(w http.ResponseWriter, status int, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        users := []map[string]string{{"name":"Alice"}, {"name":"Bob"}}
        jsonResponse(w, 200, Response{Success: true, Data: users})
    case http.MethodPost:
        var user map[string]string
        json.NewDecoder(r.Body).Decode(&user)
        jsonResponse(w, 201, Response{Success: true, Data: user})
    }
}

func main() {
    http.HandleFunc("/api/users", usersHandler)
    log.Println("Server on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\``,
        [{title:'Go Tour',url:'https://tour.golang.org',type:'course'},{title:'Go Docs',url:'https://go.dev/doc/',type:'docs'}],
        ['Build a concurrent web scraper with goroutines','Create a REST API with net/http']),
    ]),
  ],
},

{
  title: 'Rust Programming',
  description: 'Master Rust for systems programming with memory safety, zero-cost abstractions, and fearless concurrency.',
  type: 'language', category: 'Rust',
  icon: '🦀', color: '#b45309',
  tags: ['Rust','Ownership','Safety','WebAssembly','Systems','Performance'],
  estimatedHours: 150, totalLessons: 8,
  modules: [
    mod('Rust Fundamentals','beginner','🦀',[
      lesson('Rust Ownership System','Ownership, borrowing, lifetimes, memory safety','beginner',90,
`## Rust Ownership System

### The Three Rules of Ownership
1. Each value has exactly ONE owner
2. When owner goes out of scope, value is dropped
3. There can only be ONE mutable reference OR many immutable references

### Ownership in Practice
\`\`\`rust
fn main() {
    // String is heap-allocated
    let s1 = String::from("hello");
    let s2 = s1; // s1 is MOVED to s2 - s1 no longer valid!
    // println!("{}", s1); // ❌ Error: value moved
    println!("{}", s2);    // ✅ OK

    // Clone to keep both
    let s3 = s2.clone();
    println!("{} {}", s2, s3); // both valid

    // Primitives are copied (they implement Copy)
    let x = 5;
    let y = x; // x is COPIED, not moved
    println!("{} {}", x, y); // both valid
}
\`\`\`

### Borrowing and References
\`\`\`rust
fn calculate_length(s: &String) -> usize {
    s.len() // borrows s, doesn't take ownership
}

fn change(s: &mut String) {
    s.push_str(" World");
}

fn main() {
    let s = String::from("hello");
    let len = calculate_length(&s); // pass reference
    println!("'{}' has {} characters", s, len); // s still valid!

    let mut s2 = String::from("Hello");
    change(&mut s2);
    println!("{}", s2); // "Hello World"

    // Rules: either ONE mutable ref, or MANY immutable refs
    let r1 = &s2;         // immutable borrow
    let r2 = &s2;         // another immutable borrow - OK!
    println!("{} {}", r1, r2);
    // let r3 = &mut s2;  // ❌ Can't have mutable ref while immutable refs exist
}
\`\`\`

### Structs and Enums
\`\`\`rust
#[derive(Debug, Clone)]
struct Rectangle {
    width:  f64,
    height: f64,
}

impl Rectangle {
    fn new(width: f64, height: f64) -> Self {
        Rectangle { width, height }
    }
    
    fn area(&self) -> f64 {
        self.width * self.height
    }
    
    fn is_square(&self) -> bool {
        self.width == self.height
    }
}

// Enum with data (like TypeScript union types)
enum Shape {
    Circle    { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Triangle  { base: f64, height: f64 },
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle    { radius }          => std::f64::consts::PI * radius * radius,
            Shape::Rectangle { width, height }   => width * height,
            Shape::Triangle  { base, height }    => 0.5 * base * height,
        }
    }
}

fn main() {
    let rect = Rectangle::new(10.0, 5.0);
    println!("{:?} area: {}", rect, rect.area());
    
    let shapes = vec![
        Shape::Circle    { radius: 3.0 },
        Shape::Rectangle { width: 4.0, height: 6.0 },
    ];
    
    let total_area: f64 = shapes.iter().map(|s| s.area()).sum();
    println!("Total area: {:.2}", total_area);
}
\`\`\``,
        [{title:'The Rust Book',url:'https://doc.rust-lang.org/book/',type:'docs'},{title:'Rust by Example',url:'https://doc.rust-lang.org/rust-by-example/',type:'article'}],
        ['Build a CLI file organizer in Rust','Implement a simple key-value store']),
    ]),
  ],
},

];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db  = client.db();
    console.log('✅ Connected to:', db.databaseName);

    await db.collection('roadmaps').deleteMany({});
    console.log('🗑️  Cleared roadmaps');

    const result = await db.collection('roadmaps').insertMany(roadmaps);
    console.log('\n✅ Seeded', result.insertedCount, 'roadmaps:\n');

    const inserted = await db.collection('roadmaps').find({}).project({title:1,type:1,totalLessons:1}).toArray();
    inserted.forEach(r => console.log('  ', r.icon || '📚', r.title, '-', r.totalLessons, 'lessons ('+r.type+')'));

    console.log('\n🎉 Database ready! Open http://localhost:5000/api/roadmaps\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();