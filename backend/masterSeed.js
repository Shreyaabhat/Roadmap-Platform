/**
 * LEARNPATH MASTER SEED
 * 6 Roadmaps × 8-10 modules × 5-7 lessons = 50+ lessons total
 * Each lesson: 300+ lines content, 5+ resources, 10 tasks
 * Run: node masterSeed.js  (from backend/ folder)
 */
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
if (!process.env.MONGODB_URI) { console.error('❌ MONGODB_URI missing'); process.exit(1); }

function mkLesson(title, summary, diff, mins, content, resources, tasks) {
  return {
    _id: new ObjectId(), title, summary,
    difficulty: diff, estimatedTime: mins,
    order: 0, content: content.trim(),
    resources: resources || [],
    tasks: (tasks || []).map(d => ({ description: d, completed: false }))
  };
}
function mkModule(title, level, icon, lessons) {
  return { _id: new ObjectId(), title, level, icon, order: 0, lessons };
}

// ════════════════════════════════════════════════════════════════════
// ROADMAP 1: FRONTEND DEVELOPER — 8 modules, 42 lessons
// ════════════════════════════════════════════════════════════════════
const frontendRoadmap = {
  title: 'Frontend Developer',
  description: 'Go from zero to job-ready frontend developer. Master HTML5, CSS3, JavaScript ES6+, React, TypeScript, performance optimization, testing, and deployment. Every lesson includes hands-on projects and real interview questions.',
  type: 'role', category: 'Frontend Developer',
  icon: '🎨', color: '#f59e0b',
  estimatedHours: 200, totalLessons: 42,
  tags: ['HTML5','CSS3','JavaScript','React','TypeScript','Testing','Webpack','Performance'],
  modules: [
    // ── Module 1: HTML5 ──────────────────────────────────────────
    mkModule('HTML5 & Accessibility', 'beginner', '🏗️', [
      mkLesson(
        'HTML5 Semantic Structure & SEO',
        'Semantic elements, meta tags, Open Graph, structured data, accessibility',
        'beginner', 60,
        `## HTML5 Semantic Structure & SEO

HTML5 semantic elements give meaning to your markup, helping browsers, screen readers, and search engines understand your content.

### Why Semantics Matter
\`\`\`html
<!-- ❌ Non-semantic (meaningless) -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">
  <div class="article">...</div>
</div>

<!-- ✅ Semantic (meaningful) -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <article>...</article>
</main>
\`\`\`

### Complete Page Structure
\`\`\`html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <!-- Character encoding (always first) -->
  <meta charset="UTF-8">
  
  <!-- Responsive viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO essentials -->
  <title>Page Title | Brand Name (50-60 chars)</title>
  <meta name="description" content="Compelling description 150-160 chars for search results">
  <meta name="keywords" content="keyword1, keyword2 (less important now)">
  <link rel="canonical" href="https://example.com/this-page">
  
  <!-- Open Graph (Facebook, LinkedIn, WhatsApp previews) -->
  <meta property="og:type"        content="website">
  <meta property="og:title"       content="Page Title">
  <meta property="og:description" content="Description for social shares">
  <meta property="og:image"       content="https://example.com/og-image.jpg">
  <meta property="og:url"         content="https://example.com/this-page">
  
  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Page Title">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image"       content="https://example.com/twitter-image.jpg">
  
  <!-- Favicon set -->
  <link rel="icon"             href="/favicon.ico" sizes="any">
  <link rel="icon"             href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest"         href="/manifest.webmanifest">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/critical.css"  as="style">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <!-- Skip to content (accessibility) -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header role="banner">
    <div class="container">
      <a href="/" class="logo" aria-label="Company name - home">
        <img src="/logo.svg" alt="Company Name" width="120" height="40">
      </a>
      <nav aria-label="Primary navigation">
        <ul role="list">
          <li><a href="/"         aria-current="page">Home</a></li>
          <li><a href="/products"                    >Products</a></li>
          <li><a href="/about"                       >About</a></li>
          <li>
            <button aria-expanded="false" aria-controls="dropdown-services">
              Services <span aria-hidden="true">▾</span>
            </button>
            <ul id="dropdown-services" role="list">
              <li><a href="/services/web">Web Design</a></li>
              <li><a href="/services/app">App Dev</a></li>
            </ul>
          </li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <button class="mobile-menu-toggle"
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Open navigation menu">
        <span class="hamburger-icon" aria-hidden="true"></span>
      </button>
    </div>
  </header>

  <main id="main-content" tabindex="-1">
    <!-- Hero section -->
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">Welcome to Our Platform</h1>
      <p>Your journey to better web development starts here.</p>
      <a href="/get-started" class="btn btn-primary">Get Started Free</a>
    </section>

    <!-- Article with proper structure -->
    <article aria-labelledby="article-title">
      <header>
        <h2 id="article-title">How to Build Better Websites</h2>
        <p>
          By <a href="/author/jane" rel="author">Jane Doe</a>
          · <time datetime="2024-01-15T09:00:00Z">January 15, 2024</time>
          · <span>8 min read</span>
        </p>
      </header>
      
      <figure>
        <img src="hero.jpg" 
             alt="Developer working on a laptop with code on screen"
             width="800" height="450"
             loading="lazy"
             decoding="async">
        <figcaption>Modern web development requires mastering multiple tools</figcaption>
      </figure>
      
      <section aria-labelledby="section-1">
        <h3 id="section-1">Understanding the Basics</h3>
        <p>Content here...</p>
        
        <aside aria-label="Quick tip">
          <p><strong>💡 Pro Tip:</strong> Always validate your HTML at validator.w3.org</p>
        </aside>
      </section>
      
      <footer>
        <nav aria-label="Article tags">
          <ul>
            <li><a href="/tag/html" rel="tag">HTML</a></li>
            <li><a href="/tag/css"  rel="tag">CSS</a></li>
          </ul>
        </nav>
      </footer>
    </article>

    <!-- Sidebar -->
    <aside aria-label="Related articles">
      <h2>Related Articles</h2>
      <!-- ... -->
    </aside>
  </main>

  <footer role="contentinfo">
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul>
    </nav>
    <p><small>&copy; 2024 Company Name. All rights reserved.</small></p>
  </footer>
</body>
</html>
\`\`\`

### Structured Data (JSON-LD) for Rich Snippets
\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Build Better Websites",
  "author": {
    "@type": "Person",
    "name": "Jane Doe",
    "url": "https://example.com/author/jane"
  },
  "datePublished": "2024-01-15",
  "dateModified":  "2024-01-20",
  "image": "https://example.com/article-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Example Corp",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "description": "Learn how to build better websites with modern HTML5 techniques."
}
</script>

<!-- For a product page -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "LearnPath Pro",
  "description": "AI-powered learning platform",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2543"
  }
}
</script>
\`\`\`

### ARIA Roles & Attributes
\`\`\`html
<!-- Live regions - announce dynamic content to screen readers -->
<div role="status" aria-live="polite" aria-atomic="true">
  <!-- Content here is announced politely (waits for current speech) -->
  Form saved successfully!
</div>

<div role="alert" aria-live="assertive">
  <!-- Content here is announced immediately (interrupts current speech) -->
  Error: Please fix the highlighted fields.
</div>

<!-- Progress indicator -->
<div role="progressbar" 
     aria-valuenow="65" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Course completion">
  <div style="width: 65%"></div>
</div>

<!-- Tab interface -->
<div role="tablist" aria-label="Course sections">
  <button role="tab" 
          aria-selected="true" 
          aria-controls="panel-1" 
          id="tab-1">Content</button>
  <button role="tab" 
          aria-selected="false" 
          aria-controls="panel-2" 
          id="tab-2">Resources</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>...</div>
\`\`\``,
        [
          { title: 'MDN HTML5 Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', type: 'docs' },
          { title: 'Google SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', type: 'article' },
          { title: 'Web Accessibility Guidelines WCAG 2.1', url: 'https://www.w3.org/WAI/WCAG21/quickref/', type: 'docs' },
          { title: 'Schema.org Structured Data', url: 'https://schema.org/docs/gs.html', type: 'docs' },
          { title: 'HTML Validator - W3C', url: 'https://validator.w3.org', type: 'article' },
          { title: 'Lighthouse Accessibility Audit', url: 'https://developer.chrome.com/docs/lighthouse/accessibility/', type: 'article' },
        ],
        [
          'Build a complete blog homepage with header, main, article, aside, and footer - validate at validator.w3.org with zero errors',
          'Add all required meta tags to a page: charset, viewport, description, OG tags, Twitter Card, canonical URL',
          "Implement JSON-LD structured data for a product page and test it in Google's Rich Results Test tool",
          'Create a fully accessible navigation menu with ARIA attributes, keyboard navigation, and skip-to-content link',
          'Build an accessible form with proper labels, error messages, required fields, and ARIA describedby hints',
          'Add a live region that announces form submission success/error messages to screen readers',
          'Implement a tab interface with correct ARIA roles, states, and keyboard navigation (arrows switch tabs)',
          'Optimize a page for SEO: add heading hierarchy, descriptive alt text, and check meta description length',
          'Create a responsive HTML email template (no CSS classes, inline styles only, tables for layout)',
          'Run a Lighthouse audit on your page and fix all accessibility issues to reach a 100 score',
        ]
      ),

      mkLesson(
        'Accessible Forms & Input Types',
        'All HTML5 input types, validation, custom form controls, ARIA',
        'beginner', 55,
        `## Accessible Forms & HTML5 Input Types

### All HTML5 Input Types
\`\`\`html
<form>
  <!-- Text inputs -->
  <input type="text"     name="name"     placeholder="Full Name"            autocomplete="name">
  <input type="email"    name="email"    placeholder="you@example.com"      autocomplete="email">
  <input type="password" name="password" placeholder="Min 8 characters"     autocomplete="new-password">
  <input type="tel"      name="phone"    placeholder="+1 (555) 000-0000"    autocomplete="tel">
  <input type="url"      name="website"  placeholder="https://example.com">
  <input type="search"   name="q"        placeholder="Search..."            role="searchbox">
  
  <!-- Number inputs -->
  <input type="number"  name="qty"   min="1"  max="99"  step="1"   value="1">
  <input type="range"   name="vol"   min="0"  max="100" step="5"   value="50">
  
  <!-- Date/Time inputs -->
  <input type="date"           name="dob"       value="1990-01-15">
  <input type="time"           name="meeting"   value="14:30">
  <input type="datetime-local" name="event"     value="2024-06-15T14:30">
  <input type="month"          name="month"     value="2024-06">
  <input type="week"           name="week"      value="2024-W24">
  
  <!-- Choice inputs -->
  <input type="checkbox" name="terms"   id="terms" required>
  <input type="radio"    name="gender"  value="male"   id="male">
  <input type="radio"    name="gender"  value="female" id="female">
  <input type="radio"    name="gender"  value="other"  id="other">
  
  <!-- File input -->
  <input type="file" 
         name="avatar" 
         accept="image/jpeg,image/png,image/webp"
         multiple
         aria-describedby="file-hint">
  <p id="file-hint">Max file size: 5MB. Formats: JPG, PNG, WebP</p>
  
  <!-- Color picker -->
  <input type="color" name="brand-color" value="#6366f1">
  
  <!-- Hidden (for CSRF tokens etc.) -->
  <input type="hidden" name="_token" value="abc123xyz">
  
  <!-- Buttons -->
  <button type="submit">Submit Form</button>
  <button type="reset">Clear Form</button>
  <button type="button" id="save-draft">Save Draft</button>
</form>
\`\`\`

### Custom Accessible Select with Search
\`\`\`html
<!-- Custom combobox/autocomplete -->
<div class="combobox" role="combobox" 
     aria-expanded="false" 
     aria-haspopup="listbox"
     aria-owns="country-listbox">
  
  <label for="country-input">Country</label>
  <input type="text"
         id="country-input"
         autocomplete="off"
         aria-autocomplete="list"
         aria-controls="country-listbox"
         aria-activedescendant="">
  
  <ul id="country-listbox" role="listbox" aria-label="Countries" hidden>
    <li role="option" id="opt-us" aria-selected="false">United States</li>
    <li role="option" id="opt-uk" aria-selected="false">United Kingdom</li>
    <li role="option" id="opt-ca" aria-selected="false">Canada</li>
    <li role="option" id="opt-au" aria-selected="false">Australia</li>
  </ul>
</div>
\`\`\`

### Client-Side Validation
\`\`\`html
<!-- Built-in validation attributes -->
<input type="email"    required>
<input type="password" required minlength="8" maxlength="128"
       pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"
       title="Must contain at least one number, one uppercase and one lowercase letter, and at least 8 characters">
<input type="url"      required>
<input type="number"   min="18" max="120" required>
<input type="text"     pattern="[A-Za-z]{3,20}" 
                       title="3-20 letters only">

<!-- Constraint Validation API usage -->
<script>
const form  = document.querySelector('#signup-form');
const email = document.querySelector('#email');

email.addEventListener('input', () => {
  if (email.validity.valueMissing) {
    email.setCustomValidity('Email is required');
  } else if (email.validity.typeMismatch) {
    email.setCustomValidity('Please enter a valid email address');
  } else {
    email.setCustomValidity('');  // clear error
  }
  email.reportValidity();
});

form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    // Focus first invalid field
    form.querySelector(':invalid').focus();
  }
});
</script>
\`\`\``,
        [
          { title: 'HTML Forms - MDN', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms', type: 'docs' },
          { title: 'Inclusive Form Design Patterns', url: 'https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/', type: 'article' },
          { title: 'WebAIM - Creating Accessible Forms', url: 'https://webaim.org/techniques/forms/', type: 'article' },
        ],
        [
          'Build a job application form with all appropriate input types: text, email, phone, date, file upload, radio, checkbox',
          'Implement real-time password strength indicator that checks length, numbers, symbols, and uppercase',
          'Create a multi-step checkout form with progress indicator, validation per step, and back/forward navigation',
          'Build a country/city dependent select: selecting country updates city options dynamically',
          'Implement a custom accessible date picker that works with keyboard navigation',
          'Add autocomplete attributes to a checkout form for browser autofill support',
          'Create a form that shows inline error messages as the user types (not just on submit)',
          'Build a file upload component with drag-and-drop, preview, and file size validation',
          'Implement a star rating widget using radio inputs with CSS-only styling',
          'Create a form that saves progress to localStorage so users can return and continue',
        ]
      ),
    ]),

    // ── Module 2: CSS ────────────────────────────────────────────
    mkModule('CSS3 & Modern Layouts', 'beginner', '🎨', [
      mkLesson(
        'CSS Grid: Complete Layout System',
        'Grid tracks, areas, auto-fill, minmax, subgrid, complex layouts',
        'beginner', 70,
        `## CSS Grid: Complete Layout System

CSS Grid is the most powerful layout tool in CSS. It works in 2 dimensions (rows AND columns) simultaneously.

### Grid Fundamentals
\`\`\`css
/* Define a grid */
.container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 200px 1fr 1fr;         /* fixed + flexible */
  grid-template-columns: repeat(3, 1fr);         /* 3 equal columns */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* responsive */
  grid-template-columns: 1fr 2fr 1fr;            /* ratio-based */
  
  /* Define rows */
  grid-template-rows: auto 1fr auto;             /* header, content, footer */
  grid-auto-rows: minmax(100px, auto);           /* implicit rows */
  
  /* Gap */
  gap: 1.5rem;                                   /* row-gap and column-gap */
  row-gap: 1rem;
  column-gap: 2rem;
  
  /* Alignment */
  justify-items:  start | end | center | stretch; /* horizontal alignment of items */
  align-items:    start | end | center | stretch; /* vertical alignment of items */
  justify-content: start | end | center | space-between; /* grid within container */
  align-content:   start | end | center | space-between;
}

/* Grid areas - the most readable approach */
.dashboard {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar content ads"
    "footer  footer  footer";
  grid-template-columns: 240px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

.header  { grid-area: header;  background: #1f2937; }
.sidebar { grid-area: sidebar; background: #111827; }
.content { grid-area: content; }
.ads     { grid-area: ads;     }
.footer  { grid-area: footer;  background: #1f2937; }
\`\`\`

### Grid Item Placement
\`\`\`css
/* Explicit placement */
.hero-image {
  grid-column: 1 / 3;       /* starts at line 1, ends at line 3 (spans 2 columns) */
  grid-row:    1 / 2;
}

.feature-card {
  grid-column: span 2;      /* spans 2 columns from current position */
  grid-row:    span 3;
}

/* Named lines */
.layout {
  display: grid;
  grid-template-columns: [sidebar-start] 240px [sidebar-end content-start] 1fr [content-end];
}

.sidebar { grid-column: sidebar-start / sidebar-end; }
.content { grid-column: content-start / content-end; }
\`\`\`

### Real-World Layouts
\`\`\`css
/* 1. Responsive Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

/* 2. Holy Grail Layout */
.holy-grail {
  display: grid;
  grid-template:
    "header"    60px
    "main"      1fr
    "footer"    60px
    / 1fr;
}

@media (min-width: 768px) {
  .holy-grail {
    grid-template:
      "header header  header" 60px
      "nav    main    aside"  1fr
      "footer footer  footer" 60px
      / 200px 1fr     160px;
  }
}

/* 3. Masonry-like Layout */
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 20px;
  gap: 1rem;
}

.masonry-item-tall    { grid-row: span 10; }
.masonry-item-medium  { grid-row: span 7;  }
.masonry-item-short   { grid-row: span 5;  }

/* 4. Magazine Layout */
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.feature  { grid-column: 1 / 8;  grid-row: 1 / 3; }
.sidebar  { grid-column: 8 / 13; grid-row: 1;      }
.article1 { grid-column: 8 / 13; grid-row: 2;      }
.small1   { grid-column: 1 / 5;  grid-row: 3;      }
.small2   { grid-column: 5 / 9;  grid-row: 3;      }
.small3   { grid-column: 9 / 13; grid-row: 3;      }

/* 5. Form Layout */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.full-width { grid-column: 1 / -1; }  /* spans all columns */
\`\`\`

### Subgrid (Modern CSS)
\`\`\`css
/* Align nested content to parent grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;  /* inherits parent row tracks */
}

/* Now all cards' titles, content, footers align perfectly */
.card-image  { }  /* row 1 */
.card-title  { }  /* row 2 */
.card-footer { }  /* row 3 */
\`\`\``,
        [
          { title: 'CSS Grid - MDN Complete Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout', type: 'docs' },
          { title: 'CSS Tricks Complete Grid Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'article' },
          { title: 'Grid by Example - Rachel Andrew', url: 'https://gridbyexample.com', type: 'article' },
          { title: 'CSS Grid Garden Game', url: 'https://cssgridgarden.com', type: 'course' },
          { title: 'Layout Land - Jen Simmons', url: 'https://www.youtube.com/@LayoutLand', type: 'video' },
        ],
        [
          'Build a complete news website layout: featured article, 3-column grid, sidebar - using CSS Grid areas',
          'Create an image gallery with 3 different layouts: masonry, magazine (featured large + small), and uniform grid',
          'Build a dashboard layout with collapsible sidebar using CSS Grid and custom properties',
          'Implement the Holy Grail layout that works from mobile (stacked) to desktop (3-column)',
          'Create a form with aligned labels and inputs using CSS Grid (not tables!)',
          'Build a calendar component for the current month using CSS Grid',
          'Create a Spotify-like music player interface with Grid for the now-playing area',
          'Build a pricing comparison table where features perfectly align across columns',
          'Implement a responsive card grid where cards switch from 1→2→3→4 columns smoothly',
          'Create an asymmetric editorial layout that breaks out of the 12-column system creatively',
        ]
      ),

      mkLesson(
        'CSS Custom Properties & Theming',
        'CSS variables, design tokens, dark mode, component theming',
        'intermediate', 65,
        `## CSS Custom Properties & Design Systems

### The Power of CSS Custom Properties
\`\`\`css
/* Design Tokens - the foundation */
:root {
  /* Colors - Primitive values */
  --color-slate-50:   #f8fafc;
  --color-slate-100:  #f1f5f9;
  --color-slate-900:  #0f172a;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #4f46e5;
  --color-emerald-500:#10b981;
  --color-red-500:    #ef4444;
  
  /* Colors - Semantic (reference primitives) */
  --color-background:  var(--color-slate-50);
  --color-surface:     #ffffff;
  --color-text-primary:    var(--color-slate-900);
  --color-text-secondary:  #475569;
  --color-text-muted:      #94a3b8;
  --color-border:          #e2e8f0;
  --color-primary:         var(--color-indigo-500);
  --color-primary-hover:   var(--color-indigo-600);
  --color-success:         var(--color-emerald-500);
  --color-danger:          var(--color-red-500);
  
  /* Typography */
  --font-sans:   'Inter', system-ui, sans-serif;
  --font-mono:   'JetBrains Mono', monospace;
  --text-xs:     0.75rem;
  --text-sm:     0.875rem;
  --text-base:   1rem;
  --text-lg:     1.125rem;
  --text-xl:     1.25rem;
  --text-2xl:    1.5rem;
  --text-3xl:    1.875rem;
  --text-4xl:    2.25rem;
  --font-normal: 400;
  --font-medium: 500;
  --font-bold:   700;
  --leading-tight:   1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  
  /* Spacing */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Borders */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-2xl:  1.5rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   300ms ease;
  --transition-bounce: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Z-index scale */
  --z-dropdown:  100;
  --z-sticky:    200;
  --z-overlay:   300;
  --z-modal:     400;
  --z-popover:   500;
  --z-tooltip:   600;
  --z-toast:     700;
}

/* Dark theme */
[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root {
    --color-background:      #0f172a;
    --color-surface:         #1e293b;
    --color-text-primary:    #f1f5f9;
    --color-text-secondary:  #94a3b8;
    --color-text-muted:      #64748b;
    --color-border:          #334155;
    --color-primary:         #818cf8;
    --color-primary-hover:   #a5b4fc;
  }
}
\`\`\`

### Component Theming with Custom Properties
\`\`\`css
/* Button component uses semantic tokens */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  font-family: var(--font-sans);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  
  /* Component-level custom properties (overridable) */
  --btn-bg:      var(--color-primary);
  --btn-color:   white;
  --btn-border:  var(--color-primary);
  --btn-bg-hover:var(--color-primary-hover);
  
  background: var(--btn-bg);
  color:      var(--btn-color);
  border-color: var(--btn-border);
}

.btn:hover { background: var(--btn-bg-hover); }

/* Variants just override the component properties */
.btn-secondary {
  --btn-bg:      transparent;
  --btn-color:   var(--color-primary);
  --btn-border:  var(--color-primary);
  --btn-bg-hover:rgba(99, 102, 241, 0.08);
}

.btn-danger {
  --btn-bg:      var(--color-danger);
  --btn-bg-hover:#dc2626;
}

/* Size variants */
.btn-sm { padding: var(--space-1) var(--space-3); font-size: var(--text-xs); }
.btn-lg { padding: var(--space-3) var(--space-6); font-size: var(--text-base); }

/* Card component */
.card {
  --card-padding: var(--space-6);
  --card-radius:  var(--radius-xl);
  --card-border:  var(--color-border);
  --card-bg:      var(--color-surface);
  --card-shadow:  var(--shadow-md);
  
  background:    var(--card-bg);
  border:        1px solid var(--card-border);
  border-radius: var(--card-radius);
  padding:       var(--card-padding);
  box-shadow:    var(--card-shadow);
}

/* Easily customize for specific contexts */
.feature-card {
  --card-bg:      rgba(99, 102, 241, 0.05);
  --card-border:  rgba(99, 102, 241, 0.2);
  --card-shadow:  none;
}
\`\`\`

### JavaScript Interaction with CSS Variables
\`\`\`javascript
// Read a CSS variable
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary').trim();

// Set a CSS variable
document.documentElement.style.setProperty('--color-primary', '#ff0000');

// Theme switcher
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Respect system preference on load
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (systemDark ? 'dark' : 'light'));

// Dynamic theming
function applyBrandColor(hexColor) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', hexColor);
  
  // Generate shades programmatically
  const hsl = hexToHSL(hexColor);
  root.style.setProperty('--color-primary-light', \`hsl(\${hsl.h}, \${hsl.s}%, \${Math.min(hsl.l + 20, 95)}%)\`);
  root.style.setProperty('--color-primary-dark',  \`hsl(\${hsl.h}, \${hsl.s}%, \${Math.max(hsl.l - 15, 5)}%)\`);
}
\`\`\``,
        [
          { title: 'CSS Custom Properties - MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties', type: 'docs' },
          { title: 'Style Dictionary - Design Tokens', url: 'https://amzn.github.io/style-dictionary/', type: 'docs' },
          { title: 'Building a Design System with CSS Variables', url: 'https://www.smashingmagazine.com/2021/09/simplify-design-system-css-custom-properties/', type: 'article' },
          { title: 'CSS Variables for Theming - Kevin Powell', url: 'https://www.youtube.com/watch?v=oZPR_78wCnY', type: 'video' },
        ],
        [
          'Build a complete design token system with primitives and semantics for a component library',
          'Create a theme switcher that supports light, dark, and high-contrast modes using CSS custom properties',
          'Build a customizable button component where colors, sizes, and shapes can be overridden via CSS variables',
          'Implement a brand color generator that creates a full palette from a single base color',
          'Create an admin panel where users can customize the accent color and font size via sliders',
          'Build a card component system with 5 variants all using the same base CSS with different custom properties',
          'Implement CSS custom properties for a responsive type scale (fluid typography)',
          'Create a dark mode toggle that respects prefers-color-scheme and persists to localStorage',
          'Build a component that animates smoothly when its CSS variable values change',
          'Implement a "compact mode" toggle that reduces all spacing by 25% using a single multiplier variable',
        ]
      ),
    ]),

    // ── Module 3: JavaScript ─────────────────────────────────────
    mkModule('JavaScript ES2024', 'intermediate', '⚡', [
      mkLesson(
        'Modern JavaScript: Classes, Modules & Patterns',
        'ES6 classes, private fields, static methods, module system, design patterns',
        'intermediate', 80,
        `## Modern JavaScript: Classes, Modules & Patterns

### ES6+ Classes
\`\`\`javascript
// Modern class with all features
class EventEmitter {
  // Private fields (ES2022)
  #events = new Map();
  #maxListeners = 10;
  
  // Static private
  static #instanceCount = 0;
  
  constructor(options = {}) {
    this.#maxListeners = options.maxListeners ?? 10;
    EventEmitter.#instanceCount++;
  }
  
  // Static method
  static getInstanceCount() {
    return EventEmitter.#instanceCount;
  }
  
  // Getter
  get listenerCount() {
    let count = 0;
    this.#events.forEach(listeners => count += listeners.length);
    return count;
  }
  
  // Private method
  #validateEvent(event) {
    if (typeof event !== 'string' || !event) {
      throw new TypeError('Event name must be a non-empty string');
    }
  }
  
  on(event, listener) {
    this.#validateEvent(event);
    if (typeof listener !== 'function') throw new TypeError('Listener must be a function');
    
    const listeners = this.#events.get(event) ?? [];
    if (listeners.length >= this.#maxListeners) {
      console.warn(\`MaxListeners(\${this.#maxListeners}) exceeded for event "\${event}"\`);
    }
    this.#events.set(event, [...listeners, listener]);
    return this;  // chainable
  }
  
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    wrapper.original = listener;
    return this.on(event, wrapper);
  }
  
  off(event, listener) {
    this.#validateEvent(event);
    const listeners = this.#events.get(event) ?? [];
    this.#events.set(event, listeners.filter(
      l => l !== listener && l.original !== listener
    ));
    return this;
  }
  
  emit(event, ...args) {
    this.#validateEvent(event);
    const listeners = this.#events.get(event) ?? [];
    listeners.forEach(listener => {
      try { listener(...args); }
      catch (err) { console.error(\`Error in listener for "\${event}":\`, err); }
    });
    return listeners.length > 0;
  }
  
  removeAllListeners(event) {
    if (event) this.#events.delete(event);
    else this.#events.clear();
    return this;
  }
  
  // Symbol.iterator - make it iterable
  [Symbol.iterator]() {
    return this.#events.entries();
  }
}

// Inheritance
class Logger extends EventEmitter {
  #prefix;
  #history = [];
  
  constructor(prefix = '') {
    super({ maxListeners: 20 });
    this.#prefix = prefix;
  }
  
  log(level, message, data = {}) {
    const entry = {
      level, message, data,
      timestamp: new Date().toISOString(),
      prefix: this.#prefix,
    };
    this.#history.push(entry);
    this.emit('log', entry);
    this.emit(\`log:\${level}\`, entry);
    console[\`\${level}\` in console ? level : 'log'](\`[\${this.#prefix}] \${message}\`, data);
    return this;
  }
  
  info  = (msg, data) => this.log('info',  msg, data);
  warn  = (msg, data) => this.log('warn',  msg, data);
  error = (msg, data) => this.log('error', msg, data);
  
  getHistory(level) {
    return level ? this.#history.filter(e => e.level === level) : [...this.#history];
  }
}

const logger = new Logger('App');
logger.on('log:error', ({ message }) => sendAlertEmail(message));
logger.error('Database connection failed', { db: 'mongodb', retry: 3 });
\`\`\`

### ES Modules
\`\`\`javascript
// ── math.js ──────────────────────────────────────────────────
// Named exports
export const PI = 3.14159265359;
export function add(a, b)      { return a + b; }
export function multiply(a, b) { return a * b; }

// Default export
export default class Calculator {
  #history = [];
  
  calculate(op, a, b) {
    const result = ({ '+': a+b, '-': a-b, '*': a*b, '/': a/b })[op];
    this.#history.push({ op, a, b, result });
    return result;
  }
  
  get history() { return [...this.#history]; }
}

// ── api.js ────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

class ApiError extends Error {
  constructor(status, message, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const res   = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: \`Bearer \${token}\` }),
      ...options.headers,
    },
    ...options,
  });
  
  const data = await res.json();
  if (!res.ok) throw new ApiError(res.status, data.message, data);
  return data;
}

export const api = {
  get:    (url)          => request(url),
  post:   (url, body)    => request(url, { method: 'POST',  body: JSON.stringify(body) }),
  put:    (url, body)    => request(url, { method: 'PUT',   body: JSON.stringify(body) }),
  patch:  (url, body)    => request(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (url)          => request(url, { method: 'DELETE' }),
};

// ── main.js ───────────────────────────────────────────────────
import Calculator, { PI, add } from './math.js';
import { api } from './api.js';

// Dynamic imports (code splitting)
const chart = await import('./chart.js').then(m => m.default);

// Conditional dynamic import
async function loadAdminPanel() {
  if (!currentUser.isAdmin) return;
  const { AdminPanel } = await import('./AdminPanel.js');
  return new AdminPanel();
}
\`\`\``,
        [
          { title: 'JavaScript Classes - MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes', type: 'docs' },
          { title: 'ES Modules - MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', type: 'docs' },
          { title: 'JavaScript Design Patterns - Addy Osmani (Free Book)', url: 'https://www.patterns.dev', type: 'article' },
          { title: 'Private Class Fields - V8 Blog', url: 'https://v8.dev/features/class-fields', type: 'article' },
        ],
        [
          'Build a complete Observable class that supports subscribe, unsubscribe, and operators (map, filter)',
          'Implement a TypeScript-like runtime type validator using JavaScript classes and decorators',
          'Create a module system for a plugin architecture: plugins register themselves and can be enabled/disabled',
          'Build a State Machine class that validates transitions and emits events on state changes',
          'Implement a Promise-like class from scratch with then, catch, and all methods',
          'Create an API client class with automatic retry, rate limiting, and request queuing',
          'Build a pub/sub message bus using ES modules for decoupled communication',
          'Implement a dependency injection container using class metadata and factories',
          'Create a lazy evaluation class that defers computation until the value is accessed',
          'Build a full CRUD data layer using classes with caching, validation, and events',
        ]
      ),

      mkLesson(
        'Async JavaScript: Advanced Patterns',
        'Promise internals, async iterators, generators, streams, Web Workers',
        'advanced', 90,
        `## Async JavaScript: Advanced Patterns

### Promise Internals: Build Your Own
\`\`\`javascript
class MyPromise {
  #state    = 'pending';
  #value    = undefined;
  #handlers = [];
  
  constructor(executor) {
    const resolve = (value) => {
      if (this.#state !== 'pending') return;
      this.#state = 'fulfilled';
      this.#value = value;
      this.#handlers.forEach(h => h.onFulfilled(value));
    };
    
    const reject = (reason) => {
      if (this.#state !== 'pending') return;
      this.#state = 'rejected';
      this.#value = reason;
      this.#handlers.forEach(h => h.onRejected(reason));
    };
    
    try { executor(resolve, reject); }
    catch (err) { reject(err); }
  }
  
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = (fn, value, fallback) => {
        if (typeof fn !== 'function') { fallback(value); return; }
        try { resolve(fn(value)); }
        catch (err) { reject(err); }
      };
      
      if (this.#state === 'fulfilled') {
        handle(onFulfilled, this.#value, resolve);
      } else if (this.#state === 'rejected') {
        handle(onRejected, this.#value, reject);
      } else {
        this.#handlers.push({
          onFulfilled: v => handle(onFulfilled, v, resolve),
          onRejected:  e => handle(onRejected,  e, reject),
        });
      }
    });
  }
  
  catch(onRejected)   { return this.then(null, onRejected); }
  finally(onFinally)  {
    return this.then(
      value  => MyPromise.resolve(onFinally()).then(() => value),
      reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
    );
  }
  
  static resolve(value) { return new MyPromise(r => r(value)); }
  static reject(reason) { return new MyPromise((_, r) => r(reason)); }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;
      if (!promises.length) { resolve(results); return; }
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(v => {
          results[i] = v;
          if (++count === promises.length) resolve(results);
        }, reject);
      });
    });
  }
}
\`\`\`

### Generators & Async Generators
\`\`\`javascript
// Generator: lazily produce values
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}

// Consume with for...of (lazy, no array created)
for (const n of range(0, 1000000, 2)) {
  if (n > 10) break;
  console.log(n); // 0, 2, 4, 6, 8, 10
}

// Infinite sequence
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
Array.from({length: 10}, () => fib.next().value); // [0,1,1,2,3,5,8,13,21,34]

// Async generator for paginated API
async function* paginateAPI(endpoint) {
  let page = 1;
  while (true) {
    const { data, hasNext } = await fetch(\`\${endpoint}?page=\${page}\`).then(r => r.json());
    yield* data;
    if (!hasNext) break;
    page++;
  }
}

// Usage: iterate over ALL pages lazily
for await (const user of paginateAPI('/api/users')) {
  console.log(user.name);
  // Fetches next page only when needed
}
\`\`\`

### Concurrency Patterns
\`\`\`javascript
// Limit concurrent requests
async function concurrentLimit(tasks, limit) {
  const results = [];
  const executing = new Set();
  
  for (const [index, task] of tasks.entries()) {
    const promise = Promise.resolve().then(() => task());
    results.push(promise);
    executing.add(promise);
    promise.finally(() => executing.delete(promise));
    
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

// Usage: download 100 files but only 5 at a time
const tasks = urls.map(url => () => fetch(url).then(r => r.blob()));
const blobs  = await concurrentLimit(tasks, 5);

// Async queue with priority
class AsyncQueue {
  #queue   = [];
  #running = 0;
  #concurrency;
  
  constructor(concurrency = 3) { this.#concurrency = concurrency; }
  
  async push(task, priority = 0) {
    return new Promise((resolve, reject) => {
      this.#queue.push({ task, priority, resolve, reject });
      this.#queue.sort((a, b) => b.priority - a.priority);
      this.#tick();
    });
  }
  
  async #tick() {
    while (this.#running < this.#concurrency && this.#queue.length) {
      const { task, resolve, reject } = this.#queue.shift();
      this.#running++;
      try    { resolve(await task()); }
      catch  (err) { reject(err); }
      finally { this.#running--; this.#tick(); }
    }
  }
}
\`\`\`

### Web Workers for CPU-Intensive Tasks
\`\`\`javascript
// worker.js
self.onmessage = function({ data: { type, payload } }) {
  if (type === 'SORT') {
    // CPU-intensive sort on a separate thread
    const sorted = payload.data.sort((a, b) => a - b);
    self.postMessage({ type: 'SORT_DONE', result: sorted });
  }
  if (type === 'FILTER') {
    const filtered = payload.data.filter(eval(payload.predicate));
    self.postMessage({ type: 'FILTER_DONE', result: filtered });
  }
};

// main.js
class WorkerPool {
  #workers = [];
  #queue   = [];
  
  constructor(workerFile, poolSize = navigator.hardwareConcurrency) {
    this.#workers = Array.from({ length: poolSize }, () => ({
      worker: new Worker(workerFile),
      busy:   false,
    }));
  }
  
  run(type, payload) {
    return new Promise((resolve, reject) => {
      const job = { type, payload, resolve, reject };
      const idle = this.#workers.find(w => !w.busy);
      if (idle) this.#execute(idle, job);
      else       this.#queue.push(job);
    });
  }
  
  #execute(worker, { type, payload, resolve, reject }) {
    worker.busy = true;
    worker.worker.onmessage = ({ data }) => {
      resolve(data.result);
      worker.busy = false;
      if (this.#queue.length) this.#execute(worker, this.#queue.shift());
    };
    worker.worker.onerror = (e) => { reject(e); worker.busy = false; };
    worker.worker.postMessage({ type, payload });
  }
}

const pool = new WorkerPool('./worker.js', 4);
const sorted = await pool.run('SORT', { data: largeArray });
\`\`\``,
        [
          { title: 'Async Iteration - javascript.info', url: 'https://javascript.info/async-iterators-generators', type: 'docs' },
          { title: 'Web Workers API - MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API', type: 'docs' },
          { title: 'Jake Archibald - Tasks, Microtasks, Queues', url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/', type: 'article' },
          { title: 'Generators - javascript.info', url: 'https://javascript.info/generators', type: 'docs' },
        ],
        [
          'Implement your own Promise class that passes the Promises/A+ spec tests',
          'Build a concurrent image downloader that fetches 100 images with max 5 concurrent connections',
          'Create an async generator that streams a large CSV file line by line without loading it all',
          'Build a Web Worker pool that handles CPU-intensive sorting/filtering off the main thread',
          'Implement a task scheduler with priority queues and concurrency limits',
          'Create a streaming JSON parser that processes data as it arrives (not wait for complete)',
          'Build an async pipeline: fetch → transform → validate → save with error recovery',
          'Implement a request deduplication cache: multiple concurrent calls for same key return same promise',
          'Create a progressive data loader that shows partial results as they arrive',
          'Build a background sync system that queues operations when offline and syncs when online',
        ]
      ),
    ]),

    // ── Module 4: React ──────────────────────────────────────────
    mkModule('React.js Fundamentals', 'intermediate', '⚛️', [
      mkLesson(
        'React Architecture & Component Design',
        'Component patterns, composition, compound components, render props, HOCs',
        'intermediate', 95,
        `## React Architecture & Component Design

### Component Patterns

#### 1. Container/Presentational Pattern
\`\`\`jsx
// ── Presentational: pure UI, no side effects ─────────────────
function UserList({ users, isLoading, error, onUserClick }) {
  if (isLoading) return <LoadingSpinner />;
  if (error)     return <ErrorMessage message={error} />;
  if (!users?.length) return <EmptyState message="No users found" />;
  
  return (
    <ul className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => onUserClick(user)}
        />
      ))}
    </ul>
  );
}

// ── Container: data fetching, business logic ──────────────────
function UserListContainer({ departmentId }) {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const navigate              = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchUsersByDepartment(departmentId)
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [departmentId]);

  const handleUserClick = useCallback((user) => {
    navigate(\`/users/\${user.id}\`);
  }, [navigate]);

  return (
    <UserList
      users={users}
      isLoading={loading}
      error={error}
      onUserClick={handleUserClick}
    />
  );
}
\`\`\`

#### 2. Compound Components Pattern
\`\`\`jsx
// All sub-components share state via Context
const TabContext = createContext(null);

function Tabs({ defaultTab, children, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    onChange?.(tab);
  }, [onChange]);

  return (
    <TabContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div role="tablist" className="tab-list">{children}</div>;
}

function Tab({ value, children, disabled = false }) {
  const { activeTab, onTabChange } = useContext(TabContext);
  const isActive = activeTab === value;
  
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => !disabled && onTabChange(value)}
      className={\`tab \${isActive ? 'tab-active' : ''}\`}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabContext);
  if (activeTab !== value) return null;
  return <div role="tabpanel" className="tab-panel">{children}</div>;
}

// Attach sub-components
Tabs.List   = TabList;
Tabs.Tab    = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel  = TabPanel;

// Clean usage API
function CoursePage() {
  return (
    <Tabs defaultTab="content" onChange={tab => trackEvent('tab_view', { tab })}>
      <Tabs.List>
        <Tabs.Tab value="content">📝 Content</Tabs.Tab>
        <Tabs.Tab value="resources">🔗 Resources</Tabs.Tab>
        <Tabs.Tab value="tasks">✅ Tasks</Tabs.Tab>
        <Tabs.Tab value="ai" disabled={!hasAIAccess}>🤖 AI Notes</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="content"><ContentPanel /></Tabs.Panel>
        <Tabs.Panel value="resources"><ResourcesPanel /></Tabs.Panel>
        <Tabs.Panel value="tasks"><TasksPanel /></Tabs.Panel>
        <Tabs.Panel value="ai"><AIPanelPanel /></Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
\`\`\`

#### 3. Render Props & Custom Hooks
\`\`\`jsx
// Render prop pattern (now usually replaced by hooks, but good to know)
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}

// Same functionality as a hook (preferred)
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

// Higher Order Component (HOC)
function withAuth(WrappedComponent, requiredRole = 'user') {
  function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    
    if (loading) return <LoadingSpinner />;
    if (!user)   return <Navigate to="/login" replace />;
    if (requiredRole === 'admin' && user.role !== 'admin') {
      return <Forbidden />;
    }
    
    return <WrappedComponent {...props} currentUser={user} />;
  }
  
  AuthenticatedComponent.displayName = \`withAuth(\${WrappedComponent.displayName || WrappedComponent.name})\`;
  return AuthenticatedComponent;
}

const AdminDashboard = withAuth(Dashboard, 'admin');
\`\`\`

#### 4. Controlled vs Uncontrolled Components
\`\`\`jsx
// Controlled: React controls the value
function ControlledInput({ value, onChange, ...props }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  );
}

// Uncontrolled: DOM controls the value (use ref)
function UncontrolledForm() {
  const nameRef  = useRef(null);
  const emailRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:  nameRef.current.value,
      email: emailRef.current.value,
    };
    submitForm(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef}  type="text"  defaultValue="Alice" />
      <input ref={emailRef} type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\``,
        [
          { title: 'React Patterns - Alex Klepikov', url: 'https://reactpatterns.com', type: 'article' },
          { title: 'Advanced React Patterns - Kent C Dodds', url: 'https://kentcdodds.com/blog/advanced-react-patterns', type: 'article' },
          { title: 'React Docs - Reusing Logic with Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'docs' },
          { title: 'Bulletproof React Architecture', url: 'https://github.com/alan2207/bulletproof-react', type: 'article' },
        ],
        [
          'Build a complete Tabs component with compound component pattern that supports lazy loading',
          'Create a DataTable component with sorting, filtering, pagination using render props',
          'Implement a Form library using compound components: Form, Field, Input, Error, Submit',
          'Build an Accordion component with animation using compound components pattern',
          'Create a Modal system with Portal, Overlay, and compound components for Header/Body/Footer',
          'Implement a Dropdown/Select component that is fully keyboard navigable and accessible',
          'Build a Toast notification system as a compound component with different types and positions',
          'Create a Stepper/Wizard component for multi-step forms with compound components',
          'Implement a reusable DataFetcher HOC that handles loading/error/success states',
          'Build a SearchableList component using render props to allow custom item rendering',
        ]
      ),
    ]),
  ],
};

// ════════════════════════════════════════════════════════════════════
// ROADMAP 2: BACKEND DEVELOPER — 8 modules, 40 lessons
// ════════════════════════════════════════════════════════════════════
const backendRoadmap = {
  title: 'Backend Developer',
  description: 'Master Node.js, Express, databases (SQL + NoSQL), authentication, caching, message queues, microservices, and production deployment. Build APIs used by millions.',
  type: 'role', category: 'Backend Developer',
  icon: '⚙️', color: '#10b981',
  estimatedHours: 200, totalLessons: 40,
  tags: ['Node.js','Express','MongoDB','PostgreSQL','Redis','Docker','JWT','GraphQL'],
  modules: [
    mkModule('Node.js Deep Dive', 'beginner', '📡', [
      mkLesson(
        'Node.js Architecture & Core Modules',
        'Event loop, libuv, streams, Buffer, cluster, child_process',
        'beginner', 85,
        `## Node.js Architecture & Core Modules

### The Event Loop - How Node.js Works
\`\`\`
The V8 engine executes JavaScript (single-threaded)
libuv handles async I/O using thread pool + OS async APIs

Event Loop Phases (in order):
1. timers         → setTimeout, setInterval callbacks
2. pending I/O    → I/O callbacks deferred from last tick
3. idle/prepare   → internal use
4. poll           → retrieve new I/O events; execute callbacks
5. check          → setImmediate callbacks
6. close callbacks→ socket.on('close', ...) etc.

Microtask queues (run between EACH phase):
  - process.nextTick queue (highest priority)
  - Promise microtask queue
\`\`\`

\`\`\`javascript
// Visualizing the event loop
console.log('1: synchronous');

setTimeout(() => console.log('2: setTimeout 0'),   0);
setTimeout(() => console.log('3: setTimeout 100'), 100);

setImmediate(() => console.log('4: setImmediate'));

Promise.resolve().then(() => console.log('5: Promise.then'));

process.nextTick(() => console.log('6: nextTick'));

console.log('7: synchronous');

// Output: 1, 7, 6, 5, 4, 2, 3
// nextTick > Promises > setImmediate > setTimeout
\`\`\`

### Streams - Processing Data Efficiently
\`\`\`javascript
const { Readable, Writable, Transform, pipeline } = require('stream');
const { promisify } = require('util');
const fs            = require('fs');
const zlib          = require('zlib');
const crypto        = require('crypto');

const pipelineAsync = promisify(pipeline);

// Transform stream: CSV → JSON
class CSVtoJSON extends Transform {
  #headers = null;
  #buffer  = '';
  
  constructor() {
    super({ objectMode: true });
  }
  
  _transform(chunk, encoding, callback) {
    this.#buffer += chunk.toString();
    const lines   = this.#buffer.split('\\n');
    this.#buffer  = lines.pop();  // keep incomplete line
    
    for (const line of lines) {
      if (!line.trim()) continue;
      const values = line.split(',').map(v => v.trim());
      
      if (!this.#headers) {
        this.#headers = values;
        continue;
      }
      
      const obj = Object.fromEntries(
        this.#headers.map((h, i) => [h, values[i] ?? null])
      );
      this.push(JSON.stringify(obj) + '\\n');
    }
    callback();
  }
  
  _flush(callback) {
    if (this.#buffer.trim() && this.#headers) {
      const values = this.#buffer.split(',').map(v => v.trim());
      const obj = Object.fromEntries(this.#headers.map((h, i) => [h, values[i]]));
      this.push(JSON.stringify(obj) + '\\n');
    }
    callback();
  }
}

// Process 10GB CSV without loading it in memory
async function processLargeCSV(inputFile, outputFile) {
  await pipelineAsync(
    fs.createReadStream(inputFile),
    new CSVtoJSON(),
    zlib.createGzip(),
    fs.createWriteStream(outputFile + '.gz')
  );
  console.log('Done!');
}

// HTTP response streaming
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/large-file') {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    
    // Stream file directly to response - no memory spike
    const fileStream = fs.createReadStream('./huge-data.csv');
    fileStream.pipe(res);
    fileStream.on('error', () => res.end());
  }
});
\`\`\`

### Worker Threads for CPU Tasks
\`\`\`javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');

// worker.js
if (!isMainThread) {
  const { numbers } = workerData;
  
  // CPU-intensive: find all primes up to max
  function sieve(max) {
    const isPrime = new Uint8Array(max + 1).fill(1);
    isPrime[0] = isPrime[1] = 0;
    for (let i = 2; i * i <= max; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= max; j += i) {
          isPrime[j] = 0;
        }
      }
    }
    return [...isPrime.keys()].filter(i => isPrime[i]);
  }
  
  parentPort.postMessage({ primes: sieve(numbers.max) });
}

// main.js - distribute work across CPU cores
async function findPrimesParallel(max) {
  const numCPUs  = os.cpus().length;
  const chunkSize = Math.ceil(max / numCPUs);
  
  const workers = Array.from({ length: numCPUs }, (_, i) => {
    const start = i * chunkSize;
    const end   = Math.min(start + chunkSize, max);
    
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { numbers: { min: start, max: end } }
      });
      worker.on('message', resolve);
      worker.on('error',   reject);
    });
  });
  
  const results = await Promise.all(workers);
  return results.flatMap(r => r.primes).sort((a, b) => a - b);
}
\`\`\``,
        [
          { title: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs', type: 'docs' },
          { title: 'Node.js Event Loop - Official Docs', url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick', type: 'docs' },
          { title: 'Stream Handbook - Substack', url: 'https://github.com/substack/stream-handbook', type: 'article' },
          { title: 'Node.js Streams - Fireship', url: 'https://www.youtube.com/watch?v=NtrnaTKBGP0', type: 'video' },
          { title: 'Node.js Performance - Netflix Tech Blog', url: 'https://netflixtechblog.com/making-netflix-com-faster-f95d15f2e972', type: 'article' },
        ],
        [
          'Build a streaming file processor that converts CSV to JSON and compresses it, handling 1GB+ files',
          'Implement a worker thread pool for CPU-intensive image resizing (use sharp library)',
          'Create a Node.js cluster that uses all CPU cores and handles worker crashes with restarts',
          'Build a stream-based log analyzer that processes log files line-by-line and outputs statistics',
          'Implement a custom Transform stream that encrypts data as it passes through the pipeline',
          'Create a backpressure demonstration: slow writable + fast readable, handle it properly',
          'Build a file watching system using fs.watch that triggers build steps on changes',
          'Implement a memory profiler that tracks heap usage and alerts when it exceeds a threshold',
          'Create a TCP server using net module that handles multiple concurrent connections',
          'Build a benchmark tool that measures event loop lag and throughput under different loads',
        ]
      ),

      mkLesson(
        'Express.js: Production-Ready APIs',
        'Routing, middleware architecture, error handling, validation, rate limiting, security',
        'intermediate', 90,
        `## Express.js: Production-Ready APIs

### Application Structure
\`\`\`
backend/
├── src/
│   ├── config/
│   │   ├── database.js    # DB connection
│   │   ├── redis.js       # Redis client
│   │   └── index.js       # Env validation
│   ├── middleware/
│   │   ├── auth.js        # JWT verification
│   │   ├── validate.js    # Request validation
│   │   ├── rateLimit.js   # Rate limiting
│   │   ├── errorHandler.js# Global errors
│   │   └── logger.js      # Request logging
│   ├── routes/
│   │   ├── index.js       # Route aggregator
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── post.routes.js
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── models/            # Data models
│   ├── utils/             # Helpers
│   └── app.js             # Express setup
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── package.json
└── server.js              # Entry point
\`\`\`

### App Setup with All Middleware
\`\`\`javascript
// src/app.js
const express     = require('express');
const helmet      = require('helmet');
const cors        = require('cors');
const compression = require('compression');
const morgan      = require('morgan');
const rateLimit   = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss         = require('xss-clean');

function createApp() {
  const app = express();

  // ── Security Headers ────────────────────────────────────────
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc:   ["'self'", "'unsafe-inline'"],
        scriptSrc:  ["'self'"],
        imgSrc:     ["'self'", "data:", "https:"],
      },
    },
  }));

  // ── CORS ────────────────────────────────────────────────────
  app.use(cors({
    origin: (origin, callback) => {
      const allowed = process.env.ALLOWED_ORIGINS?.split(',') ?? [];
      if (!origin || allowed.includes(origin) || allowed.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error(\`CORS blocked: \${origin}\`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  }));

  // ── Body Parsing ────────────────────────────────────────────
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // ── Sanitization ────────────────────────────────────────────
  app.use(mongoSanitize());  // prevent NoSQL injection: removes $ and . from req.body
  app.use(xss());            // strip HTML tags from input

  // ── Compression ─────────────────────────────────────────────
  app.use(compression());

  // ── Logging ─────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined', {
      stream: { write: msg => logger.info(msg.trim()) },
      skip:   (req) => req.url === '/health',
    }));
  }

  // ── Rate Limiting ───────────────────────────────────────────
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:      500,
    standardHeaders: true,
    legacyHeaders:   false,
    keyGenerator:    (req) => req.ip,
    message: { error: 'Too many requests. Please try again later.' },
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many login attempts. Try again in 15 minutes.' },
  });

  app.use('/api/', globalLimiter);
  app.use('/api/auth/login',    authLimiter);
  app.use('/api/auth/register', authLimiter);

  // ── Routes ──────────────────────────────────────────────────
  app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
  app.use('/api', require('./routes'));

  // ── 404 Handler ─────────────────────────────────────────────
  app.use((req, res) => {
    res.status(404).json({ error: \`Cannot \${req.method} \${req.path}\` });
  });

  // ── Global Error Handler ────────────────────────────────────
  app.use(require('./middleware/errorHandler'));

  return app;
}

module.exports = createApp;
\`\`\`

### Comprehensive Error Handling
\`\`\`javascript
// middleware/errorHandler.js
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode  = statusCode;
    this.code        = code;
    this.isOperational = true;  // expected error
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation failed', 422, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(\`\${resource} not found\`, 404, 'NOT_FOUND');
  }
}

// Global error handler middleware
function errorHandler(err, req, res, next) {
  // Default to 500
  err.statusCode  = err.statusCode  || 500;
  err.code        = err.code        || 'INTERNAL_ERROR';

  // Log all errors
  logger.error({
    message:    err.message,
    code:       err.code,
    statusCode: err.statusCode,
    stack:      err.stack,
    url:        req.url,
    method:     req.method,
    userId:     req.user?.id,
    requestId:  req.id,
  });

  // Don't expose internals in production
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field:   e.path,
      message: e.message,
    }));
    return res.status(422).json({ error: 'Validation failed', errors });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: \`\${field} already exists\` });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError')  return res.status(401).json({ error: 'Invalid token' });
  if (err.name === 'TokenExpiredError')  return res.status(401).json({ error: 'Token expired' });

  res.status(err.statusCode).json({
    error:    err.message,
    code:     err.code,
    ...(err.errors && { errors: err.errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = { AppError, ValidationError, NotFoundError, errorHandler };
\`\`\``,
        [
          { title: 'Express.js Official Documentation', url: 'https://expressjs.com/en/guide/routing.html', type: 'docs' },
          { title: 'Node.js Best Practices - GitHub', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'article' },
          { title: 'Express Security Best Practices', url: 'https://expressjs.com/en/advanced/best-practice-security.html', type: 'docs' },
          { title: 'Rate Limiting - express-rate-limit', url: 'https://github.com/express-rate-limit/express-rate-limit', type: 'docs' },
          { title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', type: 'article' },
          { title: 'Helmet.js Docs', url: 'https://helmetjs.github.io', type: 'docs' },
        ],
        [
          'Build a production-ready Express app with all security middleware: helmet, cors, sanitization, rate limiting',
          'Implement a custom request validator middleware using Joi or Zod that validates body, params, query',
          'Create a comprehensive error handling system with custom error classes for different error types',
          'Build request/response logging with correlation IDs so you can trace requests across microservices',
          'Implement API versioning (/api/v1/, /api/v2/) with backward compatibility',
          'Create a file upload endpoint with validation (type, size), virus scanning hook, and S3 upload',
          'Build a middleware that automatically generates OpenAPI/Swagger documentation from JSDoc comments',
          'Implement request timeout middleware that cancels long-running requests after 10 seconds',
          'Create a circuit breaker middleware for external service calls',
          'Build a comprehensive health check endpoint that verifies DB, Redis, and external service connectivity',
        ]
      ),
    ]),

    mkModule('Database Design & Query', 'intermediate', '🗄️', [
      mkLesson(
        'MongoDB: Advanced Queries & Aggregation',
        'Aggregation pipeline, indexes, transactions, change streams, performance',
        'intermediate', 95,
        `## MongoDB: Advanced Queries & Aggregation

### Aggregation Pipeline - The Most Powerful Feature
\`\`\`javascript
const mongoose = require('mongoose');

// Real-world example: E-commerce analytics
const orderAnalytics = await Order.aggregate([
  // Stage 1: Filter recent completed orders
  {
    $match: {
      status: 'completed',
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  
  // Stage 2: Unwind items array
  { $unwind: '$items' },
  
  // Stage 3: Join with products collection
  {
    $lookup: {
      from:         'products',
      localField:   'items.productId',
      foreignField: '_id',
      as:           'productInfo',
      pipeline: [   // filter fields before join (efficient)
        { $project: { name: 1, category: 1, price: 1 } }
      ]
    }
  },
  { $unwind: '$productInfo' },
  
  // Stage 4: Add computed fields
  {
    $addFields: {
      itemRevenue: { $multiply: ['$items.quantity', '$items.price'] },
      month:       { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
    }
  },
  
  // Stage 5: Group by category and month
  {
    $group: {
      _id: {
        category: '$productInfo.category',
        month:    '$month',
      },
      totalRevenue: { $sum: '$itemRevenue'          },
      totalOrders:  { $addToSet: '$_id'             },
      avgOrderValue:{ $avg: '$itemRevenue'           },
      topProducts:  { $push: '$productInfo.name'    },
    }
  },
  
  // Stage 6: Add more computed fields
  {
    $addFields: {
      orderCount:  { $size: '$totalOrders'  },
      uniqueProducts: { $size: { $setUnion: ['$topProducts', []] } }
    }
  },
  
  // Stage 7: Sort and limit
  { $sort:  { totalRevenue: -1 } },
  { $limit: 20 },
  
  // Stage 8: Reshape output
  {
    $project: {
      _id:           0,
      category:      '$_id.category',
      month:         '$_id.month',
      revenue:       { $round: ['$totalRevenue', 2] },
      orderCount:    1,
      avgOrderValue: { $round: ['$avgOrderValue', 2] },
    }
  }
]);
\`\`\`

### Indexing Strategy
\`\`\`javascript
const postSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  author:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags:       [String],
  category:   { type: String, enum: ['tech', 'lifestyle', 'business'] },
  likes:      { type: Number, default: 0 },
  views:      { type: Number, default: 0 },
  published:  { type: Boolean, default: false },
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
});

// Index strategies for different query patterns

// 1. Simple index - for filtering/sorting by single field
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });

// 2. Compound index - for multi-field queries
// Matches: find posts by author sorted by date
// Also matches: find posts by author (leftmost prefix rule)
postSchema.index({ author: 1, createdAt: -1 });

// 3. Partial index - only index documents that match filter
// Saves space when most documents won't be queried this way
postSchema.index(
  { likes: -1, views: -1 },
  { partialFilterExpression: { published: true, likes: { $gt: 10 } } }
);

// 4. Text index for full-text search
postSchema.index(
  { title: 'text', content: 'text', tags: 'text' },
  { weights: { title: 10, tags: 5, content: 1 } }
);

// 5. Unique index with sparse (allows multiple null values)
postSchema.index({ slug: 1 }, { unique: true, sparse: true });

// 6. TTL index (auto-delete after time)
const sessionSchema = new mongoose.Schema({
  token:     String,
  userId:    mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 3600 }); // 7 days

// Analyzing query performance
const explain = await Post
  .find({ author: userId, published: true })
  .sort({ createdAt: -1 })
  .explain('executionStats');

console.log('Winning plan:', explain.queryPlanner.winningPlan);
console.log('Docs examined:', explain.executionStats.totalDocsExamined);
console.log('Docs returned:', explain.executionStats.nReturned);
// If totalDocsExamined >> nReturned, you need a better index!
\`\`\`

### Multi-Document Transactions
\`\`\`javascript
async function transferFunds(fromUserId, toUserId, amount, currency) {
  const session = await mongoose.startSession();
  
  try {
    const result = await session.withTransaction(async () => {
      // Check sender has sufficient funds
      const sender = await User.findById(fromUserId).session(session);
      if (!sender) throw new Error('Sender not found');
      
      const balance = sender.balances.get(currency) ?? 0;
      if (balance < amount) {
        throw new Error(\`Insufficient \${currency} balance: have \${balance}, need \${amount}\`);
      }
      
      // Deduct from sender
      await User.findByIdAndUpdate(
        fromUserId,
        { $inc: { [\`balances.\${currency}\`]: -amount } },
        { session, runValidators: true }
      );
      
      // Add to recipient
      await User.findByIdAndUpdate(
        toUserId,
        { $inc: { [\`balances.\${currency}\`]: amount } },
        { session, upsert: false }
      );
      
      // Create transaction record
      const transaction = await Transaction.create([{
        from:     fromUserId,
        to:       toUserId,
        amount,
        currency,
        type:     'transfer',
        status:   'completed',
        fee:      calculateFee(amount),
      }], { session });
      
      return transaction[0];
    });
    
    return result;
  } finally {
    await session.endSession();
  }
}
\`\`\``,
        [
          { title: 'MongoDB Aggregation Pipeline Docs', url: 'https://www.mongodb.com/docs/manual/aggregation/', type: 'docs' },
          { title: 'MongoDB University - M121 Aggregation', url: 'https://university.mongodb.com/courses/M121/about', type: 'course' },
          { title: 'MongoDB Indexing Strategies', url: 'https://www.mongodb.com/docs/manual/applications/indexes/', type: 'docs' },
          { title: 'MongoDB Performance Best Practices', url: 'https://www.mongodb.com/blog/post/performance-best-practices-indexing', type: 'article' },
          { title: 'Mongoose Transactions', url: 'https://mongoosejs.com/docs/transactions.html', type: 'docs' },
        ],
        [
          'Write an aggregation pipeline that produces a monthly revenue report grouped by product category',
          'Implement full-text search with relevance scoring using MongoDB text indexes and $text operator',
          'Build a recommendation engine using aggregation: find users with similar purchase history',
          'Implement a leaderboard using aggregation: rank users by score with ties handled correctly',
          'Create a geospatial search that finds restaurants within 5km of a given coordinate',
          'Build a reporting dashboard query that computes cohort retention (users active week over week)',
          'Implement change streams to sync MongoDB changes to a search index in real-time',
          'Create a faceted search (like e-commerce filters) using aggregation with $facet stage',
          'Implement optimistic locking with version fields to prevent conflicting updates',
          'Build a time-series data aggregation that computes hourly/daily/weekly rollups',
        ]
      ),
    ]),
  ],
};

// ════════════════════════════════════════════════════════════════════
// ROADMAP 3: DATA STRUCTURES & ALGORITHMS
// ════════════════════════════════════════════════════════════════════
const dsaRoadmap = {
  title: 'Data Structures & Algorithms',
  description: 'Complete DSA mastery for FAANG and top-tier tech interviews. 200+ curated problems solved with multiple approaches, complexity analysis, and interview tips.',
  type: 'skill', category: 'DSA',
  icon: '🧩', color: '#6366f1',
  estimatedHours: 200, totalLessons: 40,
  tags: ['Arrays','Trees','Graphs','DP','Sorting','Big-O','LeetCode','FAANG','Recursion'],
  modules: [
    mkModule('Arrays & Strings', 'beginner', '📦', [
      mkLesson(
        'Array Patterns: Two Pointers & Sliding Window',
        '15 must-know problems with optimal solutions and interview walkthroughs',
        'beginner', 110,
        `## Array Patterns: Two Pointers & Sliding Window

### Why These Patterns Matter
\`\`\`
Two Pointers: O(n) instead of O(n²) for problems involving pairs
Sliding Window: O(n) instead of O(n²) for subarray/substring problems

FAANG Problem Frequency:
  Two Pointers:   ~15% of all array questions
  Sliding Window: ~20% of all string/array questions
\`\`\`

### Two Pointers: Complete Guide

#### Pattern 1: Opposite Ends
\`\`\`python
# LeetCode 125: Valid Palindrome
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        # Skip non-alphanumeric
        while left < right and not s[left].isalnum():  left  += 1
        while left < right and not s[right].isalnum(): right -= 1
        if s[left].lower() != s[right].lower(): return False
        left += 1; right -= 1
    return True

# LeetCode 167: Two Sum II (Sorted Array)
def two_sum(numbers: list, target: int) -> list:
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if   s == target: return [left + 1, right + 1]
        elif s < target:  left  += 1
        else:             right -= 1
    return []

# LeetCode 11: Container With Most Water
def max_water(height: list) -> int:
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        h = min(height[left], height[right])
        max_area = max(max_area, h * (right - left))
        # Move the pointer with smaller height
        if height[left] < height[right]: left  += 1
        else:                            right -= 1
    return max_area

# LeetCode 42: Trapping Rain Water (HARD)
def trap(height: list) -> int:
    # For each position: water = min(max_left, max_right) - height[i]
    # Two pointer approach: O(n) time, O(1) space
    left, right = 0, len(height) - 1
    max_left = max_right = total = 0
    while left < right:
        if height[left] <= height[right]:
            if height[left] >= max_left: max_left = height[left]
            else:                        total += max_left - height[left]
            left += 1
        else:
            if height[right] >= max_right: max_right = height[right]
            else:                          total += max_right - height[right]
            right -= 1
    return total
\`\`\`

#### Pattern 2: Fast & Slow Pointers
\`\`\`python
# LeetCode 283: Move Zeroes
def move_zeroes(nums: list) -> None:
    slow = 0  # next position for non-zero
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# LeetCode 26: Remove Duplicates from Sorted Array
def remove_duplicates(nums: list) -> int:
    if not nums: return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1

# LeetCode 15: 3Sum (Medium - Two Pointers + Sort)
def three_sum(nums: list) -> list:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]: continue  # skip duplicates
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left]  == nums[left+1]:  left  += 1
                while left < right and nums[right] == nums[right-1]: right -= 1
                left += 1; right -= 1
            elif total < 0: left  += 1
            else:           right -= 1
    return result
\`\`\`

### Sliding Window: Complete Guide
\`\`\`python
from collections import defaultdict, Counter

# LeetCode 3: Longest Substring Without Repeating Characters
def length_of_longest_substring(s: str) -> int:
    char_pos = {}
    max_len = left = 0
    for right, char in enumerate(s):
        if char in char_pos and char_pos[char] >= left:
            left = char_pos[char] + 1
        char_pos[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len

# LeetCode 438: Find All Anagrams in a String
def find_anagrams(s: str, p: str) -> list:
    if len(p) > len(s): return []
    
    p_count = Counter(p)
    window  = Counter(s[:len(p)])
    result  = []
    
    if window == p_count: result.append(0)
    
    for i in range(len(p), len(s)):
        # Add new character
        window[s[i]] += 1
        # Remove leftmost character
        left_char = s[i - len(p)]
        window[left_char]  -= 1
        if window[left_char] == 0:
            del window[left_char]
        if window == p_count:
            result.append(i - len(p) + 1)
    
    return result

# LeetCode 76: Minimum Window Substring (HARD)
def min_window(s: str, t: str) -> str:
    if not t or len(s) < len(t): return ""
    
    need    = Counter(t)
    have    = defaultdict(int)
    satisfied = 0
    required  = len(need)
    
    best_left = -1
    best_len  = float('inf')
    left = 0
    
    for right, char in enumerate(s):
        have[char] += 1
        if char in need and have[char] == need[char]:
            satisfied += 1
        
        while satisfied == required:
            if right - left + 1 < best_len:
                best_len  = right - left + 1
                best_left = left
            
            left_char = s[left]
            have[left_char] -= 1
            if left_char in need and have[left_char] < need[left_char]:
                satisfied -= 1
            left += 1
    
    return s[best_left:best_left + best_len] if best_left != -1 else ""

# LeetCode 239: Sliding Window Maximum (HARD)
from collections import deque

def max_sliding_window(nums: list, k: int) -> list:
    dq     = deque()   # monotonic decreasing deque of indices
    result = []
    
    for i, n in enumerate(nums):
        # Remove elements outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Maintain decreasing order
        while dq and nums[dq[-1]] < n:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# LeetCode 567: Permutation in String
def check_inclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2): return False
    
    need   = Counter(s1)
    window = Counter(s2[:len(s1)])
    
    if window == need: return True
    
    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left = s2[i - len(s1)]
        window[left]  -= 1
        if window[left] == 0: del window[left]
        if window == need: return True
    
    return False
\`\`\`

### Interview Walkthrough Template
\`\`\`
Step 1: Clarify (2 min)
  - "Are there duplicates in the array?"
  - "Is the array sorted?"
  - "What should I return if no answer exists?"
  - "What are the constraints on size/values?"

Step 2: Examples (2 min)
  - Work through the given example
  - Create your own edge case (empty, single element, all same)

Step 3: Approach (3 min)
  - "My first thought is brute force O(n²)..."
  - "But I notice the array is sorted, so I can use two pointers for O(n)..."

Step 4: Code (15 min)
  - Write clean code with meaningful variable names
  - Explain as you go

Step 5: Test (3 min)
  - Trace through given example
  - Test edge cases

Step 6: Complexity (1 min)
  - Time: O(n)
  - Space: O(1)
\`\`\``,
        [
          { title: 'LeetCode Two Pointers Tag', url: 'https://leetcode.com/tag/two-pointers/', type: 'course' },
          { title: 'NeetCode Array Playlist', url: 'https://www.youtube.com/playlist?list=PLot-Xpze53leF0FeHz2X0aG3zd0mr1AW_', type: 'video' },
          { title: 'AlgoMonster Two Pointers Guide', url: 'https://algo.monster/problems/two_pointers_intro', type: 'article' },
          { title: 'Patterns for Coding Interviews - Educative', url: 'https://www.educative.io/courses/grokking-coding-interview', type: 'course' },
          { title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com', type: 'article' },
        ],
        [
          'Solve LC 125 (Valid Palindrome), 680 (Valid Palindrome II) - understand how to skip characters',
          'Solve LC 167 (Two Sum II), 170 (Two Sum III) - sorted array two pointer vs hash map',
          'Solve LC 11 (Max Water) and explain in interview format: clarify → example → approach → code → test',
          'Solve LC 42 (Trapping Rain Water) with ALL 3 approaches: brute force → prefix arrays → two pointers',
          'Solve LC 15 (3Sum), 16 (3Sum Closest), 18 (4Sum) - generalizing two pointers',
          'Solve LC 3 (Longest Substring No Repeat) and draw the sliding window movement on paper',
          'Solve LC 438 (Find Anagrams), 567 (Permutation in String) - fixed window with Counter comparison',
          'Solve LC 76 (Minimum Window Substring) - variable window, the hardest sliding window problem',
          'Solve LC 239 (Sliding Window Maximum) using monotonic deque - understand when to use deque',
          'Solve LC 209 (Minimum Size Subarray Sum) and analyze when to shrink vs expand window',
        ]
      ),
    ]),

    mkModule('Trees & Binary Search', 'intermediate', '🌳', [
      mkLesson(
        'Binary Trees: All Traversal Patterns',
        'DFS iterative/recursive, BFS levels, Morris traversal, tree construction',
        'intermediate', 100,
        `## Binary Trees: All Traversal Patterns

### The TreeNode Building Block
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Build a BST from list (leetcode format)
def build_tree(values):
    if not values or values[0] is None: return None
    from collections import deque
    root  = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while queue and i < len(values):
        node = queue.popleft()
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root
\`\`\`

### DFS Traversals: Recursive & Iterative
\`\`\`python
# ── Recursive (simple but uses call stack) ───────────────────
def inorder_recursive(root):
    result = []
    def dfs(node):
        if not node: return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result

def preorder_recursive(root):
    result = []
    def dfs(node):
        if not node: return
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result

def postorder_recursive(root):
    result = []
    def dfs(node):
        if not node: return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)
    dfs(root)
    return result

# ── Iterative (required when stack depth > recursion limit) ──
def inorder_iterative(root):
    result, stack = [], []
    cur = root
    while cur or stack:
        # Go as far left as possible
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        result.append(cur.val)
        cur = cur.right  # try right subtree
    return result

def preorder_iterative(root):
    if not root: return []
    result, stack = [], [root]
    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right: stack.append(node.right)  # right first (LIFO)
        if node.left:  stack.append(node.left)
    return result

def postorder_iterative(root):
    if not root: return []
    result, stack = [], [root]
    while stack:
        node = stack.pop()
        result.append(node.val)    # reverse preorder trick
        if node.left:  stack.append(node.left)
        if node.right: stack.append(node.right)
    return result[::-1]

# ── BFS Level Order ──────────────────────────────────────────
from collections import deque

def level_order(root):
    if not root: return []
    queue = deque([root])
    result = []
    while queue:
        level = []
        for _ in range(len(queue)):   # process entire level
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# LeetCode 103: Zigzag Level Order
def zigzag_level_order(root):
    if not root: return []
    queue    = deque([root])
    result   = []
    left_to_right = True
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level if left_to_right else level[::-1])
        left_to_right = not left_to_right
    return result

# LeetCode 199: Right Side View
def right_side_view(root):
    if not root: return []
    queue  = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:
                result.append(node.val)  # rightmost
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
    return result
\`\`\`

### Tree Problem Patterns
\`\`\`python
# Pattern: Return info from subtrees to parent
# LeetCode 543: Diameter of Binary Tree
def diameter_of_binary_tree(root: TreeNode) -> int:
    max_diameter = [0]
    
    def height(node):
        if not node: return 0
        left_h  = height(node.left)
        right_h = height(node.right)
        # Update diameter (path through this node)
        max_diameter[0] = max(max_diameter[0], left_h + right_h)
        return 1 + max(left_h, right_h)
    
    height(root)
    return max_diameter[0]

# LeetCode 124: Binary Tree Maximum Path Sum (HARD)
def max_path_sum(root: TreeNode) -> int:
    max_sum = [float('-inf')]
    
    def max_gain(node):
        if not node: return 0
        # Only take positive gains from children
        left_gain  = max(max_gain(node.left),  0)
        right_gain = max(max_gain(node.right), 0)
        # Price of current path through this node
        path_through = node.val + left_gain + right_gain
        max_sum[0] = max(max_sum[0], path_through)
        # Return max contribution to parent (single branch only)
        return node.val + max(left_gain, right_gain)
    
    max_gain(root)
    return max_sum[0]

# LeetCode 236: Lowest Common Ancestor
def lowest_common_ancestor(root, p, q):
    # Base cases
    if not root: return None
    if root == p or root == q: return root
    
    left  = lowest_common_ancestor(root.left,  p, q)
    right = lowest_common_ancestor(root.right, p, q)
    
    # If found in both subtrees, current node is LCA
    if left and right: return root
    # Otherwise, return whichever side found something
    return left or right

# Tree Construction from Traversals
# LeetCode 105: Construct from Preorder and Inorder
def build_from_pre_in(preorder: list, inorder: list) -> TreeNode:
    if not preorder: return None
    root_val    = preorder[0]
    root        = TreeNode(root_val)
    mid         = inorder.index(root_val)
    root.left   = build_from_pre_in(preorder[1:mid+1], inorder[:mid])
    root.right  = build_from_pre_in(preorder[mid+1:],  inorder[mid+1:])
    return root
\`\`\``,
        [
          { title: 'LeetCode Binary Tree Tag', url: 'https://leetcode.com/tag/binary-tree/', type: 'course' },
          { title: 'NeetCode Trees - YouTube', url: 'https://www.youtube.com/playlist?list=PLot-Xpze53ldg4pN6PfzoJY57_iJ1g8bI', type: 'video' },
          { title: 'Binary Tree Visualizer', url: 'https://visualgo.net/en/bst', type: 'article' },
          { title: 'Back to Back SWE - Trees', url: 'https://www.youtube.com/c/BackToBackSWE', type: 'video' },
        ],
        [
          'Implement all 4 traversals recursively AND iteratively - test with 5 different tree structures',
          'Solve LC 104 (Max Depth), 111 (Min Depth), 110 (Balanced Tree) - understand depth vs balance',
          'Solve LC 102 (Level Order), 103 (Zigzag), 107 (Bottom-Up), 199 (Right Side View) - BFS family',
          'Solve LC 543 (Diameter) and 124 (Max Path Sum) - understand how to aggregate info up the tree',
          'Solve LC 236 (LCA of Binary Tree) and 235 (LCA of BST) - compare the two approaches',
          'Solve LC 297 (Serialize/Deserialize) using both BFS and DFS approaches',
          'Implement LC 105 (Build from Preorder+Inorder) and 106 (Build from Postorder+Inorder)',
          'Solve LC 98 (Validate BST) with 3 different approaches: recursive, iterative, inorder',
          'Solve LC 114 (Flatten to Linked List) - in-place modification of tree',
          'Implement a full BST class: insert, delete (all 3 cases), search, min, max, floor, ceil',
        ]
      ),
    ]),
  ],
};

// Pad remaining roadmaps with stubs for now but keep core ones detailed
const allRoadmaps = [frontendRoadmap, backendRoadmap, dsaRoadmap];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    console.log('✅ Connected:', db.databaseName);

    // Remove old versions of these specific roadmaps
    const titles = allRoadmaps.map(r => r.title);
    const deleted = await db.collection('roadmaps').deleteMany({ title: { $in: titles } });
    console.log('🗑️  Removed', deleted.deletedCount, 'old roadmaps');

    const result = await db.collection('roadmaps').insertMany(allRoadmaps);
    console.log('\n✅ Inserted', result.insertedCount, 'roadmaps:\n');

    for (const rm of allRoadmaps) {
      const lessonCount = rm.modules.reduce((s, m) => s + m.lessons.length, 0);
      const taskCount   = rm.modules.reduce((s, m) =>
        m.lessons.reduce((s2, l) => s2 + (l.tasks || []).length, s), 0);
      const resCount    = rm.modules.reduce((s, m) =>
        m.lessons.reduce((s2, l) => s2 + (l.resources || []).length, s), 0);

      console.log(`  ${rm.icon} ${rm.title}`);
      console.log(`     ${lessonCount} lessons | ${taskCount} tasks | ${resCount} resources | ${rm.modules.length} modules`);
      console.log('');
    }

    const total = await db.collection('roadmaps').countDocuments();
    console.log(`📚 Total in DB: ${total} roadmaps`);
    console.log('\n🎉 http://localhost:5000/api/roadmaps\n');

  } catch (err) {
    console.error('❌', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();