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
		matchingCriteria: ['Name', 'SSN', 'Address'],
		sourceName: 'Public Court Database',
		recordType: 'Civil Lawsuit',
		confidenceScore: 95,
		timestamp: '2023-08-15',
		details:
			'Civil lawsuit filed for breach of contract. Case ongoing.',
	},
	{
		id: '2',
		matchingCriteria: ['Name', 'Address'],
		sourceName: 'Business Registry',
		recordType: 'Fraud Investigation',
		confidenceScore: 87,
		timestamp: '2023-12-03',
		details:
			'Subject of ongoing fraud investigation by state authorities.',
	},
	{
		id: '3',
		matchingCriteria: ['Name', 'Phone'],
		sourceName: 'Credit Bureau Reports',
		recordType: 'Bankruptcy Filing',
		confidenceScore: 78,
		timestamp: '2022-05-20',
		details: 'Chapter 7 bankruptcy filed and discharged.',
	},
];
