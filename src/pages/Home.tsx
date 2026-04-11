import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/me.png';
import heroShot from '../assets/hero.png';
import realEstateIcon from '../assets/real_estate.png';
import campusIcon from '../assets/campus.png';
import formFlowIcon from '../assets/formflow.png';
import portfolioIcon from '../assets/portfolio.png';
import frontendIcon from '../assets/frontend_tech.png';
import backendIcon from '../assets/backend_tech.png';
import toolsIcon from '../assets/tools_tech.png';

interface Article {
  title: string;
  description: string;
  url: string;
  published_timestamp: string;
}

const projects = [
  {
    title: 'Real Estate platform',
    description:
      'A modern real estate platform for browsing and managing property listings. Built with a focus on clean UI and smooth filtering.',
    link: '#',
    linkText: 'View project',
    tags: ['React', 'Node.js', 'Express'],
    image: realEstateIcon,
  },
  {
    title: 'Campus Marketplace',
    description:
      'A peer-to-peer marketplace for university students to buy and trade items within their community.',
    link: '#',
    linkText: 'View project',
    tags: ['React', 'Firebase', 'Tailwind'],
    image: campusIcon,
  },
  {
    title: 'FormFlow',
    description:
      'A developer-friendly form builder and submission handler. Create and analyze form data without writing backend code.',
    link: '#',
    linkText: 'View project',
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    image: formFlowIcon,
  },
  {
    title: 'Developer portfolio',
    description:
      'A fast, accessible portfolio with theme support, scroll polish, and a straightforward React architecture.',
    link: 'https://github.com/devkad67/my_portfolio-',
    linkText: 'View source',
    liveLink: '/',
    liveLinkText: 'View live',
    tags: ['React', 'TS', 'Vite'],
    image: portfolioIcon,
  },
];

