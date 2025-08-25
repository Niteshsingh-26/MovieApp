import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./MovieDetails.module.css";

const API_KEY = "183928bab7fc630ed0449e4f66ec21bd";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [movieRes, creditsRes] = await Promise.all([
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
                ),
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
                ),
            ]);
            const movieData = await movieRes.json();
            const creditsData = await creditsRes.json();
            setMovie(movieData);
            setCredits(creditsData);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading) return <p className={styles.loading}>Loading...</p>;
    if (!movie) return <p className={styles.error}>Movie not found</p>;

    const trailer = movie.videos?.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    const topCast = credits?.cast?.slice(0, 5) || [];

    return (
        <div className={styles.movieDetails}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.poster}
                    />

                    <div className={styles.details}>
                        <h1 className={styles.title}>{movie.title}</h1>

                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
                        <p>
                            <strong>Genres:</strong>{" "}
                            {movie.genres.map((g) => g.name).join(", ")}
                        </p>

                        <p className={styles.overview}>{movie.overview}</p>

                        <div className={styles.cast}>
                            <strong>Main Cast:</strong>
                            <ul>
                                {topCast.map((actor) => (
                                    <li key={actor.cast_id}>
                                        {actor.name} <span className={styles.role}>as {actor.character}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {trailer && (
                    <div className={styles.trailerWrapper}>
                        <h2 className={styles.trailerTitle}>Watch Trailer</h2>
                        <iframe
                            className={styles.trailer}
                            title="Movie Trailer"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
