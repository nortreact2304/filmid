import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import MoviesList from "./MoviesList";

function App() {
	const [movies, setMovies] = useState([]);
	const [filter, setFilter] = useState("disco");
  const [error, setError] = useState("")

	const loadMovies = async (searchFilter) => {
		try {
			const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=24c64ea903d3b9426c0b72f5af3d2813&language=en-US&query=${searchFilter}&page=1&include_adult=false`;
			const result = await fetch(movieUrl);
			if (!result.ok) {
				console.log("VIGA andmete lugemisel");
				setMovies([]);
        setError("Viga andmete lugemisel, proovi uuesti!")
				return;
			}
			const loadedData = await result.json();
			console.log(loadedData);
			setMovies(loadedData.results);
      setError("")
		} catch (err) {
			console.log("Viga: " + err.message);
			setMovies([]);
      setError("Viga: " + err.message)
			return;
		}
	};

  let errorMessage = ""

  if (error) {
    errorMessage = <div className="error-box">{error}</div>
  } else {
    errorMessage = ""
  }

	return (
		<div className="App">
			<h1>Minu filmide otsing</h1>
      {errorMessage}
			<div className="filter-container">
				<input
					value={filter}
					onChange={(event) => setFilter(event.target.value)}
				/>
				<button onClick={() => loadMovies(filter)}>Otsi</button>
			</div>
			<div className="results-container">
				<MoviesList movies={movies} />
			</div>
		</div>
	);
}

export default App;
