import styles from '../App.module.css';

function Toast({ message, visible }) {
    return <div className={`${styles.toast} ${visible ? styles.toastVisible : ''}`}>{message}</div>;
}

export default Toast;
