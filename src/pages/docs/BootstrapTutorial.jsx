import React from 'react';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';
import NavLi from '../../components/NavLi';

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
        <nav className="pt-12">
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
            <li className="mt-4 mb-2 text-fuchsia-400 font-semibold">Components</li>
            <li><a href="#alerts" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Alerts</a></li>
            <li><a href="#badges" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Badges</a></li>
            <li><a href="#buttons" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Buttons</a></li>
            <li><a href="#cards" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Cards</a></li>
            <li><a href="#carousel" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Carousel</a></li>
            <li><a href="#dropdowns" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Dropdowns</a></li>
            <li><a href="#modal" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Modal</a></li>
            <li><a href="#navs" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Navs & Tabs</a></li>
            <li><a href="#navbar" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Navbar</a></li>
            <li><a href="#pagination" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Pagination</a></li>
            <li><a href="#progress" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Progress</a></li>
            <li><a href="#spinners" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Spinners</a></li>
            <li><a href="#toasts" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Toasts</a></li>
            
            {/* Utilities */}
            <li className="mt-4 mb-2 text-fuchsia-400 font-semibold">Utilities</li>
            <li><a href="#colors" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Colors</a></li>
            <li><a href="#spacing" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Spacing</a></li>
            <li><a href="#borders" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Borders</a></li>
            <li><a href="#display" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">Display</a></li>
          </ul>
        </nav>
      </aside>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-fuchsia-600 pb-6" id="home">
            <h1 className="text-4xl font-bold text-fuchsia-400 mb-2">Bootstrap Framework</h1>
            <p className="text-lg text-fuchsia-200">Build responsive websites with Bootstrap!</p>
          </header>

          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Getting Started with Bootstrap</h2>
            <p className="text-slate-200 mb-4">Bootstrap is a powerful, feature-packed frontend toolkit for building responsive websites. It includes CSS and JavaScript components that make web development faster and easier.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Why Choose Bootstrap?</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Responsive Grid System</span> - Build mobile-friendly layouts</li>
                <li><span className="text-yellow-400">Pre-built Components</span> - Navbars, cards, modals, and more</li>
                <li><span className="text-yellow-400">Extensive Documentation</span> - Well-documented with examples</li>
                <li><span className="text-yellow-400">Active Community</span> - Large ecosystem of plugins and tools</li>
                <li><span className="text-yellow-400">Customizable</span> - Easy to modify with Sass variables</li>
              </ul>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">Installation Methods</h3>
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Multiple Ways to Include:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">CDN</span> - Quickest way to start</li>
                <li><span className="text-yellow-400">npm</span> - For Node.js projects</li>
                <li><span className="text-yellow-400">Download</span> - Host files locally</li>
                <li><span className="text-yellow-400">Package Managers</span> - yarn, composer, etc.</li>
              </ul>
            </div>

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

          <section id="grid" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Bootstrap Grid System</h2>
            <p className="text-slate-200 mb-4">Bootstrap's grid system allows you to create responsive layouts easily.</p>
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
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Bootstrap Components</h2>
            <p className="text-slate-200 mb-4">Bootstrap provides many pre-styled components like buttons, cards, and navbars.</p>
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
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Bootstrap Utilities</h2>
            <p className="text-slate-200 mb-4">Bootstrap's utility classes provide quick, responsive styling options without writing custom CSS.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Common Utility Categories:</h4>
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

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">Responsive Utilities</h3>
            <p className="text-slate-200 mb-4">Use breakpoint prefixes to apply utilities at specific screen sizes:</p>
            <ul className="list-disc pl-6 text-slate-200 mb-4">
              <li><code className="text-yellow-400">sm</code> - ≥576px</li>
              <li><code className="text-yellow-400">md</code> - ≥768px</li>
              <li><code className="text-yellow-400">lg</code> - ≥992px</li>
              <li><code className="text-yellow-400">xl</code> - ≥1200px</li>
              <li><code className="text-yellow-400">xxl</code> - ≥1400px</li>
            </ul>

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

          <section id="forms" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Bootstrap Forms</h2>
            <p className="text-slate-200 mb-4">Bootstrap provides extensive styling and validation for forms, making them both attractive and functional.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Form Components & Features:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Input Types</span> - Text, email, password, number</li>
                <li><span className="text-yellow-400">Select Menus</span> - Single and multiple select</li>
                <li><span className="text-yellow-400">Checkboxes & Radios</span> - Custom styled options</li>
                <li><span className="text-yellow-400">Input Groups</span> - Combined inputs with add-ons</li>
                <li><span className="text-yellow-400">Validation</span> - Built-in form validation styles</li>
                <li><span className="text-yellow-400">Floating Labels</span> - Modern form labels</li>
              </ul>
            </div>

            <h3 className="text-xl text-fuchsia-300 mt-6 mb-2">Form Layout & Validation</h3>
            <p className="text-slate-200 mb-4">Bootstrap offers various form layouts and built-in validation states:</p>
            <ul className="list-disc pl-6 text-slate-200 mb-4">
              <li>Horizontal and vertical layouts</li>
              <li>Grid-based form layouts</li>
              <li>Inline forms for compact spaces</li>
              <li>Client-side validation feedback</li>
              <li>Custom validation messages</li>
            </ul>

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
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Containers</h2>
            <p className="text-slate-200 mb-4">Containers are the most basic layout element in Bootstrap and are required when using the default grid system.</p>
            
            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Container Types:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">.container</span> - Fixed-width container</li>
                <li><span className="text-yellow-400">.container-fluid</span> - Full-width container</li>
                <li><span className="text-yellow-400">.container-{'{sm|md|lg|xl|xxl}'}</span> - Responsive containers</li>
              </ul>
            </div>

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
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Typography</h2>
            <p className="text-slate-200 mb-4">Bootstrap includes a wide range of typography utilities to style your text content.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Typography Features:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Headings</span> - h1 through h6</li>
                <li><span className="text-yellow-400">Display headings</span> - Larger, more impactful headings</li>
                <li><span className="text-yellow-400">Text utilities</span> - Alignment, weight, style</li>
                <li><span className="text-yellow-400">Lists</span> - Unordered, ordered, and description lists</li>
              </ul>
            </div>

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
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Buttons</h2>
            <p className="text-slate-200 mb-4">Bootstrap's custom button styles provide essential controls for forms, dialogs, and more.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-fuchsia-300 mb-2">Button Features:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Styles</span> - Various predefined button styles</li>
                <li><span className="text-yellow-400">Sizes</span> - Different button sizes</li>
                <li><span className="text-yellow-400">States</span> - Active, disabled states</li>
                <li><span className="text-yellow-400">Button groups</span> - Group related buttons</li>
              </ul>
            </div>

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

          <section id="exercises" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">Practice Exercises</h2>
            <p className="text-slate-200 mb-4">Put your Bootstrap knowledge to the test with these practical exercises!</p>

            <div className="space-y-8">
              {/* Exercise 1: Navigation Bar */}
              <div>
                <h3 className="text-xl text-fuchsia-300 mb-2">Exercise 1: Create a Navigation Bar</h3>
                <p className="text-slate-200 mb-4">Create a responsive navigation bar with a brand, links, and a dropdown menu.</p>
                <LiveHtmlEditor 
                  initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <!-- Add your navbar here! -->
  <!-- Tips: Use navbar, navbar-expand-lg, navbar-light classes -->
  <!-- Include: Brand logo/text, nav links, and a dropdown -->

  <!-- Example structure (replace with your code):
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Your Brand</a>
      ...
    </div>
  </nav>
  -->
