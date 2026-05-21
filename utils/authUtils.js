// Form validation utilities
export const validateJobSeekerForm = (formData) => {
  const errors = {};

  // Full Name validation
  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (formData.fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation (if provided)
  if (formData.phone && !/^[\d\s\-+()]*$/.test(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // LinkedIn URL validation (if provided)
  if (formData.linkedinUrl && !isValidUrl(formData.linkedinUrl)) {
    errors.linkedinUrl = "Please enter a valid URL";
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = "Password must contain uppercase, lowercase, and number";
  }

  // Confirm password
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Terms agreement
  if (!formData.agreeTerms) {
    errors.agreeTerms = "You must agree to the terms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRecruiterForm = (formData) => {
  const errors = {};

  // Company Name validation
  if (!formData.companyName.trim()) {
    errors.companyName = "Company name is required";
  } else if (formData.companyName.length < 2) {
    errors.companyName = "Company name must be at least 2 characters";
  }

  // Full Name validation
  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (formData.fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation (if provided)
  if (formData.phone && !/^[\d\s\-+()]*$/.test(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // Company Website validation (if provided)
  if (formData.companyWebsite && !isValidUrl(formData.companyWebsite)) {
    errors.companyWebsite = "Please enter a valid URL";
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = "Password must contain uppercase, lowercase, and number";
  }

  // Confirm password
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Terms agreement
  if (!formData.agreeTerms) {
    errors.agreeTerms = "You must agree to the terms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// URL validation helper
const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

// Mock registration handler - replace with actual API call
export const handleRegistration = async (formData, userType) => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // In production, this would be an actual API call
      // Example: POST to /api/auth/register
      const userData = {
        ...formData,
        userType,
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage for demo purposes
      // In production, use secure server-side storage
      const users = JSON.parse(localStorage.getItem("jobx360_users") || "[]");

      // Check if email already exists
      if (users.some((u) => u.email === formData.email)) {
        reject(new Error("Email already registered"));
        return;
      }

      users.push({
        id: Date.now(),
        ...userData,
      });

      localStorage.setItem("jobx360_users", JSON.stringify(users));
      localStorage.setItem("jobx360_currentUser", JSON.stringify(userData));

      resolve(userData);
    }, 1000);
  });
};

// Login handler
export const handleLogin = async (email, password, userType) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("jobx360_users") || "[]");
      const user = users.find(
        (u) => u.email === email && u.userType === userType && u.password === password
      );

      if (!user) {
        reject(new Error("Invalid email or password"));
        return;
      }

      localStorage.setItem("jobx360_currentUser", JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("jobx360_currentUser");
  return user ? JSON.parse(user) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem("jobx360_currentUser");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser();
};
