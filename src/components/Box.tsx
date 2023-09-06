import Loader from "./Loader";

type Props = {
	isOpen: boolean;
	loading?: boolean;
	error?: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setID?: React.Dispatch<React.SetStateAction<string>>;
	setWatched?: React.Dispatch<React.SetStateAction<any[]>>;
	movies: {
		imdbID: string;
		Title: string;
		Year: string;
		Poster: string;
		Runtime?: number;
		imdbRating?: number;
		userRating?: number;
	}[];
	watched: boolean;
};
const Box = ({
	isOpen,
	movies,
	setIsOpen,
	watched,
	loading,
	error,
	setID,
	setWatched,
}: Props) => {
	// console.log(movies);
	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && (
				<ul className="list list-movies">
					{loading && <Loader />}
					{!loading && error && <p>{error}</p>}
					{!loading &&
						!error &&
						movies?.map((movie) => (
							<li key={movie.imdbID} onClick={() => setID!(movie.imdbID)}>
								<img src={movie.Poster} alt={`${movie.Title} poster`} />
								<h3>{movie.Title}</h3>
								{!watched ? (
									<div>
										<p>
											<span>🗓</span>
											<span>{movie.Year}</span>
										</p>
									</div>
								) : (
									<div>
										<p>
											<span>⭐️</span>
											<span>{movie.imdbRating}</span>
										</p>
										<p>
											<span>🌟</span>
											<span>{movie.userRating}</span>
										</p>
										<p>
											<span>⏳</span>
											<span>{movie.Runtime}</span>
										</p>
										<button
											className="btn-delete"
											onClick={() =>
												setWatched((watched) =>
													watched.filter((w) => w.imdbID !== movie.imdbID)
												)
											}
										>
											❌
										</button>
									</div>
								)}
							</li>
						))}
					{}
				</ul>
			)}
		</div>
	);
};
export default Box;
