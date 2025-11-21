import React from 'react';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';
import NavLi from '../../components/NavLi';

export default function TailwindTutorial() {
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
            <li><a href="#home" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Tailwind Home</a></li>
            <li><a href="#intro" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Getting Started</a></li>
            <li><a href="#utility" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Utility Classes</a></li>
            <li><a href="#responsive" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Responsive Design</a></li>
            <li><a href="#components" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Components</a></li>
            <li><a href="#customization" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Customization</a></li>
            <li><a href="#layouts" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-emerald-700 transition">Common Layouts</a></li>
          </ul>
        </nav>
      </aside>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-emerald-700 pb-6" id="home">
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">Tailwind CSS</h1>
            <p className="text-lg text-emerald-700 font-semibold">Master utility-first CSS with Tailwind!</p>
          </header>

          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Getting Started with Tailwind</h2>
            <p className="text-emerald-700 mb-4 font-semibold">Tailwind CSS is a highly customizable, utility-first CSS framework that helps you build modern websites without ever leaving your HTML. Unlike traditional frameworks, Tailwind is highly flexible and gives you complete control over your design.</p>

            <div className="bg-slate-700 p-4 rounded-lg font-semibold mb-6">
              <h4 className="text-slate-200 mb-2">Why Choose Tailwind CSS?</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Utility-First</span> - Write styles directly in your HTML</li>
                <li><span className="text-yellow-400">Highly Customizable</span> - Configure colors, spacing, etc.</li>
                <li><span className="text-yellow-400">No Pre-built Components</span> - Complete design freedom</li>
                <li><span className="text-yellow-400">Small Bundle Size</span> - Only includes what you use</li>
                <li><span className="text-yellow-400">Modern Development</span> - Perfect for component-based frameworks</li>
              </ul>
            </div>

            <h3 className="text-xl text-emerald-700 font-semibold mt-6 mb-2">Installation Methods</h3>
            <div className="bg-slate-700 p-4 font-semibold rounded-lg mb-6">
              <h4 className="text-slate-200 mb-2">Multiple Setup Options:</h4>
              <ul className="list-disc pl-6 font-semibold text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Play CDN</span> - Great for learning and demos</li>
                <li><span className="text-yellow-400">npm/yarn</span> - Recommended for most projects</li>
                <li><span className="text-yellow-400">PostCSS Plugin</span> - Full build process control</li>
                <li><span className="text-yellow-400">Framework-specific</span> - Next.js, Vue, etc. guides</li>
              </ul>
            </div>

            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-blue-600">Hello, Tailwind!</h1>
    <p class="mt-4 text-slate-200">Welcome to utility-first CSS</p>
  </div>
</body>
</html>`} />
          </section>

          <section id="utility" className="mb-10 font-semibold">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Utility Classes</h2>
            <p className="text-emerald-700 mb-4">Tailwind's power comes from its comprehensive set of utility classes that you can combine to create any design.</p>

            <div className="bg-slate-700 p-4 rounded-lg mb-6">
              <h4 className="text-emerald-300 mb-2">Core Utility Categories:</h4>
              <ul className="list-disc pl-6 text-slate-200 space-y-2">
                <li><span className="text-yellow-400">Layout</span> - container, display, position, z-index</li>
                <li><span className="text-yellow-400">Flexbox & Grid</span> - flex, grid, gap, order</li>
                <li><span className="text-yellow-400">Spacing</span> - padding, margin, space</li>
                <li><span className="text-yellow-400">Sizing</span> - width, height, max/min dimensions</li>
                <li><span className="text-yellow-400">Typography</span> - font, text, leading, tracking</li>
                <li><span className="text-yellow-400">Backgrounds</span> - colors, gradients, images</li>
                <li><span className="text-yellow-400">Borders</span> - width, color, radius, style</li>
                <li><span className="text-yellow-400">Effects</span> - shadows, opacity, transforms</li>
              </ul>
            </div>

            <h3 className="text-xl text-emerald-700 font-semibold mt-6 mb-2">Common Utility Patterns</h3>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="p-8">
    <!-- Typography -->
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Typography</h2>
    <p class="text-lg text-gray-700">Large text</p>
    <p class="font-semibold text-purple-600">Semibold purple text</p>
    
    <!-- Spacing -->
    <div class="mt-8 p-4 bg-gray-100">
      <p class="mb-2">Margin top 8, padding 4</p>
    </div>
    
    <!-- Colors -->
    <div class="mt-4 space-y-2">
      <div class="bg-blue-500 text-white p-2 rounded">Blue background</div>
      <div class="bg-green-500 text-white p-2 rounded">Green background</div>
      <div class="bg-red-500 text-white p-2 rounded">Red background</div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="responsive" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Responsive Design</h2>
            <p className="text-emerald-700 font-semibold mb-4">Tailwind makes it easy to build responsive designs with responsive prefixes.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="p-4">
    <!-- Responsive container -->
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="p-8">
          <div class="text-sm md:text-lg lg:text-xl">
            This text changes size on different screens
          </div>
          
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-blue-500 p-4 text-white rounded">Box 1</div>
            <div class="bg-blue-500 p-4 text-white rounded">Box 2</div>
            <div class="bg-blue-500 p-4 text-white rounded">Box 3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`} />
          </section>

          <section id="components" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Building Components</h2>
            <p className="text-emerald-700 font-semibold mb-4">Create reusable components by combining Tailwind utilities.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="p-8">
    <!-- Card Component -->
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img class="w-full" src="https://picsum.photos/400/200" alt="Card image">
      <div class="px-6 py-4">
        <div class="font-bold text-xl text-black mb-2">Card Title</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag1</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag2</span>
      </div>
    </div>
    
    <!-- Button Component -->
    <button class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
      Click me
    </button>
  </div>
</body>
</html>`} />
          </section>

          <section id="layouts" className="mb-10">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Common Layouts</h2>
            <p className="text-emerald-700 font-semibold mb-4">Create common layout patterns with Tailwind utilities.</p>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Navbar -->
  <nav class="bg-gray-800 p-4">
    <div class="flex items-center justify-between">
      <div class="text-white font-bold">Logo</div>
      <div class="hidden md:flex space-x-4">
        <a href="#" class="text-white">Home</a>
        <a href="#" class="text-white">About</a>
        <a href="#" class="text-white">Contact</a>
      </div>
    </div>
  </nav>
  
  <!-- Hero Section -->
  <div class="bg-blue-500 text-white py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-4">Welcome to our site</h1>
      <p class="text-xl">Learn more about what we do</p>
    </div>
  </div>
  
  <!-- Three Column Grid -->
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
      <div class="bg-white p-6 rounded shadow">
        <h2 class="font-bold text-xl mb-2">Feature 1</h2>
        <p class="text-gray-600">Description goes here</p>
      </div>
      <div class="bg-white p-6 rounded shadow">
        <h2 class="font-bold text-xl mb-2">Feature 2</h2>
        <p class="text-gray-600">Description goes here</p>
      </div>
      <div class="bg-white p-6 rounded shadow">
        <h2 class="font-bold text-xl mb-2">Feature 3</h2>
        <p class="text-gray-600">Description goes here</p>
      </div>
    </div>
  </div>
</body>
</html>`} />
          </section>
        </div>
      </div>
    </div>
  );
}