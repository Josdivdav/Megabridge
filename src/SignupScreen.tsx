import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCheck, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./constants/SignupScreen.css";

export default function SignupScreen() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 'none', score: 0, message: '' };
    
    const checks = validatePassword(password);
    const score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 2) return { strength: 'weak', score, message: 'Weak password' };
    if (score <= 4) return { strength: 'medium', score, message: 'Medium password' };
    return { strength: 'strong', score, message: 'Strong password' };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  
  const errors = {
    fullName: touched.fullName && !formData.fullName.trim() ? "Full name is required" : "",
    email: touched.email && !validateEmail(formData.email) ? "Please enter a valid email" : "",
    username: touched.username && !formData.username.trim() ? "Username is required" : "",
    password: touched.password ? (
      !formData.password ? "Password is required" :
      formData.password.length < 8 ? "Password must be at least 8 characters" :
      !validatePassword(formData.password).hasUpperCase ? "Include at least one uppercase letter" :
      !validatePassword(formData.password).hasLowerCase ? "Include at least one lowercase letter" :
      !validatePassword(formData.password).hasNumber ? "Include at least one number" :
      !validatePassword(formData.password).hasSpecialChar ? "Include at least one special character" : ""
    ) : "",
    confirmPassword: touched.confirmPassword && formData.password !== formData.confirmPassword ? "Passwords do not match" : ""
  };

  const isValid = !Object.values(errors).some(error => error) && acceptTerms;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSignUp = () => {
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      username: true,
      password: true,
      confirmPassword: true
    });

    if (!isValid) {
      if (!acceptTerms) {
        window.alert("Please accept the Terms and Conditions to continue.");
      } else {
        window.alert("Please fix the errors in the form before submitting.");
      }
      return;
    }

    console.log("Sign up attempt:", formData);
    window.alert("Account created successfully! Please check your email to verify your account.");
    navigate("/login");
  };

  const handleTermsClick = () => {
    window.alert("Terms and Conditions:\n\n1. You must be at least 18 years old\n2. Provide accurate information\n3. Keep your account credentials secure\n4. Comply with all applicable laws\n\nPlease read our full Terms of Service for more details.");
  };

  const handlePrivacyClick = () => {
    window.alert("Privacy Policy:\n\nWe respect your privacy and are committed to protecting your personal data. Your information will be used only for providing and improving our services.");
  };

  return (
    <div className="container">
      <div className="card">

        {/* Header */}
        <div className="logoContainer">
          <div className="logo">
            <img src="/logo7.png" className="logoMain" alt="Logo" />
          </div>
          <p>Create your VTU account</p>
        </div>

        {/* Full Name */}
        <div className={`inputContainer ${errors.fullName ? 'error' : touched.fullName && formData.fullName ? 'valid' : ''}`}>
          <span className="icon"><FaUser /></span>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={() => handleBlur('fullName')}
          />
        </div>
        <div className="validationMessage">{errors.fullName}</div>

        {/* Email */}
        <div className={`inputContainer ${errors.email ? 'error' : touched.email && validateEmail(formData.email) ? 'valid' : ''}`}>
          <span className="icon"><FaEnvelope /></span>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
          />
        </div>
        <div className="validationMessage">{errors.email}</div>

        {/* Username */}
        <div className={`inputContainer ${errors.username ? 'error' : touched.username && formData.username ? 'valid' : ''}`}>
          <span className="icon"><FaUser /></span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={() => handleBlur('username')}
          />
        </div>
        <div className="validationMessage">{errors.username}</div>

        {/* Password */}
        <div className={`inputContainer ${errors.password ? 'error' : touched.password && passwordStrength.strength === 'strong' ? 'valid' : ''}`}>
          <span className="icon"><FaLock /></span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur('password')}
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

        {/* Password Strength Indicator */}
        {formData.password && touched.password && (
          <div className="passwordStrength">
            <div className="strengthBar">
              <div className={`strengthFill ${passwordStrength.strength}`} />
            </div>
            <div className={`strengthText ${passwordStrength.strength}`}>
              <span>Password strength: </span>
              {passwordStrength.message}
            </div>
          </div>
        )}
        <div className="validationMessage">{errors.password}</div>

        {/* Confirm Password */}
        <div className={`inputContainer ${errors.confirmPassword ? 'error' : touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword ? 'valid' : ''}`}>
          <span className="icon"><FaLock /></span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() => handleBlur('confirmPassword')}
          />
          <button
            className="eyeBtn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="validationMessage">{errors.confirmPassword}</div>

        {/* Terms and Conditions */}
        <div
          className="termsContainer"
          onClick={() => setAcceptTerms(!acceptTerms)}
          role="checkbox"
          aria-checked={acceptTerms}
          tabIndex={0}
          onKeyDown={(e) => e.key === " " && setAcceptTerms(!acceptTerms)}
        >
          <div className={`checkbox ${acceptTerms ? "checked" : ""} ${!acceptTerms && touched.confirmPassword ? "error" : ""}`}>
            {acceptTerms && <FaCheck size={10} />}
          </div>
          <span className="termsText">
            I agree to the{" "}
            <span className="termsLink" onClick={(e) => { e.stopPropagation(); handleTermsClick(); }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="termsLink" onClick={(e) => { e.stopPropagation(); handlePrivacyClick(); }}>
              Privacy Policy
            </span>
          </span>
        </div>

        {/* Sign Up Button */}
        <button 
          className="signupButton" 
          onClick={handleSignUp}
          disabled={!isValid}
        >
          Create Account
        </button>

        {/* Sign In Link */}
        <div className="signinContainer">
          <span>Already have an account?</span>
          <span className="signinLink" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </div>

      </div>
    </div>
  );
}