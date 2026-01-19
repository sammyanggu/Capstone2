import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PythonBeginner from './python/PythonBeginner';
import PythonIntermediate from './python/PythonIntermediate';
import PythonAdvanced from './python/PythonAdvanced';

export default function PythonExercise() {
    const { level } = useParams();

    switch(level) {
        case 'beginner':
            return <PythonBeginner />;
        case 'intermediate':
            return <PythonIntermediate />;
        case 'advanced':
            return <PythonAdvanced />;
        default:
            return <Navigate to="/exercises" replace />;
    }
}
