import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import SVG assets
import { 
  htmlIcon, 
  cssIcon, 
  jsIcon, 
  phpIcon, 
  bootstrapIcon, 
  tailwindIcon 
} from '../../assets/icons/index.js';

// Category data
const categories = {
  html: {
    title: "HTML",
    icon: htmlIcon,
    description: "Learn the fundamentals of web structure and markup",
    color: "text-orange-500",
    borderColor: "border-orange-500",
    hoverBg: "hover:bg-orange-500/10",
    lessons: [
      {
        thumbnail: htmlIcon,
        title: "Introduction to HTML - Structure and Basic Tags",
        duration: "15:30",
        progress: 0
      },
      {
        thumbnail: htmlIcon,
        title: "Working with Forms and Input Elements",
        duration: "12:45",
        progress: 0
      },
      {
        thumbnail: htmlIcon, 
        title: "HTML5 Semantic Elements Explained",
        duration: "18:20",
        progress: 0
      }
    ]
  },
  css: {
    title: "CSS",
    icon: cssIcon,
    description: "Master the art of styling and layout design",
    color: "text-blue-500",
    borderColor: "border-blue-500",
    hoverBg: "hover:bg-blue-500/10",
    lessons: [
      {
        thumbnail: cssIcon,
        title: "CSS Fundamentals - Selectors and Properties",
        duration: "16:45",
        progress: 0
      },
      {
        thumbnail: cssIcon,
        title: "Flexbox and Grid Layout Systems",
        duration: "20:30",
        progress: 0
      },
      {
        thumbnail: cssIcon,
        title: "Responsive Design and Media Queries",
        duration: "14:15",
        progress: 0
      }
    ]
  },
  javascript: {
    title: "JavaScript",
    icon: jsIcon,
    description: "Build interactive and dynamic web applications",
    color: "text-yellow-500",
    borderColor: "border-yellow-500",
    hoverBg: "hover:bg-yellow-500/10",
    lessons: [
      {
        thumbnail: jsIcon,
        title: "JavaScript Basics - Variables and Functions",
        duration: "17:20",
        progress: 0
      },
      {
        thumbnail: jsIcon,
        title: "DOM Manipulation and Events",
        duration: "19:45",
        progress: 0
      },
      {
        thumbnail: jsIcon,
        title: "Asynchronous JavaScript and Promises",
        duration: "22:10",
        progress: 0
      }
    ]
  },
  php: {
    title: "PHP",
    icon: phpIcon,
    description: "Server-side scripting and backend development",
    color: "text-purple-500",
    borderColor: "border-purple-500",
    hoverBg: "hover:bg-purple-500/10",
    lessons: [
      {
        thumbnail: phpIcon,
        title: "Introduction to PHP Programming",
        duration: "18:30",
        progress: 0
      },
      {
        thumbnail: phpIcon,
        title: "Working with MySQL and PHP",
        duration: "21:15",
        progress: 0
      },
      {
        thumbnail: phpIcon,
        title: "Building a RESTful API with PHP",
        duration: "25:40",
        progress: 0
      }
    ]
  },
  bootstrap: {
    title: "Bootstrap",
    icon: bootstrapIcon,
    description: "Build responsive websites with popular UI framework",
    color: "text-indigo-500",
    borderColor: "border-indigo-500",
    hoverBg: "hover:bg-indigo-500/10",
    lessons: [
      {
        thumbnail: bootstrapIcon,
        title: "Getting Started with Bootstrap",
        duration: "15:20",
        progress: 0
      },
      {
        thumbnail: bootstrapIcon,
        title: "Bootstrap Grid System and Layout",
        duration: "18:45",
        progress: 0
      },
      {
        thumbnail: bootstrapIcon,
        title: "Bootstrap Components and Utilities",
        duration: "20:30",
        progress: 0
      }
    ]
  },
  tailwind: {
    title: "Tailwind CSS",
    icon: tailwindIcon,
    description: "Modern utility-first CSS framework",
    color: "text-cyan-500",
    borderColor: "border-cyan-500",
    hoverBg: "hover:bg-cyan-500/10",
    lessons: [
      {
        thumbnail: tailwindIcon,
        title: "Introduction to Tailwind CSS",
        duration: "16:15",
        progress: 0
      },
      {
        thumbnail: tailwindIcon,
        title: "Building Responsive Layouts with Tailwind",
        duration: "19:30",
        progress: 0
      },
      {
        thumbnail: tailwindIcon,
        title: "Custom Styling and Configuration",
        duration: "17:45",
        progress: 0
      }
    ]
  }
};

function Lessons() {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Here you'll fetch lessons from your API
        // Example:
        // axios.get(`http://localhost/capstone-backend/api/lessons.php?userId=${firebaseUser.uid}`)
        //   .then(response => {
        //     setLessons(response.data);
        //     setLoading(false);
        //   })
        //   .catch(error => {
        //     console.error("Error fetching lessons:", error);
        //     setLoading(false);
        //   });
        setLoading(false); // Remove this when implementing actual API call
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-fuchsia-400 mb-8">
          Start Learning
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([key, category]) => (
            <Link
              key={key}
              to={`/lessons/${key}`}
              className={`block p-6 rounded-lg border ${category.borderColor} bg-slate-800/50 ${category.hoverBg} transition-all duration-300 transform hover:scale-102`}
            >
              <div className="flex items-start gap-4">
                <img 
                  src={category.icon} 
                  alt={category.title} 
                  className="w-12 h-12"
                />
                <div>
                  <h2 className={`text-xl font-bold ${category.color} mb-2`}>
                    {category.title}
                  </h2>
                  <p className="text-slate-300 text-sm">
                    {category.description}
                  </p>
                  
                  {/* Progress indicators can be added here when connected to backend */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${category.color.replace('text', 'bg')}`} style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-xs text-slate-400">0%</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Progress section can be added here */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-fuchsia-300 mb-6">Recent Progress</h2>
          <div className="bg-slate-800/50 rounded-lg p-6 text-center">
            <p className="text-slate-400">Start a lesson to track your progress!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons;