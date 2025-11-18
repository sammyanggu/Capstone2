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
		<div className="w-full min-h-screen bg-white pt-24">
			{/* Full width header with logos */}
			<div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 md:px-8 lg:px-12">
				<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center text-black mb-16 md:mb-20">Coding Exercises</h1>
				
				{/* First Row - HTML, CSS, JavaScript */}
				<div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-12">
					{/* HTML */}
					<button
						className="flex flex-col items-center hover:scale-125 transition-transform duration-300 cursor-pointer group"
						onClick={() => {
							setlevelhtml((v) => !v);
							setlevelcss(false);
							setleveljavascript(false);
							setlevelphp(false);
							setlevelbootstrap(false);
							setleveltailwind(false);
						}}
					>
						<img
							src={htmlIcon}
							alt="HTML Logo"
							className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300"
							style={{filter: 'drop-shadow(0 0 0px rgba(249,115,22,0))'}}
							onMouseEnter={(e) => e.target.style.filter = 'drop-shadow(0 0 25px rgba(249,115,22,0.7))'}
							onMouseLeave={(e) => e.target.style.filter = 'drop-shadow(0 0 0px rgba(249,115,22,0))'}
						/>
						<span className="mt-4 font-bold text-orange-500 text-sm sm:text-base md:text-lg lg:text-xl">HTML</span>
					</button>

					{/* CSS */}
					<button 
						className="flex flex-col items-center hover:scale-125 transition-transform duration-300 cursor-pointer group"
						onClick={() => {
							setlevelcss((v) => !v);
							setlevelhtml(false);
							setleveljavascript(false);
							setlevelphp(false);
							setlevelbootstrap(false);
							setleveltailwind(false);
						}}
					>
						<img
							src={cssIcon}
							alt="CSS Logo"
							className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300"
							style={{filter: 'drop-shadow(0 0 0px rgba(59,130,246,0))'}}
							onMouseEnter={(e) => e.target.style.filter = 'drop-shadow(0 0 25px rgba(59,130,246,0.7))'}
							onMouseLeave={(e) => e.target.style.filter = 'drop-shadow(0 0 0px rgba(59,130,246,0))'}
						/>
						<span className="mt-4 font-bold text-blue-500 text-sm sm:text-base md:text-lg lg:text-xl">CSS</span>
					</button>

					{/* JavaScript */}
					<button 
						className="flex flex-col items-center hover:scale-125 transition-transform duration-300 cursor-pointer group"
						onClick={() => {
							setleveljavascript((v) => !v);
							setlevelhtml(false);
							setlevelcss(false);
							setlevelphp(false);
							setlevelbootstrap(false);
							setleveltailwind(false);
						}}
					>
						<img
							src={jsIcon}
							alt="JavaScript Logo"
							className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300"
							style={{filter: 'drop-shadow(0 0 0px rgba(234,179,8,0))'}}
							onMouseEnter={(e) => e.target.style.filter = 'drop-shadow(0 0 25px rgba(234,179,8,0.7))'}
							onMouseLeave={(e) => e.target.style.filter = 'drop-shadow(0 0 0px rgba(234,179,8,0))'}
						/>
						<span className="mt-4 font-bold text-yellow-500 text-sm sm:text-base md:text-lg lg:text-xl">JavaScript</span>
					</button>
				</div>

				{/* Second Row - PHP, Bootstrap, Tailwind */}
				<div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
					{/* PHP */}
					<button
						className="flex flex-col items-center hover:scale-125 transition-transform duration-300 cursor-pointer group"
						onClick={() => {
							setlevelphp((v) => !v);
							setlevelhtml(false);
							setlevelcss(false);
							setleveljavascript(false);
							setlevelbootstrap(false);
							setleveltailwind(false);
						}}
					>
						<img
							src={phpIcon}
							alt="PHP Logo"
							className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300"
							style={{filter: 'drop-shadow(0 0 0px rgba(168,85,247,0))'}}
							onMouseEnter={(e) => e.target.style.filter = 'drop-shadow(0 0 25px rgba(168,85,247,0.7))'}
							onMouseLeave={(e) => e.target.style.filter = 'drop-shadow(0 0 0px rgba(168,85,247,0))'}
						/>
						<span className="mt-4 font-bold text-purple-500 text-sm sm:text-base md:text-lg lg:text-xl">PHP</span>
					</button>

					{/* Bootstrap */}
					<button
						className="flex flex-col items-center hover:scale-125 transition-transform duration-300 cursor-pointer group"
						onClick={() => {
							setlevelbootstrap((v) => !v);
							setlevelhtml(false);
							setlevelcss(false);
							setleveljavascript(false);
							setlevelphp(false);
							setleveltailwind(false);
						}}
					>
						<img
							src={bootstrapIcon}
							alt="Bootstrap Logo"
							className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300"
							style={{filter: 'drop-shadow(0 0 0px rgba(109,40,217,0))'}}
							onMouseEnter={(e) => e.target.style.filter = 'drop-shadow(0 0 25px rgba(109,40,217,0.7))'}
							onMouseLeave={(e) => e.target.style.filter = 'drop-shadow(0 0 0px rgba(109,40,217,0))'}
						/>
						<span className="mt-4 font-bold text-purple-600 text-sm sm:text-base md:text-lg lg:text-xl">Bootstrap</span>
					</button>

					{/* Tailwind */}
					<button
						className="flex flex-col items-center hover:scale-125 transition-transform duration-300 cursor-pointer group"
						onClick={() => {
							setleveltailwind((v) => !v);
							setlevelhtml(false);
							setlevelcss(false);
							setleveljavascript(false);
							setlevelphp(false);
							setlevelbootstrap(false);
						}}
					>
						<img
							src={tailwindIcon}
							alt="Tailwind CSS Logo"
							className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300"
							style={{filter: 'drop-shadow(0 0 0px rgba(34,197,94,0))'}}
							onMouseEnter={(e) => e.target.style.filter = 'drop-shadow(0 0 25px rgba(34,197,94,0.7))'}
							onMouseLeave={(e) => e.target.style.filter = 'drop-shadow(0 0 0px rgba(34,197,94,0))'}
						/>
						<span className="mt-4 font-bold text-cyan-500 text-sm sm:text-base md:text-lg lg:text-xl">Tailwind</span>
					</button>
				</div>
			</div>
			
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