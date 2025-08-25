import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <strong>© 2025 TMDB Clone. All rights reserved.</strong>
            </div>
        </footer>
    );
};

export default Footer;
