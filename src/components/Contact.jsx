import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import styles from '../App.module.css';

const initialFields = { name: '', email: '', message: '' };

function Contact({ onSuccess }) {
    const [fields, setFields] = useState(initialFields);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!fields.name.trim()) newErrors.name = 'Name is required.';
        if (!fields.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
            newErrors.email = 'Enter a valid email.';
        }
        if (!fields.message.trim()) newErrors.message = 'Message cannot be empty.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;
        setFields(initialFields);
        setErrors({});
        onSuccess('Thanks! Your message was sent.');
    };

    const updateField = (key, value) => {
        setFields((current) => ({ ...current, [key]: value }));
    };

    return (
        <div className={styles.contactGrid}>
                <div className={styles.contactIntro}>
                    <div>
                        <span className={styles.sectionTitle}>Get in touch</span>
                        <h2 className={styles.sectionHeading}>Let’s build something great together.</h2>
                        <p className={styles.sectionText}>
                            Ready to bring your next idea to life? Send a message and I’ll respond within one business day.
                        </p>
                    </div>
                    <div className={styles.contactInfo}>
                        <div className={styles.infoItem}>
                            <FaEnvelope className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoLabel}>Email</p>
                                <p className={styles.infoValue}>kelvinatsu213@gmail.com</p>
                            </div>
                        </div>
                        <div className={styles.socialRow}>
                            <a className={styles.socialLink} href="https://www.linkedin.com/in/kaddev" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a className={styles.socialLink} href="https://github.com/devkad67" target="_blank" rel="noreferrer" aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a className={styles.socialLink} href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>
                <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            className={styles.inputField}
                            type="text"
                            placeholder="John Doe"
                            value={fields.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            className={styles.inputField}
                            type="email"
                            placeholder="john@example.com"
                            value={fields.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel} htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className={styles.textArea}
                            placeholder="Tell me about your project..."
                            value={fields.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            aria-invalid={errors.message ? 'true' : 'false'}
                        />
                        {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Send Message
                    </button>
                </form>
        </div>
    );
}

export default Contact;
