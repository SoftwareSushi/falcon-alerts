import { useNavigate, useLocation } from 'react-router-dom';
import { mockFlaggedRecords } from '../data/mockData';
import { useState } from 'react';

export default function Results() {
	const navigate = useNavigate();
	const location = useLocation();
	const [showFullReport, setShowFullReport] = useState(false);

	const { status, entityType, data } = location.state || {};
	const isClean = status === 'Clean';
	const isFlagged = status === 'Flagged';

	const getEntityName = () => {
		if (!data) return 'Unknown Entity';
		if (entityType === 'person') {
			return `${data.firstName} ${data.lastName}`;
		} else {
			return data.businessName;
		}
	};

	const downloadReport = (format: 'pdf' | 'json') => {
		// Simulate download
		const filename = `background_check_${getEntityName().replace(
			/\s+/g,
			'_'
		)}.${format}`;
		alert(`Downloading ${filename}...`);
	};

	if (isClean) {
		return (
			<div
				className="min-h-screen"
				style={{ backgroundColor: 'var(--color-gray-50)' }}
			>
				{/* Modern Header */}
				<header className="bg-white border-b border-gray-200">
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
									style={{ backgroundColor: 'var(--color-gray-900)' }}
								>
									<svg
										className="h-5 w-5 text-white"
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
									style={{ color: 'var(--color-gray-900)' }}
								>
									Background Check Results
								</h1>
							</div>
						</div>
					</div>
				</header>

				{/* Clean Result */}
				<main className="max-w-4xl mx-auto px-6 py-8">
					<div className="card">
						<div className="text-center" style={{ padding: '48px 32px' }}>
							{/* Large Green Check Icon */}
							<div
								className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
								style={{ backgroundColor: 'var(--color-green-100)' }}
							>
								<svg
									className="w-10 h-10"
									style={{ color: 'var(--color-green-600)' }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>

							{/* Entity Name */}
							<h2
								className="text-2xl font-semibold mb-2"
								style={{ color: 'var(--color-gray-900)' }}
							>
								{getEntityName()}
							</h2>

							{/* Success Message */}
							<h3
								className="text-xl font-medium mb-4"
								style={{ color: 'var(--color-green-600)' }}
							>
								No criminal records or alerts found.
							</h3>

							{/* Secondary Text */}
							<p
								className="mb-8 max-w-md mx-auto"
								style={{ color: 'var(--color-gray-600)' }}
							>
								We'll continue to monitor this entity and notify you of any
								changes to their background status.
							</p>
						</div>
					</div>

					{/* Scan Summary Card */}
					<div className="card mt-6">
						<div className="card-header">
							<h4
								className="text-lg font-semibold"
								style={{ color: 'var(--color-gray-900)' }}
							>
								Scan Summary
							</h4>
						</div>
						<div className="card-body">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex items-center space-x-3">
									<div
										className="w-8 h-8 rounded-full flex items-center justify-center"
										style={{ backgroundColor: 'var(--color-green-100)' }}
									>
										<svg
											className="w-4 h-4"
											style={{ color: 'var(--color-green-600)' }}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div>
										<p
											className="font-medium"
											style={{ color: 'var(--color-gray-900)' }}
										>
											Criminal Records
										</p>
										<p
											className="text-sm"
											style={{ color: 'var(--color-green-600)' }}
										>
											Clear
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<div
										className="w-8 h-8 rounded-full flex items-center justify-center"
										style={{ backgroundColor: 'var(--color-green-100)' }}
									>
										<svg
											className="w-4 h-4"
											style={{ color: 'var(--color-green-600)' }}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div>
										<p
											className="font-medium"
											style={{ color: 'var(--color-gray-900)' }}
										>
											Civil Records
										</p>
										<p
											className="text-sm"
											style={{ color: 'var(--color-green-600)' }}
										>
											Clear
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<div
										className="w-8 h-8 rounded-full flex items-center justify-center"
										style={{ backgroundColor: 'var(--color-green-100)' }}
									>
										<svg
											className="w-4 h-4"
											style={{ color: 'var(--color-green-600)' }}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div>
										<p
											className="font-medium"
											style={{ color: 'var(--color-gray-900)' }}
										>
											Financial Records
										</p>
										<p
											className="text-sm"
											style={{ color: 'var(--color-green-600)' }}
										>
											Clear
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-3">
									<div
										className="w-8 h-8 rounded-full flex items-center justify-center"
										style={{ backgroundColor: 'var(--color-green-100)' }}
									>
										<svg
											className="w-4 h-4"
											style={{ color: 'var(--color-green-600)' }}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div>
										<p
											className="font-medium"
											style={{ color: 'var(--color-gray-900)' }}
										>
											Sanctions Lists
										</p>
										<p
											className="text-sm"
											style={{ color: 'var(--color-green-600)' }}
										>
											Clear
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
						<button
							onClick={() => navigate('/dashboard')}
							className="btn btn-primary"
						>
							Back to Dashboard
						</button>
						<button
							onClick={() => downloadReport('pdf')}
							className="btn btn-secondary"
						>
							Download Report
						</button>
					</div>
				</main>
			</div>
		);
	}

	if (isFlagged) {
		return (
			<div
				className="min-h-screen"
				style={{ backgroundColor: 'var(--color-gray-50)' }}
			>
				{/* Modern Header */}
				<header className="bg-white border-b border-gray-200">
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
									style={{ backgroundColor: 'var(--color-gray-900)' }}
								>
									<svg
										className="h-5 w-5 text-white"
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
									style={{ color: 'var(--color-gray-900)' }}
								>
									Background Check Results
								</h1>
							</div>
						</div>
					</div>
				</header>

				{/* Flagged Result */}
				<main className="max-w-4xl mx-auto px-6 py-8">
					<div className="card">
						<div className="text-center" style={{ padding: '48px 32px' }}>
							{/* Red Warning Icon */}
							<div
								className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
								style={{ backgroundColor: 'var(--color-red-100)' }}
							>
								<svg
									className="w-10 h-10"
									style={{ color: 'var(--color-red-600)' }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
									/>
								</svg>
							</div>

							{/* Entity Name */}
							<h2
								className="text-2xl font-semibold mb-2"
								style={{ color: 'var(--color-gray-900)' }}
							>
								{getEntityName()}
							</h2>

							{/* Warning Message */}
							<h3
								className="text-xl font-medium mb-6"
								style={{ color: 'var(--color-red-600)' }}
							>
								{mockFlaggedRecords.length} matches found across{' '}
								{new Set(mockFlaggedRecords.map((r) => r.sourceName)).size}{' '}
								sources
							</h3>

							{/* View Full Report Button */}
							{!showFullReport ? (
								<button
									onClick={() => setShowFullReport(true)}
									className="btn btn-primary"
									style={{
										backgroundColor: 'var(--color-red-600)',
										borderColor: 'var(--color-red-600)',
									}}
								>
									View Full Report
								</button>
							) : (
								<button
									onClick={() => setShowFullReport(false)}
									className="btn btn-secondary"
								>
									Hide Full Report
								</button>
							)}
						</div>
					</div>

					{/* Full Report */}
					{showFullReport && (
						<div className="card mt-6">
							<div className="card-header">
								<h4
									className="text-lg font-semibold"
									style={{ color: 'var(--color-gray-900)' }}
								>
									Detailed Findings
								</h4>
							</div>
							<div className="card-body">
								<div className="space-y-4">
									{mockFlaggedRecords.map((record) => (
										<div
											key={record.id}
											className="card"
											style={{
												backgroundColor: 'var(--color-red-50)',
												borderColor: 'var(--color-red-200)',
											}}
										>
											<div className="card-body">
												<div className="flex justify-between items-start mb-4">
													<div>
														<h5
															className="font-medium"
															style={{ color: 'var(--color-gray-900)' }}
														>
															{record.recordType}
														</h5>
														<p
															className="text-sm"
															style={{ color: 'var(--color-gray-600)' }}
														>
															Source: {record.sourceName}
														</p>
													</div>
													<div className="text-right">
														<span className="badge badge-error">
															{record.confidenceScore}% Confidence
														</span>
													</div>
												</div>

												<div className="space-y-2">
													<p
														className="text-sm"
														style={{ color: 'var(--color-gray-700)' }}
													>
														<span className="font-medium">Matching Criteria:</span>{' '}
														{record.matchingCriteria.join(', ')}
													</p>
													<p
														className="text-sm"
														style={{ color: 'var(--color-gray-700)' }}
													>
														<span className="font-medium">Date:</span>{' '}
														{record.timestamp}
													</p>
													<p
														className="text-sm"
														style={{ color: 'var(--color-gray-700)' }}
													>
														<span className="font-medium">Details:</span>{' '}
														{record.details}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Download Options */}
					{showFullReport && (
						<div className="card mt-6">
							<div className="card-header">
								<h4
									className="text-lg font-semibold"
									style={{ color: 'var(--color-gray-900)' }}
								>
									Download Report
								</h4>
							</div>
							<div className="card-body">
								<div className="flex gap-4">
									<button
										onClick={() => downloadReport('pdf')}
										className="btn btn-secondary"
									>
										Download as PDF
									</button>
									<button
										onClick={() => downloadReport('json')}
										className="btn btn-secondary"
									>
										Download as JSON
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex justify-center mt-8">
						<button
							onClick={() => navigate('/dashboard')}
							className="btn btn-primary"
						>
							Back to Dashboard
						</button>
					</div>
				</main>
			</div>
		);
	}

	// Fallback for unknown status
	return (
		<div
			className="min-h-screen flex items-center justify-center"
			style={{ backgroundColor: 'var(--color-gray-50)' }}
		>
			<div className="card text-center">
				<div className="card-body">
					<h2
						className="text-2xl font-semibold mb-4"
						style={{ color: 'var(--color-gray-900)' }}
					>
						No Results Available
					</h2>
					<button
						onClick={() => navigate('/dashboard')}
						className="btn btn-primary"
					>
						Back to Dashboard
					</button>
				</div>
			</div>
		</div>
	);
}
