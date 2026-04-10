import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/me.png';

interface Article {
  title: string;
  description: string;
  url: string;
  published_timestamp: string;
}
import realEstateIcon from '../assets/real_estate.png';
import campusIcon from '../assets/campus.png';
import formFlowIcon from '../assets/formflow.png';
import portfolioIcon from '../assets/portfolio.png';
import frontendIcon from '../assets/frontend_tech.png';
import backendIcon from '../assets/backend_tech.png';
import toolsIcon from '../assets/tools_tech.png';

const projects = [
  {
    title: "Real Estate platform",
    description: "A modern real estate platform for browsing and managing property listings. Built with a focus on clean UI and smooth filtering.",
    link: "#",
    linkText: "View Project",
    tags: ["React", "Node.js", "Express"],
    image: realEstateIcon
  },
  {
    title: "Campus Marketplace",
    description: "A peer-to-peer marketplace designed for university students to buy and trade items within their community.",
    link: "#",
    linkText: "View Project",
    tags: ["React", "Firebase", "Tailwind"],
    image: campusIcon
  },
  {
    title: "FormFlow",
    description: "A developer-friendly form builder and submission handler. Create and analyze form data without writing backend code.",
    link: "#",
    linkText: "View Project",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    image: formFlowIcon
  },
  {
    title: "Developer Portfolio",
    description: "A high-performance, professional portfolio with dynamic themes, scroll-animations, and a rich React architecture.",
    link: "https://github.com/devkad67/my_portfolio-",
    linkText: "View Source",
    liveLink: "/",
    liveLinkText: "View Live",
    tags: ["React", "TS", "Vite"],
    image: portfolioIcon
  }
];

