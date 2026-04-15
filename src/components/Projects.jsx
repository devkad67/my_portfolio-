import { useMemo, useState } from 'react';
import styles from '../App.module.css';

const projectsData = [
    {
        id: '1',
        title: 'Nexus Analytics',
        description: 'A high-performance SaaS dashboard featuring real-time data visualization, custom reporting engines, and multi-tenant architecture.',
        category: 'Web',
        tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
        demo: '#',
        code: '#',
        color: '#6366f1'
    },
    {
        id: '2',
        title: 'Lumina Mobile',
        description: 'A wellness and mindfulness application focused on serene UX, biometric integration, and offline-first capabilities.',
        category: 'Mobile',
        tags: ['React Native', 'Firebase', 'Redux'],
        demo: '#',
        code: '#',
        color: '#10b981'
    },
    {
        id: '3',
        title: 'Vanguard Design System',
        description: 'An enterprise-grade UI library and documentation site used by over 50 product teams to ensure brand consistency.',
        category: 'UI/UX',
        tags: ['Storybook', 'Figma', 'SCSS', 'React'],
        demo: '#',
        code: '#',
        color: '#f59e0b'
    },
    {
        id: '4',
        title: 'Crypto Pulse',
        description: 'A decentralized finance platform for monitoring real-time market trends with lightning-fast execution and secure wallet integration.',
        category: 'Web',
        tags: ['Next.js', 'Web3.js', 'Tailwind'],
        demo: '#',
        code: '#',
        color: '#ec4899'
    },
    {
        id: '5',
        title: 'Echo Branding',
        description: 'A complete visual identity overhaul for a sustainable energy startup, including logo, typography, and interactive brand book.',
        category: 'UI/UX',
        tags: ['After Effects', 'Illustrator', 'Motion'],
        demo: '#',
        code: '#',
        color: '#3b82f6'
    },
];

const categories = ['All', 'Web', 'Mobile', 'UI/UX'];

function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const filtered = useMemo(
        () => (activeCategory === 'All' ? projectsData : projectsData.filter((project) => project.category === activeCategory)),
        [activeCategory]
    );

    return (
        <div className={styles.projectsSection}>
            <div className={styles.projectsHeader}>
                <div className={styles.headerText}>
                    <span className={styles.sectionTitle}>Portfolio</span>
                    <h2 className={styles.sectionHeading}>Featured Work</h2>
                    <p className={styles.sectionText}>
                        A collection of projects that push the boundaries of design and technology.
                    </p>
                </div>
                <div className={styles.filterRow} role="tablist" aria-label="Project category filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setActiveCategory(category)}
                            className={category === activeCategory ? `${styles.filterTab} ${styles.filterTabActive}` : styles.filterTab}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.projectsGrid}>
                {filtered.map((project) => (
                    <article className={styles.projectCard} key={project.id} style={{ '--project-color': project.color }}>
                        <div className={styles.projectThumb} aria-hidden="true">
                            <div className={styles.projectOverlay}></div>
                            <span className={styles.projectThumbTitle}>{project.title}</span>
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectDesc}>{project.description}</p>
                            <div className={styles.projectTags}>
                                {project.tags.map((tag) => (
                                    <span key={tag} className={styles.projectTag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.projectLinks}>
                                <a className={styles.projectLink} href={project.demo} target="_blank" rel="noreferrer">
                                    Live Project
                                </a>
                                <a className={styles.projectLink} href={project.code} target="_blank" rel="noreferrer">
                                    View Source
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Projects;
