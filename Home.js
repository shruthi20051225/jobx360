import React from "react";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <h1>JobX360</h1>
        <p>Connecting Talent with Opportunities</p>
        <button>Get Started</button>
      </section>

      <section className="services">
        <h2>Our Expertise</h2>

        <div className="cards">
          <div className="card">
            <h3>Talent Acquisition</h3>
            <p>Find the right talent quickly.</p>
          </div>

          <div className="card">
            <h3>HR Consulting</h3>
            <p>Smart HR solutions.</p>
          </div>

          <div className="card">
            <h3>Recruitment Projects</h3>
            <p>Efficient hiring process.</p>
          </div>

          <div className="card">
            <h3>Career Growth</h3>
            <p>Helping professionals grow.</p>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Home;