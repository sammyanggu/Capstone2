import React from 'react';

export default function VideoTutorial({ videoId, title, description }) {
  return (
    <div className="mb-8 bg-slate-800 rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-fuchsia-300 mb-2">{title}</h3>
        {description && (
          <p className="text-slate-300">{description}</p>
        )}
      </div>
    </div>
  );
}