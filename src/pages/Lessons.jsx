import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('Please sign in to view lessons');
        }

        const response = await axios.get(`http://localhost/capstone-backend/api/lessons.php?userId=${user.uid}`);
        setLessons(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      }
    };

    fetchLessons();
  }, []);

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const techIcons = {
    html: '/assets/html.svg',
    css: '/assets/css.svg',
    javascript: '/assets/javascript.svg'
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesTech = selectedTech === 'all' || lesson.tech.toLowerCase() === selectedTech;
    const matchesLevel = selectedLevel === 'all' || lesson.difficulty.toLowerCase() === selectedLevel;
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTech && matchesLevel && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-fuchsia-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-fuchsia-500">Lessons & Tutorials</h1>
          
          <div className="flex flex-wrap gap-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
            />

            {/* Technology Filter */}
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
            >
              <option value="all">All Technologies</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-fuchsia-500 text-xl">No lessons found</div>
            <p className="text-slate-400 mt-2">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <div key={lesson.id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Lesson Card Header */}
                <div className="relative h-48 bg-slate-700">
                  {lesson.thumbnail ? (
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={techIcons[lesson.tech.toLowerCase()]}
                        alt={lesson.tech}
                        className="w-24 h-24 opacity-50"
                      />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[lesson.difficulty.toLowerCase()]}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>

                {/* Lesson Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={techIcons[lesson.tech.toLowerCase()]}
                      alt={lesson.tech}
                      className="w-6 h-6"
                    />
                    <span className="text-fuchsia-400 text-sm font-medium">{lesson.tech}</span>
                  </div>

                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="block mb-3"
                  >
                    <h3 className="text-xl font-semibold text-white hover:text-fuchsia-400 transition-colors duration-200">
                      {lesson.title}
                    </h3>
                  </Link>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Est. Time:</span>
                      <span className="text-sm text-fuchsia-400">{lesson.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">XP:</span>
                      <span className="text-sm text-fuchsia-400">{lesson.xp} pts</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="block w-full text-center py-2 px-4 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors duration-200"
                    >
                      Start Lesson
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lessons;