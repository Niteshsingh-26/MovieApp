import { useEffect, useState } from "react";
import _ from "lodash";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard/MovieCard";

const API_KEY = "183928bab7fc630ed0449e4f66ec21bd";

const MovieList = ({ type, title }) => {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery, page);
    } else {
      fetchMovies(type, page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type, page, searchQuery]);

  useEffect(() => {
    if (sort.by !== "default") {
      const sorted = _.orderBy(movies, [sort.by], [sort.order]);
      setMovies(sorted);
    }
  }, [sort]);

  const fetchMovies = async (type, page) => {
    const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
  };

  const fetchSearchResults = async (query, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <section className={styles.movieList} id={type}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>

        <div className={styles.filters}>
          <form
            onSubmit={handleSearchSubmit}
            className={styles.searchBar}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={handleSearchChange}
              className={styles.searchInput}
              autoComplete="off"
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>

          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className={styles.sorting}
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
            <option value="popularity">Popularity</option>
            <option value="title">Title</option>
          </select>

          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className={styles.sorting}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className={styles.cards}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span className={styles.paginationPageText}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MovieList;
