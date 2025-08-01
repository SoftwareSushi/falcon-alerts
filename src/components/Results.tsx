import { useNavigate, useLocation } from 'react-router-dom';
import { mockFlaggedRecords } from '../data/mockData';
import { useState } from 'react';

export default function Results() {
	const navigate = useNavigate();
	const location = useLocation();
	const [showFullReport, setShowFullReport] = useState(true);

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
								No sanctions, criminal associations, or risk patterns
								detected.
							</h3>

							{/* Secondary Text */}
							<p
								className="mb-8 max-w-md mx-auto"
								style={{ color: 'var(--color-gray-600)' }}
							>
								Entity passed comprehensive screening across sanctions
								databases, cartel intelligence, ML pattern analysis, and
								geographic risk assessment. Continuous monitoring remains
								active.
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
								Comprehensive Scan Summary
							</h4>
						</div>
						<div className="card-body">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
											OFAC SDN List
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
											DEA Database
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
											UN Sanctions
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
											FTO List
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
											Cartel Intelligence
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
											ML Pattern Analysis
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
											Geographic Risk Flags
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
											Known Associates
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
								className="text-xl font-medium mb-2"
								style={{ color: 'var(--color-red-600)' }}
							>
								{mockFlaggedRecords.length} high-risk matches found
							</h3>
							<p className="mb-6" style={{ color: 'var(--color-gray-600)' }}>
								Identified across{' '}
								{new Set(mockFlaggedRecords.map((r) => r.sourceName)).size}{' '}
								intelligence sources including sanctions databases, cartel
								intelligence, and ML pattern analysis
							</p>

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

					{/* Risk Overview */}
					{showFullReport && (
						<div className="card mt-6">
							<div className="card-header">
								<h4
									className="text-lg font-semibold"
									style={{ color: 'var(--color-gray-900)' }}
								>
									Risk Overview
								</h4>
							</div>
							<div className="card-body">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="text-center">
										<div
											className="text-2xl font-bold"
											style={{ color: 'var(--color-red-600)' }}
										>
											{
												mockFlaggedRecords.filter((r) => r.riskLevel === 'High')
													.length
											}
										</div>
										<div className="text-sm text-gray-600">
											High Risk Matches
										</div>
									</div>
									<div className="text-center">
										<div
											className="text-2xl font-bold"
											style={{ color: 'var(--color-yellow-600)' }}
										>
											{
												mockFlaggedRecords.filter((r) => r.riskLevel === 'Medium')
													.length
											}
										</div>
										<div className="text-sm text-gray-600">
											Medium Risk Matches
										</div>
									</div>
									<div className="text-center">
										<div
											className="text-2xl font-bold"
											style={{ color: 'var(--color-gray-600)' }}
										>
											{new Set(mockFlaggedRecords.map((r) => r.category)).size}
										</div>
										<div className="text-sm text-gray-600">Risk Categories</div>
									</div>
								</div>
								<div className="mt-4 flex flex-wrap gap-2">
									{Array.from(
										new Set(mockFlaggedRecords.map((r) => r.category))
									).map((category) => (
										<span
											key={category}
											className="px-3 py-1 text-xs font-medium rounded-full"
											style={{
												backgroundColor: 'var(--color-gray-100)',
												color: 'var(--color-gray-700)',
											}}
										>
											{category.replace('_', ' ')}
										</span>
									))}
								</div>
							</div>
						</div>
					)}

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
									{mockFlaggedRecords.map((record) => {
										const getRiskLevelColor = (level: string) => {
											switch (level) {
												case 'High':
													return 'var(--color-red-600)';
												case 'Medium':
													return 'var(--color-yellow-600)';
												case 'Low':
													return 'var(--color-green-600)';
												default:
													return 'var(--color-gray-600)';
											}
										};

										const getCategoryIcon = (category: string) => {
											switch (category) {
												case 'Sanctions':
													return (
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																clipRule="evenodd"
															/>
														</svg>
													);
												case 'Cartel':
													return (
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
																clipRule="evenodd"
															/>
														</svg>
													);
												case 'ML_Pattern':
													return (
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
													);
												case 'Geographic':
													return (
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
																clipRule="evenodd"
															/>
														</svg>
													);
												default:
													return (
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
																clipRule="evenodd"
															/>
														</svg>
													);
											}
										};

										return (
											<div
												key={record.id}
												className="card"
												style={{
													backgroundColor:
														record.riskLevel === 'High'
															? 'var(--color-red-50)'
															: record.riskLevel === 'Medium'
															? 'var(--color-yellow-50)'
															: 'var(--color-gray-50)',
													borderColor:
														record.riskLevel === 'High'
															? 'var(--color-red-200)'
															: record.riskLevel === 'Medium'
															? 'var(--color-yellow-200)'
															: 'var(--color-gray-200)',
												}}
											>
												<div className="card-body">
													<div className="flex justify-between items-start mb-4">
														<div className="flex-1">
															<div className="flex items-center space-x-2 mb-2">
																<div className="flex items-center space-x-1 text-gray-600">
																	{getCategoryIcon(record.category)}
																	<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
																		{record.category.replace('_', ' ')}
																	</span>
																</div>
															</div>
															<h5
																className="font-medium text-lg"
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
														<div className="text-right space-y-1">
															<span
																className="inline-block px-2 py-1 text-xs font-medium rounded-full"
																style={{
																	backgroundColor:
																		record.riskLevel === 'High'
																			? 'var(--color-red-100)'
																			: record.riskLevel === 'Medium'
																			? 'var(--color-yellow-100)'
																			: 'var(--color-green-100)',
																	color: getRiskLevelColor(record.riskLevel),
																}}
															>
																{record.riskLevel} Risk
															</span>
															<div>
																<span className="badge badge-error">
																	{record.confidenceScore}% Confidence
																</span>
															</div>
														</div>
													</div>

													<div className="space-y-3">
														<div
															className="p-3 rounded-md"
															style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
														>
															<p
																className="text-sm font-medium mb-1"
																style={{ color: 'var(--color-gray-900)' }}
															>
																Risk Details:
															</p>
															<p
																className="text-sm"
																style={{ color: 'var(--color-gray-700)' }}
															>
																{record.details}
															</p>
														</div>
														<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
															<div>
																<span
																	className="font-medium"
																	style={{ color: 'var(--color-gray-900)' }}
																>
																	Matching Criteria:
																</span>
																<p style={{ color: 'var(--color-gray-700)' }}>
																	{record.matchingCriteria.join(', ')}
																</p>
															</div>
															<div>
																<span
																	className="font-medium"
																	style={{ color: 'var(--color-gray-900)' }}
																>
																	Date Identified:
																</span>
																<p style={{ color: 'var(--color-gray-700)' }}>
																	{record.timestamp}
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
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
