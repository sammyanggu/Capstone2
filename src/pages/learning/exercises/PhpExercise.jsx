import { useParams, Navigate } from 'react-router-dom';
import PhpBeginner from './php/PhpBeginner';
import PhpIntermediate from './php/PhpIntermediate';
import PhpAdvanced from './php/PhpAdvanced';

function PhpExercise() {
    const { level } = useParams();

    switch (level) {
        case 'beginner':
            return <PhpBeginner />;
        case 'intermediate':
            return <PhpIntermediate />;
        case 'advanced':
            return <PhpAdvanced />;
        default:
            return <Navigate to="/exercises" replace />;
    }
}

export default PhpExercise;


