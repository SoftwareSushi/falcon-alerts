import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	mockWatchlistEntries,
	mockPreviousChecks,
	type WatchlistEntry,
} from '../data/mockData';

export default function Watchlist() {
	const navigate = useNavigate();
	const location = useLocation();
	const [watchlistEntries, setWatchlistEntries] = useState<
		WatchlistEntry[]
	>(mockWatchlistEntries);
	const [showAddModal, setShowAddModal] = useState(false);
	const [selectedEntity, setSelectedEntity] = useState<string>('');
	const [monitoringType] = useState<'weekly' | 'realtime'>('realtime');
	const [alertThreshold, setAlertThreshold] = useState<
		'low' | 'medium' | 'high'
	>('medium');
	const [alertPreferences, setAlertPreferences] = useState({
		ftoTcoActivity: true,
		newSanctions: true,
		networkChanges: false,
		portActivity: false,
	});

	// Handle incoming entity data from Results page
	useEffect(() => {
		const { entityName, riskLevel } = location.state || {};
		if (entityName) {
			setSelectedEntity(entityName);
			setShowAddModal(true);

			// Set appropriate monitoring based on risk level
			if (riskLevel === 'High') {
				setAlertThreshold('high');
				setAlertPreferences({
					ftoTcoActivity: true,
					newSanctions: true,
					networkChanges: true,
					portActivity: true,
				});
			} else {
				setAlertThreshold('medium');
			}
		}
	}, [location.state]);

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
		// Check if selectedEntity is an ID from mock data or a direct entity name
		const selectedCheck = mockPreviousChecks.find(
			(check) => check.id === selectedEntity
		);

		// If not found in mock data, create entry from direct entity name (from Results page)
		let entityName = selectedEntity;
		let entityType: 'Person' | 'Business' = 'Person'; // Default type
		let entityId = selectedEntity;

		if (selectedCheck) {
			entityName = selectedCheck.entityName;
			entityType = selectedCheck.type;
			entityId = selectedCheck.id;
		} else {
			// Use the entity data from location state if available
			const { entityType: stateEntityType } = location.state || {};
			if (stateEntityType) {
				entityType = stateEntityType === 'person' ? 'Person' : 'Business';
			}
			entityId = `custom-${Date.now()}`;
		}

		if (!entityName.trim()) return;

		const newEntry: WatchlistEntry = {
			id: `w${Date.now()}`,
			entityId,
			entityName,
			entityType,
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="card">
						<div className="card-body">
							<div className="flex items-center justify-between">
								<div>
									<p
										className="text-sm font-medium"
										style={{ color: 'var(--text-secondary)' }}
									>
										Total Monitored
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--text-primary)' }}
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
										style={{ color: 'var(--text-secondary)' }}
									>
										Active
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-green-600)' }}
									>
										{watchlistEntries.filter((e) => e.isActive).length}
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
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
										style={{ color: 'var(--text-secondary)' }}
									>
										Inactive
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--text-tertiary)' }}
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
										style={{ color: 'var(--text-tertiary)' }}
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
							style={{ color: 'var(--text-primary)' }}
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
									style={{ color: 'var(--text-primary)' }}
								>
									No entities in watchlist
								</p>
								<p
									className="text-sm mb-4"
									style={{ color: 'var(--text-secondary)' }}
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
															style={{ color: 'var(--text-primary)' }}
														>
															{entry.entityName}
														</div>
														<div
															className="text-sm mt-1"
															style={{ color: 'var(--text-secondary)' }}
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
														style={{ color: 'var(--text-secondary)' }}
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
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black bg-opacity-50"
						onClick={() => setShowAddModal(false)}
					></div>

					{/* Modal Content */}
					<div
						className="relative w-full max-w-2xl mx-4 rounded-lg shadow-xl"
						style={{
							backgroundColor: 'var(--bg-primary)',
							border: '1px solid var(--border-primary)',
							maxHeight: '90vh',
							overflow: 'auto',
						}}
					>
						<div className="p-6">
							{/* Modal Header */}
							<div className="flex items-center justify-between mb-6">
								<h3
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Add Entity to Watchlist
								</h3>
								<button
									onClick={() => setShowAddModal(false)}
									className="btn btn-sm btn-circle btn-ghost"
								>
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="space-y-6">
								{/* Entity Input/Selection */}
								<div className="form-control">
									<label className="label">
										<span
											className="label-text font-medium"
											style={{ color: 'var(--text-primary)' }}
										>
											Entity Name
										</span>
									</label>
									{location.state?.entityName ? (
										// If coming from Results page, show entity name as readonly
										<div
											className="p-3 rounded-lg border"
											style={{
												backgroundColor: 'var(--bg-secondary)',
												borderColor: 'var(--border-primary)',
												color: 'var(--text-primary)',
											}}
										>
											<div className="flex items-center space-x-2">
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
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
												<span className="font-medium">{selectedEntity}</span>
												<span
													className="text-sm px-2 py-1 rounded-full"
													style={{
														backgroundColor: 'var(--color-blue-100)',
														color: 'var(--color-blue-600)',
													}}
												>
													From Recent Scan
												</span>
											</div>
										</div>
									) : (
										// Otherwise show dropdown for previous checks
										<select
											className="w-full p-3 rounded-md border"
											style={{
												backgroundColor: 'var(--bg-primary)',
												borderColor: 'var(--border-primary)',
												color: 'var(--text-primary)',
											}}
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
									)}
								</div>

								{/* Alert Configuration */}
								<div className="form-control">
									<label className="label">
										<span
											className="label-text font-medium"
											style={{ color: 'var(--text-primary)' }}
										>
											Alert Threshold
										</span>
									</label>
									<select
										className="w-full p-3 rounded-md border"
										style={{
											backgroundColor: 'var(--bg-primary)',
											borderColor: 'var(--border-primary)',
											color: 'var(--text-primary)',
										}}
										value={alertThreshold}
										onChange={(e) =>
											setAlertThreshold(
												e.target.value as 'low' | 'medium' | 'high'
											)
										}
									>
										<option value="low">Low - All changes</option>
										<option value="medium">Medium - Significant changes</option>
										<option value="high">High - Critical changes only</option>
									</select>
									<div
										className="text-xs mt-1"
										style={{ color: 'var(--text-secondary)' }}
									>
										Real-time monitoring is enabled by default for all entities
									</div>
								</div>

								{/* Alert Preferences */}
								<div className="form-control">
									<label className="label">
										<span
											className="label-text font-medium"
											style={{ color: 'var(--text-primary)' }}
										>
											Alert Types
										</span>
									</label>
									<div className="grid grid-cols-2 gap-3">
										<label className="flex items-center space-x-2 cursor-pointer">
											<input
												type="checkbox"
												className="checkbox checkbox-primary checkbox-sm"
												checked={alertPreferences.ftoTcoActivity}
												onChange={(e) =>
													setAlertPreferences((prev) => ({
														...prev,
														ftoTcoActivity: e.target.checked,
													}))
												}
											/>
											<span
												className="text-sm"
												style={{ color: 'var(--text-primary)' }}
											>
												FTO/TCO Activity
											</span>
										</label>
										<label className="flex items-center space-x-2 cursor-pointer">
											<input
												type="checkbox"
												className="checkbox checkbox-primary checkbox-sm"
												checked={alertPreferences.newSanctions}
												onChange={(e) =>
													setAlertPreferences((prev) => ({
														...prev,
														newSanctions: e.target.checked,
													}))
												}
											/>
											<span
												className="text-sm"
												style={{ color: 'var(--text-primary)' }}
											>
												New Sanctions
											</span>
										</label>
										<label className="flex items-center space-x-2 cursor-pointer">
											<input
												type="checkbox"
												className="checkbox checkbox-primary checkbox-sm"
												checked={alertPreferences.networkChanges}
												onChange={(e) =>
													setAlertPreferences((prev) => ({
														...prev,
														networkChanges: e.target.checked,
													}))
												}
											/>
											<span
												className="text-sm"
												style={{ color: 'var(--text-primary)' }}
											>
												Network Changes
											</span>
										</label>
										<label className="flex items-center space-x-2 cursor-pointer">
											<input
												type="checkbox"
												className="checkbox checkbox-primary checkbox-sm"
												checked={alertPreferences.portActivity}
												onChange={(e) =>
													setAlertPreferences((prev) => ({
														...prev,
														portActivity: e.target.checked,
													}))
												}
											/>
											<span
												className="text-sm"
												style={{ color: 'var(--text-primary)' }}
											>
												Port Activity
											</span>
										</label>
									</div>
								</div>
							</div>

							{/* Modal Actions */}
							<div
								className="flex justify-end space-x-3 mt-8 pt-6 border-t"
								style={{ borderColor: 'var(--border-primary)' }}
							>
								<button
									onClick={() => setShowAddModal(false)}
									className="btn btn-ghost"
								>
									Cancel
								</button>
								<button
									onClick={addToWatchlist}
									disabled={!selectedEntity?.trim()}
									className="btn btn-primary"
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
					</div>
				</div>
			)}
		</div>
	);
}
