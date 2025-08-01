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
		const filename = `entity_risk_scan_${getEntityName().replace(
			/\s+/g,
			'_'
		)}.${format}`;
		alert(`Downloading ${filename}...`);
	};

	if (isClean) {
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
										className="h-5 w-5"
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
									Entity Risk Scanner Results
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

					{/* Watchlist Recommendation */}
					<div className="card mt-6">
						<div className="card-body text-center">
							<div
								className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
								style={{ backgroundColor: 'var(--color-blue-100)' }}
							>
								<svg
									className="w-8 h-8"
									style={{ color: 'var(--color-blue-600)' }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
									/>
								</svg>
							</div>
							<h4
								className="text-lg font-semibold mb-2"
								style={{ color: 'var(--color-gray-900)' }}
							>
								Monitor Future Changes
							</h4>
							<p
								className="mb-4 max-w-md mx-auto"
								style={{ color: 'var(--color-gray-600)' }}
							>
								Stay informed about any future changes to{' '}
								<strong>{getEntityName()}</strong>'s risk profile. Add this
								entity to your watchlist for continuous monitoring and
								automatic alerts.
							</p>
							<button
								onClick={() =>
									navigate('/watchlist', {
										state: {
											entityName: getEntityName(),
											entityType: entityType,
											entityData: data,
										},
									})
								}
								className="btn btn-primary"
								style={{
									backgroundColor: 'var(--color-blue-600)',
									borderColor: 'var(--color-blue-600)',
								}}
							>
								Add to Watchlist
							</button>
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
										className="h-5 w-5"
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
									Entity Risk Scanner Results
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

					{/* Risk Management Actions */}
					<div className="card mt-6">
						<div className="card-header">
							<div className="flex items-center space-x-2">
								<div
									className="w-6 h-6 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-blue-100)' }}
								>
									<svg
										className="w-4 h-4"
										style={{ color: 'var(--color-blue-600)' }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<h4
									className="text-lg font-semibold"
									style={{ color: 'var(--color-gray-900)' }}
								>
									Risk Management Actions
								</h4>
							</div>
						</div>
						<div className="card-body">
							{/* High Risk Warning */}
							{mockFlaggedRecords.some((r) => r.riskLevel === 'High') && (
								<div
									className="mb-6 p-4 rounded-lg border-l-4"
									style={{
										backgroundColor: 'var(--color-red-50)',
										borderLeftColor: 'var(--color-red-500)',
									}}
								>
									<div className="flex items-start space-x-3">
										<div
											className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
											style={{ backgroundColor: 'var(--color-red-100)' }}
										>
											<svg
												className="w-4 h-4"
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
										<div className="flex-1">
											<h5
												className="text-sm font-semibold mb-1"
												style={{ color: 'var(--color-red-800)' }}
											>
												Immediate Action Required
											</h5>
											<p
												className="text-sm"
												style={{ color: 'var(--color-red-700)' }}
											>
												High-risk findings detected. Consider suspending or
												escalating existing business relationships with{' '}
												{getEntityName()} until further review.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Action Items Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								{/* Compliance Documentation */}
								<div
									className="p-4 rounded-lg border"
									style={{
										backgroundColor: 'var(--bg-secondary)',
										borderColor: 'var(--border-primary)',
									}}
								>
									<div className="flex items-start space-x-3">
										<div
											className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
											style={{ backgroundColor: 'var(--color-blue-100)' }}
										>
											<svg
												className="w-4 h-4"
												style={{ color: 'var(--color-blue-600)' }}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<h6
												className="font-medium text-sm mb-2"
												style={{ color: 'var(--text-primary)' }}
											>
												Document Findings
											</h6>
											<p
												className="text-xs mb-3"
												style={{ color: 'var(--text-secondary)' }}
											>
												Create compliance records and notify relevant teams about
												the risk findings.
											</p>
											<button
												onClick={() => {
													const documentationData = {
														entityName: getEntityName(),
														entityType: entityType,
														riskLevel: mockFlaggedRecords.some(
															(r) => r.riskLevel === 'High'
														)
															? 'High'
															: 'Medium',
														findings: mockFlaggedRecords.length,
														categories: Array.from(
															new Set(mockFlaggedRecords.map((r) => r.category))
														),
														timestamp: new Date().toISOString(),
													};

													const filename = `compliance_documentation_${getEntityName().replace(
														/\s+/g,
														'_'
													)}.pdf`;
													alert(
														`Generating compliance documentation: ${filename}`
													);
												}}
												className="btn btn-sm btn-secondary w-full"
											>
												Generate Documentation
											</button>
										</div>
									</div>
								</div>

								{/* Expert Support */}
								<div
									className="p-4 rounded-lg border"
									style={{
										backgroundColor: 'var(--bg-secondary)',
										borderColor: 'var(--border-primary)',
									}}
								>
									<div className="flex items-start space-x-3">
										<div
											className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
											style={{ backgroundColor: 'var(--color-green-100)' }}
										>
											<svg
												className="w-4 h-4"
												style={{ color: 'var(--color-green-600)' }}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<h6
												className="font-medium text-sm mb-2"
												style={{ color: 'var(--text-primary)' }}
											>
												Get Expert Guidance
											</h6>
											<p
												className="text-xs mb-3"
												style={{ color: 'var(--text-secondary)' }}
											>
												Connect with compliance experts for personalized advice on
												handling this situation.
											</p>
											<button
												onClick={() => {
													// Simulate opening support system
													alert(
														'Connecting you with a compliance expert. You will receive a callback within 2 business hours.'
													);
												}}
												className="btn btn-sm btn-primary w-full"
											>
												Contact Expert Support
											</button>
										</div>
									</div>
								</div>

								{/* Risk Mitigation Guide */}
								<div
									className="p-4 rounded-lg border"
									style={{
										backgroundColor: 'var(--bg-secondary)',
										borderColor: 'var(--border-primary)',
									}}
								>
									<div className="flex items-start space-x-3">
										<div
											className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
											style={{ backgroundColor: 'var(--color-purple-100)' }}
										>
											<svg
												className="w-4 h-4"
												style={{ color: 'var(--color-purple-600)' }}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<h6
												className="font-medium text-sm mb-2"
												style={{ color: 'var(--text-primary)' }}
											>
												Risk Mitigation Playbook
											</h6>
											<p
												className="text-xs mb-3"
												style={{ color: 'var(--text-secondary)' }}
											>
												Download step-by-step guidance for managing relationships
												with flagged entities.
											</p>
											<button
												onClick={() => {
													const riskLevel = mockFlaggedRecords.some(
														(r) => r.riskLevel === 'High'
													)
														? 'high'
														: 'medium';
													const categories = Array.from(
														new Set(mockFlaggedRecords.map((r) => r.category))
													).join('_');
													const filename = `risk_mitigation_playbook_${riskLevel}_risk_${categories}.pdf`;
													alert(`Downloading: ${filename}`);
												}}
												className="btn btn-sm btn-secondary w-full"
											>
												Download Playbook
											</button>
										</div>
									</div>
								</div>

								{/* Enhanced Due Diligence */}
								<div
									className="p-4 rounded-lg border"
									style={{
										backgroundColor: 'var(--bg-secondary)',
										borderColor: 'var(--border-primary)',
									}}
								>
									<div className="flex items-start space-x-3">
										<div
											className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
											style={{ backgroundColor: 'var(--color-orange-100)' }}
										>
											<svg
												className="w-4 h-4"
												style={{ color: 'var(--color-orange-600)' }}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<h6
												className="font-medium text-sm mb-2"
												style={{ color: 'var(--text-primary)' }}
											>
												Enhanced Due Diligence
											</h6>
											<p
												className="text-xs mb-3"
												style={{ color: 'var(--text-secondary)' }}
											>
												Initiate additional verification and background checks for
												comprehensive assessment.
											</p>
											<button
												onClick={() => {
													navigate('/new-check', {
														state: {
															entityName: getEntityName(),
															entityType: entityType,
														},
													});
												}}
												className="btn btn-sm btn-secondary w-full"
											>
												Start Enhanced Check
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* Next Steps Summary */}
							<div
								className="p-4 rounded-lg"
								style={{ backgroundColor: 'var(--color-blue-50)' }}
							>
								<h6
									className="font-medium text-sm mb-2"
									style={{ color: 'var(--color-blue-800)' }}
								>
									Recommended Next Steps:
								</h6>
								<ul
									className="text-xs space-y-1"
									style={{ color: 'var(--color-blue-700)' }}
								>
									<li>• Review all flagged findings in detail below</li>
									<li>
										•{' '}
										{mockFlaggedRecords.some((r) => r.riskLevel === 'High')
											? 'Consider suspending existing business relationships pending further review'
											: 'Implement enhanced monitoring and documentation procedures'}
									</li>
									<li>• Document decision rationale for compliance records</li>
									<li>• Add entity to watchlist for ongoing monitoring</li>
									<li>• Consult with legal/compliance team if needed</li>
								</ul>
							</div>
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

					{/* Watchlist Recommendation */}
					<div className="card mt-6">
						<div className="card-body text-center">
							<div
								className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
								style={{ backgroundColor: 'var(--color-orange-100)' }}
							>
								<svg
									className="w-8 h-8"
									style={{ color: 'var(--color-orange-600)' }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.879 4H9.5A2.5 2.5 0 0112 6.5V9M1 12l2 2 2-2m0 0l2-2-2 2zm0 0V9a2 2 0 012-2h9a2 2 0 012 2v3"
									/>
								</svg>
							</div>
							<h4
								className="text-lg font-semibold mb-2"
								style={{ color: 'var(--color-gray-900)' }}
							>
								Critical: Enable Continuous Monitoring
							</h4>
							<p
								className="mb-4 max-w-md mx-auto"
								style={{ color: 'var(--color-gray-600)' }}
							>
								Given the high-risk findings for{' '}
								<strong>{getEntityName()}</strong>, it's essential to monitor
								any changes to their status. Add this entity to your watchlist
								for real-time alerts and updates.
							</p>
							<button
								onClick={() =>
									navigate('/watchlist', {
										state: {
											entityName: getEntityName(),
											entityType: entityType,
											entityData: data,
											riskLevel: 'High',
										},
									})
								}
								className="btn btn-primary"
								style={{
									backgroundColor: 'var(--color-orange-600)',
									borderColor: 'var(--color-orange-600)',
								}}
							>
								Add to Watchlist
							</button>
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
						{showFullReport && (
							<>
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
							</>
						)}
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
