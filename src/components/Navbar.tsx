import SearchBar from "./SearchBar";
type Props = {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar = ({ query, setQuery }: Props) => {
	return (
		<nav className="nav-bar">
			<div className="logo">
				<span role="img">🍿</span>
				<h1>usePopcorn</h1>
			</div>
			<SearchBar query={query} setQuery={setQuery} />
			<p className="num-results">
				Found <strong>{/* {movies.length} */}0</strong> results
			</p>
		</nav>
	);
};
export default Navbar;
