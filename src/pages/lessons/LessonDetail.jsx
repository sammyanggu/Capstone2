import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Import icons
import { 
  htmlIcon, 
  cssIcon, 
  jsIcon, 
  phpIcon, 
  bootstrapIcon, 
  tailwindIcon 
} from '../../assets/icons';

const lessonData = {
  html: {
    title: "HTML",
    icon: htmlIcon,
    color: "text-orange-500",
    borderColor: "border-orange-500",
    description: "Learn the fundamentals of web structure and markup",
    videos: [
      {
        id: "html1",
        title: "HTML Fundamentals - Structure and Basic Tags",
        videoId: "qz0aGYrrlhU",
        duration: "15:30",
        description: "Learn the basic structure of HTML documents and commonly used tags."
      },
      {
        id: "html2",
        title: "Working with Forms and Input Elements",
        videoId: "fNcJuPIZ2WE",
        duration: "19:45",
        description: "Create interactive forms and understand different input types."
      },
      {
        id: "html3",
        title: "HTML5 Semantic Elements",
        videoId: "dD2EISBDjWM",
        duration: "22:10",
        description: "Use semantic elements to improve page structure and accessibility."
      }
    ]
  },
  css: {
    title: "CSS",
    icon: cssIcon,
    color: "text-blue-500",
    borderColor: "border-blue-500",
    description: "Master the art of styling and layout design",
    videos: [
      {
        id: "css1",
        title: "CSS Fundamentals - Selectors and Properties",
        videoId: "1PnVor36_40",
        duration: "18:20",
        description: "Learn CSS selectors and basic styling properties."
      },
      {
        id: "css2",
        title: "Flexbox Complete Guide",
        videoId: "JJSoEo8JSnc",
        duration: "25:15",
        description: "Master Flexbox for modern responsive layouts."
      },
      {
        id: "css3",
        title: "CSS Grid Layout System",
        videoId: "jV8B24rSN5o",
        duration: "20:30",
        description: "Create complex layouts with CSS Grid."
      }
    ]
  },
  javascript: {
    title: "JavaScript",
    icon: jsIcon,
    color: "text-yellow-500",
    borderColor: "border-yellow-500",
    description: "Build interactive and dynamic web applications",
    videos: [
      {
        id: "js1",
        title: "JavaScript Fundamentals",
        videoId: "W6NZfCO5SIk",
        duration: "16:45",
        description: "Learn the basics of JavaScript programming."
      },
      {
        id: "js2",
        title: "DOM Manipulation",
        videoId: "5fb2aPlgoys",
        duration: "21:30",
        description: "Work with the Document Object Model (DOM)."
      },
      {
        id: "js3",
        title: "Async JavaScript - Promises & Async/Await",
        videoId: "_8gHHBlbDUA",
        duration: "23:15",
        description: "Handle asynchronous operations in JavaScript."
      }
    ]
  },
  php: {
    title: "PHP",
    icon: phpIcon,
    color: "text-purple-500",
    borderColor: "border-purple-500",
    description: "Server-side scripting and backend development",
    videos: [
      {
        id: "php1",
        title: "PHP Fundamentals",
        videoId: "2eebptXfEvw",
        duration: "20:10",
        description: "Learn the basics of PHP programming."
      },
      {
        id: "php2",
        title: "Working with MySQL and PHP",
        videoId: "KQk5spX-4JY",
        duration: "24:30",
        description: "Database operations with PHP and MySQL."
      },
      {
        id: "php3",
        title: "Building a PHP REST API",
        videoId: "OEWXbCUQ7Tc",
        duration: "19:45",
        description: "Create a RESTful API using PHP."
      }
    ]
  },
  bootstrap: {
    title: "Bootstrap",
    icon: bootstrapIcon,
    color: "text-indigo-500",
    borderColor: "border-indigo-500",
    description: "Build responsive websites with popular UI framework",
    videos: [
      {
        id: "bootstrap1",
        title: "Bootstrap 5 Crash Course",
        videoId: "4sosXZsdy-s",
        duration: "17:20",
        description: "Quick introduction to Bootstrap 5."
      },
      {
        id: "bootstrap2",
        title: "Bootstrap Grid System",
        videoId: "Wqu-d_b3K-0",
        duration: "22:45",
        description: "Master the Bootstrap grid system."
      },
      {
        id: "bootstrap3",
        title: "Bootstrap Components",
        videoId: "rQryOSyfXmI",
        duration: "19:30",
        description: "Work with Bootstrap UI components."
      }
    ]
  },
  tailwind: {
    title: "Tailwind CSS",
    icon: tailwindIcon,
    color: "text-cyan-500",
    borderColor: "border-cyan-500",
    description: "Modern utility-first CSS framework",
    videos: [
      {
        id: "tailwind1",
        title: "Tailwind CSS Basics",
        videoId: "UBOj6rqRUME",
        duration: "18:15",
        description: "Learn the basics of Tailwind CSS."
      },
      {
        id: "tailwind2",
        title: "Building Responsive Layouts",
        videoId: "VYFxhdrAgXM",
        duration: "23:40",
        description: "Create responsive designs with Tailwind."
      },
      {
        id: "tailwind3",
        title: "Tailwind CSS Components",
        videoId: "pfaSUYaSgRo",
        duration: "20:55",
        description: "Build reusable components with Tailwind."
      }
    ]
  }
};

function VideoCard({ video, onSelect }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  return (
    <div 
      className="bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-fuchsia-500 transition-all duration-300"
      onClick={() => onSelect(video)}
    >
      <div className="relative">
        <img 
          src={thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-100 mb-2">
          {video.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

function VideoPlayer({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-lg overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-2">{video.title}</h2>
          <p className="text-slate-300">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function LessonDetail() {
  const { category } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const lesson = lessonData[category];
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-fuchsia-400">
            Category not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={lesson.icon} 
            alt={lesson.title} 
            className="w-12 h-12"
          />
          <div>
            <h1 className={`text-3xl font-bold ${lesson.color} mb-2`}>
              {lesson.title} Lessons
            </h1>
            <p className="text-slate-300">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lesson.videos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              onSelect={setSelectedVideo}
            />
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </div>
  );
}