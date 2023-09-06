import Navbar from "./Navbar";

type Props = {
	children: React.ReactNode;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
};
const Layout = ({ children, query, setQuery }: Props) => {
	return (
		<div>
			<Navbar query={query} setQuery={setQuery} />
			<main className="main">{children}</main>
		</div>
	);
};
export default Layout;
