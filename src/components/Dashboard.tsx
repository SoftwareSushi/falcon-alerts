import { useNavigate } from 'react-router-dom';
import {
	mockPreviousChecks,
	mockWatchlistEntries,
	mockAlerts,
	mockSuspiciousEntities,
} from '../data/mockData';
import ThemeToggle from './ThemeToggle';
import FTOMap from './FTOMap';

interface DashboardProps {
	onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
	const navigate = useNavigate();

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'Clean':
				return 'badge badge-success';
			case 'Flagged':
				return 'badge badge-error';
			case 'In Progress':
				return 'badge badge-warning';
			default:
				return 'badge badge-neutral';
		}
	};

	const getStatsData = () => {
		const total = mockPreviousChecks.length;
		const clean = mockPreviousChecks.filter(
			(scan) => scan.status === 'Clean'
		).length;
		const flagged = mockPreviousChecks.filter(
			(scan) => scan.status === 'Flagged'
		).length;
		const inProgress = mockPreviousChecks.filter(
			(scan) => scan.status === 'In Progress'
		).length;

		return { total, clean, flagged, inProgress };
	};

	const handleViewDetails = (id: string, status: string) => {
		if (status === 'In Progress') {
			navigate('/processing');
		} else {
			navigate('/results', { state: { checkId: id, status } });
		}
	};

	const stats = getStatsData();

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
					<div className="flex items-center justify-between">
						<button
							onClick={() => navigate('/')}
							className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
							title="Back to home"
						>
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
								Sanction Watch
							</h1>
						</button>
						<div className="flex items-center space-x-2">
							<ThemeToggle />
							<button
								onClick={() => {
									onLogout();
									navigate('/login');
								}}
								className="btn btn-ghost"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h2
						className="text-2xl font-semibold mb-2"
						style={{ color: 'var(--text-primary)' }}
					>
						Welcome back
					</h2>
					<p
						className="text-base"
						style={{ color: 'var(--text-secondary)' }}
					>
						Monitor and manage your entity risk scans with confidence.
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="card">
						<div className="card-body">
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-base font-medium"
										style={{ color: 'var(--text-secondary)' }}
									>
										Total Scans
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--text-primary)' }}
									>
										{stats.total}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-blue-100)' }}
								>
									<svg
										className="w-5 h-5"
										style={{ color: 'var(--color-blue-600)' }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div className="card">
						<div className="card-body">
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-base font-medium"
										style={{ color: 'var(--text-secondary)' }}
									>
										Clean
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-green-600)' }}
									>
										{stats.clean}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-green-100)' }}
								>
									<svg
										className="w-5 h-5"
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
							</div>
						</div>
					</div>

					<div className="card">
						<div className="card-body">
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-base font-medium"
										style={{ color: 'var(--text-secondary)' }}
									>
										Flagged
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-red-600)' }}
									>
										{stats.flagged}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-red-100)' }}
								>
									<svg
										className="w-5 h-5"
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
							</div>
						</div>
					</div>

					<div className="card">
						<div className="card-body">
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-base font-medium"
										style={{ color: 'var(--text-secondary)' }}
									>
										In Progress
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-yellow-600)' }}
									>
										{stats.inProgress}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-yellow-100)' }}
								>
									<svg
										className="w-5 h-5"
										style={{ color: 'var(--color-yellow-600)' }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* New Features Summary */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{/* Alerts Summary */}
					<div className="card">
						<div className="card-header">
							<div className="flex items-center justify-between">
								<h3
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Alerts
								</h3>
								<button
									onClick={() => navigate('/alerts')}
									className="btn btn-sm btn-ghost"
									style={{ color: '#2c5eae' }}
								>
									View All
								</button>
							</div>
						</div>
						<div className="card-body">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Unread
									</span>
									<span className="badge badge-error">
										{mockAlerts.filter((alert) => !alert.isRead).length}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Critical
									</span>
									<span className="badge badge-warning">
										{
											mockAlerts.filter((alert) => alert.severity === 'critical')
												.length
										}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Action Required
									</span>
									<span className="badge badge-info">
										{mockAlerts.filter((alert) => alert.requiresAction).length}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Watchlist Summary */}
					<div className="card">
						<div className="card-header">
							<div className="flex items-center justify-between">
								<h3
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Watchlist
								</h3>
								<button
									onClick={() => navigate('/watchlist')}
									className="btn btn-sm btn-ghost"
									style={{ color: '#2c5eae' }}
								>
									Manage
								</button>
							</div>
						</div>
						<div className="card-body">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Monitored Entities
									</span>
									<span className="badge badge-primary">
										{mockWatchlistEntries.length}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Real-time
									</span>
									<span className="badge badge-secondary">
										{
											mockWatchlistEntries.filter(
												(entry) =>
													entry.monitoringType === 'realtime' && entry.isActive
											).length
										}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Weekly
									</span>
									<span className="badge badge-accent">
										{
											mockWatchlistEntries.filter(
												(entry) =>
													entry.monitoringType === 'weekly' && entry.isActive
											).length
										}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Registry Summary */}
					<div className="card">
						<div className="card-header">
							<div className="flex items-center justify-between">
								<h3
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Suspicious Registry
								</h3>
								<button
									onClick={() => navigate('/registry')}
									className="btn btn-sm btn-ghost"
									style={{ color: '#2c5eae' }}
								>
									Browse
								</button>
							</div>
						</div>
						<div className="card-body">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Total Entities
									</span>
									<span className="badge badge-info">
										{mockSuspiciousEntities.length}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Critical Risk
									</span>
									<span className="badge badge-error">
										{
											mockSuspiciousEntities.filter(
												(entity) => entity.riskLevel === 'critical'
											).length
										}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className="text-base"
										style={{ color: 'var(--text-secondary)' }}
									>
										Ports
									</span>
									<span className="badge badge-warning">
										{
											mockSuspiciousEntities.filter(
												(entity) => entity.type === 'port'
											).length
										}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* FTO Map Section */}
				<div style={{ marginBottom: '3rem' }}>
					<FTOMap />
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Recent Checks Table */}
					<div className="lg:col-span-2">
						<div className="card">
							<div className="card-header">
								<div className="flex items-center justify-between">
									<h3
										className="text-xl font-semibold"
										style={{ color: 'var(--text-primary)' }}
									>
										Scans
									</h3>
									<button
										onClick={() => navigate('/new-check')}
										className="btn"
										style={{
											backgroundColor: '#2c5eae',
											color: 'white',
											border: '1px solid #2c5eae',
										}}
									>
										New Scan
									</button>
								</div>
							</div>
							<div className="card-body">
								<div className="space-y-4">
									{mockPreviousChecks.map((scan) => (
										<div
											key={scan.id}
											className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
										>
											<div className="flex-1">
												<div className="flex items-center space-x-3">
													<div className="flex-shrink-0">
														<div
															className="w-8 h-8 rounded-full flex items-center justify-center"
															style={{
																backgroundColor:
																	scan.type === 'Person'
																		? 'var(--color-blue-100)'
																		: 'var(--color-gray-100)',
															}}
														>
															{scan.type === 'Person' ? (
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
																		d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
																	/>
																</svg>
															) : (
																<svg
																	className="w-4 h-4"
																	style={{ color: 'var(--text-secondary)' }}
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke="currentColor"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
																	/>
																</svg>
															)}
														</div>
													</div>
													<div className="flex-1 min-w-0">
														<p
															className="text-base font-medium"
															style={{ color: 'var(--text-primary)' }}
														>
															{scan.entityName}
														</p>
														<p
															className="text-base"
															style={{ color: 'var(--text-tertiary)' }}
														>
															{scan.type} • {scan.lastUpdated}
														</p>
													</div>
												</div>
											</div>
											<div className="flex items-center space-x-3">
												<span className={getStatusBadge(scan.status)}>
													{scan.status}
												</span>
												<button
													onClick={() => handleViewDetails(scan.id, scan.status)}
													className="btn btn-ghost text-base"
												>
													View
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="space-y-6">
						<div className="card">
							<div className="card-header">
								<h3
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Quick Actions
								</h3>
							</div>
							<div className="card-body">
								<div className="space-y-3">
									<button
										onClick={() => navigate('/new-check')}
										className="w-full btn btn-secondary justify-start"
									>
										<svg
											className="w-4 h-4 mr-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
										Create New Scan
									</button>

									<button
										onClick={() => navigate('/watchlist')}
										className="w-full btn btn-secondary justify-start"
									>
										<svg
											className="w-4 h-4 mr-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
										Manage Watchlist
									</button>
									<button
										onClick={() => navigate('/alerts')}
										className="w-full btn btn-secondary justify-start"
									>
										<svg
											className="w-4 h-4 mr-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 17h5l-5 5v-5zM7 7h5V2L7 7zm8 8V9.5a3.5 3.5 0 10-7 0V15a3 3 0 106 0z"
											/>
										</svg>
										View Alerts
									</button>
									<button
										onClick={() => navigate('/registry')}
										className="w-full btn btn-secondary justify-start"
									>
										<svg
											className="w-4 h-4 mr-3"
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
										Suspicious Registry
									</button>
									<button
										onClick={() => navigate('/integrations')}
										className="w-full btn btn-secondary justify-start"
									>
										<svg
											className="w-4 h-4 mr-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
											/>
										</svg>
										ERP Integrations
									</button>
								</div>
							</div>
						</div>

						{/* Recent Activity */}
						<div className="card">
							<div className="card-header">
								<h3
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Recent Activity
								</h3>
							</div>
							<div className="card-body">
								<div className="space-y-4">
									{mockPreviousChecks.slice(0, 3).map((scan) => (
										<div key={scan.id} className="flex items-start space-x-3">
											<div className="flex-shrink-0 mt-1">
												<div
													className="w-2 h-2 rounded-full"
													style={{
														backgroundColor:
															scan.status === 'Clean'
																? 'var(--color-green-500)'
																: scan.status === 'Flagged'
																? 'var(--color-red-500)'
																: 'var(--color-yellow-500)',
													}}
												></div>
											</div>
											<div className="flex-1 min-w-0">
												<p
													className="text-base"
													style={{ color: 'var(--text-primary)' }}
												>
													{scan.entityName}
												</p>
												<p
													className="text-base"
													style={{ color: 'var(--text-tertiary)' }}
												>
													Scan completed • {scan.lastUpdated}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
