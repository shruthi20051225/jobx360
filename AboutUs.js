import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="page-wrapper">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-header-title">About Us</h1>
          <p className="page-header-subtitle">Your Trusted Recruitment Partner</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content-section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="about-heading">Who We Are</h2>
              <p className="about-paragraph">
                JobX360 provides an array of HR consulting services for Small to Large sized Organizations. 
                Think of JobX360 as a full service talent acquisition and recruitment team at your fingertips!
              </p>
              <p className="about-paragraph">
                Our Recruitment consultants can assist you with Recruitment projects that you simply don't 
                have the time, expertise or resources to address effectively. Providing exceptional performance 
                to your Recruitment needs is what we do best.
              </p>
            </div>

            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885" 
                alt="Professional team collaboration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose JobX360?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Award size={40} />
              </div>
              <h3 className="feature-title">Industry Expertise</h3>
              <p className="feature-description">
                Years of experience across IT, Engineering, Manufacturing, Healthcare, and more.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={40} />
              </div>
              <h3 className="feature-title">Dedicated Team</h3>
              <p className="feature-description">
                A full-service recruitment team committed to your success at every step.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={40} />
              </div>
              <h3 className="feature-title">Fast & Efficient</h3>
              <p className="feature-description">
                Quick turnaround times without compromising on quality or candidate fit.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle size={40} />
              </div>
              <h3 className="feature-title">Proven Results</h3>
              <p className="feature-description">
                Track record of successful placements and satisfied clients across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="services-detail-section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <CheckCircle className="service-check" size={24} />
              <div>
                <h4>End-to-End Recruitment</h4>
                <p>Complete hiring solutions from job posting to candidate onboarding.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="service-check" size={24} />
              <div>
                <h4>Executive Search</h4>
                <p>Specialized recruitment for leadership and senior management positions.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="service-check" size={24} />
              <div>
                <h4>Contract Staffing</h4>
                <p>Flexible staffing solutions for temporary and project-based needs.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="service-check" size={24} />
              <div>
                <h4>HR Consulting</h4>
                <p>Strategic HR advisory services to optimize your talent management.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="service-check" size={24} />
              <div>
                <h4>Talent Pool Development</h4>
                <p>Building and maintaining a database of qualified candidates.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="service-check" size={24} />
              <div>
                <h4>Industry-Specific Recruitment</h4>
                <p>Specialized hiring for IT, Engineering, Healthcare, and more sectors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;