</body>
</html>`} />
              </div>

              {/* Exercise 2: Card Layout */}
              <div>
                <h3 className="text-xl text-fuchsia-300 mb-2">Exercise 2: Build a Card Grid</h3>
                <p className="text-slate-200 mb-4">Create a responsive grid of cards (3 columns on desktop, 2 on tablet, 1 on mobile).</p>
                <LiveHtmlEditor 
                  initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <!-- Add your card grid here! -->
    <!-- Tips: Use row and col-* classes -->
    <!-- Each card should have an image, title, text, and button -->

    <!-- Example structure (replace with your code):
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card">
          ...
        </div>
      </div>
    </div>
    -->
  </div>
</body>
</html>`} />
              </div>

              {/* Exercise 3: Form Layout */}
              <div>
                <h3 className="text-xl text-fuchsia-300 mb-2">Exercise 3: Create a Contact Form</h3>
                <p className="text-slate-200 mb-4">Build a contact form with various input types and validation.</p>
                <LiveHtmlEditor 
                  initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <!-- Add your contact form here! -->
    <!-- Include: Name, Email, Subject, Message -->
    <!-- Use form validation classes -->
    <!-- Add a submit button -->

    <!-- Example structure (replace with your code):
    <form class="needs-validation" novalidate>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" required>
      </div>
      ...
    </form>
    -->
  </div>
</body>
</html>`} />
              </div>

              {/* Exercise 4: Hero Section */}
              <div>
                <h3 className="text-xl text-fuchsia-300 mb-2">Exercise 4: Design a Hero Section</h3>
                <p className="text-slate-200 mb-4">Create a responsive hero section with a background image, text overlay, and call-to-action buttons.</p>
                <LiveHtmlEditor 
                  initialCode={`<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    /* Add your custom styles here */
    .hero {
      min-height: 400px;
      background-size: cover;
      background-position: center;
    }
  </style>
</head>
<body>
  <!-- Add your hero section here! -->
  <!-- Include: Background image, heading, subtext, and buttons -->
  <!-- Use Bootstrap's utilities for spacing and text alignment -->

  <!-- Example structure (replace with your code):
  <div class="hero d-flex align-items-center">
    <div class="container text-center">
      <h1>Welcome</h1>
      ...
    </div>
  </div>
  -->
</body>
</html>`} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}