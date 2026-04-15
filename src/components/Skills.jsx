import { useMemo } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import styles from '../App.module.css';

const skillCategories = [
    {
        category: 'Frontend Development',
        skills: [
            { name: 'React', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'JavaScript (ES6+)', level: 95 },
            { name: 'HTML5 & CSS3', level: 95 },
            { name: 'Next.js', level: 85 },
            { name: 'Vue.js', level: 80 }
        ]
    },
    {
        category: 'Backend & Database',
        skills: [
            { name: 'Node.js', level: 90 },
            { name: 'Express.js', level: 85 },
            { name: 'PostgreSQL', level: 80 },
            { name: 'MongoDB', level: 75 },
            { name: 'GraphQL', level: 70 },
            { name: 'REST APIs', level: 90 }
        ]
    },
    {
        category: 'Tools & Technologies',
        skills: [
            { name: 'Git & GitHub', level: 95 },
            { name: 'Docker', level: 75 },
            { name: 'AWS', level: 70 },
            { name: 'CI/CD', level: 80 },
            { name: 'Figma', level: 85 },
            { name: 'Adobe Creative Suite', level: 80 }
        ]
    }
];

function Skills() {
    const [ref, isVisible] = useScrollAnimation(0.1);

    return (
        <div ref={ref} className={`${styles.skillsSection} ${isVisible ? styles.animateIn : ''}`}>
            <div className={styles.skillsContainer}>
                <span className={styles.sectionTitle}>Skills & Expertise</span>
                <h2 className={styles.sectionHeading}>Technologies I Work With</h2>
                <p className={styles.sectionText}>
                    A comprehensive overview of my technical skills and proficiency levels across different domains.
                </p>

                <div className={styles.skillCategories}>
                    {skillCategories.map((category, index) => (
                        <div
                            key={category.category}
                            className={`${styles.skillCategory} ${isVisible ? styles.animateIn : ''}`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <h3 className={styles.categoryTitle}>{category.category}</h3>
                            <div className={styles.skillGrid}>
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skill.name}
                                        className={`${styles.skillItem} ${isVisible ? styles.animateIn : ''}`}
                                        style={{ animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s` }}
                                    >
                                        <div className={styles.skillHeader}>
                                            <span className={styles.skillName}>{skill.name}</span>
                                            <span className={styles.skillLevel}>{skill.level}%</span>
                                        </div>
                                        <div className={styles.skillBar}>
                                            <div
                                                className={`${styles.skillProgress} ${isVisible ? styles.animateProgress : ''}`}
                                                style={{
                                                    width: isVisible ? `${skill.level}%` : '0%',
                                                    transitionDelay: `${(index * 0.2) + (skillIndex * 0.1) + 0.5}s`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skills;