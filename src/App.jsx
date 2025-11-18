// Main application entry point. Sets up routes and authentication state.
// Uses PrivateRoute to protect certain pages for signed-in users only.

// Import global styles
import './index.css'
// Import routing components from React Router
import { Routes, Route, Navigate } from 'react-router-dom'
// Import Toast notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Import Auth Provider
import { AuthProvider, useAuth } from './AuthContext'
// Import navigation bar component
import Nav from './Nav'
// Import page components
import Home from './pages/Home'
import Docs from './pages/Docs'
import Exercises from './pages/Exercises'
import HtmlTutorial from './pages/docs/HtmlTutorial'
import CssTutorial from './pages/docs/CssTutorial'
import JavascriptTutorial from './pages/docs/JavascriptTutorial'
import PhpTutorial from './pages/docs/PhpTutorial'
import BootstrapTutorial from './pages/docs/BootstrapTutorial'
import TailwindTutorial from './pages/docs/TailwindTutorial'

import HtmlBeginner from './pages/exercises/html/HtmlBeginner'
import HtmlIntermediate from './pages/exercises/html/HtmlIntermediate'
import HtmlAdvanced from './pages/exercises/html/HtmlAdvanced'
import CssExercise from './pages/exercises/CssExercise'
import JavascriptExercise from './pages/exercises/JavascriptExercise'
import PhpExercise from './pages/exercises/PhpExercise'
import Profile from './pages/Profile'
import Lessons from './pages/lessons'
import LessonDetail from './pages/lessons/LessonDetail'
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

function AppContent() {
  const { currentUser, loading } = useAuth();


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // Render navigation and routes
  return (
    <>
      <Nav user={currentUser} />
      <Routes>
        {/* Public Home route */}
        <Route path="/" element={<Home />} />
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
        {/* Exercises routes, protected */}
        <Route path="/exercises" element={
          <PrivateRoute user={currentUser}>
            <Exercises />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/beginner" element={
          <PrivateRoute user={currentUser}>
            <HtmlBeginner />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/intermediate" element={
          <PrivateRoute user={currentUser}>
            <HtmlIntermediate />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/advanced" element={
          <PrivateRoute user={currentUser}>
            <HtmlAdvanced />
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

        {/* Profile page, protected */}
        <Route path="/profile" element={
          <PrivateRoute user={currentUser}>
            <Profile />
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
        theme="light"
      />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

// Export the App component
export default App
