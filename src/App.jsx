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
import Tutorials from './pages/Tutorials'
import Exercises from './pages/Exercises'
import SignIn from './pages/SignIn'
import HtmlTutorial from './pages/HtmlTutorial'
import CssTutorial from './pages/CssTutorial'
import JavascriptTutorial from './pages/JavascriptTutorial'
import ExercisesLeetCode from './pages/ExercisesLeetCode'
import Profile from './pages/Profile'
import Lessons from './pages/Lessons'; // <-- Add this import
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
        {/* Tutorials route, protected */}
        <Route path="/tutorials" element={
          <PrivateRoute user={user}>
            <Tutorials />
          </PrivateRoute>
        } />
        {/* HTML Tutorial route, protected */}
        <Route path="/tutorials/html" element={
          <PrivateRoute user={user}>
            <HtmlTutorial />
          </PrivateRoute>
        } />
        {/* CSS Tutorial route, protected */}
        <Route path="/tutorials/css" element={
          <PrivateRoute user={user}>
            <CssTutorial />
          </PrivateRoute>
        } />
        {/* JavaScript Tutorial route, protected */}
        <Route path="/tutorials/javascript" element={
          <PrivateRoute user={user}>
            <JavascriptTutorial />
          </PrivateRoute>
        } />
        {/* Exercises route, protected */}
        <Route path="/exercises" element={
          <PrivateRoute user={user}>
            <Exercises />
          </PrivateRoute>
        } />
        {/* LeetCode-style exercises, protected */}
        <Route path="/exercisesleetcode" element={
          <PrivateRoute user={user}>
            <ExercisesLeetCode />
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
