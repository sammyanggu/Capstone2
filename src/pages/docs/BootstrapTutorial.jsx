import React from 'react';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';

export default function BootstrapTutorial() {
  const [isAsideCollapsed, setIsAsideCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex pt-28">
      {/* Open button (visible when aside is closed) */}
      {isAsideCollapsed && (
        <button
          onClick={() => setIsAsideCollapsed(false)}
          className="fixed left-0 top-[4.5rem] z-30 p-2 rounded-r bg-slate-900 text-emerald-700 hover:text-emerald-500 transition-all duration-200 border-y border-r border-slate-800"
          aria-label="Open menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed w-64 left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-20 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ${
          isAsideCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Close button inside aside */}
        {!isAsideCollapsed && (
          <button
            onClick={() => setIsAsideCollapsed(true)}
            className="absolute right-2 top-3 z-30 p-1.5 rounded bg-slate-900 text-emerald-700 hover:text-emerald-500 transition-colors"
            aria-label="Close menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <nav className="pt-12 font-semibold">
          <ul className="flex flex-col gap-2 text-slate-200 text-base">
            <li><a href="#home" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Bootstrap Home</a></li>
            <li><a href="#intro" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Getting Started</a></li>
            
            {/* Layout */}
            <li className="mt-4 mb-2 text-emerald-400 font-semibold">Layout</li>
            <li><a href="#containers" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Containers</a></li>
            <li><a href="#grid" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Grid System</a></li>
            <li><a href="#flex" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Flex</a></li>
            
            {/* Content */}
            <li className="mt-4 mb-2 text-emerald-400 font-semibold">Content</li>
            <li><a href="#typography" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Typography</a></li>
            <li><a href="#images" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Images</a></li>
            <li><a href="#tables" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Tables</a></li>

            {/* Forms */}
            <li className="mt-4 mb-2 text-emerald-400 font-semibold">Forms</li>
            <li><a href="#forms-overview" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Form Overview</a></li>
            <li><a href="#input-groups" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Input Groups</a></li>
            <li><a href="#floating-labels" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Floating Labels</a></li>
            <li><a href="#validation" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-400 transition">Form Validation</a></li>
            
            {/* Components */}
            <li className="mt-4 mb-2 text-emerald-700 font-semibold">Components</li>
            <li><a href="#alerts" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Alerts</a></li>
            <li><a href="#badges" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Badges</a></li>
            <li><a href="#buttons" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Buttons</a></li>
            <li><a href="#cards" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700transition">Cards</a></li>
            <li><a href="#carousel" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Carousel</a></li>
            <li><a href="#dropdowns" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Dropdowns</a></li>
            <li><a href="#modal" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Modal</a></li>
            <li><a href="#navs" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Navs & Tabs</a></li>
            <li><a href="#navbar" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Navbar</a></li>
            <li><a href="#pagination" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Pagination</a></li>
            <li><a href="#progress" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Progress</a></li>
            <li><a href="#spinners" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Spinners</a></li>
            <li><a href="#toasts" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Toasts</a></li>
            
            {/* Utilities */}
            <li className="mt-4 mb-2 text-emerald-700 font-semibold">Utilities</li>
            <li><a href="#colors" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Colors</a></li>
            <li><a href="#spacing" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Spacing</a></li>
            <li><a href="#borders" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Borders</a></li>
            <li><a href="#display" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Display</a></li>
          </ul>
        </nav>
      </aside>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-emerald-700 pb-6" id="home">
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">Bootstrap Framework</h1>
            <p className="text-lg text-emerald-400 font-bold">Build responsive websites with Bootstrap!</p>
          </header>

          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Getting Started with Bootstrap</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Bootstrap is a powerful, feature-packed frontend toolkit for building responsive websites. It includes CSS and JavaScript components that make web development faster and easier.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Why Choose Bootstrap?</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Responsive Grid System</span> - Build mobile-friendly layouts</li>
                <li><span className="text-yellow-400">Pre-built Components</span> - Navbars, cards, modals, and more</li>
                <li><span className="text-yellow-400">Extensive Documentation</span> - Well-documented with examples</li>
                <li><span className="text-yellow-400">Active Community</span> - Large ecosystem of plugins and tools</li>
                <li><span className="text-yellow-400">Customizable</span> - Easy to modify with Sass variables</li>
              </ul>
            </div>

            <h3 className="text-xl text-emerald-700 mt-6 mb-2">Installation Methods</h3>
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Multiple Ways to Include:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">CDN</span> - Quickest way to start</li>
                <li><span className="text-yellow-400">npm</span> - For Node.js projects</li>
                <li><span className="text-yellow-400">Download</span> - Host files locally</li>
                <li><span className="text-yellow-400">Package Managers</span> - yarn, composer, etc.</li>
              </ul>
            </div>

            <p className="text-emerald-700 mb-4 font-semibold">This quick example shows how to include Bootstrap via a CDN and use a basic container. For beginners: include the CSS in the <code>&lt;head&gt;</code> and the JS bundle before the closing <code>&lt;/body&gt;</code>. The CSS gives you the utility classes and component styles; the JS bundle enables interactive components like modals and dropdowns.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Hello, Bootstrap!</h1>
    <p>This is a basic Bootstrap page.</p>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`} />
          </section>

          <section id="cards" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Cards</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Cards are flexible content containers. They commonly contain an image, title, text and actions. Use them for modular content like blog previews, product tiles, or profile cards. Keep card markup semantic and ensure images have alt text for accessibility.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="card" style="width: 18rem;">
      <img src="https://via.placeholder.com/286x150" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="grid" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Bootstrap Grid System</h2>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap's grid system allows you to create responsive layouts easily.</p>
            <p className="text-emerald-700 font-semibold mb-4">The grid uses rows and columns to place content. Start with a <code>.container</code> or <code>.container-fluid</code>, add a <code>.row</code>, then add column classes like <code>.col-sm-4</code>. Columns are responsive: they stack on smaller screens and sit side-by-side on larger ones. Use the grid to control layout at each breakpoint.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .demo-col { background: #6366f1; color: white; padding: 10px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-sm-4"><div class="demo-col">Column 1</div></div>
      <div class="col-sm-4"><div class="demo-col">Column 2</div></div>
      <div class="col-sm-4"><div class="demo-col">Column 3</div></div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="components" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Bootstrap Components</h2>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap provides many pre-styled components like buttons, cards, and navbars.</p>
            <p className="text-emerald-700 font-semibold mb-4">Components are pre-built UI blocks following Bootstrap conventions. They use utility classes and optional JavaScript for interaction. Read each component's docs to learn required structure and ARIA attributes for accessibility (e.g., <code>role</code>, <code>aria-*</code>).</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <!-- Button Component -->
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-success">Success Button</button>
    
    <!-- Card Component -->
    <div class="card mt-4" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Some quick example text for the card.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    
    <!-- Alert Component -->
    <div class="alert alert-info mt-4">
      This is an info alert!
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`} />
          </section>

          <section id="utilities" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Bootstrap Utilities</h2>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap's utility classes provide quick, responsive styling options without writing custom CSS.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Common Utility Categories:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Spacing</span> - m-* (margin), p-* (padding)</li>
                <li><span className="text-yellow-400">Colors</span> - text-*, bg-*, border-*</li>
                <li><span className="text-yellow-400">Flexbox</span> - d-flex, justify-content-*, align-items-*</li>
                <li><span className="text-yellow-400">Text</span> - text-center, text-uppercase, fw-bold</li>
                <li><span className="text-yellow-400">Borders</span> - border, rounded-*</li>
                <li><span className="text-yellow-400">Display</span> - d-none, d-block, d-sm-none</li>
                <li><span className="text-yellow-400">Position</span> - position-relative, fixed-top</li>
                <li><span className="text-yellow-400">Sizing</span> - w-100, h-100, mw-*</li>
              </ul>
            </div>

            <h3 className="text-xl text-emerald-700 mt-6 mb-2 font-bold">Responsive Utilities</h3>
            <p className="text-emerald-700 font-semibold mb-4">Use breakpoint prefixes to apply utilities at specific screen sizes:</p>
            <ul className="list-disc pl-6 text-emerald-700 mb-4">
              <li><code className="text-yellow-400">sm</code> - ≥576px</li>
              <li><code className="text-yellow-400">md</code> - ≥768px</li>
              <li><code className="text-yellow-400">lg</code> - ≥992px</li>
              <li><code className="text-yellow-400">xl</code> - ≥1200px</li>
              <li><code className="text-yellow-400">xxl</code> - ≥1400px</li>
            </ul>

            <p className="text-emerald-700 mb-4 font-semibold">Utilities let you tweak spacing, colors, display, and more directly in your HTML. They speed up development and reduce custom CSS. Prefer utilities for small layout changes and use custom styles for larger, reusable patterns.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <!-- Spacing Utilities -->
    <div class="p-3 mb-4 bg-primary text-white">Padding 3, Margin Bottom 4</div>
    
    <!-- Text Utilities -->
    <p class="text-primary">Primary text</p>
    <p class="text-center">Centered text</p>
    
    <!-- Background Utilities -->
    <div class="p-2 bg-success text-white">Success background</div>
    <div class="p-2 bg-warning text-dark">Warning background</div>
    
    <!-- Border Utilities -->
    <div class="p-2 border border-danger mt-2">Danger border</div>
    <div class="p-2 rounded-3 border mt-2">Rounded border</div>
  </div>
</body>
</html>`} />
          </section>

          <section id="forms-overview" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Bootstrap Forms</h2>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap provides extensive styling and validation for forms, making them both attractive and functional.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Form Components & Features:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Input Types</span> - Text, email, password, number</li>
                <li><span className="text-yellow-400">Select Menus</span> - Single and multiple select</li>
                <li><span className="text-yellow-400">Checkboxes & Radios</span> - Custom styled options</li>
                <li><span className="text-yellow-400">Input Groups</span> - Combined inputs with add-ons</li>
                <li><span className="text-yellow-400">Validation</span> - Built-in form validation styles</li>
                <li><span className="text-yellow-400">Floating Labels</span> - Modern form labels</li>
              </ul>
            </div>

            <h3 className="text-xl text-emerald-700 font-bold mt-6 mb-2">Form Layout & Validation</h3>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap offers various form layouts and built-in validation states:</p>
            <ul className="list-disc pl-6 text-emerald-700 font-semibold mb-4">
              <li>Horizontal and vertical layouts</li>
              <li>Grid-based form layouts</li>
              <li>Inline forms for compact spaces</li>
              <li>Client-side validation feedback</li>
              <li>Custom validation messages</li>
            </ul>

            <p className="text-emerald-700 mb-4">Bootstrap form controls standardize sizes and spacing, and provide classes for labels, help text, and validation states. Use <code>.form-control</code> for inputs, <code>.form-select</code> for selects, and <code>.form-check</code> for radios/checkboxes. Combine with grid classes to build responsive form layouts.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
      </div>
      
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password">
      </div>
      
      <div class="mb-3">
        <label for="select" class="form-label">Example select</label>
        <select class="form-select" id="select">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      
      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="check">
          <label class="form-check-label" for="check">
            Check me out
          </label>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</body>
</html>`} />
          </section>

          <section id="containers" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700   mb-2">Containers</h2>
            <p className="text-emerald-700 font-semibold mb-4">Containers are the most basic layout element in Bootstrap and are required when using the default grid system.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Container Types:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">.container</span> - Fixed-width container</li>
                <li><span className="text-yellow-400">.container-fluid</span> - Full-width container</li>
                <li><span className="text-yellow-400">.container-{'{sm|md|lg|xl|xxl}'}</span> - Responsive containers</li>
              </ul>
            </div>

            <p className="text-emerald-700 mb-4">Containers center and pad your site's content. Use the fixed <code>.container</code> when you want max-width breakpoints, <code>.container-fluid</code> for full-width layouts, and the responsive containers when you need controlled widths at certain breakpoints.</p>
            <LiveHtmlEditor 
              initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .demo-container { border: 2px dashed #ccc; margin-bottom: 1rem; padding: 1rem; }
  </style>
</head>
<body class="p-3">
  <!-- Fixed-width container -->
  <div class="container demo-container">
    <h5>Standard Container</h5>
    <small class="text-muted">Fixed width that changes at breakpoints</small>
  </div>

  <!-- Fluid container -->
  <div class="container-fluid demo-container">
    <h5>Fluid Container</h5>
    <small class="text-muted">Always 100% width</small>
  </div>

  <!-- Responsive containers -->
  <div class="container-sm demo-container">
    <h5>Container Small (sm)</h5>
    <small class="text-muted">100% wide until 576px</small>
  </div>

  <div class="container-md demo-container">
    <h5>Container Medium (md)</h5>
    <small class="text-muted">100% wide until 768px</small>
  </div>
</body>
</html>`} />

          </section>

          <section id="typography" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Typography</h2>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap includes a wide range of typography utilities to style your text content.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Typography Features:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Headings</span> - h1 through h6</li>
                <li><span className="text-yellow-400">Display headings</span> - Larger, more impactful headings</li>
                <li><span className="text-yellow-400">Text utilities</span> - Alignment, weight, style</li>
                <li><span className="text-yellow-400">Lists</span> - Unordered, ordered, and description lists</li>
              </ul>
            </div>

            <p className="text-emerald-700 mb-4 font-semibold">Bootstrap provides readable defaults for headings, paragraphs, and lists. Use display headings for large titles, <code>.lead</code> for important paragraphs, and text utilities for alignment and emphasis. Semantic HTML remains important for accessibility and SEO—use heading levels correctly.</p>
            <LiveHtmlEditor 
              initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <!-- Headings -->
    <h1>h1. Bootstrap heading</h1>
    <h2>h2. Bootstrap heading</h2>
    <h3>h3. Bootstrap heading</h3>

    <!-- Display headings -->
    <h1 class="display-1">Display 1</h1>
    <h1 class="display-4">Display 4</h1>

    <!-- Text utilities -->
    <p class="lead">This is a lead paragraph.</p>
    <p class="text-start">Left aligned text.</p>
    <p class="text-center">Center aligned text.</p>
    <p class="text-end">Right aligned text.</p>

    <!-- Text decorations -->
    <p class="text-decoration-underline">Underlined text</p>
    <p class="text-decoration-line-through">Strikethrough text</p>

    <!-- Lists -->
    <ul class="list-unstyled">
      <li>Unstyled list item 1</li>
      <li>Unstyled list item 2</li>
    </ul>

    <ul class="list-inline">
      <li class="list-inline-item">Inline list item 1</li>
      <li class="list-inline-item">Inline list item 2</li>
    </ul>
  </div>
</body>
</html>`} />
          </section>

          <section id="buttons" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Buttons</h2>
            <p className="text-emerald-700 font-semibold mb-4">Bootstrap's custom button styles provide essential controls for forms, dialogs, and more.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Button Features:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Styles</span> - Various predefined button styles</li>
                <li><span className="text-yellow-400">Sizes</span> - Different button sizes</li>
                <li><span className="text-yellow-400">States</span> - Active, disabled states</li>
                <li><span className="text-yellow-400">Button groups</span> - Group related buttons</li>
              </ul>
            </div>

            <p className="text-emerald-700 mb-4 font-semibold">Buttons come in contextual styles (primary, secondary, success, etc.), and sizes (btn-lg, btn-sm). Use <code>disabled</code> for inactive states and ARIA attributes where necessary. Button groups let you group related actions; consider accessibility for keyboard users.</p>
            <LiveHtmlEditor 
              initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container p-4">
    <!-- Button styles -->
    <div class="row mb-4">
      <div class="col-12">
        <h6 class="mb-3">Standard Buttons</h6>
        <button class="btn btn-primary me-2 mb-2">Primary</button>
        <button class="btn btn-secondary me-2 mb-2">Secondary</button>
        <button class="btn btn-success me-2 mb-2">Success</button>
        <button class="btn btn-danger me-2 mb-2">Danger</button>
        <button class="btn btn-warning me-2 mb-2">Warning</button>
        <button class="btn btn-info me-2 mb-2">Info</button>
      </div>
    </div>

    <!-- Outline buttons -->
    <div class="row mb-4">
      <div class="col-12">
        <h6 class="mb-3">Outline Buttons</h6>
        <button class="btn btn-outline-primary me-2 mb-2">Primary</button>
        <button class="btn btn-outline-secondary me-2 mb-2">Secondary</button>
        <button class="btn btn-outline-success me-2 mb-2">Success</button>
      </div>
    </div>

    <!-- Button sizes -->
    <div class="row mb-4">
      <div class="col-12">
        <h6 class="mb-3">Button Sizes</h6>
        <button class="btn btn-primary btn-lg me-2 mb-2">Large</button>
        <button class="btn btn-primary me-2 mb-2">Default</button>
        <button class="btn btn-primary btn-sm me-2 mb-2">Small</button>
      </div>
    </div>

    <!-- Button states -->
    <div class="row mb-4">
      <div class="col-12">
        <h6 class="mb-3">Button States</h6>
        <button class="btn btn-success me-2">Normal</button>
        <button class="btn btn-success active me-2">Active</button>
        <button class="btn btn-success" disabled>Disabled</button>
      </div>
    </div>

    <!-- Button groups -->
    <div class="row">
      <div class="col-12">
        <h6 class="mb-3">Button Groups</h6>
        <div class="btn-group">
          <button class="btn btn-primary">Left</button>
          <button class="btn btn-primary">Middle</button>
          <button class="btn btn-primary">Right</button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          {/* Added individual component & utility sections to match aside navigation */}
          <section id="cards" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Cards</h2>
            <p className="text-emerald-700 mb-4">Flexible content containers with multiple variants.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="card" style="width: 18rem;">
      <img src="https://via.placeholder.com/286x150" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="alerts" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Alerts</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Alerts show important messages to the user—success, warning, info, or danger. Use dismissible alerts for messages that the user can close. Keep messages concise and avoid showing too many alerts at once to prevent overwhelming users.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container mt-4">
    <div class="alert alert-success" role="alert">This is a success alert—check it out!</div>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      This is a warning alert with a close button.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="badges" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Badges</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Badges display small counts or labels. Use badges inside buttons, nav items, or headings to show notifications or status. For accessibility, avoid using badges as the only way to convey critical information—also include readable text where appropriate.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <h4>Notifications <span class="badge bg-danger">4</span></h4>
    <button class="btn btn-primary mt-2">Inbox <span class="badge bg-light text-dark">7</span></button>
  </div>
</body>
</html>`} />
          </section>

          <section id="carousel" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Carousel</h2>
            <p className="text-emerald-700 mb-4 font-semibold">A slideshow component for cycling through elements—images or slides of text.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container mt-4">
    <div id="demoCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://via.placeholder.com/800x200?text=Slide+1" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://via.placeholder.com/800x200?text=Slide+2" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#demoCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#demoCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="dropdowns" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Dropdowns</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Toggleable menus for displaying lists of links or actions.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container mt-4">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown</button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
      </ul>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="modal" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Modal</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Popup dialog for lightboxes, user notifications, or custom content.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container mt-4">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Open Modal</button>

    <div class="modal fade" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">Modal body content</div>
          <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="navs" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Navs & Tabs</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Navigation components for switching between content sections.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container mt-4">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#home">Home</button></li>
      <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile">Profile</button></li>
    </ul>
    <div class="tab-content p-3 border">
      <div class="tab-pane fade show active" id="home">Home content</div>
      <div class="tab-pane fade" id="profile">Profile content</div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="navbar" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Navbar</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Responsive navigation header, built with flexbox.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Brand</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
        </ul>
      </div>
    </div>
  </nav>
</body>
</html>`} />
          </section>

          <section id="pagination" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Pagination</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Components for navigating between paged content.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</body>
</html>`} />
          </section>

          <section id="progress" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Progress</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Progress bars to visualize the completion percentage of a task.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 60%">60%</div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="spinners" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Spinners</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Loading indicators with different sizes and colors.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-success ms-2" role="status"><span class="visually-hidden">Loading...</span></div>
  </div>
</body>
</html>`} />
          </section>

          <section id="toasts" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Toasts</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Lightweight notifications designed to mimic push notifications.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container mt-4">
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small>Just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">Hello, world! This is a toast message.</div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="flex" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Flex</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Bootstrap's flex utilities make building flexible layouts easy.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="d-flex justify-content-between bg-light p-3">
      <div class="p-2">Flex item 1</div>
      <div class="p-2">Flex item 2</div>
      <div class="p-2">Flex item 3</div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="images" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Images</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Image utilities for responsiveness and rounded styles.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <img src="https://via.placeholder.com/300" class="img-fluid rounded" alt="Responsive">
  </div>
</body>
</html>`} />
          </section>

          <section id="tables" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Tables</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Styled tables with optional hover, striped, and responsive variants.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <table class="table table-striped">
      <thead><tr><th>#</th><th>Name</th><th>Role</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Jane</td><td>Developer</td></tr>
        <tr><td>2</td><td>John</td><td>Designer</td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>`} />
          </section>

          <section id="input-groups" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Input Groups</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Combine inputs and add-ons for enhanced form controls.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="input-group">
      <span class="input-group-text">@</span>
      <input type="text" class="form-control" placeholder="Username">
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="floating-labels" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Floating Labels</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Modern input labels that float above the input when focused.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="validation" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Form Validation</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Built-in validation styles and feedback to show form state to users.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <form class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="validatedInput" class="form-label">Required field</label>
        <input type="text" class="form-control is-invalid" id="validatedInput" required>
        <div class="invalid-feedback">Please provide a value.</div>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</body>
</html>`} />
          </section>

          <section id="colors" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Colors</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Text and background color utility classes.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <p class="text-primary">Primary colored text</p>
    <div class="p-2 bg-secondary text-white">Secondary background</div>
  </div>
</body>
</html>`} />
          </section>

          <section id="spacing" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Spacing</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Margin and padding helpers for quick layout adjustments.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="p-4 mb-3 bg-light">Padding 4</div>
    <div class="m-3 bg-light">Margin 3</div>
  </div>
</body>
</html>`} />
          </section>

          <section id="borders" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Borders</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Border utilities and rounded corners for quick styling.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="p-3 border">Basic border</div>
    <div class="p-3 border rounded mt-2">Rounded border</div>
  </div>
</body>
</html>`} />
          </section>

          <section id="display" className="mb-10">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Display</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Utility classes to control display property responsively.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-4">
    <div class="d-none d-md-block p-3 bg-light">Hidden on small, visible on md+</div>
    <div class="d-block d-md-none p-3 bg-secondary text-white">Visible on small only</div>
  </div>
</body>
</html>`} />
          </section>
        </div>
      </div>
    </div>
  );
}