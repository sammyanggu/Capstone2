// Coding Exercises page. Lets users pick a language and level.
// Shows cards for HTML, CSS, and JavaScript exercises.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelModal from "../components/LevelModal";
import { htmlIcon, cssIcon, jsIcon, phpIcon, bootstrapIcon, tailwindIcon } from '../assets/icons/index.js';

function Exercises() {
	// Mock progress data - replace with actual progress from backend
	const defaultProgress = {
		beginner: true,
		intermediate: false,
		advanced: false
	};
	const [levelhtml, setlevelhtml] = useState(false);
	const [levelcss, setlevelcss] = useState(false);
	const [leveljavascript, setleveljavascript] = useState(false);
	const [levelphp, setlevelphp] = useState(false);
	const [levelbootstrap, setlevelbootstrap] = useState(false);
	const [leveltailwind, setleveltailwind] = useState(false);
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
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200 cursor-pointer"
					onClick={() => {
						setlevelhtml((v) => !v);
						setlevelphp(false);
						setlevelbootstrap(false);
						setleveltailwind(false);
					}}
				>
					<img
						src={htmlIcon}
						alt="HTML Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-orange-600 transition-shadow ease-in-out duration-300 cursor-pointer"
					/>
					<span className="mt-2 font-bold text-orange-400">HTML</span>
				</button>
				{/* CSS Card */}
				<button 
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200 cursor-pointer"
					onClick={() => {
						setlevelcss((v) => !v);
						setlevelhtml(false);
						setlevelphp(false);
						setlevelbootstrap(false);
						setleveltailwind(false);
						setleveljavascript(false);
					}}
				>
					<img
						src={cssIcon}
						alt="CSS Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-blue-600 transition-shadow ease-in-out duration-300 cursor-pointer"
					/>
					<span className="mt-2 font-bold text-blue-400">CSS</span>
				</button>
				{/* JS Card */}
				<button 
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200 cursor-pointer"
					onClick={() => {
						setleveljavascript((v) => !v);
						setlevelhtml(false);
						setlevelphp(false);
						setlevelbootstrap(false);
						setleveltailwind(false);
						setlevelcss(false);
					}}
				>
					<img
						src={jsIcon}
						alt="JavaScript Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-yellow-600 transition-shadow duration-300 ease-in-out cursor-pointer"
					/>
					<span className="mt-2 font-bold text-yellow-400">JavaScript</span>
				</button>
				{/* PHP Card */}
				<button
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200 cursor-pointer"
					onClick={() => {
						setlevelphp((v) => !v);
						setlevelhtml(false);
						setlevelbootstrap(false);
						setleveltailwind(false);
					}}
				>
					<img
						src={phpIcon}
						alt="PHP Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-purple-600 transition-shadow duration-300 ease-in-out cursor-pointer"
					/>
					<span className="mt-2 font-bold text-purple-400">PHP</span>
				</button>
				
				{/* Level Modals */}
				{levelhtml && (
					<LevelModal
						isOpen={levelhtml}
						onClose={() => setlevelhtml(false)}
						onSelectLevel={(level) => {
							setlevelhtml(false);
							navigate(`/exercises/html/${level}`);
						}}
						title="Select HTML Exercise Level"
					/>
				)}
				{levelcss && (
					<LevelModal
						isOpen={levelcss}
						onClose={() => setlevelcss(false)}
						onSelectLevel={(level) => {
							setlevelcss(false);
							navigate(`/exercises/css/${level}`);
						}}
						title="Select CSS Exercise Level"
					/>
				)}
				{leveljavascript && (
					<LevelModal
						isOpen={leveljavascript}
						onClose={() => setleveljavascript(false)}
						onSelectLevel={(level) => {
							setleveljavascript(false);
							navigate(`/exercises/javascript/${level}`);
						}}
						title="Select JavaScript Exercise Level"
					/>
				)}
				{/* Bootstrap Card */}
				<button
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200 cursor-pointer"
					onClick={() => {
						setlevelbootstrap((v) => !v);
						setlevelhtml(false);
						setlevelphp(false);
						setleveltailwind(false);
					}}
				>
					<img
						src={bootstrapIcon}
						alt="Bootstrap Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-purple-600 transition-shadow duration-300 ease-in-out cursor-pointer"
					/>
					<span className="mt-2 font-bold text-purple-500">Bootstrap</span>
				</button>
				{/* Tailwind Card */}
				<button
					className="flex flex-col items-center w-36 hover:scale-105 transition-transform duration-200 cursor-pointer"
					onClick={() => {
						setleveltailwind((v) => !v);
						setlevelhtml(false);
						setlevelphp(false);
						setlevelbootstrap(false);
					}}
				>
					<img
						src={tailwindIcon}
						alt="Tailwind CSS Logo"
						className="w-20 h-20 mx-auto drop-shadow-lg hover:drop-shadow-cyan-600 transition-shadow duration-300 ease-in-out"
					/>
					<span className="mt-2 font-bold text-cyan-400">Tailwind</span>
				</button>
			</div>

			{/* Modal Backdrop */}
			{(levelhtml || levelcss || leveljavascript || levelphp || levelbootstrap || leveltailwind) && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
					{/* HTML Levels Modal */}
					{levelhtml && (
						<div className="bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
							<div className="flex justify-center mb-6">
								<img src={htmlIcon} alt="HTML" className="w-16 h-16 drop-shadow-lg" />
							</div>
							<div className="flex flex-col gap-3 items-center">
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-orange-500"
									onClick={() => navigate('/exercises/html/beginner')}
								>
									Beginner
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-orange-500"
									onClick={() => navigate('/exercises/html/intermediate')}
								>
									Intermediate
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-orange-500"
									onClick={() => navigate('/exercises/html/advanced')}
								>
									Advanced
								</button>
							</div>
							<button
								className="mt-6 text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium"
								onClick={() => setlevelhtml(false)}
							>
								Close
							</button>
						</div>
					)}

					{/* CSS Levels Modal */}
					{levelcss && (
						<div className="bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
							<div className="flex justify-center mb-6">
								<img src={cssIcon} alt="CSS" className="w-16 h-16 drop-shadow-lg" />
							</div>
							<div className="flex flex-col gap-3 items-center">
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-blue-500"
									onClick={() => navigate('/exercises/css/beginner')}
								>
									Beginner
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-blue-500"
									onClick={() => navigate('/exercises/css/intermediate')}
								>
									Intermediate
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-blue-500"
									onClick={() => navigate('/exercises/css/advanced')}
								>
									Advanced
								</button>
							</div>
							<button
								className="mt-6 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium"
								onClick={() => setlevelcss(false)}
							>
								Close
							</button>
						</div>
					)}

					{/* JavaScript Levels Modal */}
					{leveljavascript && (
						<div className="bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
							<div className="flex justify-center mb-6">
								<img src={jsIcon} alt="JavaScript" className="w-16 h-16 drop-shadow-lg" />
							</div>
							<div className="flex flex-col gap-3 items-center">
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-yellow-500"
									onClick={() => navigate('/exercises/javascript/beginner')}
								>
									Beginner
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-yellow-500"
									onClick={() => navigate('/exercises/javascript/intermediate')}
								>
									Intermediate
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-yellow-500"
									onClick={() => navigate('/exercises/javascript/advanced')}
								>
									Advanced
								</button>
							</div>
							<button
								className="mt-6 text-slate-400 hover:text-yellow-400 transition-colors text-sm font-medium"
								onClick={() => setleveljavascript(false)}
							>
								Close
							</button>
						</div>
					)}

					{/* PHP Levels Modal */}
					{levelphp && (
						<div className="bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
							<div className="flex justify-center mb-6">
								<img src={phpIcon} alt="PHP" className="w-16 h-16 drop-shadow-lg" />
							</div>
							<div className="flex flex-col gap-3 items-center">
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-indigo-500"
									onClick={() => navigate('/exercises/php/beginner')}
								>
									Beginner
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-indigo-500"
									onClick={() => navigate('/exercises/php/intermediate')}
								>
									Intermediate
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-indigo-500"
									onClick={() => navigate('/exercises/php/advanced')}
								>
									Advanced
								</button>
							</div>
							<button
								className="mt-6 text-slate-400 hover:text-purple-400 transition-colors text-sm font-medium"
								onClick={() => setlevelphp(false)}
							>
								Close
							</button>
						</div>
					)}

					{/* Bootstrap Levels Modal */}
					{levelbootstrap && (
						<div className="bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
							<div className="flex justify-center mb-6">
								<img src={bootstrapIcon} alt="Bootstrap" className="w-16 h-16 drop-shadow-lg" />
							</div>
							<div className="flex flex-col gap-3 items-center">
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-purple-500"
									onClick={() => navigate('/exercises/bootstrap/beginner')}
								>
									Beginner
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-purple-500"
									onClick={() => navigate('/exercises/bootstrap/intermediate')}
								>
									Intermediate
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-purple-500"
									onClick={() => navigate('/exercises/bootstrap/advanced')}
								>
									Advanced
								</button>
							</div>
							<button
								className="mt-6 text-slate-400 hover:text-purple-500 transition-colors text-sm font-medium"
								onClick={() => setlevelbootstrap(false)}
							>
								Close
							</button>
						</div>
					)}

					{/* Tailwind Levels Modal */}
					{leveltailwind && (
						<div className="bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
							<div className="flex justify-center mb-6">
								<img src={tailwindIcon} alt="Tailwind" className="w-16 h-16 drop-shadow-lg" />
							</div>
							<div className="flex flex-col gap-3 items-center">
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-cyan-500"
									onClick={() => navigate('/exercises/tailwind/beginner')}
								>
									Beginner
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-cyan-500"
									onClick={() => navigate('/exercises/tailwind/intermediate')}
								>
									Intermediate
								</button>
								<button 
									className="btn1h w-48 py-2 text-white font-bold hover:bg-cyan-500"
									onClick={() => navigate('/exercises/tailwind/advanced')}
								>
									Advanced
								</button>
							</div>
							<button
								className="mt-6 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
								onClick={() => setleveltailwind(false)}
							>
								Close
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

// Export the Exercises component
export default Exercises;