import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Processing() {
	const navigate = useNavigate();
	const location = useLocation();
	const [progress, setProgress] = useState(0);
	const [currentSource, setCurrentSource] = useState(0);

	const dataSources = [
		'Criminal Records Database',
		'Public Court Records',
		'Credit Bureau Reports',
		'Business Registry',
		'Social Media Profiles',
		'Property Records',
		'Employment History',
		'Professional Licenses',
		'Bankruptcy Records',
		'Sanctions Lists',
		'News & Media Sources',
		'Corporate Filings',
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					// Simulate different results - randomly decide if clean or flagged
					const isClean = Math.random() > 0.3; // 70% chance of being clean
					setTimeout(() => {
						navigate('/results', {
							state: {
								...location.state,
								status: isClean ? 'Clean' : 'Flagged',
								isNewCheck: true,
							},
						});
					}, 500);
					return 100;
				}
				return prev + 2;
			});
		}, 100);

		return () => clearInterval(interval);
	}, [navigate, location.state]);

	useEffect(() => {
		const sourceInterval = setInterval(() => {
			setCurrentSource((prev) => (prev + 1) % dataSources.length);
		}, 400);

		return () => clearInterval(sourceInterval);
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
				{/* Animated Loading Spinner */}
				<div className="relative mx-auto mb-8">
					<div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
					<div className="absolute top-0 left-0 w-24 h-24 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<svg
							className="w-8 h-8 text-indigo-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Progress Text */}
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					Processing Background Check
				</h2>

				{/* Progress Bar */}
				<div className="w-full bg-gray-200 rounded-full h-2 mb-6">
					<div
						className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
						style={{ width: `${progress}%` }}
					></div>
				</div>

				{/* Current Progress */}
				<p className="text-lg text-gray-700 mb-2">
					Scanning {dataSources.length} data sources...
				</p>

				{/* Current Source */}
				<div className="bg-gray-50 rounded-lg p-4 mb-6">
					<p className="text-sm text-gray-600 mb-1">Currently scanning:</p>
					<p className="font-medium text-gray-900">
						{dataSources[currentSource]}
					</p>
				</div>

				{/* Progress Percentage */}
				<p className="text-sm text-gray-500">
					{Math.round(progress)}% Complete
				</p>

				{/* Estimated Time */}
				{progress < 100 && (
					<p className="text-xs text-gray-400 mt-2">
						Estimated time remaining:{' '}
						{Math.max(1, Math.ceil((100 - progress) / 20))} seconds
					</p>
				)}

				{/* Cancel Option */}
				<button
					onClick={() => navigate('/dashboard')}
					className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
				>
					Cancel and return to dashboard
				</button>
			</div>
		</div>
	);
}
