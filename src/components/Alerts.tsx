import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAlerts, type Alert } from '../data/mockData';

export default function Alerts() {
	const navigate = useNavigate();
	const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
	const [filterSeverity, setFilterSeverity] = useState<string>('all');
	const [filterRead, setFilterRead] = useState<string>('all');
	const [filterSource, setFilterSource] = useState<string>('all');
	const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

	const getSeverityBadge = (severity: string) => {
		switch (severity) {
			case 'critical':
				return 'badge badge-error';
			case 'high':
				return 'badge badge-warning';
			case 'medium':
				return 'badge badge-info';
			case 'low':
				return 'badge badge-success';
			default:
				return 'badge badge-neutral';
		}
	};

	const getAlertTypeIcon = (type: string) => {
		switch (type) {
			case 'FTO_TCO_LINK':
				return (
					<svg
						className="w-5 h-5"
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
				);
			case 'PORT_ACTIVITY':
				return (
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				);
			case 'NEW_SANCTIONS':
				return (
					<svg
						className="w-5 h-5"
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
				);
			case 'NETWORK_CHANGE':
				return (
					<svg
						className="w-5 h-5"
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
				);
			default:
				return (
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
		}
	};

	const markAsRead = (alertId: string) => {
		setAlerts((prev) =>
			prev.map((alert) =>
				alert.id === alertId ? { ...alert, isRead: true } : alert
			)
		);
	};

	const markAsUnread = (alertId: string) => {
		setAlerts((prev) =>
			prev.map((alert) =>
				alert.id === alertId ? { ...alert, isRead: false } : alert
			)
		);
	};

	const deleteAlert = (alertId: string) => {
		setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
		setSelectedAlerts((prev) => prev.filter((id) => id !== alertId));
	};

	const toggleSelectAlert = (alertId: string) => {
		setSelectedAlerts((prev) =>
			prev.includes(alertId)
				? prev.filter((id) => id !== alertId)
				: [...prev, alertId]
		);
	};

	const bulkMarkAsRead = () => {
		setAlerts((prev) =>
			prev.map((alert) =>
				selectedAlerts.includes(alert.id)
					? { ...alert, isRead: true }
					: alert
			)
		);
		setSelectedAlerts([]);
	};

	const bulkDelete = () => {
		setAlerts((prev) =>
			prev.filter((alert) => !selectedAlerts.includes(alert.id))
		);
		setSelectedAlerts([]);
	};

	const filteredAlerts = alerts.filter((alert) => {
		const severityMatch =
			filterSeverity === 'all' || alert.severity === filterSeverity;
		const readMatch =
			filterRead === 'all' ||
			(filterRead === 'read' && alert.isRead) ||
			(filterRead === 'unread' && !alert.isRead);
		const sourceMatch =
			filterSource === 'all' || alert.sourceName === filterSource;
		return severityMatch && readMatch && sourceMatch;
	});

	const unreadCount = alerts.filter((alert) => !alert.isRead).length;
	const criticalCount = alerts.filter(
		(alert) => alert.severity === 'critical'
	).length;
	const actionRequiredCount = alerts.filter(
		(alert) => alert.requiresAction
	).length;

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleString();
	};

	const getSourceBadgeClass = (sourceName: string) => {
		// Check for specific full source names first for precise matching
		switch (sourceName) {
			case 'OFAC SDN List':
				return 'badge badge-error badge-sm'; // Red - OFAC sanctions
			case 'DEA EPIC Database':
			case 'DEA Intelligence Division':
				return 'badge badge-warning badge-sm'; // Orange - DEA sources
			case 'UN Sanctions Committee':
				return 'badge badge-info badge-sm'; // Blue - UN sanctions
			case 'US State Department FTO List':
				return 'badge badge-secondary badge-sm'; // Gray - FTO list
			case 'Enhanced Due Diligence Database':
				return 'badge badge-primary badge-sm'; // Purple - compliance
			default:
				// Fallback to substring matching for partial matches
				if (sourceName.includes('OFAC'))
					return 'badge badge-error badge-sm';
				if (sourceName.includes('DEA'))
					return 'badge badge-warning badge-sm';
				if (sourceName.includes('UN')) return 'badge badge-info badge-sm';
				if (sourceName.includes('FTO'))
					return 'badge badge-secondary badge-sm';
				if (sourceName.includes('Enhanced Due Diligence'))
					return 'badge badge-primary badge-sm';
				return 'badge badge-accent badge-sm'; // Default green
		}
	};

	const uniqueSources = [
		...new Set(alerts.map((alert) => alert.sourceName)),
	].sort();

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: 'var(--bg-primary)' }}
		>
			{/* Header */}
			<header
				style={{
					backgroundColor: 'var(--bg-secondary)',
					borderBottom: '1px solid var(--border-primary)',
				}}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<button
								onClick={() => navigate('/dashboard')}
								className="btn btn-ghost btn-sm"
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
										d="M15 19l-7-7 7-7"
									/>
								</svg>
								Back
							</button>
							<h1
								className="text-2xl font-semibold"
								style={{ color: 'var(--text-primary)' }}
							>
								Alert Management
							</h1>
							{unreadCount > 0 && (
								<span className="badge badge-error">
									{unreadCount} unread
								</span>
							)}
						</div>
						{selectedAlerts.length > 0 && (
							<div className="flex space-x-2">
								<button onClick={bulkMarkAsRead} className="btn btn-sm">
									Mark as Read ({selectedAlerts.length})
								</button>
								<button onClick={bulkDelete} className="btn btn-sm btn-error">
									Delete ({selectedAlerts.length})
								</button>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-6 py-8">
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
										Total Alerts
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--text-primary)' }}
									>
										{alerts.length}
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
											d="M15 17h5l-5 5v-5zM7 7h5V2L7 7zm8 8V9.5a3.5 3.5 0 10-7 0V15a3 3 0 106 0z"
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
										Unread
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-orange-600)' }}
									>
										{unreadCount}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-orange-100)' }}
								>
									<svg
										className="w-5 h-5"
										style={{ color: 'var(--color-orange-600)' }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
										Critical
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-red-600)' }}
									>
										{criticalCount}
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
										Action Required
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-purple-600)' }}
									>
										{actionRequiredCount}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-purple-100)' }}
								>
									<svg
										className="w-5 h-5"
										style={{ color: 'var(--color-purple-600)' }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Filters */}
				<div className="card mb-6">
					<div className="card-body">
						<div className="flex flex-wrap gap-4 items-center">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Severity</span>
								</label>
								<select
									className="select select-bordered select-sm"
									value={filterSeverity}
									onChange={(e) => setFilterSeverity(e.target.value)}
								>
									<option value="all">All Severities</option>
									<option value="critical">Critical</option>
									<option value="high">High</option>
									<option value="medium">Medium</option>
									<option value="low">Low</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Status</span>
								</label>
								<select
									className="select select-bordered select-sm"
									value={filterRead}
									onChange={(e) => setFilterRead(e.target.value)}
								>
									<option value="all">All Alerts</option>
									<option value="unread">Unread Only</option>
									<option value="read">Read Only</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Source</span>
								</label>
								<select
									className="select select-bordered select-sm"
									value={filterSource}
									onChange={(e) => setFilterSource(e.target.value)}
								>
									<option value="all">All Sources</option>
									{uniqueSources.map((source) => (
										<option key={source} value={source}>
											{source}
										</option>
									))}
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Results</span>
								</label>
								<div className="text-base text-gray-600">
									{filteredAlerts.length} of {alerts.length} alerts
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Alerts List */}
				<div className="card">
					<div className="card-header">
						<div className="flex items-center justify-between">
							<h3
								className="text-xl font-semibold"
								style={{ color: 'var(--text-primary)' }}
							>
								Alerts
							</h3>
							{selectedAlerts.length === 0 && (
								<button
									onClick={() =>
										setSelectedAlerts(filteredAlerts.map((a) => a.id))
									}
									className="btn btn-sm btn-ghost"
								>
									Select All
								</button>
							)}
						</div>
					</div>
					<div className="card-body">
						{filteredAlerts.length === 0 ? (
							<div className="text-center py-8">
								<svg
									className="w-12 h-12 mx-auto mb-4"
									style={{ color: 'var(--text-tertiary)' }}
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
								<p
									className="text-xl font-medium mb-2"
									style={{ color: 'var(--text-primary)' }}
								>
									No alerts match your filters
								</p>
								<p
									className="text-base"
									style={{ color: 'var(--text-secondary)' }}
								>
									Try adjusting your filter criteria to see more results.
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{filteredAlerts.map((alert) => (
									<div
										key={alert.id}
										className="border rounded-lg p-4"
										style={{
											backgroundColor: alert.isRead
												? 'var(--bg-tertiary)'
												: 'var(--bg-secondary)',
											borderColor: alert.isRead
												? 'var(--border-primary)'
												: 'var(--color-blue-500)',
										}}
									>
										<div className="flex items-start space-x-4">
											<input
												type="checkbox"
												className="checkbox mt-1"
												checked={selectedAlerts.includes(alert.id)}
												onChange={() => toggleSelectAlert(alert.id)}
											/>
											<div
												className="p-2 rounded-lg"
												style={{
													backgroundColor:
														alert.severity === 'critical'
															? 'var(--color-red-100)'
															: alert.severity === 'high'
															? 'var(--color-yellow-100)'
															: alert.severity === 'medium'
															? 'var(--color-blue-100)'
															: 'var(--color-green-100)',
													color:
														alert.severity === 'critical'
															? 'var(--color-red-600)'
															: alert.severity === 'high'
															? 'var(--color-yellow-600)'
															: alert.severity === 'medium'
															? 'var(--color-blue-600)'
															: 'var(--color-green-600)',
												}}
											>
												{getAlertTypeIcon(alert.alertType)}
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between mb-2">
													<h4
														className="text-xl font-semibold"
														style={{
															color: alert.isRead
																? 'var(--text-secondary)'
																: 'var(--text-primary)',
														}}
													>
														{alert.title}
													</h4>
													<div className="flex items-center space-x-2">
														<span className={getSeverityBadge(alert.severity)}>
															{alert.severity.toUpperCase()}
														</span>
														{alert.requiresAction && (
															<span className="badge badge-warning">
																Action Required
															</span>
														)}
													</div>
												</div>
												<p
													className="text-base mb-3"
													style={{
														color: alert.isRead
															? 'var(--text-tertiary)'
															: 'var(--text-secondary)',
													}}
												>
													{alert.description}
												</p>
												<div className="mb-3">
													<span
														className="text-base font-medium uppercase tracking-wide"
														style={{ color: 'var(--text-tertiary)' }}
													>
														Source:
													</span>
													<div className="mt-1">
														<span className={getSourceBadgeClass(alert.sourceName)}>
															{alert.sourceName}
														</span>
													</div>
												</div>
												{alert.relatedEntities.length > 0 && (
													<div className="mb-3">
														<span
															className="text-base font-medium uppercase tracking-wide"
															style={{ color: 'var(--text-tertiary)' }}
														>
															Related Entities:
														</span>
														<div className="flex flex-wrap gap-1 mt-1">
															{alert.relatedEntities.map((entity, index) => (
																<span
																	key={index}
																	className="badge badge-outline badge-sm"
																>
																	{entity}
																</span>
															))}
														</div>
													</div>
												)}
												<div className="flex items-center justify-between">
													<span
														className="text-base"
														style={{ color: 'var(--text-tertiary)' }}
													>
														{formatTimestamp(alert.timestamp)}
													</span>
													<div className="flex space-x-2">
														{!alert.isRead ? (
															<button
																onClick={() => markAsRead(alert.id)}
																className="btn btn-xs btn-ghost"
															>
																Mark as Read
															</button>
														) : (
															<button
																onClick={() => markAsUnread(alert.id)}
																className="btn btn-xs btn-ghost"
															>
																Mark as Unread
															</button>
														)}
														<button
															onClick={() => deleteAlert(alert.id)}
															className="btn btn-xs btn-error"
														>
															Delete
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
