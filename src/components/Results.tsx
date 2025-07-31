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
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<div className="bg-white shadow">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center py-6">
							<div className="flex items-center">
								<button
									onClick={() => navigate('/dashboard')}
									className="mr-4 text-gray-500 hover:text-gray-700"
								>
									<svg
										className="h-6 w-6"
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
								<div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
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
								<h1 className="text-2xl font-bold text-gray-900">
									Background Check Results
								</h1>
							</div>
						</div>
					</div>
				</div>

				{/* Clean Result */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<div className="text-center py-12 px-6">
							{/* Large Green Check Icon */}
							<div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
								<svg
									className="w-12 h-12 text-green-600"
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
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								{getEntityName()}
							</h2>

							{/* Success Message */}
							<h3 className="text-xl font-semibold text-green-600 mb-4">
								No criminal records or alerts found.
							</h3>

							{/* Secondary Text */}
							<p className="text-gray-600 mb-8 max-w-md mx-auto">
								We'll continue to monitor this entity and notify you of any
								changes to their background status.
							</p>

							{/* Additional Info */}
							<div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
								<h4 className="font-medium text-gray-900 mb-3">
									Scan Summary
								</h4>
								<ul className="space-y-2 text-sm text-gray-600">
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-green-500 mr-2"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										Criminal Records: Clear
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-green-500 mr-2"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										Civil Records: Clear
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-green-500 mr-2"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										Financial Records: Clear
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-green-500 mr-2"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										Sanctions Lists: Clear
									</li>
								</ul>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button
									onClick={() => navigate('/dashboard')}
									className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
								>
									Back to Dashboard
								</button>
								<button
									onClick={() => downloadReport('pdf')}
									className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
								>
									Download Report
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isFlagged) {
		return (
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<div className="bg-white shadow">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center py-6">
							<div className="flex items-center">
								<button
									onClick={() => navigate('/dashboard')}
									className="mr-4 text-gray-500 hover:text-gray-700"
								>
									<svg
										className="h-6 w-6"
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
								<div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
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
								<h1 className="text-2xl font-bold text-gray-900">
									Background Check Results
								</h1>
							</div>
						</div>
					</div>
				</div>

				{/* Flagged Result */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<div className="text-center py-12 px-6">
							{/* Red Warning Icon */}
							<div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
								<svg
									className="w-12 h-12 text-red-600"
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
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								{getEntityName()}
							</h2>

							{/* Warning Message */}
							<h3 className="text-xl font-semibold text-red-600 mb-4">
								{mockFlaggedRecords.length} matches found across{' '}
								{new Set(mockFlaggedRecords.map((r) => r.sourceName)).size}{' '}
								sources
							</h3>

							{/* View Full Report Button */}
							{!showFullReport ? (
								<button
									onClick={() => setShowFullReport(true)}
									className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mb-8"
								>
									View Full Report
								</button>
							) : (
								<button
									onClick={() => setShowFullReport(false)}
									className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mb-8"
								>
									Hide Full Report
								</button>
							)}
						</div>

						{/* Full Report */}
						{showFullReport && (
							<div className="border-t border-gray-200 px-6 py-8">
								<h4 className="text-lg font-medium text-gray-900 mb-6">
									Detailed Findings
								</h4>

								<div className="space-y-6">
									{mockFlaggedRecords.map((record) => (
										<div
											key={record.id}
											className="bg-red-50 border border-red-200 rounded-lg p-6"
										>
											<div className="flex justify-between items-start mb-4">
												<div>
													<h5 className="font-medium text-gray-900">
														{record.recordType}
													</h5>
													<p className="text-sm text-gray-600">
														Source: {record.sourceName}
													</p>
												</div>
												<div className="text-right">
													<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
														{record.confidenceScore}% Confidence
													</span>
												</div>
											</div>

											<div className="mb-4">
												<p className="text-sm text-gray-700 mb-2">
													<span className="font-medium">Matching Criteria:</span>{' '}
													{record.matchingCriteria.join(', ')}
												</p>
												<p className="text-sm text-gray-700 mb-2">
													<span className="font-medium">Date:</span>{' '}
													{record.timestamp}
												</p>
												<p className="text-sm text-gray-700">
													<span className="font-medium">Details:</span>{' '}
													{record.details}
												</p>
											</div>
										</div>
									))}
								</div>

								{/* Download Options */}
								<div className="mt-8 pt-6 border-t border-gray-200">
									<h4 className="font-medium text-gray-900 mb-4">
										Download Report
									</h4>
									<div className="flex gap-4">
										<button
											onClick={() => downloadReport('pdf')}
											className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
										>
											Download as PDF
										</button>
										<button
											onClick={() => downloadReport('json')}
											className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
										>
											Download as JSON
										</button>
									</div>
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="px-6 py-6 bg-gray-50 text-center">
							<button
								onClick={() => navigate('/dashboard')}
								className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
							>
								Back to Dashboard
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Fallback for unknown status
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">
					No Results Available
				</h2>
				<button
					onClick={() => navigate('/dashboard')}
					className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
				>
					Back to Dashboard
				</button>
			</div>
		</div>
	);
}
