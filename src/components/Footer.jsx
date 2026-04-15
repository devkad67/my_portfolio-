import styles from '../App.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>© 2026 Kelvin Atsu Djayouri. All rights reserved.</p>
            <a className={styles.backToTop} href="#home">
                Back to top
            </a>
        </footer>
    );
}

export default Footer;
