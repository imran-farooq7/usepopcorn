import { useEffect, useState } from "react";
import Box from "./components/Box";
import Layout from "./components/Layout";
// import { tempWatchedData } from "./constants";
import MovieDetails from "./components/MovieDetails";

const App = () => {
	const [isOpen1, setIsOpen1] = useState(true);
	const [isOpen2, setIsOpen2] = useState(true);
	const [query, setQuery] = useState("titanic");
	const [movies, setMovies] = useState([]);
	const [watchedData, setWatchedData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedID, setSelectedID] = useState("");
	// console.log(selectedID);

	useEffect(() => {
		// const controller = new AbortController();
		const fetchMovies = async () => {
			try {
				setLoading(true);
				setError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${
						import.meta.env.VITE_API_KEY
					}&s=${query}`,
					{
						// signal: controller.signal,
					}
				);

				if (!res.ok) throw new Error("Fetching movies failed");
				const data = await res.json();
				if (data.Response === "False") throw new Error("Movie not found");
				setLoading(false);
				setMovies(data.Search);
			} catch (e: any) {
				setLoading(false);
				setError(e.message);
			}
		};
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		fetchMovies();
		// return () => controller.abort();
	}, [query]);
	console.log(watchedData);

	return (
		<div>
			<Layout query={query} setQuery={setQuery}>
				<Box
					movies={movies}
					watched={false}
					isOpen={isOpen1}
					setIsOpen={setIsOpen1}
					loading={loading}
					error={error}
					setID={setSelectedID}
				/>
				{selectedID ? (
					<MovieDetails
						selectedID={selectedID}
						addToWatched={setWatchedData}
						setSelectedID={setSelectedID}
						watched={watchedData}
					/>
				) : (
					<Box
						movies={watchedData}
						watched
						isOpen={isOpen2}
						setIsOpen={setIsOpen2}
						setWatched={setWatchedData}
					/>
				)}
			</Layout>
		</div>
	);
};
export default App;
