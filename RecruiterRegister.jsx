import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { validateRecruiterForm, handleRegistration } from "./utils/authUtils";
import { toast } from "sonner";
import "./Register.css";

export default function RecruiterRegister({ onBack }) {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    fullName: "",
    phone: "",
    jobTitle: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRecruiterForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      await handleRegistration(formData, "recruiter");
      toast.success("Registration successful! Redirecting...");
      // Redirect to recruiter dashboard
      setTimeout(() => {
        window.location.href = "/recruiter-dashboard";
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Create Recruiter Account</h1>
      <p>Post jobs and manage your hiring process</p>

      {/* Company Information */}
      <fieldset>
        <legend>Company Information</legend>

        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company Inc."
            required
          />
          {errors.companyName && (
            <span className="error">{errors.companyName}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="companySize">Company Size</label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
            >
              <option value="">Select size</option>
              <option value="1-50">1-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-1000">201-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="companyWebsite">Company Website</label>
          <input
            id="companyWebsite"
            type="url"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="https://www.yourcompany.com"
          />
          {errors.companyWebsite && (
            <span className="error">{errors.companyWebsite}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location">Company Headquarters</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
          />
        </div>
      </fieldset>

      {/* Recruiter Information */}
      <fieldset>
        <legend>Your Information</legend>

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
            <label htmlFor="email">Work Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
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
          <label htmlFor="jobTitle">Your Job Title</label>
          <input
            id="jobTitle"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g., HR Manager, Hiring Manager"
          />
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
