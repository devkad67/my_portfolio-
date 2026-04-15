import styles from '../App.module.css';

const entries = [
    {
        role: 'BSc in Information Technology',
        company: 'Accra Technical University',
        date: '2022 — 2026',
        description: 'Focusing on advanced software engineering, network security, and data science. Actively participating in campus tech innovation hubs.',
    },
    {
        role: 'BFA in Digital Design & Interaction',
        company: 'Metropolis Design Institute',
        date: '2015 — 2019',
        description: 'Graduated with honors. Specialized in human-computer interaction, motion graphics, and creative coding.',
    },
];

function Timeline() {
    return (
        <div className={styles.timelineSection}>
            <span className={styles.sectionTitle}>Education</span>
            <h2 className={styles.sectionHeading}>Academic Background</h2>
            <div className={styles.timelineList}>
                {entries.map((item, index) => (
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

export default Timeline;
