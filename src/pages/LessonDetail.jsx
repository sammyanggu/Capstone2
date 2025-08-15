import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/capstone-backend/api/lessons.php?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">Loading lesson...</div>;
  if (error) return <div className="max-w-xl mx-auto mt-10 p-6 bg-red-100 text-red-700 rounded shadow text-center">Error: {error}</div>;
  if (!lesson) return <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">No lesson found.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
      <p className="mb-4">{lesson.content || 'No content available.'}</p>
      <Link to="/lessons" className="text-blue-600 hover:underline">&larr; Back to Lessons</Link>
    </div>
  );
}