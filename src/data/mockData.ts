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

export interface WatchlistEntry {
	id: string;
	entityId: string; // Reference to PreviousCheck
	entityName: string;
	entityType: 'Person' | 'Business';
	monitoringType: 'weekly' | 'realtime';
	alertPreferences: {
		ftoTcoActivity: boolean;
		newSanctions: boolean;
		networkChanges: boolean;
		portActivity: boolean;
	};
	createdDate: string;
	lastScanned: string;
	isActive: boolean;
	alertThreshold: 'low' | 'medium' | 'high';
}

export interface Alert {
	id: string;
	watchlistEntryId: string;
	alertType:
		| 'FTO_TCO_LINK'
		| 'NEW_SANCTIONS'
		| 'NETWORK_CHANGE'
		| 'PORT_ACTIVITY';
	severity: 'low' | 'medium' | 'high' | 'critical';
	title: string;
	description: string;
	timestamp: string;
	isRead: boolean;
	requiresAction: boolean;
	relatedEntities: string[];
	sourceData: any;
}

export interface ERPIntegration {
	id: string;
	name: string;
	type: 'ERP' | 'CRM';
	endpoint: string;
	isEnabled: boolean;
	lastSync: string;
	config: {
		apiKey?: string;
		webhookUrl?: string;
		syncFrequency: 'hourly' | 'daily' | 'weekly';
	};
}

export interface SuspiciousEntity {
	id: string;
	name: string;
	type: 'port' | 'person' | 'broker' | 'handler' | 'organization';
	riskLevel: 'low' | 'medium' | 'high' | 'critical';
	flaggedReasons: string[];
	sourceAgency: string;
	dateAdded: string;
	lastUpdated: string;
	location?: {
		country: string;
		region: string;
		coordinates?: { lat: number; lng: number };
	};
	associatedEntities: string[];
	osintSources: string[];
	isActive: boolean;
	quarterlyUpdate: string; // Q1-2024, Q2-2024, etc.
}

