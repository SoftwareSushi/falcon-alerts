import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	mockSuspiciousEntities,
	mockOSINTSources,
	type SuspiciousEntity,
} from '../data/mockData';

export default function SuspiciousRegistry() {
	const navigate = useNavigate();
	const [entities] = useState<SuspiciousEntity[]>(
		mockSuspiciousEntities
	);
	const DISPLAY_LIMIT = 100;
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState<string>('all');
	const [filterRisk, setFilterRisk] = useState<string>('all');
	const [filterCountry, setFilterCountry] = useState<string>('all');
	const [selectedEntity, setSelectedEntity] =
		useState<SuspiciousEntity | null>(null);

	const getRiskBadge = (riskLevel: string) => {
		switch (riskLevel) {
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

	const getTypeBadge = (type: string) => {
		switch (type) {
			case 'port':
				return 'badge badge-primary';
			case 'person':
				return 'badge badge-secondary';
			case 'broker':
				return 'badge badge-accent';
			case 'handler':
				return 'badge badge-warning';
			case 'organization':
				return 'badge badge-info';
			default:
				return 'badge badge-neutral';
		}
	};

	const getReliabilityBadge = (reliability: string) => {
		switch (reliability) {
			case 'A':
				return 'badge badge-success';
			case 'B':
				return 'badge badge-info';
			case 'C':
				return 'badge badge-warning';
			case 'D':
				return 'badge badge-error';
			default:
				return 'badge badge-neutral';
		}
	};

	const filteredEntities = entities.filter((entity) => {
		const matchesSearch =
			searchTerm === '' ||
			entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entity.flaggedReasons.some((reason) =>
				reason.toLowerCase().includes(searchTerm.toLowerCase())
			) ||
			entity.associatedEntities.some((assoc) =>
				assoc.toLowerCase().includes(searchTerm.toLowerCase())
			);

		const matchesType =
			filterType === 'all' || entity.type === filterType;
		const matchesRisk =
			filterRisk === 'all' || entity.riskLevel === filterRisk;
		const matchesCountry =
			filterCountry === 'all' ||
			entity.location?.country === filterCountry;

		return (
			matchesSearch && matchesType && matchesRisk && matchesCountry
		);
	});

	// Limit displayed entities to DISPLAY_LIMIT for performance
	const displayedEntities = filteredEntities.slice(0, DISPLAY_LIMIT);
	const hasMoreEntities = filteredEntities.length > DISPLAY_LIMIT;

	const uniqueCountries = [
		...new Set(
			entities
				.map((e) => e.location?.country)
				.filter((country): country is string => country !== undefined)
		),
	].sort();

	const entityCounts = {
		total: entities.length,
		ports: entities.filter((e) => e.type === 'port').length,
		persons: entities.filter((e) => e.type === 'person').length,
		brokers: entities.filter((e) => e.type === 'broker').length,
		organizations: entities.filter((e) => e.type === 'organization')
			.length,
		critical: entities.filter((e) => e.riskLevel === 'critical').length,
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

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
								Suspicious Port & Person Registry
							</h1>
							<span className="badge badge-info">Q1-2024 Update</span>
						</div>
						<div className="flex items-center space-x-2">
							<span
								className="text-sm"
								style={{ color: 'var(--text-secondary)' }}
							>
								Last Updated: {formatDate('2024-01-01')}
							</span>
							<button className="btn btn-primary btn-sm" disabled>
								Export Registry
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
					<div className="card">
						<div className="card-body">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									{entityCounts.total}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--text-secondary)' }}
								>
									Total Entities
								</p>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-blue-600)' }}
								>
									{entityCounts.ports}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--text-secondary)' }}
								>
									Ports
								</p>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-purple-600)' }}
								>
									{entityCounts.persons}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--text-secondary)' }}
								>
									Persons
								</p>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-green-600)' }}
								>
									{entityCounts.brokers}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--text-secondary)' }}
								>
									Brokers
								</p>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-orange-600)' }}
								>
									{entityCounts.organizations}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--text-secondary)' }}
								>
									Organizations
								</p>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="text-center">
								<p
									className="text-2xl font-semibold"
									style={{ color: 'var(--color-red-600)' }}
								>
									{entityCounts.critical}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: 'var(--text-secondary)' }}
								>
									Critical Risk
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="card mb-8">
					<div className="card-body p-6">
						<div className="mb-6">
							<h3
								className="text-lg font-semibold mb-4"
								style={{ color: 'var(--text-primary)' }}
							>
								Search & Filters
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
								<div className="form-control md:col-span-2">
									<label className="label pb-2">
										<span className="label-text font-medium">Search</span>
									</label>
									<input
										type="text"
										placeholder="Search by name, reasons, or associations..."
										className="input input-bordered w-full"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
								<div className="form-control">
									<label className="label pb-2">
										<span className="label-text font-medium">Type</span>
									</label>
									<select
										className="select select-bordered w-full"
										value={filterType}
										onChange={(e) => setFilterType(e.target.value)}
									>
										<option value="all">All Types</option>
										<option value="port">Ports</option>
										<option value="person">Persons</option>
										<option value="broker">Brokers</option>
										<option value="handler">Handlers</option>
										<option value="organization">Organizations</option>
									</select>
								</div>
								<div className="form-control">
									<label className="label pb-2">
										<span className="label-text font-medium">Risk Level</span>
									</label>
									<select
										className="select select-bordered w-full"
										value={filterRisk}
										onChange={(e) => setFilterRisk(e.target.value)}
									>
										<option value="all">All Risk Levels</option>
										<option value="critical">Critical</option>
										<option value="high">High</option>
										<option value="medium">Medium</option>
										<option value="low">Low</option>
									</select>
								</div>
								<div className="form-control">
									<label className="label pb-2">
										<span className="label-text font-medium">Country</span>
									</label>
									<select
										className="select select-bordered w-full"
										value={filterCountry}
										onChange={(e) => setFilterCountry(e.target.value)}
									>
										<option value="all">All Countries</option>
										{uniqueCountries.map((country) => (
											<option key={country} value={country}>
												{country}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div
							className="flex items-center justify-between pt-4"
							style={{ borderTop: '1px solid var(--border-primary)' }}
						>
							<div
								className="text-sm"
								style={{ color: 'var(--text-secondary)' }}
							>
								Showing{' '}
								{Math.min(displayedEntities.length, filteredEntities.length)}{' '}
								of {filteredEntities.length} filtered entities
								{entities.length !== filteredEntities.length &&
									` (${entities.length} total)`}
							</div>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => {
										setSearchTerm('');
										setFilterType('all');
										setFilterRisk('all');
										setFilterCountry('all');
									}}
									className="btn btn-sm btn-ghost"
								>
									Clear Filters
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Registry Table */}
				<div className="card">
					<div
						className="card-header p-6"
						style={{ borderBottom: '1px solid var(--border-primary)' }}
					>
						<h3
							className="text-lg font-semibold"
							style={{ color: 'var(--text-primary)' }}
						>
							Registry Entries
						</h3>
					</div>
					<div className="card-body p-0">
						{filteredEntities.length === 0 ? (
							<div className="text-center py-12 px-6">
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
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								<p
									className="text-lg font-medium mb-2"
									style={{ color: 'var(--text-primary)' }}
								>
									No entities match your search
								</p>
								<p
									className="text-sm"
									style={{ color: 'var(--text-secondary)' }}
								>
									Try adjusting your search terms or filters.
								</p>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="table w-full">
									<thead>
										<tr
											style={{ borderBottom: '1px solid var(--border-primary)' }}
										>
											<th
												className="text-left py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Entity
											</th>
											<th
												className="text-left py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Type
											</th>
											<th
												className="text-left py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Risk Level
											</th>
											<th
												className="text-left py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Location
											</th>
											<th
												className="text-left py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Source Agency
											</th>
											<th
												className="text-left py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Last Updated
											</th>
											<th
												className="text-center py-4 px-6 font-semibold"
												style={{
													color: 'var(--text-secondary)',
													backgroundColor: 'var(--bg-tertiary)',
												}}
											>
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{displayedEntities.map((entity) => (
											<tr
												key={entity.id}
												className="hover:bg-opacity-10"
												style={{
													borderBottom: '1px solid var(--border-primary)',
													backgroundColor: 'transparent',
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor =
														'var(--bg-tertiary)';
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = 'transparent';
												}}
											>
												<td className="py-4 px-6">
													<div>
														<div
															className="font-medium text-base"
															style={{ color: 'var(--text-primary)' }}
														>
															{entity.name}
														</div>
														<div
															className="text-sm mt-1"
															style={{ color: 'var(--text-secondary)' }}
														>
															Added {formatDate(entity.dateAdded)}
														</div>
													</div>
												</td>
												<td className="py-4 px-6">
													<span
														className={`${getTypeBadge(
															entity.type
														)} text-xs font-medium px-3 py-1`}
													>
														{entity.type.charAt(0).toUpperCase() +
															entity.type.slice(1)}
													</span>
												</td>
												<td className="py-4 px-6">
													<span
														className={`${getRiskBadge(
															entity.riskLevel
														)} text-xs font-medium px-3 py-1`}
													>
														{entity.riskLevel.toUpperCase()}
													</span>
												</td>
												<td className="py-4 px-6">
													{entity.location ? (
														<div>
															<div
																className="text-sm font-medium"
																style={{ color: 'var(--text-primary)' }}
															>
																{entity.location.country}
															</div>
															<div
																className="text-xs mt-1"
																style={{ color: 'var(--text-secondary)' }}
															>
																{entity.location.region}
															</div>
														</div>
													) : (
														<span className="text-sm text-gray-500">N/A</span>
													)}
												</td>
												<td className="py-4 px-6">
													<div
														className="text-sm"
														style={{ color: 'var(--text-secondary)' }}
													>
														{entity.sourceAgency}
													</div>
												</td>
												<td className="py-4 px-6">
													<div
														className="text-sm"
														style={{ color: 'var(--text-secondary)' }}
													>
														{formatDate(entity.lastUpdated)}
													</div>
												</td>
												<td className="py-4 px-6 text-center">
													<button
														onClick={() => setSelectedEntity(entity)}
														className="btn btn-sm btn-primary text-xs px-4"
													>
														View Details
													</button>
												</td>
											</tr>
										))}
										{hasMoreEntities && (
											<tr>
												<td
													colSpan={6}
													className="py-4 px-6 text-center"
													style={{
														borderBottom: '1px solid var(--border-primary)',
														color: 'var(--text-secondary)',
													}}
												>
													<div className="flex items-center justify-center space-x-2">
														<span>...</span>
														<span className="text-sm">
															Showing {DISPLAY_LIMIT} of {filteredEntities.length}{' '}
															entities
														</span>
														<span>...</span>
													</div>
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				{/* OSINT Sources */}
				<div className="card mt-8">
					<div
						className="card-header p-6"
						style={{ borderBottom: '1px solid var(--border-primary)' }}
					>
						<h3
							className="text-lg font-semibold"
							style={{ color: 'var(--text-primary)' }}
						>
							OSINT Sources
						</h3>
					</div>
					<div className="card-body p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{mockOSINTSources.map((source) => (
								<div
									key={source.id}
									className="border rounded-lg p-5 hover:shadow-md transition-shadow"
									style={{
										borderColor: 'var(--border-primary)',
										backgroundColor: 'var(--bg-secondary)',
									}}
								>
									<div className="flex items-center justify-between mb-3">
										<h4
											className="font-semibold text-sm"
											style={{ color: 'var(--text-primary)' }}
										>
											{source.name}
										</h4>
										<span
											className={`${getReliabilityBadge(
												source.reliability
											)} text-xs font-medium px-2 py-1`}
										>
											{source.reliability}
										</span>
									</div>
									<p
										className="text-sm mb-3 capitalize"
										style={{ color: 'var(--text-secondary)' }}
									>
										{source.type.charAt(0).toUpperCase() + source.type.slice(1)}
									</p>
									<div className="space-y-1 text-xs text-gray-500">
										<div className="flex justify-between">
											<span>Last Update:</span>
											<span className="font-medium">{source.lastUpdate}</span>
										</div>
										<div className="flex justify-between">
											<span>Data Points:</span>
											<span className="font-medium">
												{source.dataPoints.toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>

			{/* Entity Details Modal */}
			{selectedEntity && (
				<div className="modal modal-open">
					<div className="modal-box max-w-4xl">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-bold text-lg">{selectedEntity.name}</h3>
							<div className="flex items-center space-x-2">
								<span className={getTypeBadge(selectedEntity.type)}>
									{selectedEntity.type.charAt(0).toUpperCase() +
										selectedEntity.type.slice(1)}
								</span>
								<span className={getRiskBadge(selectedEntity.riskLevel)}>
									{selectedEntity.riskLevel.toUpperCase()}
								</span>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<h4 className="font-semibold mb-2 text-gray-900">
									Entity Information
								</h4>
								<div className="space-y-2 text-sm">
									<div>
										<span className="font-medium text-gray-600">
											Source Agency:
										</span>{' '}
										{selectedEntity.sourceAgency}
									</div>
									<div>
										<span className="font-medium text-gray-600">
											Date Added:
										</span>{' '}
										{formatDate(selectedEntity.dateAdded)}
									</div>
									<div>
										<span className="font-medium text-gray-600">
											Last Updated:
										</span>{' '}
										{formatDate(selectedEntity.lastUpdated)}
									</div>
									<div>
										<span className="font-medium text-gray-600">
											Quarterly Update:
										</span>{' '}
										{selectedEntity.quarterlyUpdate}
									</div>
								</div>
							</div>

							{selectedEntity.location && (
								<div>
									<h4 className="font-semibold mb-2 text-gray-900">
										Location
									</h4>
									<div className="space-y-2 text-sm">
										<div>
											<span className="font-medium text-gray-600">Country:</span>{' '}
											{selectedEntity.location.country}
										</div>
										<div>
											<span className="font-medium text-gray-600">Region:</span>{' '}
											{selectedEntity.location.region}
										</div>
										{selectedEntity.location.coordinates && (
											<div>
												<span className="font-medium text-gray-600">
													Coordinates:
												</span>{' '}
												{selectedEntity.location.coordinates.lat},{' '}
												{selectedEntity.location.coordinates.lng}
											</div>
										)}
									</div>
								</div>
							)}
						</div>

						<div className="mb-6">
							<h4 className="font-semibold mb-2 text-gray-900">
								Flagged Reasons
							</h4>
							<div className="flex flex-wrap gap-2">
								{selectedEntity.flaggedReasons.map((reason, index) => (
									<span
										key={index}
										className="badge badge-error badge-outline"
									>
										{reason}
									</span>
								))}
							</div>
						</div>

						{selectedEntity.associatedEntities.length > 0 && (
							<div className="mb-6">
								<h4 className="font-semibold mb-2 text-gray-900">
									Associated Entities
								</h4>
								<div className="flex flex-wrap gap-2">
									{selectedEntity.associatedEntities.map((entity, index) => (
										<span
											key={index}
											className="badge badge-info badge-outline"
										>
											{entity}
										</span>
									))}
								</div>
							</div>
						)}

						<div className="mb-6">
							<h4 className="font-semibold mb-2 text-gray-900">
								OSINT Sources
							</h4>
							<div className="flex flex-wrap gap-2">
								{selectedEntity.osintSources.map((source, index) => (
									<span
										key={index}
										className="badge badge-success badge-outline"
									>
										{source}
									</span>
								))}
							</div>
						</div>

						<div className="modal-action">
							<button
								onClick={() => setSelectedEntity(null)}
								className="btn btn-ghost"
							>
								Close
							</button>
							<button className="btn btn-primary" disabled>
								Add to Screening Query
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
