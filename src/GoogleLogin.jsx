import { auth, googleProvider } from "./firebase.js";
import { signInWithPopup } from "firebase/auth";

function GoogleLogin() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <button className="navbar-google-login-btn" onClick={handleLogin}>
      Login / Sign up
    </button>
  );
}

export default GoogleLogin;