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
        const data = (await response.json()) as Article[];
        setArticles(data);
      } catch (err) {
        console.error('Dev.to feed error:', err);
        setError('Unable to load articles right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="section container">
      <header className="blog-page-header">
        <p className="section-eyebrow">Blog</p>
        <h1 className="section-title">Articles &amp; notes</h1>
        <p className="section-lead">Tutorials and thoughts from Dev.to.</p>
      </header>

      <div className="blog-grid-page">
        {loading ? <p className="blog-preview-status">Loading articles…</p> : null}
        {error ? (
          <p className="blog-preview-status">
            {error}{' '}
            <a href="https://dev.to/kaddev" target="_blank" rel="noopener noreferrer" className="project-link">
              Open dev.to/kaddev →
            </a>
          </p>
        ) : null}
        {!loading && !error && articles.length === 0 ? <p className="blog-preview-status">No posts yet.</p> : null}
        {!loading &&
          !error &&
          articles.map((post) => (
            <article key={post.url} className="blog-card-page">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="blog-card-page-link">
                <time className="blog-card-page-date" dateTime={post.published_timestamp}>
                  {new Date(post.published_timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="blog-card-page-title">{post.title}</h2>
                <p className="blog-card-page-desc">{post.description}</p>
                <span className="blog-card-page-cta">Read on Dev.to →</span>
              </a>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Blog;
