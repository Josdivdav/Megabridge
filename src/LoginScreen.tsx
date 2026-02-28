import { useState } from "react";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./constants/LoginScreen.css";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      window.alert("Please fill in all fields");
      return;
    }
    console.log("Login attempt:", { email, password, rememberMe });
    window.alert("Logged in successfully!");
    navigate("/home");
  };

  const handleForgotPassword = () => {
    window.alert("Password reset link will be sent to your email.");
  };

  return (
    <div className="container">
      <div className="card">

        {/* Header */}
        <div className="logoContainer">
          <div className="logo">
            <img src="/logo7.png" className="logoMain"/>
          </div>
          <p>Secure access to your VTU services</p>
        </div>

        {/* Email / Username */}
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="inputContainer">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="eyeBtn"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Remember me + Forgot password */}
        <div className="optionsContainer">
          <div
            className="rememberMe"
            onClick={() => setRememberMe(!rememberMe)}
            role="checkbox"
            aria-checked={rememberMe}
            tabIndex={0}
            onKeyDown={(e) => e.key === " " && setRememberMe(!rememberMe)}
          >
            <div className={`checkbox ${rememberMe ? "checked" : ""}`}>
              {rememberMe && <FaCheck size={10} />}
            </div>
            <span>Remember Me</span>
          </div>

          <span className="forgot" onClick={handleForgotPassword}>
            Forgot Password?
          </span>
        </div>

        {/* Sign In */}
        <button className="loginButton" onClick={handleLogin}>
          Sign In
        </button>

        {/* Sign Up */}
        <div className="signupContainer">
          <span>Don't have an account?</span>
          <span className="signupLink" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </div>

      </div>
    </div>
  );
}
