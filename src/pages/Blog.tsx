import { useState, useEffect } from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  published_timestamp: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=kaddev');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("DevTo Feed Error:", err);
        setError('Unable to load articles right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="section container">
      <div className="blog-header">
        <h1 className="section-title">Blog & Articles</h1>
        <p className="section-lead">Thoughts, tutorials, and development deep-dives.</p>
      </div>

      <div className="blog-grid">
        {loading && <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Loading articles from Dev.to...</p>}
        {error && (
          <p>
            {error} You can check them out directly at{' '}
            <a href="https://dev.to/kaddev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--highlight-color)', textDecoration: 'underline' }}>
              dev.to/kaddev
            </a>.
          </p>
        )}
        {!loading && !error && articles.length === 0 && <p>No posts yet. Check back soon!</p>}
        {!loading && !error && articles.map((post, idx) => (
          <article key={idx} className="blog-card">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="blog-card-link">
              <span className="blog-card-date">
                {new Date(post.published_timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              <span className="blog-card-read">Read on Dev.to &rarr;</span>
            </a>
          </article>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-header {
          margin-bottom: 4rem;
        }
        .blog-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
          max-width: 800px;
        }
        .blog-card {
          border-radius: var(--radius-lg);
          background-color: var(--bg-secondary);
          border: 1px solid var(--card-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
          border-color: var(--highlight-color);
        }
        [data-theme="dark"] .blog-card:hover {
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        .blog-card-link {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }
        .blog-card-date {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--highlight-color);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .blog-card-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .blog-card-desc {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex-grow: 1;
        }
        .blog-card-read {
          font-weight: 600;
          color: var(--accent-color);
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .blog-card:hover .blog-card-read {
          color: var(--highlight-color);
        }
      `}} />
    </section>
  );
};

export default Blog;
