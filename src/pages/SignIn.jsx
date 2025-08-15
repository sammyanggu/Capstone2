// Sign In page. Handles Google sign-in and error display.
// Redirects to homepage on successful sign-in.

// Import React hooks for side effects and state management
import { useEffect, useState } from "react";
// Import Firebase sign-in method
import { signInWithPopup } from "firebase/auth";
// Import Firebase authentication and Google provider
import { auth, provider } from "../firebase";
// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

function SignIn() {
    // Get navigation function
    const navigate = useNavigate();
    // State to track loading/auth check
    const [loading, setLoading] = useState(true);

    // Effect: Listen for authentication state changes
    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoading(false); // Auth check done
            if (user) {
                navigate("/profile"); // Redirect if signed in
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    // Effect: Show Google sign-in popup if not signed in
    useEffect(() => {
        // Only show popup after auth check and if user not signed in
        if (!loading && !auth.currentUser) {
            signInWithPopup(auth, provider)
                .then(() => {
                    navigate("/profile"); // Redirect on success
                })
                .catch(() => {
                    navigate("/"); // Redirect to home on error
                });
        }
    }, [loading, navigate]);

    // Render nothing (no UI for this page)
    return null;
}

// Export the SignIn component
export default SignIn;