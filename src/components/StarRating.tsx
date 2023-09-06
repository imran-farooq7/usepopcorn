import { useState } from "react";
import Star from "./Star";

type Props = {
	maxRating: number;
	color?: string;
	size?: number;
	setUserRating: React.Dispatch<React.SetStateAction<number>>;
};
const StarRating = ({
	maxRating = 5,
	color = "#fcc419",
	size = 48,
	setUserRating,
}: Props) => {
	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);
	const containerStyles = {
		display: "flex",
		alignItems: "center",
		gap: "15px",
	};
	const starContainerStyles = {
		display: "flex",
		gap: "5px",
		color,
		fontSize: `${size}px`,
	};
	setUserRating(rating);
	return (
		<div style={containerStyles}>
			<div style={starContainerStyles}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						onClick={() => {
							setRating(i + 1);
						}}
						full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						onHover={() => setTempRating(i + 1)}
						onLeave={() => setTempRating(0)}
						color={color}
						size={size}
					/>
				))}
			</div>
			<p style={{ lineHeight: "1", fontSize: `${size / 1.5}px`, color }}>
				{tempRating || rating || ""}
			</p>
		</div>
	);
};
export default StarRating;
