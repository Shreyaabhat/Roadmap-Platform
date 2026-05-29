/**
 * LEARNPATH - COMPLETE SEED
 * 50+ lessons, 10 tasks each, full content, resources
 * Run: node bigSeed.js  (from backend/ folder)
 */
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
if (!process.env.MONGODB_URI) { console.error('❌ MONGODB_URI missing'); process.exit(1); }

const L = (title, summary, diff, mins, content, resources, tasks) => ({
  _id: new ObjectId(), title, summary, difficulty: diff,
  estimatedTime: mins, order: 0, content: content || '',
  resources: resources || [],
  tasks: (tasks || []).map(d => ({ description: d, completed: false }))
});
const M = (title, level, icon, lessons) => ({ _id: new ObjectId(), title, level, icon, order: 0, lessons });

const roadmaps = [

// ══════════════════════════════════════════════════════════════
// 1. FRONTEND DEVELOPER — 15 lessons, 10 tasks each
// ══════════════════════════════════════════════════════════════
{
  title: 'Frontend Developer',
  description: 'Master modern frontend from HTML5 to advanced React, TypeScript, performance optimization, and deployment. Go from zero to job-ready.',
  type: 'role', category: 'Frontend Developer',
  icon: '🎨', color: '#f59e0b', estimatedHours: 150, totalLessons: 15,
  tags: ['HTML5','CSS3','JavaScript','React','TypeScript','Tailwind','Webpack'],
  modules: [
    M('HTML & CSS Mastery','beginner','🏗️',[
      L('HTML5 Semantic Structure','Master semantic HTML, accessibility, and SEO best practices','beginner',60,
`## HTML5 Semantic Structure

HTML5 introduced semantic elements that give meaning to your markup, improving accessibility and SEO.

### Semantic Elements
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description for SEO">
  <title>Page Title | Site Name</title>
  <link rel="canonical" href="https://example.com/page">
</head>
<body>
  <header role="banner">
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main role="main">
    <article>
      <header>
        <h1>Article Title</h1>
        <time datetime="2024-01-15">January 15, 2024</time>
        <address>By <a href="/author">Jane Doe</a></address>
      </header>
      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading">Introduction</h2>
        <p>Content here...</p>
      </section>
      <figure>
        <img src="image.jpg" alt="Descriptive text" loading="lazy" width="800" height="400">
        <figcaption>Image caption for accessibility</figcaption>
      </figure>
    </article>
    <aside aria-label="Related content">
      <h2>Related Articles</h2>
    </aside>
  </main>
  
  <footer role="contentinfo">
    <p>&copy; 2024 Company. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

### Accessible Forms
\`\`\`html
<form action="/submit" method="POST" novalidate>
  <fieldset>
    <legend>Personal Information</legend>
    
    <div class="form-group">
      <label for="full-name">
        Full Name <span aria-hidden="true">*</span>
      </label>
      <input type="text" id="full-name" name="fullName"
        autocomplete="name" required
        aria-required="true" aria-describedby="name-hint">
      <span id="name-hint" class="hint">Enter your first and last name</span>
    </div>
    
    <div class="form-group">
      <label for="email">Email Address</label>
      <input type="email" id="email" name="email"
        autocomplete="email" required
        aria-required="true" aria-invalid="false">
      <span role="alert" class="error" id="email-error"></span>
    </div>
    
    <div class="form-group">
      <label for="role">Your Role</label>
      <select id="role" name="role" autocomplete="organization-title">
        <option value="">Select a role</option>
        <option value="dev">Developer</option>
        <option value="design">Designer</option>
        <option value="pm">Product Manager</option>
      </select>
    </div>
    
    <div class="form-group">
      <label>
        <input type="checkbox" name="terms" required aria-required="true">
        I agree to the <a href="/terms">Terms of Service</a>
      </label>
    </div>
    
    <button type="submit" aria-describedby="submit-hint">
      Create Account
    </button>
    <span id="submit-hint" class="hint">This will send a confirmation email</span>
  </fieldset>
</form>
\`\`\`

### Data Tables
\`\`\`html
<table>
  <caption>Monthly Sales Data 2024</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$45,000</td>
      <td aria-label="12 percent growth">+12%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$540,000</td>
      <td>+18%</td>
    </tr>
  </tfoot>
</table>
\`\`\`

### Best Practices Checklist
- ✅ Use \`<article>\` for self-contained content
- ✅ Use \`<section>\` for thematic groupings
- ✅ Every image needs meaningful \`alt\` text (empty for decorative)
- ✅ Heading hierarchy: one h1, logical h2→h3→h4
- ✅ Form inputs always have associated \`<label>\`
- ✅ Interactive elements are keyboard-accessible
- ✅ Color contrast ratio ≥ 4.5:1 for normal text`,
        [
          {title:'MDN HTML5 Elements Reference', url:'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', type:'docs'},
          {title:'HTML Best Practices - W3C', url:'https://www.w3.org/TR/html52/', type:'docs'},
          {title:'Web Accessibility Guidelines (WCAG)', url:'https://www.w3.org/WAI/WCAG21/quickref/', type:'docs'},
          {title:'HTML Full Course - freeCodeCamp', url:'https://www.youtube.com/watch?v=pQN-pnXPaVg', type:'video'},
          {title:'HTML Validator', url:'https://validator.w3.org', type:'article'},
        ],
        [
          'Build a complete portfolio page using only semantic HTML5 elements (no CSS yet)',
          'Create an accessible multi-step registration form with proper labels, ARIA attributes, and error states',
          'Rebuild a Wikipedia article layout using semantic HTML - include tables, figures, navigation',
          'Create an accessible navigation with skip-to-content link and keyboard navigation',
          'Build a blog post template with article, aside, header, footer, and proper time elements',
          'Validate your HTML at validator.w3.org and fix all errors and warnings',
          'Audit an existing HTML page for accessibility using Lighthouse in Chrome DevTools',
          'Create a data table with proper scope attributes, caption, and thead/tbody/tfoot',
          'Build a product listing page with semantic markup that would score well on SEO',
          'Add structured data (JSON-LD) for a recipe page to improve search engine results',
        ]),

      L('CSS Layouts: Flexbox & Grid','Master modern CSS layout techniques with real-world examples','beginner',75,
`## CSS Layouts: Flexbox & Grid

### Flexbox - 1D Layout
\`\`\`css
/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  gap: 1rem;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

/* Card row with equal height cards */
.card-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 280px;       /* grow, shrink, min-width */
  display: flex;
  flex-direction: column;
}

.card-body  { flex: 1; }  /* pushes footer to bottom */
.card-footer { margin-top: auto; }

/* Centering */
.full-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
\`\`\`

### CSS Grid - 2D Layout
\`\`\`css
/* Dashboard layout */
.dashboard {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "sidebar footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
  gap: 1rem;
}

.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.footer  { grid-area: footer;  }

/* Responsive auto-fill grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* Magazine layout */
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.feature-article { grid-column: 1 / 9; }   /* spans 8 columns */
.sidebar-article  { grid-column: 9 / 13; }  /* spans 4 columns */
.sub-article      { grid-column: span 4; }  /* each spans 4 */
\`\`\`

### CSS Custom Properties
\`\`\`css
:root {
  --color-primary:    #6366f1;
  --color-secondary:  #10b981;
  --color-text:       #1f2937;
  --color-bg:         #ffffff;
  --color-surface:    #f9fafb;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.5rem;
  
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.15);
  
  --transition: 200ms ease;
}

/* Dark theme */
[data-theme="dark"] {
  --color-text:    #f9fafb;
  --color-bg:      #030712;
  --color-surface: #111827;
}
\`\`\`

### Responsive Media Queries
\`\`\`css
/* Mobile first */
.container { width: 100%; padding: 0 1rem; }

@media (min-width: 640px) {
  .container { max-width: 640px; margin: 0 auto; padding: 0 1.5rem; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; padding: 0 2rem; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

/* Prefer-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\``,
        [
          {title:'CSS Tricks Complete Flexbox Guide', url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type:'article'},
          {title:'CSS Tricks Complete Grid Guide', url:'https://css-tricks.com/snippets/css/complete-guide-grid/', type:'article'},
          {title:'Flexbox Froggy - Learn Flexbox', url:'https://flexboxfroggy.com', type:'course'},
          {title:'CSS Grid Garden', url:'https://cssgridgarden.com', type:'course'},
          {title:'Kevin Powell - Modern CSS', url:'https://www.youtube.com/@KevinPowell', type:'video'},
        ],
        [
          'Build a complete responsive navbar with logo, links, hamburger menu, and mobile drawer',
          'Create a Pinterest-style masonry grid layout using CSS Grid',
          'Build a full dashboard layout: sidebar, header, main content area, and footer',
          'Create a magazine-style homepage with a featured article spanning multiple columns',
          'Implement a 12-column grid system from scratch without any CSS framework',
          'Build a product comparison table that is fully responsive',
          'Create a card component with flexbox that has equal-height cards in a row',
          'Implement CSS custom properties for a theme system with light and dark modes',
          'Build a sticky header that shrinks on scroll using CSS alone (no JavaScript)',
          'Create a complex form layout using CSS Grid with labels and inputs aligned',
        ]),

      L('CSS Animations & Transitions','Keyframes, transitions, transforms, scroll animations','intermediate',65,
`## CSS Animations & Transitions

### Transitions - Simple State Changes
\`\`\`css
/* Button hover effect */
.btn {
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 200ms ease,
              transform  200ms ease,
              box-shadow 200ms ease;
}

.btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99,102,241,0.4);
}

.btn:active { transform: translateY(0) scale(0.97); }

/* Card hover with image zoom */
.card {
  overflow: hidden;
  border-radius: 1rem;
}

.card-image {
  width: 100%; height: 200px; object-fit: cover;
  transition: transform 400ms ease;
}

.card:hover .card-image { transform: scale(1.08); }
\`\`\`

### Keyframe Animations
\`\`\`css
/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px; height: 40px;
  border: 3px solid rgba(99,102,241,0.2);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Fade + slide in */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-text {
  animation: fadeSlideUp 0.6s ease-out forwards;
}

.hero-text:nth-child(2) { animation-delay: 0.15s; }
.hero-text:nth-child(3) { animation-delay: 0.3s;  }

/* Pulse / heartbeat */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.08); }
}

.notification-badge {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Shimmer skeleton loader */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #e5e7eb 25%,
    #f3f4f6 50%,
    #e5e7eb 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* Gradient border */
.gradient-border {
  position: relative;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
}

.gradient-border-inner {
  background: white;
  border-radius: calc(1rem - 2px);
  padding: 1.5rem;
}
\`\`\`

### CSS Scroll Animations (modern)
\`\`\`css
/* Scroll-driven animations (Chrome 115+) */
@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

/* Or use IntersectionObserver for broader support */
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-section.visible {
  opacity: 1;
  transform: translateY(0);
}
\`\`\``,
        [
          {title:'CSS Animations - MDN', url:'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations', type:'docs'},
          {title:'Animista - CSS Animation Library', url:'https://animista.net', type:'article'},
          {title:'Cubic Bezier Visualizer', url:'https://cubic-bezier.com', type:'article'},
          {title:'CSS Animation for Beginners - Kevin Powell', url:'https://www.youtube.com/watch?v=YszONjKpgg4', type:'video'},
        ],
        [
          'Build an animated loading screen with a custom spinner and progress bar',
          'Create a card component with 5 different hover effects (lift, glow, flip, expand, overlay)',
          'Implement a skeleton loader for a product grid that looks like content is loading',
          'Build a staggered list animation where items appear one by one on page load',
          'Create a CSS-only hamburger menu that animates into an X when clicked',
          'Implement a smooth page transition using CSS animations',
          'Build a progress bar that animates from 0 to a target percentage',
          'Create an animated gradient background that slowly shifts colors',
          'Implement scroll-triggered reveal animations using IntersectionObserver + CSS',
          'Build a CSS-only modal dialog with fade-in backdrop and scale-in content',
        ]),
    ]),

    M('JavaScript Mastery','beginner','⚡',[
      L('JavaScript: Variables, Functions & Scope','let/const, arrow functions, closures, hoisting','beginner',70,
`## JavaScript: Variables, Functions & Scope

### Variable Declarations
\`\`\`javascript
// const - cannot be reassigned (use by default)
const PI       = 3.14159;
const user     = { name: 'Alice' };  // object can still be mutated
user.name = 'Bob';  // ✅ OK
// user = {};       // ❌ TypeError

// let - block scoped, reassignable
let count = 0;
count     = 1;  // ✅

// var - function scoped, hoisted (avoid)
// console.log(x); // undefined (hoisted)
// var x = 5;

// Temporal Dead Zone
// console.log(y); // ❌ ReferenceError
// let y = 5;
\`\`\`

### Functions Deep Dive
\`\`\`javascript
// Function declaration (hoisted)
console.log(greet('Alice')); // ✅ works before declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function expression (NOT hoisted)
const multiply = function(a, b) {
  return a * b;
};

// Arrow function - no own 'this'
const add = (a, b) => a + b;

// Default parameters
const createUser = (name, role = 'user', active = true) => ({
  name, role, active, createdAt: new Date()
});

// Rest parameters
const sum = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);
console.log(sum(1, 2, 3, 4, 5)); // 15

// Spread operator
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
const combined = [...nums1, ...nums2]; // [1,2,3,4,5,6]

const original = { a: 1, b: 2 };
const copy      = { ...original, c: 3 }; // { a:1, b:2, c:3 }
\`\`\`

### Closures
\`\`\`javascript
// Closure: function remembers outer scope
function makeAdder(x) {
  return function(y) {
    return x + y;  // x is closed over
  };
}

const add5  = makeAdder(5);
const add10 = makeAdder(10);
console.log(add5(3));   // 8
console.log(add10(3));  // 13

// Practical: private counter
function createCounter(initial = 0) {
  let count = initial;  // private

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    reset()     { count = initial; },
    value()     { return count; },
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.value();     // 12

// Practical: memoization
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

const factorial = memoize(n => n <= 1 ? 1 : n * factorial(n - 1));
console.log(factorial(10)); // 3628800 (cached after first call)
\`\`\`

### Destructuring
\`\`\`javascript
// Object destructuring
const { name, age, role = 'user' } = user;

// Rename + default
const { firstName: first = 'Anonymous' } = userData;

// Nested
const { address: { city, country } } = user;

// Array destructuring
const [head, ...tail]   = [1, 2, 3, 4, 5];
const [,, third]        = array;  // skip first two
const [a, b, ...rest]   = numbers;

// Function parameter destructuring
function createProfile({ name, email, role = 'user', ...extras }) {
  return { id: Date.now(), name, email, role, ...extras };
}
\`\`\``,
        [
          {title:'JavaScript.info - The Modern JS Tutorial', url:'https://javascript.info', type:'docs'},
          {title:'Eloquent JavaScript (Free Book)', url:'https://eloquentjavascript.net', type:'article'},
          {title:'JavaScript - The Good Parts Concepts', url:'https://www.youtube.com/watch?v=hQVTIJBZook', type:'video'},
          {title:'You Don\'t Know JS - Scope & Closures', url:'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures', type:'article'},
        ],
        [
          'Build a quiz app that tracks score using closures - no global variables allowed',
          'Create a memoized fibonacci function and benchmark it against the non-memoized version',
          'Implement a curry function that works with any arity: curry(add)(1)(2)(3)',
          'Build a simple event system (addEventListener / removeEventListener) using closures',
          'Create a bank account module with private balance using closures',
          'Write a function that creates a chain of middleware functions (like Express)',
          'Implement function composition: compose(f, g, h)(x) === f(g(h(x)))',
          'Build a rate limiter that allows N calls per time window using closures',
          'Create a once() function that only allows a function to be called once',
          'Implement deep destructuring: extract deeply nested properties safely with fallbacks',
        ]),

      L('Arrays & Objects: Modern Methods','map, filter, reduce, spread, Object methods','intermediate',65,
`## Arrays & Objects: Modern Methods

### Array Methods
\`\`\`javascript
const products = [
  { id: 1, name: 'Laptop',  price: 999,  category: 'tech',     rating: 4.5, inStock: true  },
  { id: 2, name: 'Phone',   price: 699,  category: 'tech',     rating: 4.2, inStock: true  },
  { id: 3, name: 'Desk',    price: 299,  category: 'furniture',rating: 3.8, inStock: false },
  { id: 4, name: 'Chair',   price: 199,  category: 'furniture',rating: 4.1, inStock: true  },
  { id: 5, name: 'Monitor', price: 399,  category: 'tech',     rating: 4.7, inStock: true  },
];

// filter - returns new array of matching items
const techProducts   = products.filter(p => p.category === 'tech');
const affordable     = products.filter(p => p.price < 500 && p.inStock);

// map - transform each item
const names       = products.map(p => p.name);
const withDiscount = products.map(p => ({
  ...p,
  discountedPrice: (p.price * 0.9).toFixed(2),
}));

// reduce - accumulate to a single value
const totalValue = products.reduce((sum, p) => sum + p.price, 0);

// group by category
const byCategory = products.reduce((groups, product) => {
  const cat = product.category;
  groups[cat] = groups[cat] || [];
  groups[cat].push(product);
  return groups;
}, {});

// find & findIndex
const laptop     = products.find(p => p.id === 1);
const laptopIdx  = products.findIndex(p => p.id === 1);

// every & some
const allInStock  = products.every(p => p.inStock);  // false
const someInStock = products.some(p => p.inStock);    // true

// flat & flatMap
const nested = [[1, 2], [3, 4], [5, 6]];
const flat   = nested.flat();                 // [1,2,3,4,5,6]

const sentences = ['hello world', 'foo bar'];
const words     = sentences.flatMap(s => s.split(' ')); // ['hello','world','foo','bar']

// sort (always pass comparator for numbers!)
const sorted = [...products].sort((a, b) => a.price - b.price);
const byRating = [...products].sort((a, b) => b.rating - a.rating);

// Chaining
const topTechProducts = products
  .filter(p => p.category === 'tech' && p.inStock)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3)
  .map(({ name, price, rating }) => ({ name, price, rating }));
\`\`\`

### Object Methods
\`\`\`javascript
const user = {
  id: 1, name: 'Alice', email: 'alice@example.com',
  age: 25, role: 'admin', active: true,
};

// Object.keys / values / entries
const keys   = Object.keys(user);    // ['id', 'name', 'email', ...]
const values = Object.values(user);  // [1, 'Alice', 'alice@...', ...]
const pairs  = Object.entries(user); // [['id', 1], ['name', 'Alice'], ...]

// Transform with entries
const upperKeys = Object.fromEntries(
  Object.entries(user).map(([k, v]) => [k.toUpperCase(), v])
);

// Pick specific keys
const pick = (obj, keys) =>
  Object.fromEntries(keys.map(k => [k, obj[k]]));

const publicUser = pick(user, ['id', 'name', 'email']);

// Omit keys
const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

const safeUser = omit(user, ['password', 'internalId']);

// Object.assign (shallow clone)
const updated = Object.assign({}, user, { name: 'Bob', age: 26 });

// Deep clone (modern)
const deepClone = structuredClone(complexObject);

// Optional chaining & nullish coalescing
const city    = user?.address?.city ?? 'Unknown';
const phone   = user?.contact?.phone ?? 'Not provided';
const display = user?.name ?? user?.username ?? 'Anonymous';
\`\`\``,
        [
          {title:'Array Methods - MDN', url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', type:'docs'},
          {title:'JavaScript Array Methods - Fireship', url:'https://www.youtube.com/watch?v=R8rmfD9Y5-c', type:'video'},
          {title:'Functional Programming in JS', url:'https://mostly-adequate.gitbook.io/mostly-adequate-guide/', type:'article'},
        ],
        [
          'Given an array of orders, calculate total revenue per product category using reduce',
          'Implement a pipeline function that chains array transformations: pipeline(data, filter, map, sort, paginate)',
          'Build a searchable/filterable/sortable product table using only array methods (no DOM manipulation yet)',
          'Implement your own versions of map, filter, and reduce from scratch',
          'Create a function that groups an array of objects by any key dynamically',
          'Build a cart total calculator that handles discounts, taxes, and shipping using reduce',
          'Implement a deep merge function for objects that handles nested objects and arrays',
          'Write a function that finds the difference between two arrays (symmetric difference)',
          'Create a utility function that converts a flat array of objects to a tree structure',
          'Build a data transformation pipeline that converts CSV-like data to JSON',
        ]),

      L('Async JavaScript: Promises & Async/Await','Event loop, callbacks, promises, async/await, error handling','intermediate',80,
`## Async JavaScript: Promises & Async/Await

### The Event Loop
\`\`\`javascript
console.log('1');                    // synchronous

setTimeout(() => console.log('2'), 0); // macrotask queue

Promise.resolve().then(() => console.log('3')); // microtask queue

console.log('4');

// Output: 1, 4, 3, 2
// Microtasks (Promises) run before macrotasks (setTimeout)
\`\`\`

### Promises
\`\`\`javascript
// Creating a Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error('User ID is required'));
      return;
    }
    // Simulate API call
    setTimeout(() => {
      if (id === 999) reject(new Error('User not found'));
      else            resolve({ id, name: 'Alice', email: 'alice@example.com' });
    }, 500);
  });
}

// Promise chaining
fetchUser(1)
  .then(user => {
    console.log('Got user:', user.name);
    return fetchUserPosts(user.id);    // return another Promise
  })
  .then(posts => console.log('Posts:', posts.length))
  .catch(err => console.error('Error:', err.message))
  .finally(() => console.log('Done'));
\`\`\`

### Async/Await
\`\`\`javascript
// Basic async/await
async function loadUserProfile(userId) {
  try {
    const user  = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (err) {
    console.error('Failed:', err.message);
    throw err;  // re-throw so caller can handle
  }
}

// Parallel execution (faster!)
async function loadDashboard(userId) {
  try {
    // ❌ Sequential (slow) - waits for each
    // const user    = await fetchUser(userId);
    // const posts   = await fetchPosts(userId);
    // const friends = await fetchFriends(userId);
    
    // ✅ Parallel - all start at same time
    const [user, posts, friends] = await Promise.all([
      fetchUser(userId),
      fetchPosts(userId),
      fetchFriends(userId),
    ]);
    
    return { user, posts, friends };
  } catch (err) {
    // If ANY promise fails, catch is called
    throw new Error(\`Dashboard load failed: \${err.message}\`);
  }
}

// Promise.allSettled - get all results (even if some fail)
async function loadOptionalData(userId) {
  const results = await Promise.allSettled([
    fetchUser(userId),       // required
    fetchUserAvatar(userId), // optional - might fail
    fetchUserPrefs(userId),  // optional - might fail
  ]);
  
  return results.map(result => {
    if (result.status === 'fulfilled') return result.value;
    console.warn('Failed to load:', result.reason.message);
    return null;
  });
}

// Timeout pattern
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(\`Timeout after \${ms}ms\`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// Retry pattern
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(\`Attempt \${attempt} failed. Retrying in \${delay}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
}
\`\`\``,
        [
          {title:'Async JS - javascript.info', url:'https://javascript.info/async', type:'docs'},
          {title:'Event Loop Visualization - Loupe', url:'http://latentflip.com/loupe/', type:'article'},
          {title:'Jake Archibald on the Event Loop', url:'https://www.youtube.com/watch?v=cCOL7MC4Pl0', type:'video'},
          {title:'Promises, async/await - javascript.info', url:'https://javascript.info/async-await', type:'docs'},
        ],
        [
          'Build a weather dashboard that fetches data from OpenWeather API using async/await',
          'Implement Promise.all from scratch without using the built-in',
          'Create a request queue that limits concurrent API calls to 3 at a time',
          'Build a caching layer for async functions that stores results for 5 minutes',
          'Implement an exponential backoff retry mechanism for failed network requests',
          'Create an async data loader with loading, error, and success states',
          'Build a file uploader that shows real-time progress using ReadableStream',
          'Implement a debounce function that works with async functions',
          'Create a circuit breaker pattern that stops making requests after 5 failures',
          'Build a GitHub user search with debounced input and request cancellation using AbortController',
        ]),

      L('DOM Manipulation & Events','querySelector, events, event delegation, manipulation','intermediate',65,
`## DOM Manipulation & Events

### Selecting Elements
\`\`\`javascript
// Modern selectors
const header     = document.querySelector('header');
const allButtons = document.querySelectorAll('.btn');
const byId       = document.getElementById('modal');

// Traversal
const parent   = element.parentElement;
const children = element.children;          // HTMLCollection
const siblings = [...element.parentElement.children].filter(el => el !== element);
const next     = element.nextElementSibling;
const prev     = element.previousElementSibling;

// Closest ancestor
const card = button.closest('.card');
const form = input.closest('form');
\`\`\`

### Creating & Manipulating Elements
\`\`\`javascript
// Create elements
function createTodoItem(text, id) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = id;
  
  li.innerHTML = \`
    <label class="todo-label">
      <input type="checkbox" class="todo-check" aria-label="Mark '\${text}' complete">
      <span class="todo-text">\${escapeHTML(text)}</span>
    </label>
    <button class="todo-delete" aria-label="Delete '\${text}'">×</button>
  \`;
  
  return li;
}

// Safe HTML escaping (prevent XSS)
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Efficient DOM updates with DocumentFragment
function renderList(items) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => fragment.appendChild(createTodoItem(item.text, item.id)));
  list.innerHTML = '';
  list.appendChild(fragment);  // single reflow
}

// Using template elements
const template = document.querySelector('#card-template');
function createCard(data) {
  const clone = template.content.cloneNode(true);
  clone.querySelector('.card-title').textContent  = data.title;
  clone.querySelector('.card-image').src          = data.image;
  clone.querySelector('.card-image').alt          = data.title;
  clone.querySelector('.card-desc').textContent   = data.description;
  return clone;
}
\`\`\`

### Events & Event Delegation
\`\`\`javascript
// Event delegation - one listener for many elements
document.querySelector('.todo-list').addEventListener('click', function(event) {
  const target = event.target;
  
  // Checkbox
  if (target.matches('.todo-check')) {
    const id = target.closest('.todo-item').dataset.id;
    toggleTodo(id);
  }
  
  // Delete button
  if (target.matches('.todo-delete') || target.closest('.todo-delete')) {
    const item = target.closest('.todo-item');
    const id   = item.dataset.id;
    item.style.animation = 'fadeOut 0.2s ease forwards';
    item.addEventListener('animationend', () => deleteTodo(id));
  }
});

// Custom events
const cartUpdated = new CustomEvent('cart:updated', {
  detail: { itemCount: 3, total: 99.99 },
  bubbles: true,
});
document.dispatchEvent(cartUpdated);

document.addEventListener('cart:updated', ({ detail }) => {
  cartIcon.dataset.count = detail.itemCount;
  totalDisplay.textContent = \`$\${detail.total}\`;
});

// IntersectionObserver for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src  = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
}, { rootMargin: '100px' });

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
\`\`\``,
        [
          {title:'DOM API - MDN', url:'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', type:'docs'},
          {title:'JavaScript DOM Crash Course - Traversy', url:'https://www.youtube.com/watch?v=0ik6X4DJKCc', type:'video'},
        ],
        [
          'Build a complete todo app with add, delete, edit, complete, filter, and local storage persistence',
          'Create a drag-and-drop kanban board using native HTML5 drag events',
          'Build an infinite scroll feed that loads more content when user reaches the bottom',
          'Implement a keyboard shortcut system (Ctrl+K opens search, Esc closes modal, etc.)',
          'Build a rich text editor with bold, italic, link, and list formatting using execCommand',
          'Create a real-time form validation that checks as user types with custom error messages',
          'Implement a virtual scroll list that only renders visible items (for 10,000+ items)',
          'Build an image gallery with lazy loading, lightbox modal, and keyboard navigation',
          'Create a table component with client-side sorting, filtering, and pagination',
          'Build a notification system with custom events that slides in from the top-right',
        ]),
    ]),

    M('React Development','intermediate','⚛️',[
      L('React Fundamentals','Components, JSX, Props, State, Lists','intermediate',90,
`## React Fundamentals

### Components & JSX
\`\`\`jsx
// Functional component with TypeScript-style JSDoc
/**
 * @param {{ 
 *   title: string, 
 *   description: string,
 *   image: string,
 *   tags: string[],
 *   onBookmark: () => void,
 *   isBookmarked: boolean
 * }} props
 */
function ArticleCard({ title, description, image, tags, onBookmark, isBookmarked }) {
  return (
    <article className="article-card">
      <div className="article-image-wrapper">
        <img src={image} alt={title} loading="lazy" />
        <button 
          onClick={onBookmark}
          className={\`bookmark-btn \${isBookmarked ? 'bookmarked' : ''}\`}
          aria-label={\`\${isBookmarked ? 'Remove bookmark' : 'Bookmark'} \${title}\`}
          aria-pressed={isBookmarked}
        >
          {isBookmarked ? '🔖' : '📌'}
        </button>
      </div>
      
      <div className="article-content">
        <div className="article-tags">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <h2 className="article-title">{title}</h2>
        <p className="article-description">{description}</p>
      </div>
    </article>
  );
}

export default ArticleCard;
\`\`\`

### useState Hook
\`\`\`jsx
import { useState } from 'react';

function ShoppingCart() {
  const [items, setItems]       = useState([]);
  const [coupon, setCoupon]     = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const applyCoupon = async () => {
    setIsLoading(true);
    try {
      const result = await verifyCoupon(coupon);
      setDiscount(result.discountPercent);
    } catch {
      alert('Invalid coupon code');
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal  = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmt = subtotal * (discount / 100);
  const total     = subtotal - discountAmt;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <h1>Cart ({itemCount} items)</h1>
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>\${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="remove-btn">×</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="coupon-row">
              <input
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Coupon code"
              />
              <button onClick={applyCoupon} disabled={isLoading}>
                {isLoading ? 'Checking...' : 'Apply'}
              </button>
            </div>
            <div className="totals">
              <div>Subtotal: \${subtotal.toFixed(2)}</div>
              {discount > 0 && <div>Discount ({discount}%): -\${discountAmt.toFixed(2)}</div>}
              <div className="total">Total: \${total.toFixed(2)}</div>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
\`\`\``,
        [
          {title:'React Official Documentation', url:'https://react.dev', type:'docs'},
          {title:'React Learn Tutorial', url:'https://react.dev/learn', type:'course'},
          {title:'Scrimba React Course (Free)', url:'https://scrimba.com/learn/learnreact', type:'course'},
          {title:'Full React Course - freeCodeCamp', url:'https://www.youtube.com/watch?v=bMknfKXIFA8', type:'video'},
          {title:'React Router Documentation', url:'https://reactrouter.com/en/main', type:'docs'},
        ],
        [
          'Build a movie search app using OMDb API with React - search, filter by genre, and bookmark favorites',
          'Create a multi-step form wizard with progress indicator, validation, and data persistence between steps',
          'Build a real-time Markdown editor with live preview split-pane layout',
          'Create a color palette generator that creates harmonious color schemes and allows copying HEX codes',
          'Build a recipe app: list, search, filter by diet, individual recipe pages with ingredients scaling',
          'Create a habit tracker that shows streaks, completion rates, and allows adding custom habits',
          'Build a Pomodoro timer with sound notifications, session history, and break management',
          'Create a currency converter with real exchange rates that supports multiple currencies',
          'Build a meme generator that allows overlaying text on images from an API',
          'Create a weather app with 5-day forecast, hourly breakdown, and location detection',
        ]),

      L('React Hooks Deep Dive','useEffect, useRef, useContext, useMemo, useCallback, custom hooks','intermediate',100,
`## React Hooks Deep Dive

### useEffect - Side Effects
\`\`\`jsx
import { useState, useEffect, useRef } from 'react';

function UserProfile({ userId }) {
  const [state, setState] = useState({
    user: null, posts: [], loading: true, error: null
  });

  useEffect(() => {
    // Handle multiple async operations safely
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const [userRes, postsRes] = await Promise.all([
          fetch(\`/api/users/\${userId}\`, { signal: controller.signal }),
          fetch(\`/api/posts?userId=\${userId}\`, { signal: controller.signal }),
        ]);
        
        if (!userRes.ok || !postsRes.ok) throw new Error('Load failed');
        
        const [user, posts] = await Promise.all([userRes.json(), postsRes.json()]);
        
        if (!cancelled) {
          setState({ user, posts, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled && err.name !== 'AbortError') {
          setState(prev => ({ ...prev, loading: false, error: err.message }));
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [userId]);  // re-run when userId changes

  // ...render
}
\`\`\`

### Custom Hooks
\`\`\`jsx
// useFetch - reusable data fetching
function useFetch(url, options = {}) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const controller = new AbortController();
    
    setLoading(true);
    setError(null);
    
    fetch(url, { ...options, signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json(); })
      .then(d  => { if (!cancelled) { setData(d);  setLoading(false); } })
      .catch(e => { if (!cancelled && e.name !== 'AbortError') { setError(e.message); setLoading(false); } });
    
    return () => { cancelled = true; controller.abort(); };
  }, [url]);

  return { data, loading, error };
}

// useDebounce
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = (val) => {
    const v = typeof val === 'function' ? val(value) : val;
    setValue(v);
    window.localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, setStoredValue];
}

// useMediaQuery
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

// Usage
function App() {
  const { data: users, loading, error } = useFetch('/api/users');
  const [search, setSearch] = useLocalStorage('search', '');
  const debouncedSearch     = useDebounce(search, 500);
  const isMobile            = useMediaQuery('(max-width: 768px)');
  
  // Only re-filter when debouncedSearch changes
  const filtered = useMemo(
    () => users?.filter(u => u.name.toLowerCase().includes(debouncedSearch.toLowerCase())) ?? [],
    [users, debouncedSearch]
  );
}
\`\`\`

### useMemo & useCallback
\`\`\`jsx
import { useMemo, useCallback, memo } from 'react';

// Memoize expensive computation
function ProductCatalog({ products, filters }) {
  const filteredProducts = useMemo(() => {
    console.log('Filtering...');  // only runs when products or filters change
    return products
      .filter(p => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.maxPrice  && p.price > filters.maxPrice)     return false;
        if (filters.minRating && p.rating < filters.minRating)   return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc')   return a.price  - b.price;
        if (filters.sortBy === 'price-desc')  return b.price  - a.price;
        if (filters.sortBy === 'rating')      return b.rating - a.rating;
        return 0;
      });
  }, [products, filters]);

  // Stable function reference (won't cause child re-renders)
  const handleAddToCart = useCallback((productId) => {
    addToCart(productId);
  }, []);  // empty deps = created once

  return (
    <div className="catalog">
      <p>{filteredProducts.length} products found</p>
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// Prevent unnecessary re-renders
const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  console.log(\`Rendering: \${product.name}\`);
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
});
\`\`\``,
        [
          {title:'React Hooks Reference', url:'https://react.dev/reference/react', type:'docs'},
          {title:'A Complete Guide to useEffect - Overreacted', url:'https://overreacted.io/a-complete-guide-to-useeffect/', type:'article'},
          {title:'When to use memo/useMemo/useCallback', url:'https://kentcdodds.com/blog/usememo-and-usecallback', type:'article'},
          {title:'usehooks.com - Custom Hook Examples', url:'https://usehooks.com', type:'article'},
        ],
        [
          'Build a custom useForm hook that handles validation, submission, and error display for any form',
          'Create a usePagination hook that manages page state, total pages, and navigation',
          'Build a useInfiniteScroll hook that automatically loads more data when scrolling',
          'Implement a useUndoRedo hook that tracks state history with undo/redo functionality',
          'Create a useWebSocket hook that maintains a persistent WebSocket connection with reconnection logic',
          'Build a useGeolocation hook that tracks user location with loading and error states',
          'Implement a useKeyboardShortcut hook that registers global keyboard listeners cleanly',
          'Create a useWindowSize hook that updates on resize with debouncing',
          'Build a useDarkMode hook that persists preference to localStorage and respects system preference',
          'Implement a useAsync hook that handles loading, success, error states for any async function',
        ]),

      L('State Management with Context & Redux','Context API, Redux Toolkit, Zustand patterns','advanced',90,
`## State Management Patterns

### Context API (for simpler state)
\`\`\`jsx
import { createContext, useContext, useReducer } from 'react';

// 1. Define state shape and actions
const initialState = {
  user:     null,
  token:    localStorage.getItem('token') || null,
  loading:  false,
  error:    null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        user:    action.payload.user,
        token:   action.payload.token,
        error:   null,
      };
    
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...initialState, token: null };
    
    default:
      return state;
  }
}

// 2. Create context
const AuthContext = createContext(null);

// 3. Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.message });
      throw err;
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

// 4. Using in components
function LoginPage() {
  const { login, loading, error } = useAuth();
  
  const handleSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch {}  // error handled in context
  };
}
\`\`\`

### Zustand (lightweight state management)
\`\`\`jsx
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Cart store
const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        items:    [],
        discount: 0,
        
        addItem: (product) => {
          set(state => {
            const existing = state.items.find(i => i.id === product.id);
            if (existing) {
              return { items: state.items.map(i =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              )};
            }
            return { items: [...state.items, { ...product, quantity: 1 }] };
          });
        },
        
        removeItem: (id) =>
          set(state => ({ items: state.items.filter(i => i.id !== id) })),
        
        clearCart: () => set({ items: [], discount: 0 }),
        
        // Computed values
        get total() {
          return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        },
        get itemCount() {
          return get().items.reduce((sum, i) => sum + i.quantity, 0);
        },
      }),
      { name: 'cart-storage' }
    )
  )
);

// Usage
function CartIcon() {
  const { itemCount } = useCartStore();
  return <div className="cart-icon" data-count={itemCount}>🛒</div>;
}

function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);
  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}
\`\`\``,
        [
          {title:'Redux Toolkit Quick Start', url:'https://redux-toolkit.js.org/tutorials/quick-start', type:'docs'},
          {title:'Zustand Documentation', url:'https://zustand-demo.pmnd.rs', type:'docs'},
          {title:'Context API vs Redux - When to Use What', url:'https://kentcdodds.com/blog/application-state-management-with-react', type:'article'},
        ],
        [
          'Build a full e-commerce store with Zustand: cart, wishlist, user auth, and product catalog',
          'Implement an undo/redo text editor using useReducer with action history',
          'Create a multi-user collaborative todo app using React Context + WebSockets',
          'Build a dashboard with 5 different charts that share filter state via Context',
          'Implement a Redux-style state machine for a checkout flow with multiple steps',
          'Create a notification system with Context that supports multiple notification types',
          'Build a global search feature that searches across different data types (users, posts, products)',
          'Implement optimistic updates: show changes immediately before server confirms',
          'Create a real-time chat with React + WebSocket + Zustand for message state',
          'Build a shopping app with Redux Toolkit: products, cart, orders, and user slices',
        ]),
    ]),

    M('Advanced React & Performance','advanced','🚀',[
      L('React Performance Optimization','Code splitting, lazy loading, React.memo, Profiler','advanced',80,
`## React Performance Optimization

### Code Splitting with React.lazy
\`\`\`jsx
import { lazy, Suspense, startTransition } from 'react';

// Lazy load route components
const Dashboard  = lazy(() => import('./pages/Dashboard'));
const Analytics  = lazy(() => import('./pages/Analytics'));
const Settings   = lazy(() => import('./pages/Settings'));

// Granular fallbacks
function PageSkeleton() {
  return (
    <div className="page-skeleton">
      <div className="skeleton" style={{ height: 48, marginBottom: 24 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {Array.from({length:4}).map((_,i) => (
          <div key={i} className="skeleton" style={{ height: 120 }} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={
          <Suspense fallback={<PageSkeleton />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="/analytics" element={
          <Suspense fallback={<PageSkeleton />}>
            <Analytics />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}
\`\`\`

### Profiling and Measuring
\`\`\`jsx
import { Profiler } from 'react';

function onRenderCallback(
  id,        // component tree id
  phase,     // "mount" or "update"
  actualDuration,   // time for this render
  baseDuration,     // estimated time without memoization
  startTime,
  commitTime
) {
  if (actualDuration > 16) {  // slower than 60fps
    console.warn(\`SLOW: \${id} took \${actualDuration.toFixed(2)}ms\`);
  }
}

function App() {
  return (
    <Profiler id="ProductList" onRender={onRenderCallback}>
      <ProductList products={products} />
    </Profiler>
  );
}

// Virtualization for long lists
import { FixedSizeList } from 'react-window';

function VirtualProductList({ products }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ProductCard product={products[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={products.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\``,
        [
          {title:'React Performance - Official Docs', url:'https://react.dev/learn/render-and-commit', type:'docs'},
          {title:'Web Vitals - Google', url:'https://web.dev/vitals/', type:'article'},
          {title:'React Window - Virtualization', url:'https://react-window.vercel.app', type:'docs'},
        ],
        [
          'Use React Profiler to identify the slowest component in a complex app and fix it',
          'Implement code splitting for all route-level components and measure bundle size reduction',
          'Build a virtualized list that renders 100,000 items smoothly at 60fps',
          'Audit a React app with Lighthouse and achieve 90+ performance score',
          'Implement image optimization with lazy loading and blur-up placeholder technique',
          'Create a memoized data grid that handles 10,000+ rows without performance issues',
          'Build a web worker that offloads heavy data processing off the main thread',
          'Implement progressive loading: show cached data immediately while fetching fresh data',
          'Optimize bundle size using dynamic imports and tree shaking analysis',
          'Build a custom error boundary that tracks errors and shows a recovery UI',
        ]),
    ]),
  ],
},

// ══════════════════════════════════════════════════════════════
// 2. DATA STRUCTURES & ALGORITHMS — 12 lessons, 10 tasks each
// ══════════════════════════════════════════════════════════════
{
  title: 'Data Structures & Algorithms',
  description: 'Master DSA for FAANG interviews. From arrays to graphs, dynamic programming to system design. 150+ LeetCode problems solved step by step.',
  type: 'skill', category: 'DSA',
  icon: '🧩', color: '#6366f1', estimatedHours: 180, totalLessons: 12,
  tags: ['Arrays','Linked Lists','Trees','Graphs','DP','LeetCode','FAANG','Big-O'],
  modules: [
    M('Linear Data Structures','beginner','📦',[
      L('Arrays: Patterns & Techniques','Two pointers, sliding window, prefix sum, sorting tricks','beginner',100,
`## Arrays: Patterns & Techniques

### Big-O Cheat Sheet
\`\`\`
Array operations:
  Access:  O(1)    - arr[i]
  Search:  O(n)    - linear scan
  Insert:  O(n)    - shift elements
  Delete:  O(n)    - shift elements
  Sort:    O(n log n) - comparison sort

Use arrays when: frequent access by index
Avoid when: frequent insertions/deletions in middle
\`\`\`

### Pattern 1: Two Pointers
\`\`\`python
# LeetCode 167: Two Sum II (sorted array)
def two_sum_sorted(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:   return [left + 1, right + 1]
        elif s < target:  left  += 1
        else:             right -= 1
    return []

# LeetCode 11: Container With Most Water
def max_area(height):
    left, right = 0, len(height) - 1
    max_water   = 0
    while left < right:
        max_water = max(max_water, min(height[left], height[right]) * (right - left))
        if height[left] < height[right]: left  += 1
        else:                            right -= 1
    return max_water

# LeetCode 15: 3Sum
def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # skip duplicates
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:   left += 1
                while left < right and nums[right] == nums[right-1]: right -= 1
                left += 1; right -= 1
            elif total < 0: left  += 1
            else:           right -= 1
    return result
\`\`\`

### Pattern 2: Sliding Window
\`\`\`python
# LeetCode 3: Longest Substring Without Repeating Characters
def length_of_longest_substring(s):
    char_pos = {}
    max_len  = left = 0
    for right, char in enumerate(s):
        if char in char_pos and char_pos[char] >= left:
            left = char_pos[char] + 1
        char_pos[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len

# LeetCode 76: Minimum Window Substring
from collections import Counter

def min_window(s, t):
    if not t: return ""
    need    = Counter(t)
    have    = {}
    satisfied = 0
    required  = len(need)
    result  = ""
    left = min_len = float('inf')
    
    for right, char in enumerate(s):
        have[char] = have.get(char, 0) + 1
        if char in need and have[char] == need[char]:
            satisfied += 1
        
        while satisfied == required:
            # Update result
            window = s[left:right+1]
            if right - left + 1 < min_len:
                min_len = right - left + 1
                result  = window
            
            # Shrink from left
            left_char    = s[left]
            have[left_char] -= 1
            if left_char in need and have[left_char] < need[left_char]:
                satisfied -= 1
            left += 1
    
    return result

# LeetCode 239: Sliding Window Maximum
from collections import deque

def max_sliding_window(nums, k):
    dq     = deque()  # decreasing monotonic deque (stores indices)
    result = []
    for i, n in enumerate(nums):
        # Remove elements outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result
\`\`\`

### Pattern 3: Prefix Sums
\`\`\`python
# LeetCode 560: Subarray Sum Equals K
def subarray_sum(nums, k):
    count  = prefix = 0
    seen   = {0: 1}  # prefix_sum -> count of occurrences
    for n in nums:
        prefix += n
        count  += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count

# LeetCode 238: Product of Array Except Self
def product_except_self(nums):
    n    = len(nums)
    result = [1] * n
    
    # Left pass: result[i] = product of all left of i
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix   *= nums[i]
    
    # Right pass: multiply by product of all right of i
    suffix = 1
    for i in range(n-1, -1, -1):
        result[i] *= suffix
        suffix    *= nums[i]
    
    return result
\`\`\``,
        [
          {title:'NeetCode - Array Problems', url:'https://neetcode.io/roadmap', type:'course'},
          {title:'LeetCode Top Interview 150', url:'https://leetcode.com/studyplan/top-interview-150/', type:'course'},
          {title:'Visualgo - Array Visualizations', url:'https://visualgo.net/en/array', type:'article'},
          {title:'Big-O Cheat Sheet', url:'https://www.bigocheatsheet.com', type:'article'},
          {title:'AlgoExpert - Coding Interview Prep', url:'https://www.algoexpert.io', type:'course'},
        ],
        [
          'Solve LeetCode 1 (Two Sum), 167 (Two Sum II), and 15 (3Sum) - understand the two pointer evolution',
          'Solve LeetCode 11 (Max Water Container) and 42 (Trapping Rain Water) - compare approaches',
          'Solve LeetCode 3 (Longest Substring) and 76 (Minimum Window Substring) - sliding window mastery',
          'Solve LeetCode 560 (Subarray Sum K) and 325 - prefix sum mastery',
          'Solve LeetCode 238 (Product Except Self) without division - prefix/suffix approach',
          'Solve LeetCode 239 (Sliding Window Maximum) using deque',
          'Implement binary search and solve LeetCode 704, 33 (Rotated Array), 153 (Min in Rotated)',
          'Solve all 5 LeetCode Easy array problems on the Blind 75 list in one session',
          'Implement QuickSort and MergeSort from scratch and analyze their space/time complexity',
          'Solve the Dutch National Flag problem (sort array with 3 distinct values in O(n) time)',
        ]),

      L('Linked Lists: Complete Guide','Singly, doubly, fast/slow pointers, LRU cache','intermediate',90,
`## Linked Lists: Complete Guide

### Node Implementation
\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val  = val
        self.next = next
    
    def __repr__(self):
        nodes = []
        cur   = self
        while cur:
            nodes.append(str(cur.val))
            cur = cur.next
        return ' -> '.join(nodes)

def build_list(values):
    dummy = ListNode(0)
    cur   = dummy
    for v in values:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next
\`\`\`

### Core Operations
\`\`\`python
# Reverse - LeetCode 206
def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt       = cur.next
        cur.next  = prev
        prev, cur = cur, nxt
    return prev

# Recursive reverse
def reverse_recursive(head):
    if not head or not head.next: return head
    new_head = reverse_recursive(head.next)
    head.next.next = head
    head.next      = None
    return new_head

# Find middle - LeetCode 876
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # for even length, returns second middle

# Detect cycle - LeetCode 141
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast: return True
    return False

# Find cycle entry - LeetCode 142
def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            # Reset one pointer to head
            slow = head
            while slow is not fast:
                slow = slow.next
                fast = fast.next
            return slow  # cycle entry node
    return None

# Merge sorted lists - LeetCode 21
def merge_two_sorted(l1, l2):
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

# Remove nth from end - LeetCode 19
def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    left  = dummy
    right = head
    for _ in range(n): right = right.next
    while right:
        left  = left.next
        right = right.next
    left.next = left.next.next
    return dummy.next
\`\`\`

### LRU Cache (Interview Classic) - LeetCode 146
\`\`\`python
class LRUCache:
    """O(1) get and put using OrderedDict"""
    
    def __init__(self, capacity: int):
        from collections import OrderedDict
        self.capacity = capacity
        self.cache    = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)  # mark as recently used
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # remove LRU (first item)

# Implementation with doubly linked list (no OrderedDict)
class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache2:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache    = {}
        # Sentinel nodes
        self.head, self.tail = Node(), Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _insert_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next      = node
    
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self._remove(self.cache[key])
        self._insert_front(self.cache[key])
        return self.cache[key].val
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache: self._remove(self.cache[key])
        node = Node(key, value)
        self._insert_front(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
\`\`\``,
        [
          {title:'Linked List - LeetCode Tag', url:'https://leetcode.com/tag/linked-list/', type:'course'},
          {title:'NeetCode Linked List Playlist', url:'https://www.youtube.com/playlist?list=PLot-Xpze53ldVwtstag2TL4HQhAnC8ATf', type:'video'},
        ],
        [
          'Solve LeetCode 206 (Reverse List) both iteratively and recursively',
          'Solve LeetCode 141/142 (Cycle Detection) using Floyd\'s algorithm',
          'Solve LeetCode 21 (Merge Sorted Lists) and 23 (Merge K Sorted Lists)',
          'Implement LRU Cache (LeetCode 146) from scratch with O(1) operations',
          'Solve LeetCode 25 (Reverse Nodes in K-Group) - advanced pointer manipulation',
          'Implement a doubly linked list with all operations (insert, delete, search)',
          'Solve LeetCode 138 (Copy List with Random Pointer)',
          'Implement a queue using two stacks and a stack using two queues',
          'Solve LeetCode 2 (Add Two Numbers) and 445 (Add Two Numbers II)',
          'Build an in-memory phone book using a linked list with sorted insertion',
        ]),
    ]),

    M('Tree Structures','intermediate','🌳',[
      L('Binary Trees: Complete Traversals & Algorithms','DFS, BFS, BST, balanced trees, path problems','intermediate',110,
`## Binary Trees: Complete Guide

### Tree Traversals
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val   = val
        self.left  = left
        self.right = right

# Recursive traversals
def inorder(root):   # Left → Root → Right (sorted for BST)
    result = []
    def dfs(node):
        if not node: return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result

# Iterative inorder (no recursion)
def inorder_iterative(root):
    result, stack = [], []
    cur = root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        result.append(cur.val)
        cur = cur.right
    return result

# Level-order BFS
from collections import deque

def level_order(root):
    if not root: return []
    queue  = deque([root])
    result = []
    while queue:
        level = []
        for _ in range(len(queue)):  # process entire level
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# Maximum depth
def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Diameter (longest path between any two nodes) - LeetCode 543
def diameter(root):
    max_d = [0]
    def depth(node):
        if not node: return 0
        left  = depth(node.left)
        right = depth(node.right)
        max_d[0] = max(max_d[0], left + right)
        return 1 + max(left, right)
    depth(root)
    return max_d[0]

# Path sum - LeetCode 112
def has_path_sum(root, target):
    if not root: return False
    if not root.left and not root.right:
        return root.val == target
    return (has_path_sum(root.left,  target - root.val) or
            has_path_sum(root.right, target - root.val))

# All root-to-leaf paths with target sum - LeetCode 113
def path_sum(root, target):
    result = []
    def dfs(node, remaining, path):
        if not node: return
        path.append(node.val)
        if not node.left and not node.right and node.val == remaining:
            result.append(path[:])
        else:
            dfs(node.left,  remaining - node.val, path)
            dfs(node.right, remaining - node.val, path)
        path.pop()
    dfs(root, target, [])
    return result

# Lowest Common Ancestor - LeetCode 236
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q: return root
    left  = lowest_common_ancestor(root.left,  p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right: return root  # p and q are in different subtrees
    return left or right

# Validate BST - LeetCode 98
def is_valid_bst(root, min_val=float('-inf'), max_val=float('inf')):
    if not root: return True
    if not (min_val < root.val < max_val): return False
    return (is_valid_bst(root.left,  min_val, root.val) and
            is_valid_bst(root.right, root.val, max_val))
\`\`\``,
        [
          {title:'Binary Tree Visualizer', url:'https://visualgo.net/en/bst', type:'article'},
          {title:'NeetCode Trees Playlist', url:'https://www.youtube.com/playlist?list=PLot-Xpze53ldg4pN6PfzoJY57_iJ1g8bI', type:'video'},
          {title:'LeetCode Tree Problems', url:'https://leetcode.com/tag/binary-tree/', type:'course'},
        ],
        [
          'Solve LeetCode 104 (Max Depth), 543 (Diameter), 110 (Balanced Tree) in one session',
          'Implement all 4 traversals (inorder, preorder, postorder, level-order) both recursively and iteratively',
          'Solve LeetCode 102 (Level Order), 103 (Zigzag), and 199 (Right Side View)',
          'Solve LeetCode 98 (Validate BST), 230 (Kth Smallest in BST), 235 (LCA of BST)',
          'Implement a BST with insert, search, delete, and in-order iterator',
          'Solve LeetCode 297 (Serialize/Deserialize Binary Tree)',
          'Solve LeetCode 236 (LCA of Binary Tree) - understand when to use post-order DFS',
          'Implement a min-heap from scratch with insert, extract-min, and heapify operations',
          'Solve LeetCode 124 (Binary Tree Maximum Path Sum) - hardest path problem',
          'Build a file system tree (directory structure) with insert, delete, and search operations',
        ]),
    ]),

    M('Graph Algorithms','advanced','🕸️',[
      L('Graphs: BFS, DFS, Shortest Paths, Topological Sort','Complete graph algorithms with problems','intermediate',120,
`## Graph Algorithms

### Graph Representations
\`\`\`python
# Adjacency list (most common for sparse graphs)
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1, 5],
    5: [2, 4]
}

# Build from edge list
def build_graph(n, edges, directed=False):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
        if not directed: graph[v].append(u)
    return graph
\`\`\`

### BFS - Shortest Path (Unweighted)
\`\`\`python
from collections import deque

def bfs_shortest(graph, start, end):
    queue   = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == end: return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return None

# LeetCode 200: Number of Islands
def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def bfs(r, c):
        queue = deque([(r, c)])
        grid[r][c] = '0'
        while queue:
            row, col = queue.popleft()
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = row + dr, col + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    grid[nr][nc] = '0'
                    queue.append((nr, nc))
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                bfs(r, c)
                count += 1
    return count

# LeetCode 207: Course Schedule (Cycle Detection)
def can_finish(numCourses, prerequisites):
    graph    = {i: [] for i in range(numCourses)}
    for a, b in prerequisites: graph[b].append(a)
    
    # 0=unvisited, 1=visiting, 2=visited
    state = [0] * numCourses
    
    def dfs(node):
        if state[node] == 1: return False  # cycle!
        if state[node] == 2: return True   # already processed
        state[node] = 1
        for neighbor in graph[node]:
            if not dfs(neighbor): return False
        state[node] = 2
        return True
    
    return all(dfs(i) for i in range(numCourses))
\`\`\`

### Dijkstra's Algorithm
\`\`\`python
import heapq

def dijkstra(graph, start):
    """graph: {node: [(neighbor, weight), ...]}"""
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    heap = [(0, start)]  # (distance, node)
    prev = {}
    
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                prev[v] = u
                heapq.heappush(heap, (dist[v], v))
    
    return dist, prev

def shortest_path(graph, start, end):
    dist, prev = dijkstra(graph, start)
    if dist[end] == float('inf'): return None, []
    path = []
    cur  = end
    while cur in prev:
        path.append(cur)
        cur = prev[cur]
    path.append(start)
    return dist[end], list(reversed(path))

# Union-Find (Disjoint Set)
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank   = [0] * n
        self.components = n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]:   self.parent[px] = py
        elif self.rank[px] > self.rank[py]: self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        self.components -= 1
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
\`\`\``,
        [
          {title:'Graph Algorithms Visualizer', url:'https://visualgo.net/en/dfsbfs', type:'article'},
          {title:'NeetCode Graph Problems', url:'https://neetcode.io/roadmap', type:'course'},
          {title:'William Fiset Graph Theory', url:'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P', type:'video'},
        ],
        [
          'Solve LeetCode 200 (Number of Islands), 695 (Max Area of Island) - BFS/DFS mastery',
          'Solve LeetCode 207/210 (Course Schedule I & II) - topological sort',
          'Implement Dijkstra\'s algorithm and solve LeetCode 743 (Network Delay Time)',
          'Solve LeetCode 127 (Word Ladder) - BFS on implicit graph',
          'Implement Union-Find and solve LeetCode 684 (Redundant Connection)',
          'Solve LeetCode 417 (Pacific Atlantic Water Flow) - multi-source BFS',
          'Implement Kruskal\'s MST algorithm with Union-Find',
          'Solve LeetCode 787 (Cheapest Flights Within K Stops) - modified Dijkstra',
          'Implement Bellman-Ford for graphs with negative edges',
          'Solve LeetCode 269 (Alien Dictionary) - topological sort on characters',
        ]),
    ]),

    M('Dynamic Programming','advanced','⚡',[
      L('DP: From Recursion to Tabulation','Memoization, 1D/2D DP, common patterns','advanced',120,
`## Dynamic Programming: Complete Guide

### DP Framework
\`\`\`
1. Identify subproblems
2. Define recurrence relation
3. Identify base cases
4. Implement top-down (memoization) or bottom-up (tabulation)
5. Optimize space if possible
\`\`\`

### 1D DP Problems
\`\`\`python
# Fibonacci (classic DP intro)
# O(n) time, O(n) space
def fib_dp(n):
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space optimized: O(1)
def fib_optimized(n):
    a, b = 0, 1
    for _ in range(n): a, b = b, a + b
    return a

# LeetCode 70: Climbing Stairs (= Fibonacci)
def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1): a, b = b, a + b
    return b

# LeetCode 198: House Robber
def rob(nums):
    if not nums: return 0
    if len(nums) == 1: return nums[0]
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[-1]

# Space optimized
def rob_optimized(nums):
    prev2 = prev1 = 0
    for n in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + n)
    return prev1

# LeetCode 322: Coin Change
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] = min(dp[a], 1 + dp[a - coin])
    return dp[amount] if dp[amount] != float('inf') else -1
\`\`\`

### 2D DP Problems
\`\`\`python
# LeetCode 1143: Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp   = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# LeetCode 72: Edit Distance
def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp   = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],    # delete
                                   dp[i][j-1],    # insert
                                   dp[i-1][j-1])  # replace
    return dp[m][n]

# LeetCode 516: Longest Palindromic Subsequence
def longest_palindrome_subseq(s):
    n  = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n): dp[i][i] = 1
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = 2 + (dp[i+1][j-1] if length > 2 else 0)
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    return dp[0][n-1]
\`\`\``,
        [
          {title:'DP Patterns - NeetCode', url:'https://neetcode.io/roadmap', type:'course'},
          {title:'DP Visualizer', url:'https://dp-visualizer.vercel.app', type:'article'},
          {title:'MIT OpenCourseware - DP Lectures', url:'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/', type:'course'},
          {title:'Aditya Verma DP Series', url:'https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go', type:'video'},
        ],
        [
          'Solve LeetCode 70 (Climbing Stairs), 198 (House Robber), 213 (House Robber II)',
          'Solve LeetCode 322 (Coin Change) and 518 (Coin Change 2) - understand 1D vs 2D DP difference',
          'Solve LeetCode 1143 (LCS) and trace through the DP table manually',
          'Solve LeetCode 72 (Edit Distance) - implement all 3 operations correctly',
          'Solve LeetCode 300 (LIS - Longest Increasing Subsequence) with both O(n^2) and O(n log n)',
          'Solve the 0/1 Knapsack problem and all its variations (bounded, unbounded)',
          'Solve LeetCode 91 (Decode Ways) - DP with string parsing',
          'Solve LeetCode 139 (Word Break) and 140 (Word Break II)',
          'Solve LeetCode 312 (Burst Balloons) - interval DP',
          'Solve LeetCode 10 (Regular Expression Matching) - hardest 2D DP problem',
        ]),
    ]),
  ],
},

// ══════════════════════════════════════════════════════════════
// 3. GENERATIVE AI — 12 lessons, 10 tasks each
// ══════════════════════════════════════════════════════════════
{
  title: 'Generative AI / LLM Engineer',
  description: 'Build production AI applications with LLMs, prompt engineering, LangChain, RAG systems, fine-tuning, and AI agents. The #1 skill in 2024.',
  type: 'role', category: 'Generative AI',
  icon: '🧠', color: '#ec4899', estimatedHours: 120, totalLessons: 12,
  tags: ['OpenAI','LangChain','RAG','Prompt Engineering','Vector DB','GPT-4','Agents'],
  modules: [
    M('LLM Fundamentals','beginner','🤖',[
      L('Understanding LLMs','How LLMs work, tokens, embeddings, temperature, GPT architecture','beginner',70,
`## Understanding Large Language Models

### How LLMs Work
\`\`\`
Training:
  1. Collect massive text dataset (internet, books, code)
  2. Tokenize text into tokens (words/subwords)
  3. Train transformer to predict next token
  4. Fine-tune with RLHF (human feedback)

Inference (generation):
  1. Tokenize your prompt
  2. Each token = vector of numbers (embedding)
  3. Attention mechanism finds relationships
  4. Model outputs probability distribution over vocab
  5. Sample next token based on temperature
  6. Repeat until stop token or max length
\`\`\`

### Key Concepts
\`\`\`python
from openai import OpenAI
client = OpenAI()

# Tokens - roughly 4 chars or 0.75 words
import tiktoken
enc    = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode("Hello, how are you today?")
print(len(tokens))   # ~7 tokens
print(tokens)        # [15496, 11, 703, 527, 499, 3432, 30]

# Temperature controls randomness
# 0.0 = deterministic (always same answer)
# 0.7 = balanced creativity
# 1.5+ = very random/creative

def generate(prompt, temperature=0.7, max_tokens=500):
    response = client.chat.completions.create(
        model       = "gpt-4",
        messages    = [{"role": "user", "content": prompt}],
        temperature = temperature,
        max_tokens  = max_tokens,
    )
    return response.choices[0].message.content

# Context window sizes (as of 2024):
# GPT-3.5-turbo: 16K tokens (~12,000 words)
# GPT-4:         8K tokens  (~6,000 words)
# GPT-4-turbo:   128K tokens (~96,000 words)
# Claude 3:      200K tokens
\`\`\`

### Embeddings
\`\`\`python
import numpy as np

def get_embedding(text, model="text-embedding-3-small"):
    response = client.embeddings.create(input=text, model=model)
    return np.array(response.data[0].embedding)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Semantic similarity
texts = [
    "The weather is nice today",
    "It's a beautiful sunny day",
    "Python is a programming language",
    "The stock market crashed yesterday",
]

embeddings = [get_embedding(t) for t in texts]

query = "What's the weather like?"
query_emb = get_embedding(query)

scores = [(texts[i], cosine_similarity(query_emb, emb))
          for i, emb in enumerate(embeddings)]
scores.sort(key=lambda x: x[1], reverse=True)

for text, score in scores:
    print(f"{score:.3f}: {text}")
# 0.912: The weather is nice today
# 0.867: It's a beautiful sunny day
# 0.234: Python is a programming language
# 0.198: The stock market crashed yesterday
\`\`\``,
        [
          {title:'OpenAI Platform Documentation', url:'https://platform.openai.com/docs', type:'docs'},
          {title:'Andrej Karpathy - Intro to LLMs', url:'https://www.youtube.com/watch?v=zjkBMFhNj_g', type:'video'},
          {title:'Transformers Explained - Jay Alammar', url:'https://jalammar.github.io/illustrated-transformer/', type:'article'},
          {title:'Tiktoken - OpenAI Tokenizer', url:'https://github.com/openai/tiktoken', type:'docs'},
          {title:'OpenAI Cookbook', url:'https://cookbook.openai.com', type:'article'},
        ],
        [
          'Set up OpenAI API access and make your first completion request',
          'Experiment with different temperature values (0, 0.3, 0.7, 1.0, 1.5) on the same prompt - document differences',
          'Calculate the token count and cost estimate for a 1000-word document using tiktoken',
          'Generate embeddings for 10 different sentences and visualize their similarity using a heatmap',
          'Build a semantic similarity search: given a query, find the 3 most similar sentences from a list',
          'Compare GPT-3.5 vs GPT-4 responses for the same complex prompt - document quality differences',
          'Implement a token counting middleware that warns when context is near the limit',
          'Build a tool that estimates API cost before sending a request based on token count',
          'Create a function that chunks a long document intelligently for the context window',
          'Experiment with system prompts: write 5 different personas and test how they affect responses',
        ]),

      L('Prompt Engineering Mastery','Zero-shot, few-shot, CoT, structured output, system prompts','intermediate',85,
`## Prompt Engineering Mastery

### The Anatomy of a Great Prompt
\`\`\`python
from openai import OpenAI
import json

client = OpenAI()

def chat(system, user, temperature=0.3, model="gpt-4"):
    return client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system},
            {"role": "user",   "content": user},
        ],
        temperature=temperature,
    ).choices[0].message.content

# 1. ZERO-SHOT: Just ask
result = chat(
    "You are a helpful assistant.",
    "Classify this sentiment: 'The product is okay but delivery was very slow.'"
)
# → Mixed

# 2. FEW-SHOT: Show examples
few_shot_system = """You are a sentiment classifier.
Classify reviews as: POSITIVE, NEGATIVE, or MIXED.

Examples:
Review: "Amazing quality! Exceeded expectations!" → POSITIVE
Review: "Terrible quality. Broke after one day."   → NEGATIVE
Review: "Good product but took 3 weeks to arrive." → MIXED
"""
result = chat(few_shot_system, "The performance is good but the battery drains fast.")
# → MIXED (consistent with examples)

# 3. CHAIN-OF-THOUGHT
cot_system = """Solve problems by thinking step-by-step:
1. Understand what is being asked
2. Break it into smaller parts
3. Solve each part
4. Give the final answer

Always show your reasoning before the answer."""

# 4. STRUCTURED OUTPUT
structured_system = """Extract job posting information as JSON.
Return ONLY valid JSON, nothing else.
Schema:
{
  "title": "string",
  "company": "string",
  "location": "string",
  "salary_range": "string or null",
  "skills_required": ["string"],
  "experience_years": "number or null",
  "remote": "boolean"
}"""

job_text = """
Senior Frontend Engineer at TechCorp
San Francisco, CA (Remote OK)
$130k-$180k | 4+ years experience
Required: React, TypeScript, GraphQL, AWS
"""

result = chat(structured_system, job_text, model="gpt-4")
job_data = json.loads(result)

# 5. ROLE PROMPTING
expert_system = """You are Dr. Sarah Chen, a senior machine learning engineer with 
15 years of experience at Google Brain and Meta AI. You have published 30+ papers on 
NLP and deep learning. When answering, you:
- Use precise technical terminology
- Back claims with research or benchmarks
- Acknowledge uncertainty when present
- Give practical implementation advice
- Think about production concerns"""
\`\`\`

### Prompt Templates
\`\`\`python
from string import Template

# Reusable prompt templates
SUMMARIZE = Template("""
Summarize the following $content_type in $num_sentences sentences.
Focus on: $focus_areas
Audience: $audience
Tone: $tone

Content:
$content

Summary:""")

CODE_REVIEW = Template("""
Review this $language code for:
1. Bugs and logic errors
2. Security vulnerabilities  
3. Performance issues
4. Code style and best practices
5. Missing error handling

Code:
\`\`\`$language
$code
\`\`\`

Provide specific line-by-line feedback with fixes.""")

# Dynamic prompt builder
def build_qa_prompt(context: str, question: str, max_answer_words: int = 100) -> str:
    return f"""Answer the question based ONLY on the provided context.
If the answer is not in the context, say "I cannot find this information in the provided context."
Keep your answer under {max_answer_words} words.

Context:
{context}

Question: {question}

Answer:"""
\`\`\``,
        [
          {title:'Prompt Engineering Guide - DAIR AI', url:'https://www.promptingguide.ai', type:'article'},
          {title:'OpenAI Prompt Engineering Guide', url:'https://platform.openai.com/docs/guides/prompt-engineering', type:'docs'},
          {title:'Learn Prompting - Free Course', url:'https://learnprompting.org', type:'course'},
        ],
        [
          'Build a few-shot classifier for 5 customer support ticket categories with 95%+ accuracy',
          'Create a chain-of-thought prompt that solves math word problems step by step',
          'Build a structured output extractor for resumes (name, skills, experience, education)',
          'Implement a self-consistency prompting system that generates 5 responses and picks the majority',
          'Create a role-playing prompt for a Socratic teacher that guides students to answers',
          'Build a prompt that converts plain English to SQL queries',
          'Create an automatic prompt optimizer that tests 5 variations and picks the best',
          'Implement a prompt injection defense system that detects and blocks jailbreak attempts',
          'Build a multi-language prompt that always responds in the same language as the input',
          'Create a summarizer with configurable style (executive summary, bullet points, ELI5, academic)',
        ]),
    ]),

    M('RAG & AI Applications','advanced','🔗',[
      L('RAG Systems: Retrieval Augmented Generation','Vector databases, chunking, retrieval, reranking','advanced',100,
`## RAG Systems: Complete Implementation

### Why RAG?
\`\`\`
Problem: LLMs have outdated knowledge + hallucinate facts about your specific data
Solution: RAG = Retrieve relevant docs → Augment prompt → Generate grounded answer

Without RAG:
  Q: "What's our refund policy?"
  A: (hallucinates a generic policy)

With RAG:
  1. Search docs: finds your refund policy PDF
  2. Augment prompt with that content
  3. Generate: accurate answer from YOUR policy
\`\`\`

### Complete RAG Pipeline
\`\`\`python
from openai import OpenAI
import numpy as np
import json
from pathlib import Path

client = OpenAI()

# ── 1. Document Processing ────────────────────────────────────
def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """Split text into overlapping chunks"""
    words  = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        if chunk: chunks.append(chunk)
    return chunks

def process_documents(docs: list[dict]) -> list[dict]:
    """Process raw documents into chunks with metadata"""
    processed = []
    for doc in docs:
        chunks = chunk_text(doc['content'])
        for i, chunk in enumerate(chunks):
            processed.append({
                'id':       f"{doc['id']}_chunk_{i}",
                'content':  chunk,
                'metadata': {
                    'source': doc['source'],
                    'title':  doc['title'],
                    'chunk':  i,
                    'total_chunks': len(chunks),
                }
            })
    return processed

# ── 2. Embedding & Storage ────────────────────────────────────
def embed(texts: list[str], model: str = "text-embedding-3-small") -> np.ndarray:
    """Get embeddings for a list of texts"""
    response = client.embeddings.create(input=texts, model=model)
    return np.array([d.embedding for d in response.data])

class SimpleVectorStore:
    """In-memory vector store for demo purposes"""
    def __init__(self):
        self.documents  = []
        self.embeddings = None
    
    def add(self, chunks: list[dict]):
        texts = [c['content'] for c in chunks]
        embs  = embed(texts)
        self.documents.extend(chunks)
        if self.embeddings is None:
            self.embeddings = embs
        else:
            self.embeddings = np.vstack([self.embeddings, embs])
    
    def search(self, query: str, top_k: int = 5) -> list[dict]:
        query_emb = embed([query])[0]
        # Cosine similarity
        scores = self.embeddings @ query_emb / (
            np.linalg.norm(self.embeddings, axis=1) * np.linalg.norm(query_emb)
        )
        top_indices = np.argsort(scores)[::-1][:top_k]
        results = []
        for idx in top_indices:
            doc = self.documents[idx].copy()
            doc['score'] = float(scores[idx])
            results.append(doc)
        return results

# ── 3. Generation with Retrieved Context ─────────────────────
def rag_answer(store: SimpleVectorStore, question: str, top_k: int = 4) -> dict:
    # Retrieve
    results = store.search(question, top_k=top_k)
    
    # Format context
    context = "\\n\\n---\\n\\n".join([
        f"Source: {r['metadata']['title']}\\n{r['content']}"
        for r in results
    ])
    
    # Generate
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": """You are a helpful assistant.
Answer questions based ONLY on the provided context.
If the answer isn't in the context, say so clearly.
Always cite which source you got the information from."""},
            {"role": "user", "content": f"""Context:
{context}

Question: {question}

Answer (with source citations):"""}
        ],
        temperature=0.1,  # low temperature for factual answers
    )
    
    return {
        "answer":   response.choices[0].message.content,
        "sources":  [r['metadata']['title'] for r in results],
        "scores":   [r['score'] for r in results],
    }

# ── Usage ─────────────────────────────────────────────────────
store = SimpleVectorStore()

# Index your documents
documents = [
    {"id": "1", "title": "Refund Policy",     "source": "policy.pdf",  "content": "..."},
    {"id": "2", "title": "Shipping Guide",    "source": "shipping.pdf","content": "..."},
    {"id": "3", "title": "Product Warranty",  "source": "warranty.pdf","content": "..."},
]

chunks = process_documents(documents)
store.add(chunks)

# Query
result = rag_answer(store, "How do I return a product purchased online?")
print(result['answer'])
print("Sources:", result['sources'])
\`\`\``,
        [
          {title:'LangChain Documentation', url:'https://python.langchain.com/docs/', type:'docs'},
          {title:'RAG From Scratch - LangChain', url:'https://github.com/langchain-ai/rag-from-scratch', type:'article'},
          {title:'ChromaDB Documentation', url:'https://docs.trychroma.com', type:'docs'},
          {title:'Pinecone Learning Center', url:'https://www.pinecone.io/learn/', type:'article'},
          {title:'RAG vs Fine-tuning Guide', url:'https://www.anyscale.com/blog/a-comprehensive-guide-for-building-rag-based-llm-applications', type:'article'},
        ],
        [
          'Build a personal document Q&A system: upload PDFs and ask questions about them',
          'Implement a RAG chatbot for a company FAQ using LangChain and ChromaDB',
          'Compare different chunking strategies (fixed-size, sentence, paragraph) and measure retrieval quality',
          'Implement hybrid search: combine vector similarity with BM25 keyword search',
          'Build a multi-document RAG that cites which document each answer came from',
          'Implement a re-ranking step that uses a cross-encoder to improve retrieval precision',
          'Create a RAG evaluation framework that measures faithfulness, relevance, and groundedness',
          'Build a code documentation assistant using RAG over a GitHub repository',
          'Implement query expansion: generate 3 related queries and combine results',
          'Build a streaming RAG that returns tokens as they are generated (real-time output)',
        ]),
    ]),
  ],
},

];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    console.log('✅ Connected to:', db.databaseName);

    // Clear and re-insert
    for (const rm of roadmaps) {
      await db.collection('roadmaps').deleteOne({ title: rm.title });
    }

    const result = await db.collection('roadmaps').insertMany(roadmaps);
    console.log('\n✅ Seeded', result.insertedCount, 'roadmaps:\n');

    for (const rm of roadmaps) {
      const lessonCount = rm.modules.reduce((sum, m) => sum + m.lessons.length, 0);
      const taskCount   = rm.modules.reduce((sum, m) =>
        sum + m.lessons.reduce((s2, l) => s2 + (l.tasks || []).length, 0), 0);
      console.log(`  ${rm.icon} ${rm.title}`);
      console.log(`     ${lessonCount} lessons | ${taskCount} tasks | ${rm.modules.length} modules`);
    }

    const total = await db.collection('roadmaps').countDocuments();
    console.log(`\n📚 Total roadmaps in DB: ${total}`);
    console.log('\n🎉 Done! http://localhost:5000/api/roadmaps\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();