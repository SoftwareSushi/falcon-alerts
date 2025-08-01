import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

export default function Processing() {
	const navigate = useNavigate();
	const location = useLocation();
	const [progress, setProgress] = useState(0);
	const [currentSource, setCurrentSource] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					// Simulate different results - randomly decide if clean or flagged
					const isClean = Math.random() > 0.5; // 50% chance of being clean
					setTimeout(() => {
						navigate('/results', {
							state: {
								...location.state,
								status: isClean ? 'Clean' : 'Flagged',
								isNewScan: true,
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
			className="min-h-screen"
			style={{ backgroundColor: 'var(--bg-primary)' }}
		>
			{/* Modern Header */}
			<header
				style={{
					backgroundColor: 'var(--bg-secondary)',
					borderBottom: '1px solid var(--border-primary)',
				}}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => navigate('/dashboard')}
							className="btn btn-ghost"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<div className="flex items-center space-x-3">
							<div
								className="w-8 h-8 rounded-lg flex items-center justify-center"
								style={{ backgroundColor: 'var(--text-primary)' }}
							>
								<svg
									className="w-5 h-5"
									style={{ color: 'var(--bg-primary)' }}
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
							<h1
								className="text-xl font-semibold"
								style={{ color: 'var(--text-primary)' }}
							>
								Processing Entity Risk Scan
							</h1>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-6 py-8">
				<div className="card">
					<div className="card-body text-center">
						{/* Modern Loading Spinner */}
						<div className="flex items-center justify-center mb-8">
							<div className="relative">
								<div
									className="w-20 h-20 border-4 rounded-full"
									style={{ borderColor: 'var(--color-gray-200)' }}
								></div>
								<div
									className="absolute inset-0 w-20 h-20 border-4 rounded-full animate-spin"
									style={{
										borderColor:
											'var(--text-primary) transparent transparent transparent',
									}}
								></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center"
										style={{ backgroundColor: 'var(--color-gray-100)' }}
									>
										<svg
											className="w-6 h-6"
											style={{ color: 'var(--text-primary)' }}
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
							</div>
						</div>

						{/* Progress Text */}
						<p
							className="text-xl font-medium mb-6"
							style={{ color: 'var(--color-gray-700)' }}
						>
							Scanning {dataSources.length} data sources for comprehensive
							results...
						</p>

						{/* Progress Bar */}
						<div
							className="w-full rounded-full h-2 mb-8"
							style={{ backgroundColor: 'var(--color-gray-200)' }}
						>
							<div
								className="h-2 rounded-full transition-all duration-300 ease-out"
								style={{
									width: `${progress}%`,
									backgroundColor: 'var(--text-primary)',
								}}
							></div>
						</div>

						{/* Current Source */}
						<div
							className="rounded-lg p-4 mb-6"
							style={{ backgroundColor: 'var(--bg-tertiary)' }}
						>
							<p
								className="text-base font-medium mb-1"
								style={{ color: 'var(--text-secondary)' }}
							>
								Currently scanning:
							</p>
							<p
								className="font-semibold"
								style={{ color: 'var(--text-primary)' }}
							>
								{dataSources[currentSource]}
							</p>
						</div>

						{/* Progress Stats */}
						<div className="grid grid-cols-3 gap-6 mb-8">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									{Math.round(progress)}%
								</p>
								<p
									className="text-base font-medium"
									style={{ color: 'var(--text-tertiary)' }}
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
									className="text-base font-medium"
									style={{ color: 'var(--text-tertiary)' }}
								>
									Sources Scanned
								</p>
							</div>
							{progress < 100 ? (
								<div className="text-center">
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-yellow-600)' }}
									>
										{Math.max(1, Math.ceil((100 - progress) / 20))}s
									</p>
									<p
										className="text-base font-medium"
										style={{ color: 'var(--text-tertiary)' }}
									>
										Remaining
									</p>
								</div>
							) : (
								<div className="text-center">
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-green-600)' }}
									>
										✓
									</p>
									<p
										className="text-base font-medium"
										style={{ color: 'var(--text-tertiary)' }}
									>
										Complete
									</p>
								</div>
							)}
						</div>

						{/* Cancel Option */}
						<div
							className="mt-6 pt-6 border-t"
							style={{ borderColor: 'var(--color-gray-200)' }}
						>
							<button
								onClick={() => navigate('/dashboard')}
								className="btn btn-ghost"
							>
								<svg
									className="w-4 h-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Cancel and return to dashboard
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
