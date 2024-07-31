import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
    return (
        <div className={styles.container_uiball_ldrs}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
};

export default Loading;