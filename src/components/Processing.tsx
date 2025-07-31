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
		<div
			className="min-h-screen flex items-center justify-center"
			style={{ backgroundColor: 'var(--color-gray-50)' }}
		>
			<div className="max-w-lg w-full mx-6">
				<div className="card text-center">
					<div className="card-body" style={{ padding: '48px 32px' }}>
						{/* Modern Loading Spinner */}
						<div className="relative mx-auto mb-8">
							<div
								className="w-20 h-20 border-4 rounded-full"
								style={{ borderColor: 'var(--color-gray-200)' }}
							></div>
							<div
								className="absolute top-0 left-0 w-20 h-20 border-4 rounded-full animate-spin border-t-transparent"
								style={{ borderColor: 'var(--color-blue-500)' }}
							></div>
							<div className="absolute inset-0 flex items-center justify-center">
								<svg
									className="w-8 h-8"
									style={{ color: 'var(--color-blue-500)' }}
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
						<h2
							className="text-2xl font-semibold mb-6"
							style={{ color: 'var(--color-gray-900)' }}
						>
							Processing Background Check
						</h2>

						{/* Progress Bar */}
						<div
							className="w-full rounded-full h-3 mb-8"
							style={{ backgroundColor: 'var(--color-gray-200)' }}
						>
							<div
								className="h-3 rounded-full transition-all duration-300 ease-out"
								style={{
									width: `${progress}%`,
									backgroundColor: 'var(--color-blue-500)',
								}}
							></div>
						</div>

						{/* Current Progress */}
						<p
							className="text-lg mb-4"
							style={{ color: 'var(--color-gray-700)' }}
						>
							Scanning {dataSources.length} data sources...
						</p>

						{/* Current Source */}
						<div
							className="rounded-lg p-4 mb-6"
							style={{ backgroundColor: 'var(--color-gray-100)' }}
						>
							<p
								className="text-sm mb-1"
								style={{ color: 'var(--color-gray-600)' }}
							>
								Currently scanning:
							</p>
							<p
								className="font-medium"
								style={{ color: 'var(--color-gray-900)' }}
							>
								{dataSources[currentSource]}
							</p>
						</div>

						{/* Progress Stats */}
						<div className="flex justify-between items-center mb-6">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-blue-600)' }}
								>
									{Math.round(progress)}%
								</p>
								<p
									className="text-sm"
									style={{ color: 'var(--color-gray-500)' }}
								>
									Complete
								</p>
							</div>
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-green-600)' }}
								>
									{Math.floor(progress / (100 / dataSources.length))}
								</p>
								<p
									className="text-sm"
									style={{ color: 'var(--color-gray-500)' }}
								>
									Sources Scanned
								</p>
							</div>
							{progress < 100 && (
								<div className="text-center">
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-yellow-600)' }}
									>
										{Math.max(1, Math.ceil((100 - progress) / 20))}s
									</p>
									<p
										className="text-sm"
										style={{ color: 'var(--color-gray-500)' }}
									>
										Remaining
									</p>
								</div>
							)}
						</div>

						{/* Cancel Option */}
						<button
							onClick={() => navigate('/dashboard')}
							className="btn btn-ghost mt-4"
						>
							Cancel and return to dashboard
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
