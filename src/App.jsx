// Main application entry point. Sets up routes and authentication state.
// Uses PrivateRoute to protect certain pages for signed-in users only.

// Import global styles
import './index.css'
// Import routing components from React Router
import { Routes, Route, Navigate } from 'react-router-dom'
// Import Toast notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Import navigation bar component
import Nav from './Nav'
// Import page components
import Home from './pages/Home'
import Docs from './pages/Docs'
import Exercises from './pages/Exercises'
import SignIn from './pages/SignIn'
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
import Profile from './pages/Profile'
import Lessons from './pages/lessons'
import LessonDetail from './pages/lessons/LessonDetail'
// Import React hooks
import { useEffect, useState } from 'react'
// Import Firebase authentication helpers
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

// PrivateRoute component: Only renders children if user is signed in
function PrivateRoute({ user, children }) {
  if (!user) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/signin" replace />
  }
  return children
}

function App() {
  // State to hold the current user
  const [user, setUser] = useState(null)

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // Sign out handler
  const handleSignOut = () => signOut(auth)

  // Render navigation and routes
  return (
    <>
      <Nav user={user} onSignOut={handleSignOut} />
      <Routes>
        {/* Public Home route */}
        <Route path="/" element={<Home />} />
        {/* Lessons route, protected */}
        <Route path="/lessons" element={
          <PrivateRoute user={user}>
            <Lessons />
          </PrivateRoute>
        } />
        {/* Lesson Detail route, protected */}
        <Route path="/lessons/:category" element={
          <PrivateRoute user={user}>
            <LessonDetail />
          </PrivateRoute>
        } />
        {/* Documentation route, protected */}
        <Route path="/docs" element={
          <PrivateRoute user={user}>
            <Docs />
          </PrivateRoute>
        } />
        {/* HTML Documentation route, protected */}
        <Route path="/docs/html" element={
          <PrivateRoute user={user}>
            <HtmlTutorial />
          </PrivateRoute>
        } />
        {/* CSS Documentation route, protected */}
        <Route path="/docs/css" element={
          <PrivateRoute user={user}>
            <CssTutorial />
          </PrivateRoute>
        } />
        {/* JavaScript Documentation route, protected */}
        <Route path="/docs/javascript" element={
          <PrivateRoute user={user}>
            <JavascriptTutorial />
          </PrivateRoute>
        } />
        {/* PHP Documentation route, protected */}
        <Route path="/docs/php" element={
          <PrivateRoute user={user}>
            <PhpTutorial />
          </PrivateRoute>
        } />
        {/* Bootstrap Documentation route, protected */}
        <Route path="/docs/bootstrap" element={
          <PrivateRoute user={user}>
            <BootstrapTutorial />
          </PrivateRoute>
        } />
        {/* Tailwind Documentation route, protected */}
        <Route path="/docs/tailwind" element={
          <PrivateRoute user={user}>
            <TailwindTutorial />
          </PrivateRoute>
        } />
        {/* Exercises routes, protected */}
        <Route path="/exercises" element={
          <PrivateRoute user={user}>
            <Exercises />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/beginner" element={
          <PrivateRoute user={user}>
            <HtmlBeginner />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/intermediate" element={
          <PrivateRoute user={user}>
            <HtmlIntermediate />
          </PrivateRoute>
        } />
        <Route path="/exercises/html/advanced" element={
          <PrivateRoute user={user}>
            <HtmlAdvanced />
          </PrivateRoute>
        } />
        <Route path="/exercises/css/:level" element={
          <PrivateRoute user={user}>
            <CssExercise />
          </PrivateRoute>
        } />
        <Route path="/exercises/javascript/:level" element={
          <PrivateRoute user={user}>
            <JavascriptExercise />
          </PrivateRoute>
        } />

        {/* Profile page, protected */}
        <Route path="/profile" element={
          <PrivateRoute user={user}>
            <Profile />
          </PrivateRoute>
        } />
        {/* Sign-in page, public */}
        <Route path="/signin" element={<SignIn />} />
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
        theme="dark"
      />
    </>
  )
}

// Export the App component
export default App
