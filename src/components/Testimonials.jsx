import { useMemo } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import styles from '../App.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'TechCorp',
        content: 'Kelvin delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise helped us achieve a 40% increase in user engagement.',
        rating: 5,
        avatar: 'SJ'
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'CTO',
        company: 'StartupXYZ',
        content: 'Working with Kelvin was a game-changer for our startup. He not only built a robust application but also mentored our junior developers. Highly recommended!',
        rating: 5,
        avatar: 'MC'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Design Director',
        company: 'Creative Agency',
        content: 'Kelvin bridges the gap between design and development perfectly. His implementations of our designs were pixel-perfect and performant.',
        rating: 5,
        avatar: 'ER'
    }
];

function Testimonials() {
    const [ref, isVisible] = useScrollAnimation(0.1);

    const renderedStars = useMemo(() => (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < rating ? styles.starFilled : styles.starEmpty} />
        ));
    }, []);

    return (
        <div ref={ref} className={`${styles.testimonialsContainer} ${isVisible ? styles.animateIn : ''}`}>
                <span className={styles.sectionTitle}>Testimonials</span>
                <h2 className={styles.sectionHeading}>What Clients Say</h2>
                <p className={styles.sectionText}>
                    Don't just take my word for it - here's what clients and colleagues have to say about working with me.
                </p>

                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`${styles.testimonialCard} ${isVisible ? styles.animateIn : ''}`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.testimonialHeader}>
                                <div className={styles.clientAvatar}>
                                    {testimonial.avatar}
                                </div>
                                <div className={styles.clientInfo}>
                                    <h4 className={styles.clientName}>{testimonial.name}</h4>
                                    <p className={styles.clientRole}>
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.testimonialContent}>
                                <FaQuoteLeft className={styles.quoteIcon} />
                                <p className={styles.testimonialText}>{testimonial.content}</p>
                            </div>
                            <div className={styles.testimonialRating}>
                                {renderedStars(testimonial.rating)}
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default Testimonials;