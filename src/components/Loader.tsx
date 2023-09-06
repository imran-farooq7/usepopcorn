import { Rings } from "react-loader-spinner";
const Loader = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Rings height="120" width="120" radius="9" color="yellow" />;
		</div>
	);
};
export default Loader;
