import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	mockERPIntegrations,
	type ERPIntegration,
} from '../data/mockData';

export default function ERPIntegration() {
	const navigate = useNavigate();
	const [integrations, setIntegrations] = useState<ERPIntegration[]>(
		mockERPIntegrations
	);
	const [showAddModal, setShowAddModal] = useState(false);
	const [selectedIntegration, setSelectedIntegration] =
		useState<ERPIntegration | null>(null);
	const [newIntegration, setNewIntegration] = useState({
		name: '',
		type: 'ERP' as 'ERP' | 'CRM',
		endpoint: '',
		webhookUrl: '',
		apiKey: '',
		syncFrequency: 'daily' as 'hourly' | 'daily' | 'weekly',
	});

	const getStatusBadge = (isEnabled: boolean) => {
		return isEnabled ? 'badge badge-success' : 'badge badge-error';
	};

	const getTypeBadge = (type: string) => {
		return type === 'ERP'
			? 'badge badge-primary'
			: 'badge badge-secondary';
	};

	const toggleIntegration = (id: string) => {
		setIntegrations((prev) =>
			prev.map((integration) =>
				integration.id === id
					? { ...integration, isEnabled: !integration.isEnabled }
					: integration
			)
		);
	};

	const testConnection = async (integration: ERPIntegration) => {
		// Simulate API test
		await new Promise((resolve) => setTimeout(resolve, 2000));
		alert(
			`Connection test ${
				Math.random() > 0.3 ? 'successful' : 'failed'
			} for ${integration.name}`
		);
	};

	const addIntegration = () => {
		const integration: ERPIntegration = {
			id: `int${Date.now()}`,
			name: newIntegration.name,
			type: newIntegration.type,
			endpoint: newIntegration.endpoint,
			isEnabled: false,
			lastSync: 'Never',
			config: {
				apiKey: newIntegration.apiKey || undefined,
				webhookUrl: newIntegration.webhookUrl,
				syncFrequency: newIntegration.syncFrequency,
			},
		};

		setIntegrations((prev) => [...prev, integration]);
		setShowAddModal(false);
		setNewIntegration({
			name: '',
			type: 'ERP',
			endpoint: '',
			webhookUrl: '',
			apiKey: '',
			syncFrequency: 'daily',
		});
	};

	const deleteIntegration = (id: string) => {
		setIntegrations((prev) =>
			prev.filter((integration) => integration.id !== id)
		);
	};

	const formatLastSync = (lastSync: string) => {
		if (lastSync === 'Never') return 'Never';
		return new Date(lastSync).toLocaleString();
	};

	const enabledCount = integrations.filter((i) => i.isEnabled).length;
	const totalCount = integrations.length;

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: 'var(--color-gray-50)' }}
		>
			{/* Header */}
			<header className="bg-white border-b border-gray-200">
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
								style={{ color: 'var(--color-gray-900)' }}
							>
								ERP/CRM Integrations
							</h1>
							<span className="badge badge-info">Demo Mode</span>
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
							Add Integration
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Info Banner */}
				<div className="alert alert-info mb-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-current shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<div>
						<h3 className="font-bold">Integration Features (Demo)</h3>
						<div className="text-sm">
							ERP/CRM integrations allow automatic syncing of screening
							results and watchlist alerts with your existing business
							systems. In production, these would provide real-time data
							synchronization and webhook notifications.
						</div>
					</div>
				</div>

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
										Total Integrations
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-gray-900)' }}
									>
										{totalCount}
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
											d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
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
										Active
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-green-600)' }}
									>
										{enabledCount}
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
										className="text-sm font-medium"
										style={{ color: 'var(--color-gray-600)' }}
									>
										ERP Systems
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-purple-600)' }}
									>
										{integrations.filter((i) => i.type === 'ERP').length}
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
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
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
										CRM Systems
									</p>
									<p
										className="text-2xl font-semibold"
										style={{ color: 'var(--color-orange-600)' }}
									>
										{integrations.filter((i) => i.type === 'CRM').length}
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
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Integrations Table */}
				<div className="card">
					<div className="card-header">
						<h3
							className="text-lg font-semibold"
							style={{ color: 'var(--color-gray-900)' }}
						>
							Configured Integrations
						</h3>
					</div>
					<div className="card-body">
						{integrations.length === 0 ? (
							<div className="text-center py-8">
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
										d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
									/>
								</svg>
								<p
									className="text-lg font-medium mb-2"
									style={{ color: 'var(--color-gray-900)' }}
								>
									No integrations configured
								</p>
								<p
									className="text-sm mb-4"
									style={{ color: 'var(--color-gray-600)' }}
								>
									Add your first ERP or CRM integration to start syncing data.
								</p>
								<button
									onClick={() => setShowAddModal(true)}
									className="btn btn-primary"
								>
									Add Integration
								</button>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="table w-full">
									<thead>
										<tr>
											<th>System</th>
											<th>Type</th>
											<th>Status</th>
											<th>Sync Frequency</th>
											<th>Last Sync</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{integrations.map((integration) => (
											<tr key={integration.id}>
												<td>
													<div>
														<div
															className="font-medium"
															style={{ color: 'var(--color-gray-900)' }}
														>
															{integration.name}
														</div>
														<div
															className="text-sm"
															style={{ color: 'var(--color-gray-600)' }}
														>
															{integration.endpoint}
														</div>
													</div>
												</td>
												<td>
													<span className={getTypeBadge(integration.type)}>
														{integration.type}
													</span>
												</td>
												<td>
													<span className={getStatusBadge(integration.isEnabled)}>
														{integration.isEnabled ? 'Active' : 'Inactive'}
													</span>
												</td>
												<td>
													<span className="text-sm text-gray-600">
														{integration.config.syncFrequency}
													</span>
												</td>
												<td>
													<span className="text-sm text-gray-600">
														{formatLastSync(integration.lastSync)}
													</span>
												</td>
												<td>
													<div className="flex space-x-2">
														<button
															onClick={() => toggleIntegration(integration.id)}
															className={`btn btn-sm ${
																integration.isEnabled ? 'btn-warning' : 'btn-success'
															}`}
														>
															{integration.isEnabled ? 'Disable' : 'Enable'}
														</button>
														<button
															onClick={() => testConnection(integration)}
															className="btn btn-sm btn-info"
															disabled={!integration.isEnabled}
														>
															Test
														</button>
														<button
															onClick={() => setSelectedIntegration(integration)}
															className="btn btn-sm btn-ghost"
														>
															Edit
														</button>
														<button
															onClick={() => deleteIntegration(integration.id)}
															className="btn btn-sm btn-error"
														>
															Delete
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

				{/* Integration Features */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
					<div className="card">
						<div className="card-header">
							<h3
								className="text-lg font-semibold"
								style={{ color: 'var(--color-gray-900)' }}
							>
								Available Features
							</h3>
						</div>
						<div className="card-body">
							<ul className="space-y-3">
								<li className="flex items-center space-x-3">
									<svg
										className="w-5 h-5 text-green-500"
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
									<span>Automatic screening result sync</span>
								</li>
								<li className="flex items-center space-x-3">
									<svg
										className="w-5 h-5 text-green-500"
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
									<span>Real-time alert notifications</span>
								</li>
								<li className="flex items-center space-x-3">
									<svg
										className="w-5 h-5 text-green-500"
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
									<span>Watchlist status updates</span>
								</li>
								<li className="flex items-center space-x-3">
									<svg
										className="w-5 h-5 text-green-500"
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
									<span>Customer risk profile updates</span>
								</li>
								<li className="flex items-center space-x-3">
									<svg
										className="w-5 h-5 text-green-500"
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
									<span>Compliance reporting automation</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h3
								className="text-lg font-semibold"
								style={{ color: 'var(--color-gray-900)' }}
							>
								Supported Systems
							</h3>
						</div>
						<div className="card-body">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h4 className="font-medium text-gray-900 mb-2">
										ERP Systems
									</h4>
									<ul className="text-sm text-gray-600 space-y-1">
										<li>• SAP ERP</li>
										<li>• Oracle ERP Cloud</li>
										<li>• Microsoft Dynamics</li>
										<li>• NetSuite</li>
									</ul>
								</div>
								<div>
									<h4 className="font-medium text-gray-900 mb-2">
										CRM Systems
									</h4>
									<ul className="text-sm text-gray-600 space-y-1">
										<li>• Salesforce</li>
										<li>• HubSpot</li>
										<li>• Microsoft Dynamics CRM</li>
										<li>• Pipedrive</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Add Integration Modal */}
			{showAddModal && (
				<div className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg mb-4">Add New Integration</h3>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">System Name</span>
							</label>
							<input
								type="text"
								placeholder="e.g., SAP Production"
								className="input input-bordered"
								value={newIntegration.name}
								onChange={(e) =>
									setNewIntegration((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">System Type</span>
							</label>
							<select
								className="select select-bordered"
								value={newIntegration.type}
								onChange={(e) =>
									setNewIntegration((prev) => ({
										...prev,
										type: e.target.value as 'ERP' | 'CRM',
									}))
								}
							>
								<option value="ERP">ERP System</option>
								<option value="CRM">CRM System</option>
							</select>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">API Endpoint</span>
							</label>
							<input
								type="url"
								placeholder="https://api.example.com"
								className="input input-bordered"
								value={newIntegration.endpoint}
								onChange={(e) =>
									setNewIntegration((prev) => ({
										...prev,
										endpoint: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">Webhook URL</span>
							</label>
							<input
								type="url"
								placeholder="https://sanctionwatch.com/webhook/custom"
								className="input input-bordered"
								value={newIntegration.webhookUrl}
								onChange={(e) =>
									setNewIntegration((prev) => ({
										...prev,
										webhookUrl: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-control mb-4">
							<label className="label">
								<span className="label-text">API Key (Optional)</span>
							</label>
							<input
								type="password"
								placeholder="Enter API key..."
								className="input input-bordered"
								value={newIntegration.apiKey}
								onChange={(e) =>
									setNewIntegration((prev) => ({
										...prev,
										apiKey: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-control mb-6">
							<label className="label">
								<span className="label-text">Sync Frequency</span>
							</label>
							<select
								className="select select-bordered"
								value={newIntegration.syncFrequency}
								onChange={(e) =>
									setNewIntegration((prev) => ({
										...prev,
										syncFrequency: e.target.value as
											| 'hourly'
											| 'daily'
											| 'weekly',
									}))
								}
							>
								<option value="hourly">Hourly</option>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
							</select>
						</div>

						<div className="modal-action">
							<button
								onClick={() => setShowAddModal(false)}
								className="btn btn-ghost"
							>
								Cancel
							</button>
							<button
								onClick={addIntegration}
								disabled={!newIntegration.name || !newIntegration.endpoint}
								className="btn btn-primary"
							>
								Add Integration
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit Integration Modal */}
			{selectedIntegration && (
				<div className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg mb-4">
							Edit {selectedIntegration.name}
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							Integration editing functionality would be implemented here in
							a production environment.
						</p>
						<div className="modal-action">
							<button
								onClick={() => setSelectedIntegration(null)}
								className="btn btn-ghost"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
