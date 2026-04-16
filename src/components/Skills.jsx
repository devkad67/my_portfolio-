import { useMemo } from 'react';
import { 
    FaReact, FaNodeJs, FaJs, FaHtml5, FaVuejs, FaGitAlt, FaDocker, FaAws, FaSync, FaFigma, FaServer
} from 'react-icons/fa';
import { 
    SiTypescript, SiNextdotjs, SiExpress, SiPostgresql, SiMongodb, SiGraphql, SiAdobe
} from 'react-icons/si';
import useScrollAnimation from '../hooks/useScrollAnimation';
import styles from '../App.module.css';

const skillCategories = [
    {
        category: 'Frontend Development',
        skills: [
            { name: 'React', level: 95, icon: <FaReact /> },
            { name: 'TypeScript', level: 90, icon: <SiTypescript /> },
            { name: 'JavaScript (ES6+)', level: 95, icon: <FaJs /> },
            { name: 'HTML5 & CSS3', level: 95, icon: <FaHtml5 /> },
            { name: 'Next.js', level: 85, icon: <SiNextdotjs /> },
            { name: 'Vue.js', level: 80, icon: <FaVuejs /> }
        ]
    },
    {
        category: 'Backend & Database',
        skills: [
            { name: 'Node.js', level: 90, icon: <FaNodeJs /> },
            { name: 'Express.js', level: 85, icon: <SiExpress /> },
            { name: 'PostgreSQL', level: 80, icon: <SiPostgresql /> },
            { name: 'MongoDB', level: 75, icon: <SiMongodb /> },
            { name: 'GraphQL', level: 70, icon: <SiGraphql /> },
            { name: 'REST APIs', level: 90, icon: <FaServer /> }
        ]
    },
    {
        category: 'Tools & Technologies',
        skills: [
            { name: 'Git & GitHub', level: 95, icon: <FaGitAlt /> },
            { name: 'Docker', level: 75, icon: <FaDocker /> },
            { name: 'AWS', level: 70, icon: <FaAws /> },
            { name: 'CI/CD', level: 80, icon: <FaSync /> },
            { name: 'Figma', level: 85, icon: <FaFigma /> },
            { name: 'Adobe Creative Suite', level: 80, icon: <SiAdobe /> }
        ]
    }
];

function Skills() {
    const [ref, isVisible] = useScrollAnimation(0.1);

    return (
        <div ref={ref} className={`${styles.skillsContainer} ${isVisible ? styles.animateIn : ''}`}>
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
                                            <div className={styles.skillNameWrapper}>
                                                <span className={styles.skillIcon}>{skill.icon}</span>
                                                <span className={styles.skillName}>{skill.name}</span>
                                            </div>
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
    );
}

export default Skills;