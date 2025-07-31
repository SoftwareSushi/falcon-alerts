export interface PreviousCheck {
	id: string;
	entityName: string;
	type: 'Person' | 'Business';
	status: 'Clean' | 'Flagged' | 'In Progress';
	lastUpdated: string;
}

export interface FlaggedRecord {
	id: string;
	matchingCriteria: string[];
	sourceName: string;
	recordType: string;
	confidenceScore: number;
	timestamp: string;
	details: string;
	riskLevel: 'High' | 'Medium' | 'Low';
	category:
		| 'Sanctions'
		| 'Criminal'
		| 'ML_Pattern'
		| 'Geographic'
		| 'Cartel';
}

export const mockPreviousChecks: PreviousCheck[] = [
	{
		id: '1',
		entityName: 'John Smith',
		type: 'Person',
		status: 'Clean',
		lastUpdated: '2024-01-15',
	},
	{
		id: '2',
		entityName: 'ABC Corporation',
		type: 'Business',
		status: 'Flagged',
		lastUpdated: '2024-01-14',
	},
	{
		id: '3',
		entityName: 'Sarah Johnson',
		type: 'Person',
		status: 'In Progress',
		lastUpdated: '2024-01-16',
	},
	{
		id: '4',
		entityName: 'TechStart LLC',
		type: 'Business',
		status: 'Clean',
		lastUpdated: '2024-01-13',
	},
	{
		id: '5',
		entityName: 'Michael Brown',
		type: 'Person',
		status: 'Flagged',
		lastUpdated: '2024-01-12',
	},
];

export const mockFlaggedRecords: FlaggedRecord[] = [
	{
		id: '1',
		matchingCriteria: ['Name', 'DOB', 'Address'],
		sourceName: 'OFAC SDN List',
		recordType: 'Specially Designated National',
		confidenceScore: 97,
		timestamp: '2023-08-15',
		details:
			'Individual appears on OFAC SDN list for involvement in narcotics trafficking. All assets blocked under IEEPA.',
		riskLevel: 'High',
		category: 'Sanctions',
	},
	{
		id: '2',
		matchingCriteria: ['Name', 'Business Registration'],
		sourceName: 'UN Sanctions Committee',
		recordType: 'Security Council Sanctions',
		confidenceScore: 89,
		timestamp: '2024-01-03',
		details:
			'Entity subject to UN Security Council sanctions under Resolution 1267 for terrorist financing activities.',
		riskLevel: 'High',
		category: 'Sanctions',
	},
	{
		id: '3',
		matchingCriteria: ['Name', 'Associated Entities'],
		sourceName: 'US State Department FTO List',
		recordType: 'Foreign Terrorist Organization',
		confidenceScore: 84,
		timestamp: '2023-12-20',
		details:
			'Entity designated as Foreign Terrorist Organization. Material support prohibited under 18 USC 2339B.',
		riskLevel: 'High',
		category: 'Sanctions',
	},
	{
		id: '4',
		matchingCriteria: ['Transaction Patterns', 'Geographic Footprint'],
		sourceName: 'DEA EPIC Database',
		recordType: 'Drug Trafficking Organization',
		confidenceScore: 78,
		timestamp: '2023-11-10',
		details:
			'Entity identified as front company for major drug trafficking organization operating in Sinaloa corridor.',
		riskLevel: 'High',
		category: 'Cartel',
	},
	{
		id: '5',
		matchingCriteria: [
			'Shell Company Patterns',
			'Beneficial Ownership',
		],
		sourceName: 'ML Risk Analytics Engine',
		recordType: 'Layered Structure Pattern',
		confidenceScore: 72,
		timestamp: '2024-01-05',
		details:
			'Complex multi-jurisdictional shell structure detected across Panama, Cayman Islands, and BVI consistent with money laundering typologies.',
		riskLevel: 'Medium',
		category: 'ML_Pattern',
	},
	{
		id: '6',
		matchingCriteria: ['Location Analysis', 'Port Activity'],
		sourceName: 'Geographic Risk Intelligence',
		recordType: 'High-Risk Port Operations',
		confidenceScore: 69,
		timestamp: '2023-10-28',
		details:
			'Significant commercial activity detected at Port of Buenaventura and other high-risk narcotics transit ports.',
		riskLevel: 'Medium',
		category: 'Geographic',
	},
	{
		id: '7',
		matchingCriteria: ['Known Associates', 'Financial Networks'],
		sourceName: 'Enhanced Due Diligence Database',
		recordType: 'Cartel Front Company',
		confidenceScore: 75,
		timestamp: '2023-09-14',
		details:
			'Business identified as potential front for Los Chapitos organization based on ownership patterns and transaction flows.',
		riskLevel: 'High',
		category: 'Cartel',
	},
	{
		id: '8',
		matchingCriteria: [
			'Trade Finance Patterns',
			'Invoice Manipulation',
		],
		sourceName: 'Trade-Based ML Analytics',
		recordType: 'Trade Misinvoicing Pattern',
		confidenceScore: 66,
		timestamp: '2023-12-15',
		details:
			'Systematic trade misinvoicing detected in agricultural exports consistent with value transfer mechanisms.',
		riskLevel: 'Medium',
		category: 'ML_Pattern',
	},
];
