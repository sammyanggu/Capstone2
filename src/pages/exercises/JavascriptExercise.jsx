import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import JsBeginner from './javascript/JsBeginner';
import JsIntermediate from './javascript/JsIntermediate';
import JsAdvanced from './javascript/JsAdvanced';

export default function JavascriptExercise() {
  const { level } = useParams();

  switch(level) {
    case 'beginner':
      return <JsBeginner />;
    case 'intermediate':
      return <JsIntermediate />;
    case 'advanced':
      return <JsAdvanced />;
    default:
      return <Navigate to="/exercises" replace />;
  }
}
