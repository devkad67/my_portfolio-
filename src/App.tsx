import { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector('.app-header');

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 12);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle intersection observer for reveal animations
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll(
      '.section-title, .section-lead, .section-head, .prose p, .timeline-item, .project-card, .skill-category, .contact-social-row, .hero-visual, .blog-preview-card, .blog-card-page'
    );
    
    elementsToAnimate.forEach((el: any, index) => {
      el.classList.add('reveal-up');
      if(el.classList.contains('project-card') || el.classList.contains('timeline-item') || el.classList.contains('skill-category')) {
         el.style.transitionDelay = `${(index % 3) * 150}ms`;
      }
    });

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-root">
      <div 
        className="scroll-progress" 
        style={{ 
          width: `${scrollProgress}%`,
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'var(--highlight-color)',
          zIndex: 1000,
          transition: 'width 0.1s ease-out'
        }} 
      />
      <header className="app-header">
        <div className="container header-container">
          <Link to="/" className="logo">
            <strong>dev_kad</strong>
          </Link>
          <div className="header-right">
            <nav className="desktop-nav" aria-label="Primary">
              <ul className="nav-links">
                <li><a href="/#about">About</a></li>
                <li><a href="/#education">Education</a></li>
                <li><a href="/#experience">Experience</a></li>
                <li><a href="/#skills">Skills</a></li>
                <li><a href="/#projects">Projects</a></li>
                <li>
                  <NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-active' : undefined)}>
                    Blog
                  </NavLink>
                </li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </nav>
            <button 
              id="theme-toggle" 
              className="theme-toggle" 
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>
            <button 
              id="hamburger" 
              className={`hamburger ${isMenuOpen ? 'is-active' : ''}`} 
              aria-label="Open Menu" 
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        {/* Mobile Nav Drawer */}
        <div 
          id="mobile-nav" 
          className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} 
          aria-hidden={!isMenuOpen}
        >
          <ul className="mobile-nav-links">
            <li><a href="/#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="/#education" onClick={() => setIsMenuOpen(false)}>Education</a></li>
            <li><a href="/#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="/#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
            <li><a href="/#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
            <li>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li><a href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      
      <footer className="app-footer">
        <div className="container footer-content">
          <div>
            <h3>dev_kad</h3>
            <p>Frontend developer · React, TypeScript, Node</p>
            <p className="copyright">© {new Date().getFullYear()} Kelvin. Built with React &amp; Vite.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
            <a href="https://github.com/kaddev" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
