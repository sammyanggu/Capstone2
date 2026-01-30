// Main application entry point. Sets up routes and authentication state.
// Uses PrivateRoute to protect certain pages for signed-in users only.

// Import global styles
import './index.css'
// Import routing components from React Router
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
// Import Toast notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Import Auth Provider
import { AuthProvider, useAuth } from './AuthContext'
// Import Theme Provider
import { ThemeProvider, useTheme } from './ThemeContext'
// Import navigation bar components
import Nav from './Nav'
import GameNav from './GameNav'
import LearningNav from './LearningNav'
// Import page components
import Home from './pages/Home'
import Docs from './pages/learning/Docs'
import Exercises from './pages/learning/Exercises'
import HtmlTutorial from './pages/learning/docs/HtmlTutorial'
import CssTutorial from './pages/learning/docs/CssTutorial'
import JavascriptTutorial from './pages/learning/docs/JavascriptTutorial'
import PhpTutorial from './pages/learning/docs/PhpTutorial'
import BootstrapTutorial from './pages/learning/docs/BootstrapTutorial'
import TailwindTutorial from './pages/learning/docs/TailwindTutorial'
import PythonTutorial from './pages/learning/docs/PythonTutorial'

import HtmlBeginner from './pages/learning/exercises/html/HtmlBeginner'
import HtmlIntermediate from './pages/learning/exercises/html/HtmlIntermediate'
import HtmlAdvanced from './pages/learning/exercises/html/HtmlAdvanced'
import CssExercise from './pages/learning/exercises/CssExercise'
import JavascriptExercise from './pages/learning/exercises/JavascriptExercise'
import PhpExercise from './pages/learning/exercises/PhpExercise'
import BootstrapBeginner from './pages/learning/exercises/bootstrap/BootstrapBeginner'
import BootstrapIntermediate from './pages/learning/exercises/bootstrap/BootstrapIntermediate'
import BootstrapAdvanced from './pages/learning/exercises/bootstrap/BootstrapAdvanced'
import TailwindBeginner from './pages/learning/exercises/tailwind/TailwindBeginner'
import TailwindIntermediate from './pages/learning/exercises/tailwind/TailwindIntermediate'
import TailwindAdvanced from './pages/learning/exercises/tailwind/TailwindAdvanced'
import PythonExercise from './pages/learning/exercises/PythonExercise'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Analytics from './pages/Analytics'
import UserSearch from './pages/UserSearch'
import PublicUserProfile from './pages/PublicUserProfile'
import Lessons from './pages/learning/lessons'
import LessonDetail from './pages/learning/lessons/LessonDetail'
import Leaderboard from './pages/games/Leaderboard'
import Quiz from './pages/games/Quiz'
import GamesHub from './pages/games/GamesHub'
import GameSelection from './pages/games/GameSelection'
import LearningHub from './pages/games/LearningHub'
import Achievements from './pages/games/Achievements'
import Badges from './pages/games/Badges'
import GameProfile from './pages/games/Profile'
import FourPicsOneWord from './pages/games/FourPicsOneWord'
import BeginnerCrossword from './pages/games/crossword/BeginnerCrossword'
// Import React hooks
import { useEffect, useState } from 'react'

// PrivateRoute component: Only renders children if user is signed in
function PrivateRoute({ user, children }) {
  if (!user) {
    // Show auth modal instead of redirecting
    // We'll handle this through the Nav component
    return <Navigate to="/" replace />
  }
  return children
}

// HTML Exercise Router: Routes to the correct level component
function HtmlExerciseRouter() {
  const { level } = useParams();
  
  switch(level) {
    case 'beginner':
      return <HtmlBeginner />;
    case 'intermediate':
      return <HtmlIntermediate />;
    case 'advanced':
      return <HtmlAdvanced />;
    default:
      return <HtmlBeginner />;
  }
}