export interface OSINTSource {
	id: string;
	name: string;
	type: 'government' | 'commercial' | 'opensource' | 'partner';
	lastUpdate: string;
	reliability: 'A' | 'B' | 'C' | 'D'; // Intelligence reliability scale
	dataPoints: number;
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

export const mockWatchlistEntries: WatchlistEntry[] = [
	{
		id: 'w1',
		entityId: '2',
		entityName: 'ABC Corporation',
		entityType: 'Business',
		monitoringType: 'realtime',
		alertPreferences: {
			ftoTcoActivity: true,
			newSanctions: true,
			networkChanges: true,
			portActivity: true,
		},
		createdDate: '2024-01-10',
		lastScanned: '2024-01-16',
		isActive: true,
		alertThreshold: 'medium',
	},
	{
		id: 'w2',
		entityId: '5',
		entityName: 'Michael Brown',
		entityType: 'Person',
		monitoringType: 'weekly',
		alertPreferences: {
			ftoTcoActivity: true,
			newSanctions: false,
			networkChanges: false,
			portActivity: false,
		},
		createdDate: '2024-01-08',
		lastScanned: '2024-01-15',
		isActive: true,
		alertThreshold: 'high',
	},
];

export const mockAlerts: Alert[] = [
	{
		id: 'a1',
		watchlistEntryId: 'w1',
		alertType: 'FTO_TCO_LINK',
		severity: 'critical',
		title: 'New FTO Association Detected',
		description:
			'ABC Corporation has been linked to a newly designated Foreign Terrorist Organization through shell company structures.',
		timestamp: '2024-01-16T10:30:00Z',
		isRead: false,
		requiresAction: true,
		relatedEntities: ['ABC Corporation', 'Shell Company XYZ'],
		sourceData: { sourceList: 'State Department FTO', confidence: 85 },
	},
	{
		id: 'a2',
		watchlistEntryId: 'w2',
		alertType: 'PORT_ACTIVITY',
		severity: 'high',
		title: 'High-Risk Port Activity',
		description:
			'Michael Brown associated entities detected conducting operations at Port of Buenaventura.',
		timestamp: '2024-01-15T14:22:00Z',
		isRead: false,
		requiresAction: false,
		relatedEntities: ['Michael Brown', 'Port of Buenaventura'],
		sourceData: {
			port: 'Buenaventura',
			activity: 'Commercial shipment',
		},
	},
	{
		id: 'a3',
		watchlistEntryId: 'w1',
		alertType: 'NETWORK_CHANGE',
		severity: 'medium',
		title: 'Network Structure Change',
		description:
			'ABC Corporation ownership structure has changed, new beneficial owners detected.',
		timestamp: '2024-01-14T09:15:00Z',
		isRead: true,
		requiresAction: false,
		relatedEntities: ['ABC Corporation'],
		sourceData: { changeType: 'Beneficial ownership', newEntities: 2 },
	},
];

export const mockSuspiciousEntities: SuspiciousEntity[] = [
	{
		id: 's1',
		name: 'Port of Buenaventura',
		type: 'port',
		riskLevel: 'critical',
		flaggedReasons: [
			'Known narcotics trafficking hub',
			'Cartel control',
			'Corruption',
		],
		sourceAgency: 'DEA Intelligence Division',
		dateAdded: '2023-07-15',
		lastUpdated: '2024-01-01',
		location: {
			country: 'Colombia',
			region: 'Valle del Cauca',
			coordinates: { lat: 3.8801, lng: -77.0492 },
		},
		associatedEntities: ['Los Chapitos', 'Gulf Cartel'],
		osintSources: ['DEA EPIC', 'Colombian Navy Intelligence'],
		isActive: true,
		quarterlyUpdate: 'Q1-2024',
	},
	{
		id: 's2',
		name: 'Carlos Rodriguez Mendez',
		type: 'broker',
		riskLevel: 'high',
		flaggedReasons: [
			'Money laundering facilitator',
			'Bulk cash smuggling',
		],
		sourceAgency: 'FinCEN',
		dateAdded: '2023-09-22',
		lastUpdated: '2024-01-01',
		location: {
			country: 'Mexico',
			region: 'Sinaloa',
		},
		associatedEntities: ['Sinaloa Cartel', 'Fentanyl Network Alpha'],
		osintSources: ['FinCEN SAR Database', 'OFAC Investigations'],
		isActive: true,
		quarterlyUpdate: 'Q1-2024',
	},
	{
		id: 's3',
		name: 'Maritime Logistics Inc',
		type: 'organization',
		riskLevel: 'medium',
		flaggedReasons: [
			'Shell company patterns',
			'Unusual shipping routes',
		],
		sourceAgency: 'CBP Trade Intelligence',
		dateAdded: '2023-11-10',
		lastUpdated: '2024-01-01',
		location: {
			country: 'Panama',
			region: 'Panama City',
		},
		associatedEntities: ['Port of Colon', 'Various shell companies'],
		osintSources: ['CBP ACAS', 'Panama Ship Registry'],
		isActive: true,
		quarterlyUpdate: 'Q1-2024',
	},
];

export const mockERPIntegrations: ERPIntegration[] = [
	{
		id: 'erp1',
		name: 'SAP ERP Central Component',
		type: 'ERP',
		endpoint: 'https://api.sap.example.com/webhook',
		isEnabled: false,
		lastSync: '2024-01-15T00:00:00Z',
		config: {
			apiKey: '***CONFIGURED***',
			webhookUrl: 'https://sanctionwatch.com/webhook/sap',
			syncFrequency: 'daily',
		},
	},
	{
		id: 'crm1',
		name: 'Salesforce CRM',
		type: 'CRM',
		endpoint: 'https://api.salesforce.example.com/webhook',
		isEnabled: false,
		lastSync: 'Never',
		config: {
			webhookUrl: 'https://sanctionwatch.com/webhook/salesforce',
			syncFrequency: 'hourly',
		},
	},
];

export const mockOSINTSources: OSINTSource[] = [
	{
		id: 'osint1',
		name: 'DEA EPIC Database',
		type: 'government',
		lastUpdate: '2024-01-16',
		reliability: 'A',
		dataPoints: 15420,
	},
	{
		id: 'osint2',
		name: 'FinCEN SAR Database',
		type: 'government',
		lastUpdate: '2024-01-15',
		reliability: 'A',
		dataPoints: 8932,
	},
	{
		id: 'osint3',
		name: 'InSight Crime Intelligence',
		type: 'opensource',
		lastUpdate: '2024-01-14',
		reliability: 'B',
		dataPoints: 2341,
	},
	{
		id: 'osint4',
		name: 'Partner Agency Intelligence',
		type: 'partner',
		lastUpdate: '2024-01-12',
		reliability: 'B',
		dataPoints: 987,
	},
];
