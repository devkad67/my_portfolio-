import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Timeline from './components/Timeline.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import styles from './App.module.css';

const SECTION_IDS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'timeline', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
];

function App() {
    const [theme, setTheme] = useState('light');
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.classList.toggle('light', theme === 'light');
    }, [theme]);

    useEffect(() => {
        if (!toastVisible) return;
        const timer = window.setTimeout(() => setToastVisible(false), 3000);
        return () => window.clearTimeout(timer);
    }, [toastVisible]);

    const handleFormSubmit = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    const navLinks = useMemo(() => SECTION_IDS, []);

    return (
        <div className={styles.appWrapper}>
            <Navbar links={navLinks} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            <main>
                <section id="home" className={styles.section}>
                    <Hero />
                </section>
                <section id="about" className={styles.section}>
                    <About />
                </section>
                <section id="skills" className={styles.section}>
                    <Skills />
                </section>
                <section id="experience" className={styles.section}>
                    <Experience />
                </section>
                <section id="timeline" className={styles.section}>
                    <Timeline />
                </section>
                <section id="projects" className={styles.section}>
                    <Projects />
                </section>
                <section id="testimonials" className={styles.section}>
                    <Testimonials />
                </section>
                <section id="contact" className={styles.section}>
                    <Contact onSuccess={handleFormSubmit} />
                </section>
            </main>
            <Footer />
            <Toast message={toastMessage} visible={toastVisible} />
        </div>
    );
}

export default App;
