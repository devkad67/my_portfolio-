import { useMemo, useState } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import styles from '../App.module.css';

function Navbar({ links, theme, onToggleTheme }) {
    const [open, setOpen] = useState(false);
    const menuClass = open ? `${styles.mobileMenu} ${styles.mobileMenuOpen}` : styles.mobileMenu;
    const icon = theme === 'dark' ? <FaSun /> : <FaMoon />;

    const renderedLinks = useMemo(
        () =>
            links.map((link) => (
                <a key={link.id} href={`#${link.id}`} className={styles.navLink} onClick={() => setOpen(false)}>
                    {link.label}
                </a>
            )),
        [links]
    );

    return (
        <header className={styles.navbar}>
            <div className={styles.navInner}>
                <a href="#home" className={styles.brand} aria-label="Home">
                    Kelvin <span>Atsu</span>
                </a>
                <nav className={styles.navLinks} aria-label="Main navigation">
                    {renderedLinks}
                    <button type="button" className={styles.themeToggle} onClick={onToggleTheme} aria-label="Toggle theme">
                        {icon}
                    </button>
                </nav>
                <div className={styles.mobileActions}>
                    <button type="button" className={styles.themeToggle} onClick={onToggleTheme} aria-label="Toggle theme">
                        {icon}
                    </button>
                    <button type="button" className={styles.menuToggle} onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        {open ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            <nav className={menuClass} aria-label="Mobile navigation">
                {renderedLinks}
            </nav>
        </header>
    );
}

export default Navbar;
