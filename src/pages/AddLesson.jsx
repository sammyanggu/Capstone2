import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddLesson() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/capstone-backend/api/addLesson.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || 'Lesson added!');
        setTimeout(() => navigate('/lessons'), 1000);
      })
      .catch(() => setMessage('Error adding lesson.'));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-2">Add Lesson</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="border rounded px-3 py-2 min-h-[100px]"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
      {message && <div className="text-green-600">{message}</div>}
    </form>
  );
}