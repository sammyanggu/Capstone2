// HTML Tutorial page styled like Tailwind docs
import React from 'react';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';
import NavLi from '../../components/NavLi';

export default function HtmlTutorial() {
  const [isAsideCollapsed, setIsAsideCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex">
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
          <ul className="flex flex-col gap-1 text-slate-200 text-base">
            <NavLi href="#home">HTML Home</NavLi>
            <NavLi href="#intro">HTML Introduction</NavLi>
            <NavLi href="#editors">HTML Editors</NavLi>
            <NavLi href="#basic">HTML Basic</NavLi>
            <NavLi href="#elements">HTML Elements</NavLi>
            <NavLi href="#attributes">HTML Attributes</NavLi>
            <NavLi href="#headings">HTML Headings</NavLi>
            <NavLi href="#paragraphs">HTML Paragraphs</NavLi>
            <NavLi href="#styles">HTML Styles</NavLi>
            <NavLi href="#formatting">HTML Formatting</NavLi>
            <NavLi href="#quotations">HTML Quotations</NavLi>
            <NavLi href="#comments">HTML Comments</NavLi>
            <NavLi href="#colors">HTML Colors</NavLi>
            <NavLi href="#links">HTML Links</NavLi>
            <NavLi href="#images">HTML Images</NavLi>
            <NavLi href="#tables">HTML Tables</NavLi>
            <NavLi href="#lists">HTML Lists</NavLi>
            <NavLi href="#forms">HTML Forms</NavLi>
            <NavLi href="#block-inline">HTML Block & Inline</NavLi>
            <NavLi href="#classes">HTML Classes</NavLi>
            <NavLi href="#id">HTML Id</NavLi>
            <NavLi href="#iframes">HTML Iframes</NavLi>
            <NavLi href="#javascript">HTML JavaScript</NavLi>
            <NavLi href="#filepaths">HTML File Paths</NavLi>
            <NavLi href="#head">HTML Head</NavLi>
            <NavLi href="#layout">HTML Layout</NavLi>
            <NavLi href="#responsive">HTML Responsive</NavLi>
            <NavLi href="#computercode">HTML Computercode</NavLi>
            <NavLi href="#semantics">HTML Semantics</NavLi>
            <NavLi href="#styleguide">HTML Style Guide</NavLi>
            <NavLi href="#entities">HTML Entities</NavLi>
            <NavLi href="#symbols">HTML Symbols</NavLi>
            <NavLi href="#emojis">HTML Emojis</NavLi>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-blue-600 pb-6">
            <h1 className="text-4xl font-bold text-black mb-2" id="home">HTML Fundamentals</h1>
            <p className="text-lg text-black">Learn the building blocks of the web. This guide covers the basics of HTML, its structure, and how to create your first web page.</p>
          </header>
          {/* Introduction */}
          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Introduction</h2>
            <p className="text-black mb-4">HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.</p>
          </section>
          {/* Editors */}
          <section id="editors" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Editors</h2>
            <p className="text-black mb-4">You can write HTML using any text editor, such as Notepad, VS Code, or Sublime Text. Save your file with a <code className="bg-slate-200 text-emerald-600 px-2 rounded">.html</code> extension and open it in your browser to view the result.</p>
          </section>
          {/* Basic */}
          <section id="basic" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Basic</h2>
            {/* Interactive Code Editor */}
            <h3 className="text-xl font-semibold text-black mb-2">Try it yourself:</h3>
            <LiveHtmlEditor initialCode={`<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>This is my first HTML page.</p>\n  </body>\n</html>`} />
            <p className="text-black">This is the basic structure of an HTML document. Feel free to modify the code above and see the changes in real-time.</p>
          </section>
          {/* Elements */}
          <section id="elements" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Elements</h2>
            <p className="text-black mb-4">HTML elements are the building blocks of web pages. An element usually consists of an opening tag, content, and a closing tag. For example, <code className="bg-slate-200 text-emerald-600 px-2 rounded">&lt;p&gt;This is a paragraph.&lt;/p&gt;</code> creates a paragraph element. Elements can also be nested inside each other.</p>
            <h3 className="text-xl font-semibold text-black mb-2">Try it yourself:</h3>
            <LiveHtmlEditor initialCode={`<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n<a href='https://www.example.com'>This is a link</a>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Most elements have an opening and closing tag (e.g., <code className="bg-slate-200 text-emerald-600 px-2 rounded">&lt;h1&gt;...&lt;/h1&gt;</code>).</li>
              <li>Some elements are self-closing (e.g., <code className="bg-slate-200 text-emerald-600 px-2 rounded">&lt;img /&gt;</code>).</li>
              <li>Elements can contain text, other elements, or both.</li>
            </ul>
          </section>
          {/* Attributes */}
          <section id="attributes" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Attributes</h2>
            <p className="text-black mb-4">Attributes provide extra information about HTML elements. They are always included in the opening tag and usually come in name/value pairs like <code className="bg-slate-200 text-emerald-600 px-2 rounded">name="value"</code>. For example, the <code className="bg-slate-200 text-emerald-600 px-2 rounded">href</code> attribute in an anchor tag specifies the link's destination.</p>
            <LiveHtmlEditor initialCode={`<a href='https://www.google.com' target='_blank'>Visit Google</a>\n<br />\n<img src='https://placehold.co/150x80/8b5cf6/fff?text=Sample+Image' alt='Placeholder image' style='margin-top:10px;border-radius:8px;' />`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Common attributes: <code className="bg-slate-200 text-emerald-600 px-2 rounded">href</code>, <code className="bg-slate-200 text-emerald-600 px-2 rounded">src</code>, <code className="bg-slate-200 text-emerald-600 px-2 rounded">alt</code>, <code className="bg-slate-200 text-emerald-600 px-2 rounded">title</code>, <code className="bg-slate-200 text-emerald-600 px-2 rounded">id</code>, <code className="bg-slate-200 text-emerald-600 px-2 rounded">class</code>.</li>
              <li>Attribute values should be enclosed in quotes.</li>
            </ul>
          </section>
          {/* Headings */}
          <section id="headings" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Headings</h2>
            <p className="text-black mb-4">Headings are defined with <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;h1&gt;</code> to <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;h6&gt;</code> tags. <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;h1&gt;</code> is the most important, and <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;h6&gt;</code> is the least. Use headings to structure your content and improve accessibility and SEO.</p>
            <LiveHtmlEditor initialCode={`<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Subsection</h3>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Use only one <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;h1&gt;</code> per page for the main title.</li>
              <li>Headings help users and search engines understand your page structure.</li>
            </ul>
          </section>
          {/* Paragraphs */}
          <section id="paragraphs" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Paragraphs</h2>
            <p className="text-black mb-4">Paragraphs are defined with the <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;p&gt;</code> tag. Browsers automatically add some space before and after each paragraph.</p>
            <LiveHtmlEditor initialCode={`<p>This is a simple paragraph of text in HTML.</p>\n<p>Paragraphs make your content easier to read.</p>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Paragraphs cannot be nested inside each other.</li>
              <li>Use paragraphs to break up long blocks of text.</li>
            </ul>
          </section>
          {/* Styles */}
          <section id="styles" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Styles</h2>
            <p className="text-black mb-4">You can style HTML elements directly using the <code className="bg-slate-200 px-1 rounded text-emerald-600">style</code> attribute. This allows you to set CSS properties like color, font, and background for individual elements. For larger projects, it's better to use a separate CSS file.</p>
            <LiveHtmlEditor initialCode={`<p style='color: #a21caf; background: #f3e8ff; padding: 8px; border-radius: 6px;'>Styled paragraph using the style attribute.</p>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Inline styles override external and internal CSS.</li>
              <li>Use inline styles for quick demos, not for production code.</li>
            </ul>
          </section>
          {/* Formatting */}
          <section id="formatting" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Formatting</h2>
            <p className="text-black mb-4">Formatting tags help you emphasize or style text. Common tags include <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;b&gt;</code> (bold), <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;i&gt;</code> (italic), <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;u&gt;</code> (underline), <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;mark&gt;</code> (highlight), and <code className="bg-slate-200 px-1 rounded text-emerald-600">&lt;small&gt;</code> (smaller text).</p>
            <LiveHtmlEditor initialCode={`<b>Bold text</b> <i>Italic text</i> <u>Underlined text</u> <mark>Highlighted</mark> <small>Small text</small>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Use formatting tags to improve readability and highlight important content.</li>
            </ul>
          </section>
          {/* Quotations */}
          <section id="quotations" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Quotations</h2>
            <p className="text-black mb-4">Use <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;blockquote&gt;</code> for long quotations, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;q&gt;</code> for short inline quotes, and <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;cite&gt;</code> for citing sources.</p>
            <LiveHtmlEditor initialCode={`<blockquote cite='https://www.example.com'>This is a blockquote from an external source.</blockquote>\n<p>He said, <q>This is an inline quote.</q></p>\n<cite>— Source Name</cite>`} />
          </section>
          {/* Comments */}
          <section id="comments" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Comments</h2>
            <p className="text-black mb-4">Comments are not displayed in the browser. Use them to leave notes in your code. Syntax: <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;!-- This is a comment --&gt;</code></p>
            <LiveHtmlEditor initialCode={`<!-- This is a comment -->\n<p>Comments are not visible in the output.</p>`} />
          </section>
          {/* Colors */}
          <section id="colors" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Colors</h2>
            <p className="text-black mb-4">You can set colors using names (<code>red</code>), HEX codes (<code>#ff0000</code>), RGB (<code>rgb(255,0,0)</code>), or HSL (<code>hsl(0, 100%, 50%)</code>).</p>
            <LiveHtmlEditor initialCode={`<p style='color: red;'>Red text</p>\n<p style='color: #a21caf;'>Fuchsia text (HEX)</p>\n<p style='color: rgb(34,197,94);'>Green text (RGB)</p>\n<p style='color: hsl(220, 98%, 61%);'>Blue text (HSL)</p>`} />
          </section>
          {/* Links */}
          <section id="links" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Links</h2>
            <p className="text-black mb-4">Links are created with the <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;a&gt;</code> tag and are used to navigate between pages or to specific parts of a page.</p>
            <LiveHtmlEditor initialCode={`<a href="https://www.example.com" target="_blank">Visit Example.com</a>
<br />
<a href="#section1">Jump to Section 1</a>
<br />
<a href="mailto:example@email.com">Send email</a>
<br />
<a href="tel:+1234567890">Call us</a>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>The <code className="bg-slate-200 px-1 rounded text-blue-600">href</code> attribute specifies the destination</li>
              <li>Use <code className="bg-slate-200 px-1 rounded text-blue-600">target="_blank"</code> to open in a new tab</li>
              <li>Links can point to external sites, internal pages, or page sections</li>
              <li>Special protocols like mailto: and tel: create email and phone links</li>
            </ul>
          </section>
          {/* Images */}
          <section id="images" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Images</h2>
            <p className="text-black mb-4">Images are displayed with the <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;img&gt;</code> tag. The src attribute specifies the image source, and alt provides alternative text for accessibility.</p>
            <LiveHtmlEditor initialCode={`<!-- Basic image -->
<img src="https://placehold.co/300x200/8b5cf6/fff?text=Sample+Image" 
     alt="Sample placeholder image" />

<!-- Image with width and height -->
<img src="https://placehold.co/150x150/8b5cf6/fff?text=Square" 
     alt="Square image"
     width="150" 
     height="150" />

<!-- Image with title -->
<img src="https://placehold.co/200x100/8b5cf6/fff?text=With+Title" 
     alt="Image with title"
     title="This tooltip appears on hover" />`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>The <code className="bg-slate-200 px-1 rounded text-blue-600">src</code> attribute is required and specifies the image path</li>
              <li>The <code className="bg-slate-200 px-1 rounded text-blue-600">alt</code> attribute provides text for screen readers and displays if the image fails to load</li>
              <li>Use <code className="bg-slate-200 px-1 rounded text-blue-600">width</code> and <code className="bg-slate-200 px-1 rounded text-blue-600">height</code> to set image dimensions</li>
              <li>The <code className="bg-slate-200 px-1 rounded text-blue-600">title</code> attribute shows a tooltip on hover</li>
            </ul>
            <p className="text-black mt-4">Common image formats: JPG (photos), PNG (transparent backgrounds), SVG (scalable graphics), GIF (animations)</p>
          </section>
          {/* Tables */}
          <section id="tables" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Tables</h2>
            <p className="text-black mb-4">Tables are used to display data in rows and columns. They are created using <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;table&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;tr&gt;</code> (table row), <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;td&gt;</code> (table data), and <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;th&gt;</code> (table header) tags.</p>
            <h3 className="text-xl font-semibold text-black mb-2">Try it yourself:</h3>
            <LiveHtmlEditor initialCode={`<table style="border-collapse: collapse; width: 100%;">
  <!-- Table Header -->
  <thead>
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; background: #8b5cf6; color: white;">Name</th>
      <th style="border: 1px solid #ddd; padding: 8px; background: #8b5cf6; color: white;">Age</th>
      <th style="border: 1px solid #ddd; padding: 8px; background: #8b5cf6; color: white;">City</th>
    </tr>
  </thead>
  <!-- Table Body -->
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">John Doe</td>
      <td style="border: 1px solid #ddd; padding: 8px;">25</td>
      <td style="border: 1px solid #ddd; padding: 8px;">New York</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Jane Smith</td>
      <td style="border: 1px solid #ddd; padding: 8px;">30</td>
      <td style="border: 1px solid #ddd; padding: 8px;">London</td>
    </tr>
  </tbody>
  <!-- Table Footer -->
  <tfoot>
    <tr>
      <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: center;">
        Total Entries: 2
      </td>
    </tr>
  </tfoot>
</table>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;thead&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;tbody&gt;</code>, and <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;tfoot&gt;</code> organize table sections</li>
              <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;th&gt;</code> defines header cells (usually bold and centered)</li>
              <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;td&gt;</code> defines regular data cells</li>
              <li><code className="bg-slate-200 px-1 rounded text-blue-600">colspan</code> and <code className="bg-slate-200 px-1 rounded text-blue-600">rowspan</code> attributes merge cells</li>
            </ul>
          </section>
          {/* Lists */}
          <section id="lists" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Lists</h2>
            <p className="text-black mb-4">Lists are created with <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;ul&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;ol&gt;</code>, and <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;li&gt;</code> tags.</p>
          </section>
          {/* Forms */}
          <section id="forms" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Forms</h2>
            <p className="text-black mb-4">Forms are used to collect user input. They are created with the <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;form&gt;</code> tag and can contain various input elements.</p>
            <h3 className="text-xl font-semibold text-black mb-2">Try it yourself:</h3>
            <LiveHtmlEditor initialCode={`<form style="max-width: 400px; margin: 0 auto;">
  <!-- Text input -->
  <div style="margin-bottom: 1rem;">
    <label for="name" style="display: block; margin-bottom: 0.5rem;">Name:</label>
    <input type="text" id="name" name="name" required
           style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;" />
  </div>

  <!-- Email input -->
  <div style="margin-bottom: 1rem;">
    <label for="email" style="display: block; margin-bottom: 0.5rem;">Email:</label>
    <input type="email" id="email" name="email" required
           style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;" />
  </div>

  <!-- Select dropdown -->
  <div style="margin-bottom: 1rem;">
    <label for="country" style="display: block; margin-bottom: 0.5rem;">Country:</label>
    <select id="country" name="country"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
  </div>

  <!-- Radio buttons -->
  <div style="margin-bottom: 1rem;">
    <p style="margin-bottom: 0.5rem;">Gender:</p>
    <label style="margin-right: 1rem;">
      <input type="radio" name="gender" value="male" /> Male
    </label>
    <label style="margin-right: 1rem;">
      <input type="radio" name="gender" value="female" /> Female
    </label>
    <label>
      <input type="radio" name="gender" value="other" /> Other
    </label>
  </div>

  <!-- Checkbox -->
  <div style="margin-bottom: 1rem;">
    <label>
      <input type="checkbox" name="subscribe" />
      Subscribe to newsletter
    </label>
  </div>

  <!-- Textarea -->
  <div style="margin-bottom: 1rem;">
    <label for="message" style="display: block; margin-bottom: 0.5rem;">Message:</label>
    <textarea id="message" name="message" rows="4"
              style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
  </div>

  <!-- Submit button -->
  <button type="submit" 
          style="background: #8b5cf6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">
    Submit
  </button>
</form>`} />
            <ul className="list-disc pl-6 text-black mb-2">
              <li>Common form elements include:
                <ul className="list-disc pl-6 mt-2">
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;input type="text"&gt;</code> - text input</li>
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;input type="email"&gt;</code> - email input</li>
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;input type="password"&gt;</code> - password input</li>
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;input type="radio"&gt;</code> - radio buttons</li>
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;input type="checkbox"&gt;</code> - checkboxes</li>
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;select&gt;</code> - dropdown lists</li>
                  <li><code className="bg-slate-200 px-1 rounded text-blue-600">&lt;textarea&gt;</code> - multiline text input</li>
                </ul>
              </li>
              <li>The <code className="bg-slate-200 px-1 rounded text-blue-600">required</code> attribute makes a field mandatory</li>
              <li>Use <code className="bg-slate-200 px-1 rounded text-blue-600">name</code> attribute to reference form data</li>
            </ul>
          </section>
          {/* Block & Inline */}
          <section id="block-inline" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Block & Inline</h2>
            <p className="text-black mb-4">Block elements start on a new line (e.g., <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;div&gt;</code>), while inline elements do not (e.g., <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;span&gt;</code>).</p>
          </section>
          {/* Classes */}
          <section id="classes" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Classes</h2>
            <p className="text-black mb-4">The <code className="bg-slate-200 px-1 rounded text-blue-600">class</code> attribute is used to define equal styles for elements with the same class name.</p>
          </section>
          {/* Id */}
          <section id="id" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Id</h2>
            <p className="text-black mb-4">The <code className="bg-slate-200 px-1 rounded text-blue-600">id</code> attribute specifies a unique id for an element.</p>
          </section>
          {/* Iframes */}
          <section id="iframes" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Iframes</h2>
            <p className="text-black mb-4">Iframes are used to embed another document within the current HTML document using the <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;iframe&gt;</code> tag.</p>
          </section>
          {/* JavaScript */}
          <section id="javascript" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML JavaScript</h2>
            <p className="text-black mb-4">JavaScript can be added to HTML pages using the <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;script&gt;</code> tag.</p>
          </section>
          {/* File Paths */}
          <section id="filepaths" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML File Paths</h2>
            <p className="text-black mb-4">File paths specify the location of files, such as images or scripts, used in your HTML.</p>
          </section>
          {/* Head */}
          <section id="head" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Head</h2>
            <p className="text-black mb-4">The <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;head&gt;</code> element contains meta-information about the HTML document.</p>
          </section>
          {/* Layout */}
          <section id="layout" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Layout</h2>
            <p className="text-black mb-4">Layout elements include <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;div&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;header&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;footer&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;section&gt;</code>, and <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;article&gt;</code>.</p>
          </section>
          {/* Responsive */}
          <section id="responsive" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Responsive</h2>
            <p className="text-black mb-4">Responsive web design makes your web page look good on all devices using CSS and meta tags.</p>
          </section>
          {/* Computercode */}
          <section id="computercode" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Computercode</h2>
            <p className="text-black mb-4">Tags like <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;code&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;pre&gt;</code>, and <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;kbd&gt;</code> are used to display computer code.</p>
          </section>
          {/* Semantics */}
          <section id="semantics" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Semantics</h2>
            <p className="text-black mb-4">Semantic elements clearly describe their meaning in a human- and machine-readable way. Examples: <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;article&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;section&gt;</code>, <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;nav&gt;</code>.</p>
          </section>
          {/* Style Guide */}
          <section id="styleguide" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Style Guide</h2>
            <p className="text-black mb-4">A style guide helps you write consistent, readable HTML code. Use proper indentation, lowercase tags, and meaningful names.</p>
          </section>
          {/* Entities */}
          <section id="entities" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Entities</h2>
            <p className="text-black mb-4">Entities are used to display reserved characters. Example: <code className="bg-slate-200 px-1 rounded text-blue-600">&amp;lt;</code> for <code className="bg-slate-200 px-1 rounded text-blue-600">&lt;</code>.</p>
          </section>
          {/* Symbols */}
          <section id="symbols" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Symbols</h2>
            <p className="text-black mb-4">HTML symbols include mathematical, currency, and other special characters using entities.</p>
          </section>
          {/* Emojis */}
          <section id="emojis" className="mb-10">
            <h2 className="text-2xl font-semibold text-black mb-2">HTML Emojis</h2>
            <p className="text-black mb-4">You can add emojis to your HTML using Unicode or emoji entities.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