const skillCategories = [
  {
    title: "Frontend Engineering",
    description: "Building responsive, accessible, and high-performance interfaces using modern frameworks and standard design principles.",
    skills: [
      { name: "React", icon: "devicon-react-original" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Astro", icon: "devicon-astro-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-original" },
      { name: "Vanilla CSS", icon: "devicon-css3-plain" }
    ],
    icon: frontendIcon
  },
  {
    title: "Backend & Database",
    description: "Architecting scalable server-side logic and robust database schemas to power data-driven applications.",
    skills: [
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "Express", icon: "devicon-express-original" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "REST APIs", icon: "devicon-azuresqldatabase-plain" },
      { name: "GraphQL", icon: "devicon-graphql-plain" }
    ],
    icon: backendIcon
  },
  {
    title: "Tools & Architecture",
    description: "Leveraging modern DevOps practices and design systems to streamline development and ensure code quality.",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "Vercel", icon: "devicon-vercel-original" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Jest", icon: "devicon-jest-plain" },
      { name: "CI/CD", icon: "devicon-githubactions-plain" },
      { name: "Figma", icon: "devicon-figma-plain" }
    ],
    icon: toolsIcon
  }
];

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xqegvpbd', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        setStatusMessage("Thanks! Your message has been sent successfully.");
        form.reset();
      } else {
        const data = await response.json();
        setFormStatus('error');
        setStatusMessage(data.errors ? data.errors[0].message : "Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      setFormStatus('error');
      setStatusMessage("Oops! There was a problem submitting your form.");
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=kaddev&per_page=3');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (err) {
        console.error("Home Feed Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName('project-card');
      for (const card of cards as any) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="section hero-section container">
        <p className="greeting">Hi, I'm dev_kad.</p>
        <h1 className="hero-title">
          I craft fast, scalable applications using <br className="desktop-br"/> 
          <span className="hero-highlight">React, TypeScript, Astro, & Node.js</span>
        </h1>
        <p className="hero-subtitle">
          A Frontend Developer dedicated to building performant, pixel-perfect web applications. I bridge the gap between complex technical logic and intentional, high-end user experience.
        </p>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">4+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">∞</span>
            <span className="stat-label">Lines of CSS</span>
          </div>
        </div>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            <span>View my projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Let's connect</span>
          </a>
        </div>

        <div className="hero-callout">
          <div className="hero-callout-header">
            <span className="hero-callout-badge">Featured project</span>
          </div>
          <div className="hero-callout-body">
            <p className="hero-callout-title">Campus Marketplace</p>
            <p className="hero-callout-text">Fast campus commerce built to connect students with quick item exchange and secure messaging.</p>
          </div>
          <a href="#projects" className="hero-callout-link">
            <span>Explore all projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section container">
        <h2 className="section-title">The Developer Behind the Code</h2>
        <div className="about-flex">
          <div className="about-image-wrapper">
            <img src={profileImage} alt="dev_kad" className="profile-image" />
          </div>
          <div className="prose">
            <p>
              I'm a Frontend Developer based in Ghana, trained in Information Technology and ready to bring thoughtful, high-quality code to my first professional role. I don't just stack divs — I think deeply about state management, semantic structure, accessibility, and rendering performance, because how code is built matters as much as what it does.
            </p>
            <p>
              I've spent time mastering React, Next.js, TypeScript, and Node.js, and I've learned how to work effectively in remote, distributed team environments even before landing my first job. My focus is on writing maintainable, scalable code, optimizing performance, and creating clean architectures that make developers' lives easier.
            </p>
            <p>
              I may be early in my career, but I build like I've been doing it for years. I'm not looking for just any role — I'm looking for a team where I can deliver real value from day one.
            </p>
          </div>
        </div>

        {/* Why Work With Me */}
        <div className="why-section">
          <h3 className="why-title">Why Work With Me</h3>
          <div className="grid-2col">
            <div>
              <h4>Proven Track Record</h4>
              <p>Delivering high-impact solutions that scale, consistently driving ROI and user retention.</p>
            </div>
            <div>
              <h4>Full-Stack Expertise</h4>
              <p>End-to-end development capabilities from interactive frontends to robust Node.js backends.</p>
            </div>
            <div>
              <h4>Quality & Security First</h4>
              <p>Enterprise-grade security practices, comprehensive testing, and resilient code quality.</p>
            </div>
            <div>
              <h4>Business Impact Focus</h4>
              <p>Not just code—solutions that drive real business results through performance and UI improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section container">
        <h2 className="section-title">Education</h2>
        <p className="section-lead">My academic background and foundational training.</p>

        <div className="timeline">
          <div className="timeline-item">
            <h3 className="timeline-title">BSc in Information Technology</h3>
            <span className="timeline-company">Accra Technical University</span>
            <span className="timeline-date">2022 — 2026</span>
            <p>Developing a strong foundation in modern software engineering, system architecture, and interactive design principles. Focused on translating complex technical concepts into scalable frontend solutions.</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section container bg-secondary-wrap">
        <h2 className="section-title">Experience</h2>
        <p className="section-lead">My professional development journey.</p>

        <div className="timeline">
          <div className="timeline-item">
            <h3 className="timeline-title">Independent Development</h3>
            <span className="timeline-company">Self-Taught Origins</span>
            <span className="timeline-date">2019 — Present</span>
            <p>Started building the web by viewing page source and reverse-engineering CSS. Evolved into building full-stack applications and contributing to open-source UI libraries.</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section container">
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-lead">Complete expertise strategically categorized across the stack.</p>
        
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category project-card">
              <div className="project-card-header">
                <div className="project-icon-wrap" style={{ width: '60px', height: '60px' }}>
                  <img src={category.icon} alt={category.title} className="project-icon" />
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-title">{category.title}</h3>
                <p className="project-desc" style={{ marginBottom: '1.5rem' }}>{category.description}</p>
                <div className="skills-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">
                      <i className={`${skill.icon} skill-tag-icon`}></i>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Projects */}
      <section id="projects" className="section container">
        <h2 className="section-title">Selected Projects</h2>
        <p className="section-lead">Some of the high-impact projects I've built and developed.</p>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card">
              <div className="project-card-header">
                <div className="project-icon-wrap">
                  <img src={project.image} alt={project.title} className="project-icon" />
                </div>
                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </div>
              <div className="project-links-wrap" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: 'auto' }}>
                <a href={project.link} className="project-link">{project.linkText} &rarr;</a>
                {project.liveLink && (
                  <a href={project.liveLink} className="project-link">{project.liveLinkText} &rarr;</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest from the Blog */}
      <section id="blog-preview" className="section container">
        <h2 className="section-title">Latest from the Blog</h2>
        <p className="section-lead">Thoughts and explorations on the intersection of design and code.</p>
        
        <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {loading && <p>Syncing latest articles...</p>}
          {!loading && articles.length === 0 && <p>No articles found.</p>}
          {articles.map((post, idx) => (
            <article key={idx} className="project-card" style={{ padding: '2rem' }}>
              <span className="blog-card-date" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--highlight-color)', marginBottom: '0.5rem', display: 'block' }}>
                {new Date(post.published_timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <h3 className="project-title" style={{ fontSize: '1.25rem' }}>{post.title}</h3>
              <p className="project-desc" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{post.description}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="project-link" style={{ marginTop: 'auto' }}>
                Read more &rarr;
              </a>
            </article>
          ))}
        </div>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/blog" className="btn btn-outline">Explore All Articles</Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-lead">Whether you have a project in mind or just want to chat about technology, I'd love to hear from you. Let's turn your vision into reality.</p>
        
        <div className="contact-section-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <p>I'm currently available for freelance projects and full-time frontend roles. If you have a question or just want to say hi, feel free to reach out through the form or my social links!</p>
            
            <div className="contact-links" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://github.com/kaddev" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.5a6.5 6.5 0 0 0-1.9-4.5 5.8 5.8 0 0 0-.2-4.5s-1.5-.5-4.4 2a15.2 15.2 0 0 0-8 0c-2.9-2.5-4.4-2-4.4-2a5.8 5.8 0 0 0-.2 4.5 6.5 6.5 0 0 0-1.9 4.5c0 7 3 8.2 6 8.5a4.8 4.8 0 0 0-1 3.2v4"></path><path d="M9 18c-4.5 1.6-5-2.5-5-2.5"></path></svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/kaddev" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="contact-card-subtle">
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Response Time</p>
              <p style={{ fontSize: '0.85rem' }}>Usually within 24 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" name="name" className="form-input" placeholder="Kelvin Atsu" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" name="email" className="form-input" placeholder="kelvin@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea id="message" name="message" className="form-input" placeholder="How can I help you?" required></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary form-submit-btn"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>
              </button>

              {formStatus !== 'idle' && formStatus !== 'submitting' && (
                <div className={`form-status ${formStatus === 'success' ? 'form-status-success' : 'form-status-error'}`}>
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
