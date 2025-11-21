import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { saveLessonProgress, getLessonProgress } from '../../utils/progressTracker';
import { toast } from 'react-toastify';

// Import icons
import { 
  htmlIcon, 
  cssIcon, 
  jsIcon, 
  phpIcon, 
  bootstrapIcon, 
  tailwindIcon 
} from '../../assets/icons/index.js';

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
        title: "HTML Tutorial for Beginners",
        videoId: "kUMe1FH4CHE",
        duration: "20:30",
        description: "Learn the basic structure of HTML documents and commonly used tags."
      },
      {
        id: "html2",
        title: "HTML Forms Tutorial",
        videoId: "fNcJuPIZ2WE",
        duration: "15:45",
        description: "Create interactive forms and understand different input types."
      },
      {
        id: "html3",
        title: "HTML5 Semantic Elements",
        videoId: "kGW8Al_cga4",
        duration: "9:30",
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
        title: "CSS Crash Course For Absolute Beginners",
        videoId: "yfoY53QXEnI",
        duration: "25:30",
        description: "Learn CSS fundamentals from scratch."
      },
      {
        id: "css2",
        title: "CSS Flexbox Crash Course",
        videoId: "tXIhdp5R7sc",
        duration: "19:55",
        description: "Master Flexbox for modern responsive layouts."
      },
      {
        id: "css3",
        title: "CSS Grid Made Simple",
        videoId: "9zBsdzdE4sM",
        duration: "22:45",
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
        title: "JavaScript Crash Course For Beginners",
        videoId: "hdI2bqOjy3c",
        duration: "27:35",
        description: "Learn the basics of JavaScript programming."
      },
      {
        id: "js2",
        title: "JavaScript DOM Manipulation",
        videoId: "5fb2aPlgoys",
        duration: "16:20",
        description: "Work with the Document Object Model (DOM)."
      },
      {
        id: "js3",
        title: "JavaScript Async JavaScript Tutorial",
        videoId: "ZYb_ZU8LNxs",
        duration: "18:45",
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
        title: "PHP For Beginners",
        videoId: "BUCiSSyIGGU",
        duration: "23:15",
        description: "Learn the basics of PHP programming."
      },
      {
        id: "php2",
        title: "PHP & MySQL Registration Form",
        videoId: "2MpZwFoBPjQ",
        duration: "21:10",
        description: "Learn to create a registration system with PHP and MySQL."
      },
      {
        id: "php3",
        title: "Build PHP REST API",
        videoId: "X51KOJKrofU",
        duration: "25:30",
        description: "Create a RESTful API using PHP from scratch."
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
        title: "Bootstrap 5 Tutorial for Beginners",
        videoId: "Jyvffr3aCp0",
        duration: "24:15",
        description: "Quick introduction to Bootstrap 5."
      },
      {
        id: "bootstrap2",
        title: "Bootstrap 5 Grid System Tutorial",
        videoId: "irfbn103AzE",
        duration: "15:30",
        description: "Master the Bootstrap grid system."
      },
      {
        id: "bootstrap3",
        title: "Bootstrap 5 Components Tutorial",
        videoId: "1nxSE0R27Gg",
        duration: "21:45",
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
        title: "Tailwind CSS Tutorial for Beginners",
        videoId: "bxmDnn7lrnk",
        duration: "22:35",
        description: "Learn the basics of Tailwind CSS."
      },
      {
        id: "tailwind2",
        title: "Tailwind CSS Responsive Design",
        videoId: "h9Zun41-Ozc",
        duration: "19:40",
        description: "Create responsive designs with Tailwind."
      },
      {
        id: "tailwind3",
        title: "Build Components with Tailwind CSS",
        videoId: "cZc4Jn5nK3k",
        duration: "25:15",
        description: "Build reusable components with Tailwind."
      }
    ]
  }
};

function VideoCard({ video, onSelect, progress = 0 }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-600 transition-all duration-300 shadow-md border border-gray-200"
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
        {/* Progress Bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
            <div 
              className="h-full bg-emerald-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {video.description}
        </p>
        {/* Progress Indicator */}
        {progress > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-semibold text-emerald-600">{progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoPlayer({ video, onClose, onComplete, progress = 0 }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-slate-900 rounded-lg overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        
        {/* Video Info and Complete Button */}
        <div className="bg-slate-800 p-4 border-t border-slate-700">
          <h3 className="text-white font-semibold mb-2">{video.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{video.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-sm font-semibold text-emerald-600">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Mark Complete Button */}
          {progress < 100 && (
            <button
              onClick={() => onComplete(video.id, video.title)}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all"
            >
              ✓ Mark as Complete
            </button>
          )}
          
          {progress === 100 && (
            <div className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg text-center">
              ✓ Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LessonDetail() {
  const { category } = useParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [watchProgress, setWatchProgress] = useState({});
  
  const lesson = lessonData[category];

  // Load user and progress on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser && lesson) {
        // Load progress for all videos in this category
        try {
          const progressData = {};
          for (const video of lesson.videos) {
            const progress = await getLessonProgress(firebaseUser.uid, category, video.title);
            if (progress) {
              progressData[video.id] = progress.progressPercent || 0;
            } else {
              progressData[video.id] = 0;
            }
          }
          setWatchProgress(progressData);
        } catch (error) {
          console.error('Error loading progress:', error);
        }
      }
    });

    return () => unsubscribe();
  }, [category, lesson]);

  // Save progress when video is selected or progress changes
  const handleVideoSelect = async (video) => {
    setSelectedVideo(video);
    // Auto-mark as started (25% progress)
    if (user) {
      try {
        const ok = await saveLessonProgress(user.uid, category, video.title, 25, false);
        if (!ok) console.warn('Failed to save lesson start progress for', video.title);
      } catch (err) {
        console.error('Error saving lesson start progress:', err);
      }

      setWatchProgress(prev => ({
        ...prev,
        [video.id]: 25
      }));
    }
  };

  // Mark lesson as completed
  const markLessonComplete = async (videoId, videoTitle) => {
    if (user) {
      try {
        const ok = await saveLessonProgress(user.uid, category, videoTitle, 100, true);
        if (!ok) {
          console.warn('Failed to save lesson completion for', videoTitle);
          toast.error('Could not save lesson progress.');
        } else {
          setWatchProgress(prev => ({
            ...prev,
            [videoId]: 100
          }));
          toast.success('Lesson completed! 🎉');
        }
      } catch (err) {
        console.error('Error saving lesson completion:', err);
        toast.error('Error saving lesson progress');
      }
    } else {
      toast.warn('Sign in to save lesson progress');
    }
  };
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-white pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-fuchsia-500">
            Category not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 px-4">
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
            <p className="text-gray-600">
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
              onSelect={handleVideoSelect}
              progress={watchProgress[video.id] || 0}
            />
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            onComplete={markLessonComplete}
            progress={watchProgress[selectedVideo.id] || 0}
          />
        )}
      </div>
    </div>
  );
}