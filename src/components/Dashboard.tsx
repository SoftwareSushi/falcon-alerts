import { useNavigate } from 'react-router-dom';
import { mockPreviousChecks } from '../data/mockData';

interface DashboardProps {
	onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
	const navigate = useNavigate();

	const getStatusBadge = (status: string) => {
		const baseClasses =
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
		switch (status) {
			case 'Clean':
				return `${baseClasses} bg-green-100 text-green-800`;
			case 'Flagged':
				return `${baseClasses} bg-red-100 text-red-800`;
			case 'In Progress':
				return `${baseClasses} bg-yellow-100 text-yellow-800`;
			default:
				return `${baseClasses} bg-gray-100 text-gray-800`;
		}
	};

	const handleViewDetails = (id: string, status: string) => {
		if (status === 'In Progress') {
			navigate('/processing');
		} else {
			navigate('/results', { state: { checkId: id, status } });
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-6">
						<div className="flex items-center">
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
								Falcon Alerts
							</h1>
						</div>
						<button
							onClick={() => {
								onLogout();
								navigate('/login');
							}}
							className="text-gray-500 hover:text-gray-700"
						>
							Logout
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Welcome Banner */}
				<div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 mb-8">
					<h2 className="text-2xl font-bold text-white mb-2">
						Welcome back!
					</h2>
					<p className="text-indigo-100">
						Monitor and manage your background checks with confidence.
					</p>
				</div>

				{/* Create New Check CTA */}
				<div className="mb-8">
					<button
						onClick={() => navigate('/new-check')}
						className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
					>
						<svg
							className="h-5 w-5 mr-2"
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
						Create New Check
					</button>
				</div>

				{/* Previous Checks Table */}
				<div className="bg-white shadow rounded-lg overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h3 className="text-lg font-medium text-gray-900">
							Previous Checks
						</h3>
					</div>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Entity Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Last Updated
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{mockPreviousChecks.map((check) => (
									<tr key={check.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{check.entityName}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{check.type}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={getStatusBadge(check.status)}>
												{check.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{check.lastUpdated}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button
												onClick={() => handleViewDetails(check.id, check.status)}
												className="text-indigo-600 hover:text-indigo-900"
											>
												View Details
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
