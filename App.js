import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <a className="skip" href="#main" style={{position:'absolute',left:-9999}}>Skip to content</a>

      <nav className="site-nav" role="navigation" aria-label="Main navigation">
        <div className="container nav-inner">
          <div className="brand">
            <div className="logo" aria-hidden="true" />
            <span>JobX360</span>
          </div>

          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            ☰
          </button>

          <div className={`links ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="main">
        <header className="hero">
          <div className="container">
            <h1>Find your next opportunity with JobX360</h1>
            <p>Search jobs, apply faster, and get career tips — all in one place.</p>
            <a className="cta" href="#services">Get Started</a>
          </div>
        </header>

        <section id="services" className="services container">
          <h2>Our Services</h2>
          <div className="cards" role="list">
            <article className="card" role="listitem">
              <h3>Job Listings</h3>
              <p>Hundreds of new jobs added daily.</p>
              <a className="cta" href="#apply">Explore</a>
            </article>

            <article className="card" role="listitem">
              <h3>Resume Help</h3>
              <p>Improve your resume with expert tips.</p>
              <a className="cta" href="#resume">Learn more</a>
            </article>

            <article className="card" role="listitem">
              <h3>Interview Prep</h3>
              <p>Practice with mock interviews.</p>
              <a className="cta" href="#interview">Start</a>
            </article>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">© {new Date().getFullYear()} JobX360 — All rights reserved</div>
      </footer>
    </div>
  );
}
