// Tutorials page. Shows cards for each front-end technology.
// Uses local SVGs for tech logos.

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { htmlIcon, cssIcon, jsIcon, phpIcon, bootstrapIcon, tailwindIcon } from '../../assets/icons/index.js';

function Tutorials() {
    const [progress, setProgress] = useState(() => {
      // Example: load from localStorage or default
      return JSON.parse(localStorage.getItem('htmlProgress') || '{"beginner":false,"intermediate":false,"advanced":false}')
    });

    return (
        <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-emerald-600 mb-4">Documentation</h1>
                <h2 className="text-lg sm:text-xl text-center text-emerald-600 mb-12 max-w-3xl mx-auto font-bold">Complete reference guides for front-end technologies and web development</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* HTML */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-400 transform hover:scale-[1.02] border border-gray-200">
                        <img src={htmlIcon} alt="HTML5 Logo" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-center text-orange-600 mb-3">HTML</h3>
                        <p className="text-orange-600 text-center mb-6">Complete guide to HTML elements, attributes, and web page structure.</p>
                        <Link to="/docs/html" className="block text-center">
                            <button className="px-6 py-2 text-orange-600 hover:text-white border-2 border-orange-600 hover:bg-orange-600 rounded-full transition-colors font-bold">
                                Learn More →
                            </button>
                        </Link>
                    </div>

                    {/* CSS */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-400 transform hover:scale-[1.02] border border-gray-200">
                        <img src={cssIcon} alt="CSS Logo" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-center text-blue-600 mb-3">CSS</h3>
                        <p className="text-blue-600 text-center mb-6">Complete guide to CSS properties, selectors, and layout techniques.</p>
                        <Link to="/docs/css" className="block text-center">
                            <button className="px-6 py-2 text-blue-600 hover:text-white border-2 border-blue-600 hover:bg-blue-600 rounded-full transition-colors font-bold">
                                Learn More →
                            </button>
                        </Link>
                    </div>

                    {/* JavaScript */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-400 transform hover:scale-[1.02] border border-gray-200">
                        <img src={jsIcon} alt="JavaScript Logo" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-center text-yellow-400 mb-3">JavaScript</h3>
                        <p className="text-yellow-400 text-center mb-6">Complete guide to JavaScript syntax, functions, and DOM manipulation.</p>
                        <Link to="/docs/javascript" className="block text-center">
                            <button className="px-6 py-2 text-yellow-400 hover:text-white border-2 border-yellow-400 hover:bg-yellow-400 rounded-full transition-colors font-bold">
                                Learn More →
                            </button>
                        </Link>
                    </div>

                    {/* PHP */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-400 transform hover:scale-[1.02] border border-gray-200">
                        <img src={phpIcon} alt="PHP Logo" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-center text-indigo-400 mb-3">PHP</h3>
                        <p className="text-indigo-400 text-center mb-6">Complete guide to PHP syntax, functions, and server-side concepts.</p>
                        <Link to="/docs/php" className="block text-center">
                            <button className="px-6 py-2 text-indigo-400 hover:text-white border-2 border-indigo-400 hover:bg-indigo-400 rounded-full transition-colors font-bold">
                                Learn More →
                            </button>
                        </Link>
                    </div>

                    {/* Bootstrap */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-400 transform hover:scale-[1.02] border border-gray-200">
                        <img src={bootstrapIcon} alt="Bootstrap Logo" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-center text-violet-600 mb-3">Bootstrap</h3>
                        <p className="text-violet-600 text-center mb-6">Complete guide to Bootstrap components, classes, and utilities.</p>
                        <Link to="/docs/bootstrap" className="block text-center">
                            <button className="px-6 py-2 text-violet-600 hover:text-white border-2 border-violet-600 hover:bg-violet-600 rounded-full transition-colors font-bold">
                                Learn More →
                            </button>
                        </Link>
                    </div>

                    {/* Tailwind CSS */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-400 transform hover:scale-[1.02] border border-gray-200">
                        <img src={tailwindIcon} alt="Tailwind CSS Logo" className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-center text-sky-400 mb-3">Tailwind CSS</h3>
                        <p className="text-sky-600 text-center mb-6">Complete guide to Tailwind CSS classes, configuration, and best practices.</p>
                        <Link to="/docs/tailwind" className="block text-center">
                            <button className="px-6 py-2 text-sky-400 hover:text-white border-2 border-sky-400 hover:bg-sky-400 rounded-full transition-colors font-bold">
                                Learn More →
                            </button>
                        </Link>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Tutorials;
