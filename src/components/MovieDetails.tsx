import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

type Props = {
	selectedID: string;
	addToWatched: React.Dispatch<React.SetStateAction<any[]>>;
	setSelectedID: React.Dispatch<React.SetStateAction<string>>;
	watched: any[];
};
export type Movie = {
	Title: string;
	Poster: string;
	Released: string;
	Genre: string;
	imdbRating: string;
	Plot: string;
	Actors: string;
	Director: string;
};
const MovieDetails = ({
	selectedID,
	addToWatched,
	setSelectedID,
	watched,
}: Props) => {
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState<number>(0);
	// console.log(userRating, "userRating");
	const isWatched = watched.map((w) => w.imdbID).includes(selectedID);
	useEffect(() => {
		const getMovieDetails = async () => {
			setIsLoading(true);
			const res = await fetch(
				`http://www.omdbapi.com/?apikey=${
					import.meta.env.VITE_API_KEY
				}&i=${selectedID}`
			);
			const data = await res.json();
			// console.log(data);
			setMovie(data);
			setIsLoading(false);
		};

		getMovieDetails();
	}, [selectedID]);
	useEffect(() => {
		document.title = movie?.Title!;
		return () => {
			document.title = "usePopcorns";
		};
	}, [movie]);

	return (
		<div className="box">
			{isLoading ? (
				<Loader />
			) : (
				<div className="details">
					<header>
						<button className="btn-back" onClick={() => setSelectedID("")}>
							&larr;
						</button>
						<img src={movie?.Poster} alt={movie?.Title} />
						<div className="details-overview">
							<h2>{movie?.Title}</h2>
							<p>{movie?.Released}</p>
							<p>{movie?.Genre}</p>
							<p>
								<span> ⭐</span>
								{movie?.imdbRating} IMDb rating
							</p>
							<button
								className="btn-add"
								onClick={() =>
									addToWatched((watched) => {
										if (isWatched) {
											alert("movie already added in your watched list");
											return [...watched];
										}
										return [...watched, { userRating, ...movie }];
									})
								}
							>
								Add to watchlist
							</button>
						</div>
					</header>

					<section>
						<div className="rating">
							<StarRating
								maxRating={10}
								size={24}
								setUserRating={setUserRating}
							/>
						</div>
						<p>
							<em>{movie?.Plot}</em>
						</p>
						<p>Starring {movie?.Actors}</p>
						<p>Directed by {movie?.Director}</p>
					</section>
				</div>
			)}
		</div>
	);
};
export default MovieDetails;
