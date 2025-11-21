// Tutorials page. Shows cards for each front-end technology.
// Uses local SVGs for tech logos.

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { htmlIcon, cssIcon, jsIcon, phpIcon, bootstrapIcon, tailwindIcon } from '../assets/icons/index.js';

function Tutorials() {
    const [progress, setProgress] = useState(() => {
      // Example: load from localStorage or default
      return JSON.parse(localStorage.getItem('htmlProgress') || '{"beginner":false,"intermediate":false,"advanced":false}')
    });

    return (
        <div className="tutorials-container mt-20 sm:mt-16">
            <h1 className="tutorials-title">Documentation</h1>
            <h2 className="tutorials-subtitle">Complete reference guides for front-end technologies and web development</h2>
            <div className="tutorials-grid">
                {/* HTML */}
                <div className="tutorial-card">
                    <img src={htmlIcon} alt="HTML5 Logo" className="tutorial-logo" />
                    <h3 className="tutorial-card-title">HTML Reference</h3>
                    <p className="tutorial-card-desc">Complete guide to HTML elements, attributes, and web page structure.</p>
                    <Link to="/docs/html">
                      <button className="tutorial-card-btn">Learn More <span className="text-lg">→</span></button>
                    </Link>
                </div>
                {/* CSS */}
                <div className="tutorial-card">
                    <img src={cssIcon} alt="CSS Logo" className="tutorial-logo" />
                    <h3 className="tutorial-card-title">CSS Reference</h3>
                    <p className="tutorial-card-desc">Complete guide to CSS properties, selectors, and layout techniques.</p>
                    <Link to="/docs/css">
                      <button className="tutorial-card-btn">Learn More <span className="text-lg">→</span></button>
                    </Link>
                </div>
                {/* JavaScript */}
                <div className="tutorial-card">
                    <img src={jsIcon} alt="JavaScript Logo" className="tutorial-logo" />
                    <h3 className="tutorial-card-title">JavaScript Reference</h3>
                    <p className="tutorial-card-desc">Complete guide to JavaScript syntax, functions, and DOM manipulation.</p>
                    <Link to="/docs/javascript">
                      <button className="tutorial-card-btn">Learn More <span className="text-lg">→</span></button>
                    </Link>
                </div>
                {/* PHP */}
                <div className="tutorial-card">
                    <img src={phpIcon} alt="PHP Logo" className="tutorial-logo" />
                    <h3 className="tutorial-card-title">PHP Reference</h3>
                    <p className="tutorial-card-desc">Complete guide to PHP syntax, functions, and server-side concepts.</p>
                    <Link to="/docs/php">
                      <button className="tutorial-card-btn">Learn More <span className="text-lg">→</span></button>
                    </Link>
                </div>
                {/* Bootstrap */}
                <div className="tutorial-card">
                    <img src={bootstrapIcon} alt="Bootstrap Logo" className="tutorial-logo" />
                    <h3 className="tutorial-card-title">Bootstrap Reference</h3>
                    <p className="tutorial-card-desc">Complete guide to Bootstrap components, classes, and utilities.</p>
                    <Link to="/docs/bootstrap">
                      <button className="tutorial-card-btn">Learn More <span className="text-lg">→</span></button>
                    </Link>
                </div>
                {/* Tailwind CSS */}
                <div className="tutorial-card">
                    <img src={tailwindIcon} alt="Tailwind CSS Logo" className="tutorial-logo" />
                    <h3 className="tutorial-card-title">Tailwind CSS Reference</h3>
                    <p className="tutorial-card-desc">Complete guide to Tailwind CSS classes, configuration, and best practices.</p>
                    <Link to="/docs/tailwind">
                      <button className="tutorial-card-btn">Learn More <span className="text-lg">→</span></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Tutorials