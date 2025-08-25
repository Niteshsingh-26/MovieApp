import styles from "./MovieCard.module.css";
import Star from "../../assets/star.png";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`}>
            <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noreferrer"
                className={styles.card}
            >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="movie poster"
                    className={styles.poster}
                />

                <div className={styles.details}>
                    <h3 className={styles.heading}>{movie.original_title}</h3>

                    <div className={styles.dateRate}>
                        <p>{movie.release_date}</p>
                        <p className={styles.rating}>
                            {movie.vote_average}
                            <img src={Star} alt="rating icon" className={styles.star} />
                        </p>
                    </div>

                    <p className={styles.description}>
                        {movie.overview.slice(0, 100) + "..."}
                    </p>
                </div>
            </a>
        </Link >
    );
};

export default MovieCard;
