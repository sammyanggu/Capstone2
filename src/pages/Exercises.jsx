// Coding Exercises page. Lets users pick a language and level.
// Shows cards for HTML, CSS, and JavaScript exercises.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Exercises() {
	// State to show/hide HTML levels dropdown
	const [levelhtml, setlevelhtml] = useState(false);
	// Navigation function
	const navigate = useNavigate();

	return (
		<div className="exercises-container mt-20 sm:mt-16">
			{/* Page title */}
			<h1 className="exercises-title">Coding Exercises</h1>
			{/* Exercise cards for each language */}
			<div className="flex flex-wrap justify-center gap-8 mb-8">
				{/* HTML Card */}
				<button
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200"
					onClick={() => setlevelhtml((v) => !v)}
				>
					<img
						src="/assets/html.svg"
						alt="HTML Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-orange-600 transition-shadow ease-in-out duration-300"
					/>
					<span className="mt-2 font-bold text-orange-400">HTML</span>
				</button>
				{/* CSS Card */}
				<button className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200">
					<img
						src="/assets/css.svg"
						alt="CSS Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-blue-600 transition-shadow ease-in-out duration-300"
					/>
					<span className="mt-2 font-bold text-blue-400">CSS</span>
				</button>
				{/* JS Card */}
				<button className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200">
					<img
						src="/assets/javascript.svg"
						alt="JavaScript Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-yellow-600 transition-shadow duration-300 ease-in-out"
					/>
					<span className="mt-2 font-bold text-yellow-400">JavaScript</span>
				</button>
			</div>
			{/* HTML Levels Dropdown, shown if HTML card is clicked */}
			{levelhtml && (
				<div className="flex flex-col items-center gap-2 mt-4">
					<button className="btn1h w-40" onClick={() => navigate('/codequiztest')}>Beginner</button>
					<button className="btn1h w-40">Intermediate</button>
					<button className="btn1h w-40">Advanced</button>
					<button
						className="mt-2 text-slate-400 hover:text-fuchsia-400"
						onClick={() => setlevelhtml(false)}
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
}

// Export the Exercises component
export default Exercises;