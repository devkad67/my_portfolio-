import styles from '../App.module.css';

const experiences = [
    {
        role: 'Senior Creative Developer',
        company: 'Neural Dynamics',
        date: '2023 — Present',
        description: 'Leading the frontend architecture for an AI-driven marketing platform. Spearheading the implementation of a custom design system and micro-frontend architecture.',
    },
    {
        role: 'Product Designer & Developer',
        company: 'Pixel & Pulse',
        date: '2021 — 2023',
        description: 'Bridged the gap between design and engineering. Delivered cross-platform mobile apps using React Native and built responsive web dashboards for data analytics startups.',
    },
    {
        role: 'Frontend Developer (Contract)',
        company: 'Stellar Agency',
        date: '2019 — 2021',
        description: 'Developed high-conversion landing pages and interactive marketing experiences for Fortune 500 clients. Focused on performance optimization and accessibility.',
    },
];

function Experience() {
    return (
        <div className={styles.timelineSection}>
            <span className={styles.sectionTitle}>Experience</span>
            <h2 className={styles.sectionHeading}>Professional Journey</h2>
            <div className={styles.timelineList}>
                {experiences.map((item, index) => (
                    <div className={styles.timelineItem} key={`${item.role}-${index}`}>
                        <div className={styles.timelineMarker} aria-hidden="true"></div>
                        <div className={styles.timelineContent}>
                            <p className={styles.timelineDate}>{item.date}</p>
                            <h3 className={styles.timelineRole}>{item.role}</h3>
                            <p className={styles.timelineCompany}>{item.company}</p>
                            <p className={styles.timelineDesc}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;