const skillCategories = [
  {
    title: 'Frontend engineering',
    description:
      'Responsive, accessible interfaces with modern frameworks and careful attention to layout and performance.',
    skills: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'Astro', icon: 'devicon-astro-plain' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain' },
      { name: 'TailwindCSS', icon: 'devicon-tailwindcss-original' },
      { name: 'CSS', icon: 'devicon-css3-plain' },
    ],
    icon: frontendIcon,
  },
  {
    title: 'Backend & data',
    description:
      'Server-side logic and data modeling so features stay reliable as products grow.',
    skills: [
      { name: 'Node.js', icon: 'devicon-nodejs-plain' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
      { name: 'REST APIs', icon: 'devicon-azuresqldatabase-plain' },
      { name: 'GraphQL', icon: 'devicon-graphql-plain' },
    ],
    icon: backendIcon,
  },
  {
    title: 'Tools & delivery',
    description:
      'Version control, hosting, testing, and collaboration workflows that keep shipping predictable.',
    skills: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'Vercel', icon: 'devicon-vercel-original' },
      { name: 'Docker', icon: 'devicon-docker-plain' },
      { name: 'Jest', icon: 'devicon-jest-plain' },
      { name: 'CI/CD', icon: 'devicon-githubactions-plain' },
      { name: 'Figma', icon: 'devicon-figma-plain' },
    ],
    icon: toolsIcon,
  },
];

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard.writeText('kelvinatsu213@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xqegvpbd', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setFormStatus('success');
        setStatusMessage('Thanks — your message was sent.');
        form.reset();
      } else {
        const data = (await response.json()) as { errors?: { message: string }[] };
        setFormStatus('error');
        setStatusMessage(data.errors?.[0]?.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setStatusMessage('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=kaddev&per_page=3');
        if (response.ok) {
          const data = (await response.json()) as Article[];
          setArticles(data);
        }
      } catch (err) {
        console.error('Home feed error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName('project-card');
      for (const card of cards) {
        const el = card as HTMLElement;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <section className="section hero-section container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="greeting">Hi — I&apos;m Kelvin (dev_kad).</p>
            <h1 className="hero-title">
              I build{' '}
              <span className="text-gradient">fast, thoughtful web interfaces</span> with React,
              TypeScript, and Node.
            </h1>
            <p className="hero-subtitle">
              Frontend-focused developer based in Ghana. I care about clear information architecture,
              accessible markup, and interfaces that feel calm and intentional.
            </p>
            <div className="hero-meta-row">
              <span>
                <span className="hero-meta-dot" aria-hidden />
                Open to roles &amp; freelance
              </span>
              <span>BSc IT · Accra Technical University</span>
            </div>
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years building</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">4+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">∞</span>
                <span className="stat-label">Curiosity</span>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>View projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <span>Contact</span>
              </a>
            </div>
            <div className="hero-callout">
              <div className="hero-callout-header">
                <span className="hero-callout-badge">Spotlight</span>
              </div>
              <div className="hero-callout-body">
                <p className="hero-callout-title">Campus Marketplace</p>
                <p className="hero-callout-text">
                  Campus commerce with listings and messaging tuned for quick student trades.
                </p>
              </div>
              <a href="#projects" className="hero-callout-link">
                <span>See all projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-ring" />
            <div className="hero-visual-inner">
              <img src={heroShot} alt="" width={800} height={600} />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section container">
        <header className="section-head">
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">The developer behind the code</h2>
          <p className="section-lead">
            I combine product sense with strong fundamentals so interfaces stay maintainable as
            requirements change.
          </p>
        </header>
        <div className="about-flex">
          <div className="about-image-wrapper">
            <img src={profileImage} alt="Kelvin — dev_kad" className="profile-image" width={640} height={800} />
          </div>
          <div className="prose">
            <p>
              I&apos;m a frontend developer trained in Information Technology, focused on React,
              Next.js, TypeScript, and Node. I think in terms of semantics, state, performance, and
              how real people move through a screen.
            </p>
            <p>
              I&apos;ve built full-stack apps, explored remote collaboration habits early, and I
              ship code that teammates can read and extend. I&apos;m looking for a team where I can
              contribute on day one.
            </p>
          </div>
        </div>

        <div className="why-section">
          <h3 className="why-title">Why work with me</h3>
          <div className="grid-2col">
            <div>
              <h4>Product-minded</h4>
              <p>I translate goals into components, states, and edge cases—not only pixels.</p>
            </div>
            <div>
              <h4>Full-stack aware</h4>
              <p>Comfortable from UI down to APIs and persistence when the scope needs it.</p>
            </div>
            <div>
              <h4>Quality habits</h4>
              <p>Accessibility, sensible structure, and tests where they earn their keep.</p>
            </div>
            <div>
              <h4>Clear communication</h4>
              <p>Written updates, questions early, and honest tradeoffs.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section container">
        <header className="section-head">
          <p className="section-eyebrow">Education</p>
          <h2 className="section-title">Academic path</h2>
        </header>
        <div className="timeline">
          <div className="timeline-item">
            <h3 className="timeline-title">BSc in Information Technology</h3>
            <span className="timeline-company">Accra Technical University</span>
            <span className="timeline-date">2022 — 2026</span>
            <p>
              Software engineering, systems, and design—focused on scalable frontends and clear
              architecture.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="section container bg-secondary-wrap">
        <header className="section-head">
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">How I got here</h2>
        </header>
        <div className="timeline">
          <div className="timeline-item">
            <h3 className="timeline-title">Independent development</h3>
            <span className="timeline-company">Self-directed learning</span>
            <span className="timeline-date">2019 — Present</span>
            <p>
              From inspecting page source to shipping full-stack apps and contributing to UI-related
              work in the open. Continuous learning is the baseline.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="section container">
        <header className="section-head">
          <p className="section-eyebrow">Stack</p>
          <h2 className="section-title">Skills &amp; technologies</h2>
        </header>
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-category project-card">
              <div className="project-card-header">
                <div className="project-icon-wrap project-icon-wrap-lg">
                  <img src={category.icon} alt="" className="project-icon" width={48} height={48} />
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-title">{category.title}</h3>
                <p className="project-desc skill-category-desc">{category.description}</p>
                <div className="skills-pill-row">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className="skill-tag">
                      <i className={`${skill.icon} skill-tag-icon`} aria-hidden />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section container">
        <header className="section-head">
          <p className="section-eyebrow">Work</p>
          <h2 className="section-title">Selected projects</h2>
        </header>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card-header">
                <div className="project-icon-wrap">
                  <img src={project.image} alt="" className="project-icon" width={48} height={48} />
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
              </div>
              <div className="project-links-wrap">
                <a href={project.link} className="project-link">
                  {project.linkText} →
                </a>
                {project.liveLink ? (
                  <a href={project.liveLink} className="project-link">
                    {project.liveLinkText} →
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="blog-preview" className="section container">
        <header className="section-head">
          <p className="section-eyebrow">Writing</p>
          <h2 className="section-title">Latest from the blog</h2>
        </header>
        <div className="blog-preview-grid">
          {loading ? <p className="blog-preview-status">Loading articles…</p> : null}
          {!loading && articles.length === 0 ? <p className="blog-preview-status">No articles found.</p> : null}
          {articles.map((post) => (
            <article key={post.url} className="project-card blog-preview-card">
              <time className="blog-preview-date" dateTime={post.published_timestamp}>
                {new Date(post.published_timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <h3 className="project-title blog-preview-title">{post.title}</h3>
              <p className="project-desc blog-preview-desc">{post.description}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="project-link">
                Read on Dev.to →
              </a>
            </article>
          ))}
        </div>
        <div className="blog-preview-actions">
          <Link to="/blog" className="btn btn-outline">
            All articles
          </Link>
        </div>
      </section>

      <section id="contact" className="section container">
        <header className="section-head">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let&apos;s connect</h2>
          <p className="section-lead">
            Freelance, internships, or full-time frontend roles—send a note and I&apos;ll reply
            quickly.
          </p>
        </header>
        <div className="contact-section-grid">
          <div className="contact-info">
            <p>
              Prefer email or the form—either works. I&apos;m happy to talk about your product,
              timeline, and stack.
            </p>
            <div className="email-logo-container">
              <button type="button" className="email-logo-card" onClick={copyEmail} title="Copy email">
                <div className="email-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="email-logo-content">
                  <span className="email-logo-label">Email</span>
                  <span className="email-logo-address">
                    <span className="email-name">kelvinatsu213</span>
                    <span className="email-at">@</span>
                    <span className="email-domain">gmail.com</span>
                  </span>
                </div>
                <span className={`copy-feedback ${copied ? 'active' : ''}`} aria-live="polite">
                  Copied!
                </span>
              </button>
            </div>
            <div className="contact-social-row">
              <a href="https://github.com/kaddev" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.5a6.5 6.5 0 0 0-1.9-4.5 5.8 5.8 0 0 0-.2-4.5s-1.5-.5-4.4 2a15.2 15.2 0 0 0-8 0c-2.9-2.5-4.4-2-4.4-2a5.8 5.8 0 0 0-.2 4.5 6.5 6.5 0 0 0-1.9 4.5c0 7 3 8.2 6 8.5a4.8 4.8 0 0 0-1 3.2v4" />
                  <path d="M9 18c-4.5 1.6-5-2.5-5-2.5" />
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/kaddev" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
            <div className="contact-card-subtle">
              <p className="contact-card-title">Response time</p>
              <p className="contact-card-text">Usually within 24 hours</p>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" id="name" name="name" className="form-input" placeholder="Your name" required autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" id="email" name="email" className="form-input" placeholder="you@example.com" required autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea id="message" name="message" className="form-input" placeholder="What are we building?" required />
              </div>
              <button type="submit" className="btn btn-primary form-submit-btn" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Sending…' : 'Send message'}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
              {formStatus !== 'idle' && formStatus !== 'submitting' ? (
                <div className={`form-status ${formStatus === 'success' ? 'form-status-success' : 'form-status-error'}`}>
                  {statusMessage}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
