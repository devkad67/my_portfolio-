import { useEffect, useMemo, useState } from 'react';
import styles from '../App.module.css';

const roles = ['Creative Developer', 'UI/UX Strategist', 'Frontend Architect', 'Problem Solver'];

function Hero() {
    const [typed, setTyped] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const speed = isDeleting ? 40 : 100;
        const timeout = window.setTimeout(() => {
            setTyped(currentRole.slice(0, charIndex + (isDeleting ? -1 : 1)));
            setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, speed);

        if (!isDeleting && charIndex === currentRole.length) {
            window.clearTimeout(timeout);
            setTimeout(() => setIsDeleting(true), 2000);
        }

        if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => window.clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex]);

    return (
        <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                    <span className={styles.badgePulse}></span>
                    Available for new projects
                </div>
                <h1 className={styles.heroTitle}>
                    Crafting <span className={styles.textGradient}>Immersive</span> digital experiences.
                </h1>
                <p className={styles.heroSubtitle}>
                    I specialize in building high-performance, accessible web applications with a focus on refined motion and user-centric design.
                </p>
                <div className={styles.typingContainer}>
                    <span className={styles.typingPrefix}>I am a </span>
                    <span className={styles.typing}>{typed}</span>
                    <span className={styles.cursor}>|</span>
                </div>
                <div className={styles.heroButtons}>
                    <a className={styles.ctaButton} href="#projects">
                        View Portfolio
                    </a>
                    <a className={styles.secondaryButton} href="#contact">
                        Get in Touch
                    </a>
                </div>
            </div>
            <div className={styles.heroVisual} aria-label="Profile illustration">
                <div className={styles.profileFrame}>
                    <div className={styles.profileImage}>
                        {/* Placeholder for real image */}
                        <div className={styles.imageOverlay}></div>
                        <div className={styles.placeholderIcon}>AM</div>
                    </div>
                    <div className={styles.orbitPath}>
                        <div className={styles.orbitObject}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
