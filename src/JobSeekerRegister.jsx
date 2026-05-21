import React, { useState } from "react";
import { Upload, Eye, EyeOff } from "lucide-react";
import { validateJobSeekerForm, handleRegistration } from "./utils/authUtils";
import { toast } from "sonner";
import "./Register.css";

export default function JobSeekerRegister({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    experience: "",
    resume: null,
    profilePhoto: null,
    linkedinUrl: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] || null
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateJobSeekerForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      await handleRegistration(formData, "jobseeker");
      toast.success("Registration successful! Redirecting...");
      // Redirect to dashboard or login
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Create Job Seeker Account</h1>
      <p>Build your profile and start applying to jobs</p>

      {/* Personal Information */}
      <fieldset>
        <legend>Personal Information</legend>

        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="linkedinUrl">LinkedIn Profile</label>
          <input
            id="linkedinUrl"
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />
          {errors.linkedinUrl && <span className="error">{errors.linkedinUrl}</span>}
        </div>
      </fieldset>

      {/* Professional Information */}
      <fieldset>
        <legend>Professional Information</legend>

        <div className="form-group">
          <label htmlFor="experience">Years of Experience</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills (comma-separated)</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React, Node.js, SQL"
            rows="3"
          />
        </div>
      </fieldset>

      {/* File Uploads */}
      <fieldset>
        <legend>Documents & Media</legend>

        <div className="file-upload-group">
          <label htmlFor="resume">Resume (PDF/DOC)</label>
          <div className="file-input-wrapper">
            <Upload size={20} />
            <span>{formData.resume?.name || "Choose file"}</span>
            <input
              id="resume"
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
            />
          </div>
          {errors.resume && <span className="error">{errors.resume}</span>}
        </div>

        <div className="file-upload-group">
          <label htmlFor="profilePhoto">Profile Photo</label>
          <div className="file-input-wrapper">
            <Upload size={20} />
            <span>{formData.profilePhoto?.name || "Choose file"}</span>
            <input
              id="profilePhoto"
              type="file"
              name="profilePhoto"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
        </div>
      </fieldset>

      {/* Security */}
      <fieldset>
        <legend>Security</legend>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-input">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
      </fieldset>

      {/* Terms & Conditions */}
      <div className="form-group checkbox">
        <input
          id="agreeTerms"
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          required
        />
        <label htmlFor="agreeTerms">
          I agree to the Terms of Service and Privacy Policy *
        </label>
        {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
      </div>

      {/* Submit Button */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </form>
  );
}
