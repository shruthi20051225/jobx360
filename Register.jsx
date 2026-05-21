import React, { useState } from "react";
import { UserCheck, Building2 } from "lucide-react";
import JobSeekerRegister from "./JobSeekerRegister";
import RecruiterRegister from "./RecruiterRegister";
import "./Register.css";

export default function Register() {
  const [userType, setUserType] = useState(null);

  if (!userType) {
    return (
      <div className="register-container">
        <div className="role-selection">
          <h1>Join JobX360</h1>
          <p>Choose your role to get started</p>

          <div className="role-options">
            <button
              className="role-card job-seeker"
              onClick={() => setUserType("jobseeker")}
            >
              <UserCheck size={48} />
              <h2>Job Seeker</h2>
              <p>Search jobs, apply, and track applications</p>
            </button>

            <button
              className="role-card recruiter"
              onClick={() => setUserType("recruiter")}
            >
              <Building2 size={48} />
              <h2>Recruiter</h2>
              <p>Post jobs and manage candidates</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <button
        className="back-button"
        onClick={() => setUserType(null)}
      >
        ← Back
      </button>
      {userType === "jobseeker" ? (
        <JobSeekerRegister onBack={() => setUserType(null)} />
      ) : (
        <RecruiterRegister onBack={() => setUserType(null)} />
      )}
    </div>
  );
}
