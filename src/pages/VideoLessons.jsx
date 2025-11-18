import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Component for video lesson card
function VideoCard({ title, thumbnail, duration, category }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden hover:ring-2 hover:ring-fuchsia-500 transition-all duration-300 shadow-md border border-gray-200">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <span className="inline-block bg-fuchsia-500/20 text-fuchsia-600 rounded px-2 py-1 text-sm">
          {category}
        </span>
      </div>
    </div>
  );
}

export default function VideoLessons() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample video lessons data
  const videoLessons = [
    {
      id: 1,
      title: "Introduction to HTML Structure",
      thumbnail: "https://img.youtube.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
      duration: "15:30",
      category: "HTML"
    },
    {
      id: 2,
      title: "CSS Flexbox Complete Guide",
      thumbnail: "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg",
      duration: "20:15",
      category: "CSS"
    },
    {
      id: 3,
      title: "JavaScript Functions & Objects",
      thumbnail: "https://img.youtube.com/vi/N8ap4k_1QEQ/maxresdefault.jpg",
      duration: "25:40",
      category: "JavaScript"
    },
    {
      id: 4,
      title: "Getting Started with PHP",
      thumbnail: "https://img.youtube.com/vi/2eebptXfEvw/maxresdefault.jpg",
      duration: "18:20",
      category: "PHP"
    },
    {
      id: 5,
      title: "Bootstrap 5 Crash Course",
      thumbnail: "https://img.youtube.com/vi/4sosXZsdy-s/maxresdefault.jpg",
      duration: "22:10",
      category: "Bootstrap"
    },
    {
      id: 6,
      title: "Tailwind CSS Basics",
      thumbnail: "https://img.youtube.com/vi/UBOj6rqRUME/maxresdefault.jpg",
      duration: "16:45",
      category: "Tailwind"
    },
    {
      id: 7,
      title: "HTML Forms and Validation",
      thumbnail: "https://img.youtube.com/vi/fNcJuPIZ2WE/maxresdefault.jpg",
      duration: "19:30",
      category: "HTML"
    },
    {
      id: 8,
      title: "CSS Grid Layout System",
      thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg",
      duration: "23:15",
      category: "CSS"
    },
    {
      id: 9,
      title: "JavaScript ES6 Features",
      thumbnail: "https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
      duration: "21:50",
      category: "JavaScript"
    }
  ];

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === 'all' 
    ? videoLessons 
    : videoLessons.filter(video => video.category === selectedCategory);

  // Available categories
  const categories = [
    { id: 'all', label: 'All Lessons' },
    { id: 'HTML', label: 'HTML' },
    { id: 'CSS', label: 'CSS' },
    { id: 'JavaScript', label: 'JavaScript' },
    { id: 'PHP', label: 'PHP' },
    { id: 'Bootstrap', label: 'Bootstrap' },
    { id: 'Tailwind', label: 'Tailwind' }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-fuchsia-600 mb-8">
          Video Lessons
        </h1>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${selectedCategory === category.id 
                  ? 'bg-fuchsia-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              category={video.category}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No video lessons found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}