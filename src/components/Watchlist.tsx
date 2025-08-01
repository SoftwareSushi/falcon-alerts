import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	mockWatchlistEntries,
	mockPreviousChecks,
	type WatchlistEntry,
} from '../data/mockData';

export default function Watchlist() {
	const navigate = useNavigate();
	const [watchlistEntries, setWatchlistEntries] = useState<
		WatchlistEntry[]
	>(mockWatchlistEntries);
	const [showAddModal, setShowAddModal] = useState(false);
	const [selectedEntity, setSelectedEntity] = useState<string>('');
	const [monitoringType, setMonitoringType] = useState<
		'weekly' | 'realtime'
	>('weekly');
	const [alertThreshold, setAlertThreshold] = useState<
		'low' | 'medium' | 'high'
	>('medium');
	const [alertPreferences, setAlertPreferences] = useState({
		ftoTcoActivity: true,
		newSanctions: true,
		networkChanges: false,
		portActivity: false,
	});

	const getStatusBadge = (isActive: boolean) => {
		return isActive ? 'badge badge-success' : 'badge badge-neutral';
	};

	const getRiskBadge = (threshold: string) => {
		switch (threshold) {
			case 'high':
				return 'badge badge-error';
			case 'medium':
				return 'badge badge-warning';
			case 'low':
				return 'badge badge-info';
			default:
				return 'badge badge-neutral';
		}
	};

	const getMonitoringBadge = (type: string) => {
		return type === 'realtime'
			? 'badge badge-primary'
			: 'badge badge-secondary';
	};

	const toggleWatchlistEntry = (id: string) => {
		setWatchlistEntries((prev) =>
			prev.map((entry) =>
				entry.id === id ? { ...entry, isActive: !entry.isActive } : entry
			)
		);
	};

	const removeFromWatchlist = (id: string) => {
		setWatchlistEntries((prev) =>
			prev.filter((entry) => entry.id !== id)
		);
	};

	const addToWatchlist = () => {
		const selectedCheck = mockPreviousChecks.find(
			(check) => check.id === selectedEntity
		);
		if (!selectedCheck) return;

		const newEntry: WatchlistEntry = {
			id: `w${Date.now()}`,
			entityId: selectedCheck.id,
			entityName: selectedCheck.entityName,
			entityType: selectedCheck.type,
			monitoringType,
			alertPreferences,
			createdDate: new Date().toISOString().split('T')[0],
			lastScanned: new Date().toISOString().split('T')[0],
			isActive: true,
			alertThreshold,
		};

		setWatchlistEntries((prev) => [...prev, newEntry]);
		setShowAddModal(false);
		setSelectedEntity('');
	};

	const availableEntities = mockPreviousChecks.filter(
		(check) =>
			!watchlistEntries.some((entry) => entry.entityId === check.id) &&
			check.status !== 'In Progress'
	);

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
								Watchlist Monitoring
							</h1>
						</div>
						<button
							onClick={() => setShowAddModal(true)}
							className="btn btn-primary"
							disabled
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
									d="M12 4v16m8-8H4"
								/>
							</svg>
							Add to Watchlist
						</button>
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
										className="text-sm font-medium"
										style={{ color: 'var(--color-gray-600)' }}
									>
										Total Monitored
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-gray-900)' }}
									>
										{watchlistEntries.length}
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
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
										className="text-sm font-medium"
										style={{ color: 'var(--color-gray-600)' }}
									>
										Real-time
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-purple-600)' }}
									>
										{
											watchlistEntries.filter(
												(e) => e.monitoringType === 'realtime' && e.isActive
											).length
										}
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
											d="M13 10V3L4 14h7v7l9-11h-7z"
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
										className="text-sm font-medium"
										style={{ color: 'var(--color-gray-600)' }}
									>
										Weekly
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-green-600)' }}
									>
										{
											watchlistEntries.filter(
												(e) => e.monitoringType === 'weekly' && e.isActive
											).length
										}
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
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
										className="text-sm font-medium"
										style={{ color: 'var(--color-gray-600)' }}
									>
										Inactive
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-gray-500)' }}
									>
										{watchlistEntries.filter((e) => !e.isActive).length}
									</p>
								</div>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: 'var(--color-gray-100)' }}
								>
									<svg
										className="w-5 h-5"
										style={{ color: 'var(--color-gray-500)' }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Watchlist Table */}
				<div className="card">
					<div className="card-header p-6 border-b border-gray-200">
						<h3
							className="text-lg font-semibold"
							style={{ color: 'var(--color-gray-900)' }}
						>
							Monitored Entities
						</h3>
					</div>
					<div className="card-body p-0">
						{watchlistEntries.length === 0 ? (
							<div className="text-center py-12 px-6">
								<svg
									className="w-12 h-12 mx-auto mb-4"
									style={{ color: 'var(--color-gray-400)' }}
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
								<p
									className="text-lg font-medium mb-2"
									style={{ color: 'var(--color-gray-900)' }}
								>
									No entities in watchlist
								</p>
								<p
									className="text-sm mb-4"
									style={{ color: 'var(--color-gray-600)' }}
								>
									Add entities to start monitoring for ongoing risk changes.
								</p>
								<button
									onClick={() => setShowAddModal(true)}
									className="btn btn-primary"
								>
									Add First Entity
								</button>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="table w-full">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Entity
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Type
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Monitoring
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Alert Threshold
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Last Scanned
											</th>
											<th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Status
											</th>
											<th className="text-center py-4 px-6 font-semibold text-gray-700 bg-gray-50">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{watchlistEntries.map((entry) => (
											<tr
												key={entry.id}
												className="border-b border-gray-100 hover:bg-gray-50"
											>
												<td className="py-4 px-6">
													<div>
														<div
															className="font-medium text-base"
															style={{ color: 'var(--color-gray-900)' }}
														>
															{entry.entityName}
														</div>
														<div
															className="text-sm mt-1"
															style={{ color: 'var(--color-gray-600)' }}
														>
															Added {entry.createdDate}
														</div>
													</div>
												</td>
												<td className="py-4 px-6">
													<span className="badge badge-outline text-xs font-medium px-3 py-1">
														{entry.entityType}
													</span>
												</td>
												<td className="py-4 px-6">
													<span
														className={`${getMonitoringBadge(
															entry.monitoringType
														)} text-xs font-medium px-3 py-1`}
													>
														{entry.monitoringType === 'realtime'
															? 'Real-time'
															: 'Weekly'}
													</span>
												</td>
												<td className="py-4 px-6">
													<span
														className={`${getRiskBadge(
															entry.alertThreshold
														)} text-xs font-medium px-3 py-1`}
													>
														{entry.alertThreshold.toUpperCase()}
													</span>
												</td>
												<td className="py-4 px-6">
													<div
														className="text-sm"
														style={{ color: 'var(--color-gray-600)' }}
													>
														{entry.lastScanned}
													</div>
												</td>
												<td className="py-4 px-6">
													<span
														className={`${getStatusBadge(
															entry.isActive
														)} text-xs font-medium px-3 py-1`}
													>
														{entry.isActive ? 'Active' : 'Inactive'}
													</span>
												</td>
												<td className="py-4 px-6">
													<div className="flex justify-center space-x-2">
														<button
															onClick={() => toggleWatchlistEntry(entry.id)}
															className={`btn btn-sm text-xs px-3 ${
																entry.isActive ? 'btn-warning' : 'btn-success'
															}`}
														>
															{entry.isActive ? 'Pause' : 'Resume'}
														</button>
														<button
															onClick={() => removeFromWatchlist(entry.id)}
															className="btn btn-sm btn-error text-xs px-3"
														>
															Remove
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</main>

			{/* Add to Watchlist Modal */}
			{showAddModal && (
				<div className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg mb-4">
							Add Entity to Watchlist
						</h3>

						{/* Entity Selection */}
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Select Entity</span>
							</label>
							<select
								className="select select-bordered"
								value={selectedEntity}
								onChange={(e) => setSelectedEntity(e.target.value)}
							>
								<option value="">Choose an entity...</option>
								{availableEntities.map((entity) => (
									<option key={entity.id} value={entity.id}>
										{entity.entityName} ({entity.type})
									</option>
								))}
							</select>
						</div>

						{/* Monitoring Type */}
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Monitoring Frequency</span>
							</label>
							<div className="flex space-x-4">
								<label className="label cursor-pointer">
									<input
										type="radio"
										name="monitoringType"
										className="radio"
										checked={monitoringType === 'weekly'}
										onChange={() => setMonitoringType('weekly')}
									/>
									<span className="label-text ml-2">Weekly</span>
								</label>
								<label className="label cursor-pointer">
									<input
										type="radio"
										name="monitoringType"
										className="radio"
										checked={monitoringType === 'realtime'}
										onChange={() => setMonitoringType('realtime')}
									/>
									<span className="label-text ml-2">Real-time</span>
								</label>
							</div>
						</div>

						{/* Alert Threshold */}
						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Alert Threshold</span>
							</label>
							<select
								className="select select-bordered"
								value={alertThreshold}
								onChange={(e) =>
									setAlertThreshold(
										e.target.value as 'low' | 'medium' | 'high'
									)
								}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>

						{/* Alert Preferences */}
						<div className="form-control mb-6">
							<label className="label">
								<span className="label-text">Alert Preferences</span>
							</label>
							<div className="space-y-2">
								<label className="label cursor-pointer justify-start">
									<input
										type="checkbox"
										className="checkbox mr-3"
										checked={alertPreferences.ftoTcoActivity}
										onChange={(e) =>
											setAlertPreferences((prev) => ({
												...prev,
												ftoTcoActivity: e.target.checked,
											}))
										}
									/>
									<span className="label-text">FTO/TCO Activity</span>
								</label>
								<label className="label cursor-pointer justify-start">
									<input
										type="checkbox"
										className="checkbox mr-3"
										checked={alertPreferences.newSanctions}
										onChange={(e) =>
											setAlertPreferences((prev) => ({
												...prev,
												newSanctions: e.target.checked,
											}))
										}
									/>
									<span className="label-text">New Sanctions</span>
								</label>
								<label className="label cursor-pointer justify-start">
									<input
										type="checkbox"
										className="checkbox mr-3"
										checked={alertPreferences.networkChanges}
										onChange={(e) =>
											setAlertPreferences((prev) => ({
												...prev,
												networkChanges: e.target.checked,
											}))
										}
									/>
									<span className="label-text">Network Changes</span>
								</label>
								<label className="label cursor-pointer justify-start">
									<input
										type="checkbox"
										className="checkbox mr-3"
										checked={alertPreferences.portActivity}
										onChange={(e) =>
											setAlertPreferences((prev) => ({
												...prev,
												portActivity: e.target.checked,
											}))
										}
									/>
									<span className="label-text">Port Activity</span>
								</label>
							</div>
						</div>

						<div className="modal-action">
							<button
								onClick={() => setShowAddModal(false)}
								className="btn btn-ghost"
							>
								Cancel
							</button>
							<button
								onClick={addToWatchlist}
								disabled={!selectedEntity}
								className="btn btn-primary"
							>
								Add to Watchlist
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
