import React from 'react';
import LiveHtmlEditor from '../../components/LiveHtmlEditor';

export default function CssTutorial() {
  return (
    <div className="min-h-screen bg-slate-900 flex pt-28">
      <aside className="hidden md:block w-64 pr-8 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-20 bg-slate-900 border-r border-slate-800">
        <nav className="pt-12">
          <ul className="flex flex-col gap-2 text-fuchsia-200 text-base">
            <li><a href="#home" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Home</a></li>
            <li><a href="#intro" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Introduction</a></li>
            <li><a href="#syntax" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Syntax</a></li>
            <li><a href="#selectors" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Selectors</a></li>
            <li><a href="#colors" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Colors</a></li>
            <li><a href="#backgrounds" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Backgrounds</a></li>
            <li><a href="#borders" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Borders</a></li>
            <li><a href="#margins" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Margins</a></li>
            <li><a href="#padding" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Padding</a></li>
            <li><a href="#heightwidth" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Height/Width</a></li>
            <li><a href="#boxmodel" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Box Model</a></li>
            <li><a href="#text" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Text</a></li>
            <li><a href="#fonts" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Fonts</a></li>
            <li><a href="#links" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Links</a></li>
            <li><a href="#lists" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Lists</a></li>
            <li><a href="#tables" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Tables</a></li>
            <li><a href="#display" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Display</a></li>
            <li><a href="#position" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Position</a></li>
            <li><a href="#zindex" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Z-index</a></li>
            <li><a href="#overflow" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Overflow</a></li>
            <li><a href="#float" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Float</a></li>
            <li><a href="#inlineblock" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Inline-block</a></li>
            <li><a href="#align" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Align</a></li>
            <li><a href="#combinators" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Combinators</a></li>
            <li><a href="#pseudo" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Pseudo</a></li>
            <li><a href="#opacity" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Opacity</a></li>
            <li><a href="#navbars" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Navbars</a></li>
            <li><a href="#dropdowns" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Dropdowns</a></li>
            <li><a href="#forms" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Forms</a></li>
            <li><a href="#animations" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Animations</a></li>
            <li><a href="#transitions" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Transitions</a></li>
            <li><a href="#variables" className="block py-2 px-3 rounded hover:bg-slate-800 hover:text-fuchsia-400 transition">CSS Variables</a></li>
          </ul>
        </nav>
      </aside>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl flex-1 pt-28 px-4 sm:px-8 md:ml-64">
          <header className="mb-10 border-b border-fuchsia-600 pb-6" id="home">
            <h1 className="text-4xl font-bold text-fuchsia-400 mb-2">CSS Fundamentals</h1>
            <p className="text-lg text-fuchsia-200">Learn how to style and layout web pages using CSS. Try editing the code and see the result live!</p>
          </header>
          <section id="intro" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">CSS Introduction</h2>
            <p className="text-slate-200 mb-4">CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the color, font, spacing, and positioning of elements.</p>
          </section>
          <section id="syntax" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">CSS Syntax</h2>
            <p className="text-slate-200 mb-4">CSS syntax consists of a selector and a declaration block. The declaration block contains one or more declarations separated by semicolons.</p>
            <LiveHtmlEditor initialCode={`<style>
/* Basic syntax */
h1 { 
  color: #a21caf; 
  font-size: 24px;
  margin-bottom: 1rem;
}

/* Multiple selectors */
p, span { 
  color: #e0e7ff;
  line-height: 1.5;
}
</style>

<h1>Hello CSS!</h1>
<p>This is styled with CSS.</p>
<span>This span shares the same style as paragraphs.</span>`} />
            <ul className="list-disc pl-6 text-slate-200 mt-4">
              <li>Selectors point to the HTML elements you want to style</li>
              <li>The declaration block contains the actual styles</li>
              <li>Each property-value pair is a declaration</li>
              <li>Use semicolons to separate declarations</li>
            </ul>
          </section>

          <section id="selectors" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">CSS Selectors</h2>
            <p className="text-slate-200 mb-4">CSS selectors are patterns used to select and style HTML elements. There are several types of selectors with different specificity levels.</p>
            <LiveHtmlEditor initialCode={`<style>
/* Element selector */
p {
  color: #e0e7ff;
  margin-bottom: 8px;
}

/* Class selector */
.highlight {
  background-color: #8b5cf6;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

/* ID selector */
#main-title {
  color: #a21caf;
  font-size: 24px;
  margin-bottom: 16px;
}

/* Descendant selector */
.container p {
  border-left: 3px solid #8b5cf6;
  padding-left: 12px;
}

/* Pseudo-class selector */
a:hover {
  color: #a21caf;
  text-decoration: none;
}

/* Attribute selector */
input[type="text"] {
  padding: 8px;
  border: 1px solid #8b5cf6;
  border-radius: 4px;
}
</style>

<h1 id="main-title">CSS Selectors Demo</h1>

<div class="container">
  <p>This is a paragraph inside a container.</p>
  <p>This is another paragraph with a <span class="highlight">highlighted</span> word.</p>
</div>

<p>This is a standalone paragraph.</p>

<a href="#">Hover over this link</a><br><br>

<input type="text" placeholder="Text input field">`} />
            
            <div className="mt-6 space-y-4">
              <h3 className="text-xl text-fuchsia-300">Types of Selectors:</h3>
              <ul className="list-disc pl-6 text-slate-200">
                <li><code className="bg-slate-700 px-1 rounded">element</code> - Selects all elements of that type</li>
                <li><code className="bg-slate-700 px-1 rounded">.class</code> - Selects elements with a specific class</li>
                <li><code className="bg-slate-700 px-1 rounded">#id</code> - Selects an element with a specific ID</li>
                <li><code className="bg-slate-700 px-1 rounded">element element</code> - Selects descendants</li>
                <li><code className="bg-slate-700 px-1 rounded">element {'>'} element</code> - Selects direct children</li>
                <li><code className="bg-slate-700 px-1 rounded">element + element</code> - Selects adjacent siblings</li>
                <li><code className="bg-slate-700 px-1 rounded">:pseudo-class</code> - Selects elements in a specific state</li>
                <li><code className="bg-slate-700 px-1 rounded">[attribute]</code> - Selects elements with a specific attribute</li>
              </ul>
            </div>
          </section>

          <section id="colors" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">CSS Colors</h2>
            <p className="text-slate-200 mb-4">CSS supports various color formats including names, hexadecimal, RGB, RGBA, HSL, and HSLA.</p>
            <LiveHtmlEditor initialCode={`<style>
.color-box {
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  color: white;
  border-radius: 4px;
}

/* Named colors */
.named { background-color: purple; }

/* Hexadecimal */
.hex { background-color: #8b5cf6; }

/* RGB */
.rgb { background-color: rgb(139, 92, 246); }

/* RGBA (with opacity) */
.rgba { background-color: rgba(139, 92, 246, 0.5); }

/* HSL (Hue, Saturation, Lightness) */
.hsl { background-color: hsl(259, 90%, 66%); }

/* HSLA (with opacity) */
.hsla { background-color: hsla(259, 90%, 66%, 0.5); }
</style>

<div class="color-box named">Named Color: purple</div>
<div class="color-box hex">Hexadecimal: #8b5cf6</div>
<div class="color-box rgb">RGB: rgb(139, 92, 246)</div>
<div class="color-box rgba">RGBA: rgba(139, 92, 246, 0.5)</div>
<div class="color-box hsl">HSL: hsl(259, 90%, 66%)</div>
<div class="color-box hsla">HSLA: hsla(259, 90%, 66%, 0.5)</div>`} />
            
            <ul className="list-disc pl-6 text-slate-200 mt-4">
              <li>Named colors: predefined color names like 'red', 'blue', etc.</li>
              <li>Hexadecimal: #RRGGBB format (#000000 to #FFFFFF)</li>
              <li>RGB/RGBA: rgb(red, green, blue) / rgba(red, green, blue, alpha)</li>
              <li>HSL/HSLA: hsl(hue, saturation%, lightness%) / hsla(h, s%, l%, alpha)</li>
              <li>Alpha values range from 0 (fully transparent) to 1 (fully opaque)</li>
            </ul>
          </section>

          <section id="backgrounds" className="mb-10">
            <h2 className="text-2xl font-semibold text-fuchsia-300 mb-2">CSS Backgrounds</h2>
            <p className="text-slate-200 mb-4">CSS backgrounds can include colors, images, gradients, and various positioning options.</p>
            <LiveHtmlEditor initialCode={`<style>
.bg-example {
  width: 100%;
  height: 150px;
  margin-bottom: 1rem;
  border-radius: 8px;
}

/* Solid background */
.bg-solid {
  background-color: #8b5cf6;
}

/* Background image */
.bg-image {
  background-image: url('https://placehold.co/600x400/8b5cf6/fff');
  background-size: cover;
  background-position: center;
}

/* Linear gradient */
.bg-gradient {
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
}

/* Radial gradient */
.bg-radial {
  background: radial-gradient(circle, #8b5cf6, #ec4899);
}

/* Pattern with background-repeat */
.bg-pattern {
  background-image: url('https://placehold.co/50x50/8b5cf6/fff');
  background-repeat: repeat;
}

/* Multiple backgrounds */
.bg-multiple {
  background: 
    linear-gradient(rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.8)),
    url('https://placehold.co/600x400/8b5cf6/fff');
  background-size: cover;
  background-position: center;
}
</style>

<div class="bg-example bg-solid"></div>
<p class="text-slate-200 mb-4">Solid Background Color</p>

<div class="bg-example bg-image"></div>
<p class="text-slate-200 mb-4">Background Image</p>

<div class="bg-example bg-gradient"></div>
<p class="text-slate-200 mb-4">Linear Gradient</p>

<div class="bg-example bg-radial"></div>
<p class="text-slate-200 mb-4">Radial Gradient</p>

<div class="bg-example bg-pattern"></div>
<p class="text-slate-200 mb-4">Repeating Pattern</p>

<div class="bg-example bg-multiple"></div>
<p class="text-slate-200 mb-4">Multiple Backgrounds</p>`} />
            
            <div className="mt-6 space-y-4">
              <h3 className="text-xl text-fuchsia-300">Background Properties:</h3>
              <ul className="list-disc pl-6 text-slate-200">
                <li><code className="bg-slate-700 px-1 rounded">background-color</code> - Sets the background color</li>
                <li><code className="bg-slate-700 px-1 rounded">background-image</code> - Sets one or more background images</li>
                <li><code className="bg-slate-700 px-1 rounded">background-size</code> - Controls image size (cover, contain, specific dimensions)</li>
                <li><code className="bg-slate-700 px-1 rounded">background-position</code> - Sets the starting position</li>
                <li><code className="bg-slate-700 px-1 rounded">background-repeat</code> - Controls image repetition</li>
                <li><code className="bg-slate-700 px-1 rounded">background-attachment</code> - Sets scrolling behavior</li>
                <li>Shorthand <code className="bg-slate-700 px-1 rounded">background</code> property combines multiple values</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