// Bootstrap Exercise Router: Routes to the correct level component
function BootstrapExerciseRouter() {
  const { level } = useParams();
  
  switch(level) {
    case 'beginner':
      return <BootstrapBeginner />;
    case 'intermediate':
      return <BootstrapIntermediate />;
    case 'advanced':
      return <BootstrapAdvanced />;
    default:
      return <BootstrapBeginner />;
  }
}

// Tailwind Exercise Router: Routes to the correct level component
function TailwindExerciseRouter() {
  const { level } = useParams();
  
  switch(level) {
    case 'beginner':
      return <TailwindBeginner />;
    case 'intermediate':
      return <TailwindIntermediate />;
    case 'advanced':
      return <TailwindAdvanced />;
    default:
      return <TailwindBeginner />;
  }
}

function AppContent() {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const { theme } = useTheme ? useTheme() : { theme: 'dark' };
  
  // Determine which nav to show based on current route
  const isGamesSection = location.pathname.startsWith('/games');
  const isLearningSection = location.pathname.startsWith('/learning') || 
                            location.pathname.startsWith('/docs') || 
                            location.pathname.startsWith('/exercises') ||
                            location.pathname.startsWith('/lessons') ||
                            location.pathname.startsWith('/profile') ||
                            location.pathname.startsWith('/settings') ||
                            location.pathname.startsWith('/notifications');
  const isHome = location.pathname === '/';

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // Render navigation and routes
  return (
    <>
      {!isHome && isGamesSection && <GameNav user={currentUser} />}
      {!isHome && isLearningSection && <LearningNav user={currentUser} />}
      <Routes>
        {/* Public Home route */}
        <Route path="/" element={<Home />} />
        
        {/* Learning Hub - Gateway to all learning resources */}
        <Route path="/learning" element={
          <PrivateRoute user={currentUser}>
            <LearningHub />
          </PrivateRoute>
        } />
        
        {/* Games Hub - Gateway to all game features */}
        <Route path="/games" element={
          <PrivateRoute user={currentUser}>
            <GameSelection />
          </PrivateRoute>
        } />
        {/* Lessons route, protected */}
        <Route path="/lessons" element={
          <PrivateRoute user={currentUser}>
            <Lessons />
          </PrivateRoute>
        } />
        {/* Lesson Detail route, protected */}
        <Route path="/lessons/:category" element={
          <PrivateRoute user={currentUser}>
            <LessonDetail />
          </PrivateRoute>
        } />
        {/* Documentation route, protected */}
        <Route path="/docs" element={
          <PrivateRoute user={currentUser}>
            <Docs />
          </PrivateRoute>
        } />
        {/* HTML Documentation route, protected */}
        <Route path="/docs/html" element={
          <PrivateRoute user={currentUser}>
            <HtmlTutorial />
          </PrivateRoute>
        } />
        {/* CSS Documentation route, protected */}
        <Route path="/docs/css" element={
          <PrivateRoute user={currentUser}>
            <CssTutorial />
          </PrivateRoute>
        } />
        {/* JavaScript Documentation route, protected */}
        <Route path="/docs/javascript" element={
          <PrivateRoute user={currentUser}>
            <JavascriptTutorial />
          </PrivateRoute>
        } />
        {/* PHP Documentation route, protected */}
        <Route path="/docs/php" element={
          <PrivateRoute user={currentUser}>
            <PhpTutorial />
          </PrivateRoute>
        } />
        {/* Bootstrap Documentation route, protected */}
        <Route path="/docs/bootstrap" element={
          <PrivateRoute user={currentUser}>
            <BootstrapTutorial />
          </PrivateRoute>
        } />
        {/* Tailwind Documentation route, protected */}
        <Route path="/docs/tailwind" element={
          <PrivateRoute user={currentUser}>
            <TailwindTutorial />
          </PrivateRoute>
        } />
        {/* Python Documentation route, protected */}
        <Route path="/docs/python" element={
          <PrivateRoute user={currentUser}>
            <PythonTutorial />
          </PrivateRoute>
        } />
        {/* Exercises routes, protected */}
        <Route path="/exercises" element={
          <PrivateRoute user={currentUser}>
            <Exercises />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/:level" element={
          <PrivateRoute user={currentUser}>
            <HtmlExerciseRouter />
          </PrivateRoute>
        } />
        <Route path="/exercises/css/:level" element={
          <PrivateRoute user={currentUser}>
            <CssExercise />
          </PrivateRoute>
        } />
        <Route path="/exercises/javascript/:level" element={
          <PrivateRoute user={currentUser}>
            <JavascriptExercise />
          </PrivateRoute>
        } />
        <Route path="/exercises/php/:level" element={
          <PrivateRoute user={currentUser}>
            <PhpExercise />
          </PrivateRoute>
        } />
        <Route path="/exercises/bootstrap/:level" element={
          <PrivateRoute user={currentUser}>
            <BootstrapExerciseRouter />
          </PrivateRoute>
        } />
        <Route path="/exercises/tailwind/:level" element={
          <PrivateRoute user={currentUser}>
            <TailwindExerciseRouter />
          </PrivateRoute>
        } />
        <Route path="/exercises/python/:level" element={
          <PrivateRoute user={currentUser}>
            <PythonExercise />
          </PrivateRoute>
        } />

        {/* Profile page, protected */}
        <Route path="/profile" element={
          <PrivateRoute user={currentUser}>
            <Profile />
          </PrivateRoute>
        } />

        {/* Public User Profile page */}
        <Route path="/user/:userId" element={<PublicUserProfile />} />

        {/* Quiz page, protected */}
        <Route path="/games/quiz" element={
          <PrivateRoute user={currentUser}>
            <Quiz />
          </PrivateRoute>
        } />

        {/* Four Pics One Word game, protected */}
        <Route path="/games/fourpicsoneword" element={
          <PrivateRoute user={currentUser}>
            <FourPicsOneWord />
          </PrivateRoute>
        } />

        {/* Beginner Crossword game, protected */}
        <Route path="/games/crossword/beginner" element={
          <PrivateRoute user={currentUser}>
            <BeginnerCrossword />
          </PrivateRoute>
        } />

        {/* Hard Crossword game, protected */}
        <Route path="/games/crossword/hard" element={
          <PrivateRoute user={currentUser}>
            <BeginnerCrossword difficulty="hard" />
          </PrivateRoute>
        } />

        {/* Easy Crossword game, protected */}
        <Route path="/games/crossword/easy" element={
          <PrivateRoute user={currentUser}>
            <BeginnerCrossword difficulty="easy" />
          </PrivateRoute>
        } />

        {/* Achievements page, protected */}
        <Route path="/games/achievements" element={
          <PrivateRoute user={currentUser}>
            <Achievements />
          </PrivateRoute>
        } />
        {/* Badges page, protected */}
        <Route path="/games/badges" element={
          <PrivateRoute user={currentUser}>
            <Badges />
          </PrivateRoute>
        } />

        {/* Game Profile page, protected */}
        <Route path="/games/profile" element={
          <PrivateRoute user={currentUser}>
            <GameProfile />
          </PrivateRoute>
        } />

        {/* Leaderboard page, protected */}
        <Route path="/games/leaderboard" element={
          <PrivateRoute user={currentUser}>
            <Leaderboard />
          </PrivateRoute>
        } />

        {/* Quiz page, protected */}
        <Route path="/games/quiz" element={
          <PrivateRoute user={currentUser}>
            <Quiz />
          </PrivateRoute>
        } />

        {/* Achievements page, protected */}
        <Route path="/games/achievements" element={
          <PrivateRoute user={currentUser}>
            <Achievements />
          </PrivateRoute>
        } />

        {/* Badges page, protected */}
        <Route path="/games/badges" element={
          <PrivateRoute user={currentUser}>
            <Badges />
          </PrivateRoute>
        } />

        {/* Game Profile page, protected */}
        <Route path="/games/profile" element={
          <PrivateRoute user={currentUser}>
            <GameProfile />
          </PrivateRoute>
        } />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme || 'dark'}
      />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

// Export the App component
export default App
