import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CssBeginner from './css/CssBeginner';
import CssIntermediate from './css/CssIntermediate';
import CssAdvanced from './css/CssAdvanced';

export default function CssExercise() {
    const { level } = useParams();

    switch(level) {
        case 'beginner':
            return <CssBeginner />;
        case 'intermediate':
            return <CssIntermediate />;
        case 'advanced':
            return <CssAdvanced />;
        default:
            return <Navigate to="/exercises" replace />;
    }
}