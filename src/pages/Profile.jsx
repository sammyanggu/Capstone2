import { useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

import { toast } from 'react-toastify';

const sections = [
	{ key: "progress", label: "Progress" },
	{ key: "achievements", label: "Achievements" },
	{ key: "badges", label: "Badges" },
	{ key: "edit", label: "Edit Profile" },
];

function Profile() {
	const [active, setActive] = useState("progress");
	const [user, setUser] = useState(null);
	const [achievements, setAchievements] = useState([]);
	const [badges, setBadges] = useState([]);
	const [groupedBadges, setGroupedBadges] = useState({});
	const [equippedBadge, setEquippedBadge] = useState(null);
	const [totalPoints, setTotalPoints] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [showUnearned, setShowUnearned] = useState(true);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			if (firebaseUser) {
				console.log('Your user ID:', firebaseUser.uid);
			}
			if (firebaseUser) {
				// Fetch user achievements
				// Fetch user achievements
				axios.get(`http://localhost/capstone-backend/api/achievements.php?userId=${firebaseUser.uid}`)
					.then(response => {
						console.log('Achievements response:', response.data);
						const { achievements: achievementsData, totalPoints } = response.data;
						setAchievements(achievementsData || []);
						setTotalPoints(totalPoints || 0);
					})
					.catch(error => console.error("Error fetching achievements:", error));

				// Fetch user badges
				axios.get(`http://localhost/capstone-backend/api/badges.php?userId=${firebaseUser.uid}`)
					.then(response => {
						console.log('Badges response:', response.data);
						const { badges: badgesData, groupedBadges: groupedData } = response.data;
						setBadges(badgesData || []);
						setGroupedBadges(groupedData || {});
						const equipped = (badgesData || []).find(badge => badge.isEquipped);
						if (equipped) setEquippedBadge(equipped);
					})
					.catch(error => console.error("Error fetching badges:", error));

				// Fetch notifications
				axios.get(`http://localhost/capstone-backend/api/notifications.php?userId=${firebaseUser.uid}`)
					.then(response => {
						setNotifications(response.data || []);
					})
					.catch(error => console.error("Error fetching notifications:", error));
			}
		});
		return () => unsubscribe();
	}, []);

	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-fuchsia-300">
				<h2 className="text-2xl font-bold mb-2">No user found</h2>
				<p className="mb-4">Please sign in to view your profile.</p>
			</div>
		);
	}

	return (
		<div className="PMainC">
			{/* Sidebar */}
			<aside className="PSidebar">
				<img
					src={user.photoURL || "/assets/react.svg"}
					alt="Profile"
					className="PPic"
				/>
				<div className="PName mb-4">{user.displayName || "User"}</div>
				<nav className="flex flex-col gap-2 w-full">
					{sections.map((s) => (
						<button
							key={s.key}
							className={`btn1h w-full text-left ${active === s.key ? "bg-fuchsia-600 text-slate-900" : ""
								}`}
							onClick={() => setActive(s.key)}
						>
							{s.label}
						</button>
					))}
				</nav>
			</aside>
			{/* Main Content */}
			<main className="flex-1 p-6">

				{active === "progress" && (
					<div>
						<h2 className="text-2xl font-bold text-fuchsia-400 mb-6">
							Learning Progress
						</h2>
						
						{/* Current Badge */}
						{equippedBadge && (
							<div className="mb-8">
								<h3 className="text-xl font-semibold text-fuchsia-300 mb-4">Current Badge</h3>
								<div className="bg-slate-800 p-6 rounded-lg inline-block">
									<div className="flex items-center gap-4">
										<div className="relative">
											<img 
												src={equippedBadge.icon} 
												alt={equippedBadge.name} 
												className="w-16 h-16"
											/>
											<div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded" 
												style={{ backgroundColor: equippedBadge.tierColor }}>
												{equippedBadge.tier.toUpperCase()}
											</div>
										</div>
										<div>
											<h4 className="font-semibold text-fuchsia-300">{equippedBadge.name}</h4>
											<p className="text-sm text-gray-400">{equippedBadge.description}</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
				{active === "edit" && (
					<div>
						<h2 className="text-2xl font-bold text-fuchsia-400 mb-4">
							Edit Profile
						</h2>
						<p>Profile editing form goes here.</p>
					</div>
				)}
				{active === "achievements" && (
					<div>
						<div className="flex flex-col gap-6">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl font-bold text-fuchsia-400">
									Achievements
								</h2>
								<div className="flex items-center gap-4">
									<div className="text-fuchsia-300">
										<span className="font-bold">Total Points:</span> {totalPoints}
									</div>
									<select 
										className="bg-slate-700 text-fuchsia-300 rounded px-3 py-1"
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
									>
										<option value="all">All Categories</option>
										<option value="html">HTML</option>
										<option value="css">CSS</option>
										<option value="javascript">JavaScript</option>
									</select>
									<label className="flex items-center gap-2 text-fuchsia-300">
										<input
											type="checkbox"
											checked={showUnearned}
											onChange={(e) => setShowUnearned(e.target.checked)}
											className="form-checkbox text-fuchsia-500"
										/>
										Show Unearned
									</label>
								</div>
							</div>

							{/* Stats Overview */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-slate-800 p-6 rounded-lg">
									<h3 className="text-lg font-semibold text-fuchsia-300 mb-2">Achievements Progress</h3>
									<p className="text-3xl font-bold text-fuchsia-400">
										{achievements.filter(a => a.isEarned).length} / {achievements.length}
									</p>
								</div>
								<div className="bg-slate-800 p-6 rounded-lg">
									<h3 className="text-lg font-semibold text-fuchsia-300 mb-2">Badges Progress</h3>
									<p className="text-3xl font-bold text-fuchsia-400">
										{badges.filter(b => b.isEarned).length} / {badges.length}
									</p>
								</div>
							</div>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{achievements
								.filter(a => selectedCategory === 'all' || (a.type || '').toLowerCase() === selectedCategory)
								.filter(a => showUnearned || a.isEarned)
								.map((achievement) => (
								<div 
									key={achievement.id} 
									className={`bg-slate-800 p-4 rounded-lg relative ${
										achievement.isEarned ? 'border-2 border-fuchsia-500' : 'opacity-75'
									}`}
								>
									<div className="flex items-center gap-3">
										<div className="relative">
											<img 
												src={achievement.icon} 
												alt={achievement.name} 
												className={`w-12 h-12 ${!achievement.isEarned && 'grayscale'}`}
											/>
											{achievement.isEarned && (
												<div className="absolute -top-1 -right-1 bg-fuchsia-500 rounded-full p-1">
													<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
													</svg>
												</div>
											)}
										</div>
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-fuchsia-300">
												{achievement.name}
											</h3>
											<p className="text-sm text-gray-400">
												{achievement.description}
											</p>
											<div className="flex justify-between items-center mt-2">
												<p className="text-sm text-fuchsia-400">
													{achievement.points} points
												</p>
												{achievement.dateEarned && (
													<p className="text-xs text-gray-500">
														Earned: {new Date(achievement.dateEarned).toLocaleDateString()}
													</p>
												)}
											</div>
											{!achievement.isEarned && achievement.progress.max > 1 && (
												<div className="mt-2">
													<div className="h-2 bg-slate-700 rounded overflow-hidden">
														<div 
															className="h-full bg-fuchsia-500 transition-all duration-500"
															style={{ width: `${achievement.progressPercentage}%` }}
														/>
													</div>
													<p className="text-xs text-gray-400 mt-1">
														Progress: {achievement.progress.current} / {achievement.progress.max}
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{active === "badges" && (
					<div>
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-fuchsia-400">
								Badges
							</h2>
							<select 
								className="bg-slate-700 text-fuchsia-300 rounded px-3 py-1"
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								<option value="all">All Categories</option>
								<option value="html">HTML</option>
								<option value="css">CSS</option>
								<option value="javascript">JavaScript</option>
							</select>
						</div>

						<div className="mb-6">
							<h3 className="text-lg font-semibold text-fuchsia-300 mb-2">Equipped Badge</h3>
							{equippedBadge ? (
								<div className="bg-slate-800 p-4 rounded-lg inline-block relative overflow-hidden">
									<div className="absolute inset-0 opacity-10" style={{ 
										backgroundColor: equippedBadge.tierColor,
										backgroundImage: `linear-gradient(45deg, ${equippedBadge.tierColor} 25%, transparent 25%, transparent 50%, ${equippedBadge.tierColor} 50%, ${equippedBadge.tierColor} 75%, transparent 75%, transparent)`,
										backgroundSize: '20px 20px'
									}}></div>
									<div className="relative flex items-center gap-3">
										<div className="relative">
											<img 
												src={equippedBadge.icon} 
												alt={equippedBadge.name} 
												className="w-16 h-16 transform hover:scale-110 transition-transform"
											/>
											<div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded" 
												style={{ backgroundColor: equippedBadge.tierColor }}>
												{equippedBadge.tier.toUpperCase()}
											</div>
										</div>
										<div>
											<h4 className="font-semibold text-fuchsia-300">{equippedBadge.name}</h4>
											<p className="text-sm text-gray-400">{equippedBadge.description}</p>
											<p className="text-xs text-fuchsia-400 mt-1">Type: {equippedBadge.type || 'General'}</p>
										</div>
									</div>
								</div>
							) : (
								<p className="text-gray-400">No badge equipped</p>
							)}
						</div>

						{Object.entries(groupedBadges)
							.filter(([type]) => selectedCategory === 'all' || type.toLowerCase() === selectedCategory)
							.map(([type, typeBadges]) => (
							<div key={type} className="mb-8">
								<h3 className="text-lg font-semibold text-fuchsia-300 mb-4 capitalize">
									{type} Badges
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{typeBadges.map((badge) => (
										<div 
											key={badge.id} 
											className={`bg-slate-800 p-4 rounded-lg relative ${
												badge.isEarned ? '' : 'opacity-75'
											}`}
										>
											<div className="absolute inset-0 opacity-10 rounded-lg" style={{ 
												backgroundColor: badge.tierColor,
												backgroundImage: badge.isEarned ? `linear-gradient(45deg, ${badge.tierColor} 25%, transparent 25%, transparent 50%, ${badge.tierColor} 50%, ${badge.tierColor} 75%, transparent 75%, transparent)` : 'none',
												backgroundSize: '20px 20px'
											}}></div>
											<div className="relative flex items-center gap-3">
												<div className="relative">
													<img 
														src={badge.icon} 
														alt={badge.name} 
														className={`w-12 h-12 transform hover:scale-110 transition-transform ${!badge.isEarned && 'grayscale'}`}
													/>
													<div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded" 
														style={{ backgroundColor: badge.tierColor }}>
														{badge.tier.toUpperCase()}
													</div>
												</div>
												<div className="flex-1">
													<h4 className="font-semibold text-fuchsia-300">
														{badge.name}
													</h4>
													<p className="text-sm text-gray-400">
														{badge.description}
													</p>
													{badge.isEarned ? (
														<>
															<p className="text-xs text-gray-500 mt-1">
																Earned: {new Date(badge.dateEarned).toLocaleDateString()}
															</p>
															<button
																onClick={() => {
																	axios.post(`http://localhost/capstone-backend/api/badges.php`, {
																		userId: user.uid,
																		badgeId: badge.id,
																		action: 'equip'
																	})
																	.then(() => {
																		setEquippedBadge(badge);
																		// Show toast notification
																		toast.success('Badge equipped successfully!');
																	})
																	.catch(error => {
																		console.error("Error equipping badge:", error);
																		toast.error('Failed to equip badge');
																	});
																}}
																className={`mt-2 px-3 py-1 rounded transition-colors ${
																	equippedBadge?.id === badge.id
																		? 'bg-fuchsia-700 text-white cursor-not-allowed'
																		: 'bg-fuchsia-500 hover:bg-fuchsia-600 text-white'
																}`}
																disabled={equippedBadge?.id === badge.id}
															>
																{equippedBadge?.id === badge.id ? 'Equipped' : 'Equip'}
															</button>
														</>
													) : (
														<div className="mt-2">
															<p className="text-xs text-gray-500">Requirements:</p>
															<ul className="text-xs text-gray-400 list-disc list-inside">
																{badge.requiredAchievements.map((req, idx) => (
																	<li key={idx}>{req}</li>
																))}
															</ul>
														</div>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}


			</main>
		</div>
	);
}

export default Profile;
