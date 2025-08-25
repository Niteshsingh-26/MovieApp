import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>MovieFlix</h1>
            <div className={styles.links}>
                <Link to="/popular" className={styles.link}>Popular</Link>
                <Link to="/top-rated" className={styles.link}>Top Rated</Link>
                <Link to="/upcoming" className={styles.link}>Upcoming</Link>
            </div>
        </nav>
    );
};

export default Navbar;
