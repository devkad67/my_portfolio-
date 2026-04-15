import styles from '../App.module.css';

const skills = [
    'React & React Native',
    'TypeScript',
    'CSS/SCSS/Tailwind',
    'Node.js & Express',
    'PostgreSQL & MongoDB',
    'UI/UX Design',
    'Figma & Adobe CC',
    'Motion Design',
    'CI/CD & Cloud Hosting',
];

const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '4', label: 'Projects Completed' },
    { number: '15+', label: 'Happy Clients' },
    { number: '99%', label: 'Commitment' },
];

function About() {
    return (
        <div className={styles.aboutGrid}>
            <div className={styles.aboutCard}>
                <span className={styles.sectionTitle}>About Me</span>
                <h2 className={styles.sectionHeading}>Building with Purpose.</h2>
                <p className={styles.sectionText}>
                    I'm a designer-turned-developer with a passion for building software that not only works perfectly but feels magical to use. My approach combines technical rigor with a deep understanding of user psychology.
                </p>
                <div className={styles.skillsList}>
                    {skills.map((skill) => (
                        <span key={skill} className={styles.skillTag}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.statsCard}>
                <h2 className={styles.sectionHeading}>By the numbers</h2>
                <div className={styles.statsRow}>
                    {stats.map((stat) => (
                        <div className={styles.statBlock} key={stat.label}>
                            <p className={styles.statNumber}>{stat.number}</p>
                            <p className={styles.statLabel}>{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.statsCta}>
                    <p className={styles.sectionText}>I thrive on solving complex problems through elegant code.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
