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
	sourceName: string;
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
		sourceName: 'US State Department FTO List',
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
		sourceName: 'DEA EPIC Database',
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
		sourceName: 'Enhanced Due Diligence Database',
		sourceData: { changeType: 'Beneficial ownership', newEntities: 2 },
	},
	{
		id: 'a4',
		watchlistEntryId: 'w1',
		alertType: 'NEW_SANCTIONS',
		severity: 'critical',
		title: 'New OFAC SDN Designation',
		description:
			'Entity has been added to OFAC Specially Designated Nationals list for involvement in narcotics trafficking.',
		timestamp: '2024-01-16T08:45:00Z',
		isRead: false,
		requiresAction: true,
		relatedEntities: ['Cartel Front Company LLC'],
		sourceName: 'OFAC SDN List',
		sourceData: { designation: 'SDN', sanctions_program: 'NARCOTICS' },
	},
	{
		id: 'a5',
		watchlistEntryId: 'w2',
		alertType: 'FTO_TCO_LINK',
		severity: 'high',
		title: 'UN Security Council Sanctions Match',
		description:
			'Associated entity appears on UN Security Council Sanctions list under Resolution 1267.',
		timestamp: '2024-01-15T16:20:00Z',
		isRead: false,
		requiresAction: true,
		relatedEntities: ['International Holdings Corp'],
		sourceName: 'UN Sanctions Committee',
		sourceData: { resolution: '1267', committee: 'Security Council' },
	},
	{
		id: 'a6',
		watchlistEntryId: 'w1',
		alertType: 'NETWORK_CHANGE',
		severity: 'high',
		title: 'Known Cartel Front Company Connection',
		description:
			'Entity has established business relationships with known cartel front companies identified by DEA intelligence.',
		timestamp: '2024-01-14T11:30:00Z',
		isRead: true,
		requiresAction: false,
		relatedEntities: [
			'Los Chapitos Organization',
			'Gulf Cartel Network',
		],
		sourceName: 'DEA Intelligence Division',
		sourceData: {
			cartel_affiliation: 'Los Chapitos',
			threat_level: 'HIGH',
		},
	},
];

// Function to generate realistic suspicious entities data
const generateSuspiciousEntities = (): SuspiciousEntity[] => {
	const entities: SuspiciousEntity[] = [];

	// Base data for generating realistic entries
	const portNames = [
		'Port of Buenaventura',
		'Port of Manzanillo',
		'Port of Veracruz',
		'Port of Antwerp',
		'Port of Santos',
		'Port of Hamburg',
		'Port of Callao',
		'Port of Guayaquil',
		'Port of Cartagena',
		'Port of Puerto Cabello',
		'Port of Colon',
		'Port of Kingston',
		'Port of Acajutla',
		'Port of Corinto',
		'Port of Puerto Cortes',
		'Port of Santo Tomas',
		'Port of La Ceiba',
		'Port of Puerto Barrios',
		'Port of Caucedo',
		'Port of Haina',
		'Port of San Juan',
		'Port of Ponce',
		'Port of Fort de France',
		'Port of Bridgetown',
		'Port of Georgetown',
		'Port of Paramaribo',
		'Port of Cayenne',
		'Port of Belém',
		'Port of Fortaleza',
		'Port of Recife',
		'Port of Salvador',
		'Port of Vitória',
		'Port of Rio de Janeiro',
		'Port of Itaguaí',
		'Port of Paranaguá',
		'Port of Itajaí',
		'Port of Rio Grande',
		'Port of Montevideo',
		'Port of Buenos Aires',
		'Port of Rosario',
		'Port of Bahía Blanca',
		'Port of Ushuaia',
		'Port of Valparaíso',
		'Port of San Antonio',
		'Port of Arica',
		'Port of Iquique',
		'Port of Antofagasta',
		'Port of Coquimbo',
	];

	const firstNames = [
		'Carlos',
		'Miguel',
		'José',
		'Luis',
		'Juan',
		'Antonio',
		'Francisco',
		'Rafael',
		'Eduardo',
		'Ricardo',
		'Fernando',
		'Pablo',
		'Diego',
		'Alejandro',
		'Manuel',
		'Gabriel',
		'Andrés',
		'Javier',
		'Roberto',
		'Daniel',
		'Sergio',
		'Marco',
		'Alberto',
		'Raúl',
		'Enrique',
		'Víctor',
		'Óscar',
		'César',
		'Rubén',
		'Arturo',
		'Héctor',
		'Ramón',
		'Jorge',
		'Pedro',
		'Gonzalo',
		'Iván',
		'Emilio',
		'Lorenzo',
		'Mauricio',
		'Salvador',
		'Julio',
		'Tomás',
		'Agustín',
		'Ernesto',
		'Guillermo',
		'Rodrigo',
		'Patricio',
		'Ignacio',
		'Sebastián',
		'Nicolás',
	];

	const lastNames = [
		'García',
		'Rodríguez',
		'González',
		'Fernández',
		'López',
		'Martínez',
		'Sánchez',
		'Pérez',
		'Gómez',
		'Martín',
		'Jiménez',
		'Ruiz',
		'Hernández',
		'Díaz',
		'Moreno',
		'Muñoz',
		'Álvarez',
		'Romero',
		'Alonso',
		'Gutiérrez',
		'Navarro',
		'Torres',
		'Domínguez',
		'Vázquez',
		'Ramos',
		'Gil',
		'Ramírez',
		'Serrano',
		'Blanco',
		'Suárez',
		'Molina',
		'Morales',
		'Ortega',
		'Delgado',
		'Castro',
		'Ortiz',
		'Rubio',
		'Marín',
		'Sanz',
		'Iglesias',
		'Medina',
		'Garrido',
		'Cortés',
		'Castillo',
		'Santos',
		'Lozano',
		'Guerrero',
		'Cano',
		'Prieto',
		'Méndez',
	];

	const organizations = [
		'Maritime Logistics',
		'Coastal Shipping',
		'International Trading',
		'Global Express',
		'Pacific Transport',
		'Atlantic Holdings',
		'Caribbean Freight',
		'Andean Logistics',
		'Continental Trading',
		'Oceanic Services',
		'Strategic Holdings',
		'Prime Ventures',
		'Elite Trading',
		'Sovereign Holdings',
		'Imperial Logistics',
		'Royal Trading',
		'Supreme Services',
		'Premier Holdings',
		'Executive Trading',
		'Corporate Solutions',
		'Business Ventures',
		'Commercial Holdings',
		'Industrial Trading',
		'Financial Services',
		'Investment Holdings',
		'Capital Ventures',
		'Equity Trading',
		'Asset Management',
		'Wealth Holdings',
		'Fortune Trading',
		'Success Ventures',
		'Prosperity Holdings',
	];

	const orgSuffixes = [
		'Inc',
		'LLC',
		'Corp',
		'Ltd',
		'SA',
		'SRL',
		'GmbH',
		'BV',
		'AG',
	];

	const countries = [
		'Colombia',
		'Mexico',
		'Panama',
		'Venezuela',
		'Brazil',
		'Argentina',
		'Chile',
		'Peru',
		'Ecuador',
		'Bolivia',
		'Paraguay',
		'Uruguay',
		'Costa Rica',
		'Guatemala',
		'Honduras',
		'El Salvador',
		'Nicaragua',
		'Dominican Republic',
		'Haiti',
		'Jamaica',
		'Trinidad and Tobago',
		'Barbados',
		'Guyana',
		'Suriname',
		'French Guiana',
		'Spain',
		'Portugal',
		'Netherlands',
		'Belgium',
		'Germany',
		'Italy',
		'France',
		'Switzerland',
		'Austria',
		'United States',
		'Canada',
		'United Kingdom',
		'Ireland',
		'Cyprus',
		'Malta',
		'Luxembourg',
		'Liechtenstein',
	];

	const regions: Record<string, string[]> = {
		Colombia: [
			'Valle del Cauca',
			'Antioquia',
			'Atlántico',
			'Magdalena',
			'Bolívar',
		],
		Mexico: [
			'Sinaloa',
			'Sonora',
			'Baja California',
			'Veracruz',
			'Tamaulipas',
		],
		Panama: [
			'Panama City',
			'Colon',
			'Chiriquí',
			'Herrera',
			'Los Santos',
		],
		Venezuela: ['Zulia', 'Miranda', 'Carabobo', 'Aragua', 'Anzoátegui'],
		Brazil: [
			'São Paulo',
			'Rio de Janeiro',
			'Bahia',
			'Ceará',
			'Pernambuco',
		],
		Argentina: [
			'Buenos Aires',
			'Córdoba',
			'Santa Fe',
			'Mendoza',
			'Tucumán',
		],
		Chile: [
			'Santiago',
			'Valparaíso',
			'Antofagasta',
			'Tarapacá',
			'Atacama',
		],
		Peru: ['Lima', 'Callao', 'Arequipa', 'Trujillo', 'Chiclayo'],
	};

	const sourceAgencies = [
		'DEA Intelligence Division',
		'FinCEN',
		'CBP Trade Intelligence',
		'OFAC Investigations',
		'FBI Financial Crimes',
		'ICE HSI',
		'US Treasury FINCEN',
		'ATF Intelligence',
		'Colombian CNP Intelligence',
		'Mexican FGR',
		'Brazilian PF Intelligence',
		'Argentine AFI',
		'Chilean PDI',
		'Peruvian DIRANDRO',
		'Panamanian AML Unit',
		'Venezuelan CICPC',
		'Ecuadorian UAFE',
		'Costa Rican ICD',
		'Guatemalan INTECAP',
		'Honduran ATIC',
		'Salvadoran FGR',
		'Nicaraguan Police',
		'Dominican DNCD',
		'Jamaican CTOC',
		'Trinidad FIU',
		'Barbados FIU',
		'Guyanese SOCU',
		'Surinamese Police',
		'French TRACFIN',
		'Spanish SEPBLAC',
		'Portuguese UIF',
		'Dutch FIU',
		'Belgian CTIF',
		'German BKA',
		'Italian DIA',
		'Swiss MROS',
		'Austrian BMI',
		'Canadian FINTRAC',
		'UK NCA',
		'Irish GBFI',
		'Cypriot MOKAS',
	];

	const flaggedReasons = [
		'Known narcotics trafficking hub',
		'Cartel control',
		'Corruption',
		'Money laundering facilitator',
		'Bulk cash smuggling',
		'Shell company patterns',
		'Unusual shipping routes',
		'Trade-based money laundering',
		'Invoice manipulation',
		'High-risk correspondent banking',
		'Sanctions evasion',
		'Front company operations',
		'Wire transfer anomalies',
		'Cash structuring',
		'Cross-border smuggling',
		'Document fraud',
		'Identity theft',
		'Beneficial ownership concealment',
		'Layering transactions',
		'Integration schemes',
		'Hawala operations',
		'Underground banking',
		'Cryptocurrency laundering',
		'Trade misinvoicing',
		'Over/under invoicing',
		'Multiple invoicing',
		'Phantom shipments',
		'Carousel trading',
		'Round-tripping',
		'Back-to-back loans',
		'Loan-back schemes',
		'Real estate laundering',
		'Casino money laundering',
		'Precious metals trading',
		'Art and antiquities',
		'Insurance fraud',
		'Securities fraud',
		'Investment fraud',
		'Ponzi schemes',
		'Advance fee fraud',
		'Business email compromise',
		'Cyber-enabled fraud',
		'Terrorist financing',
		'PEP associations',
		'Sanctions violations',
		'Export control violations',
		'Arms trafficking',
		'Human trafficking',
		'Wildlife trafficking',
		'Intellectual property theft',
		'Counterfeiting',
		'Tax evasion',
	];

	const osintSources = [
		'DEA EPIC',
		'FinCEN SAR Database',
		'OFAC Investigations',
		'CBP ACAS',
		'FBI FinCrime Database',
		'ICE TECS',
		'US Treasury Database',
		'ATF eTrace',
		'Colombian Navy Intelligence',
		'Mexican Navy Intel',
		'Brazilian PF Database',
		'Argentine Navy Intel',
		'Chilean Navy Database',
		'Peruvian DIRANDRO Intel',
		'Panamanian Ship Registry',
		'Venezuelan Port Authority',
		'Ecuadorian Customs',
		'Costa Rican Security',
		'Guatemalan Port Authority',
		'Honduran Customs',
		'Salvadoran Police Intel',
		'Nicaraguan Customs',
		'Dominican Port Authority',
		'Jamaican Customs',
		'Trinidad Coast Guard',
		'Barbados Police',
		'Guyanese Customs',
		'Surinamese Police Intel',
		'French Customs',
		'Spanish Guardia Civil',
		'Portuguese Maritime Police',
		'Dutch Coast Guard',
		'Belgian Federal Police',
		'German BKA Database',
		'Italian Guardia di Finanza',
		'Swiss Federal Police',
		'Austrian Police',
		'Canadian RCMP',
		'UK Border Force',
		'Irish Customs',
		'Cypriot Police',
		'Maltese Police',
		'Luxembourg Police',
	];

	const quarters = [
		'Q1-2024',
		'Q4-2023',
		'Q3-2023',
		'Q2-2023',
		'Q1-2023',
		'Q4-2022',
	];

	const entityTypes: (
		| 'port'
		| 'person'
		| 'broker'
		| 'handler'
		| 'organization'
	)[] = ['port', 'person', 'broker', 'handler', 'organization'];

	// Generate 2,847 entities to show realistic scale
	for (let i = 1; i <= 2847; i++) {
		const entityType =
			entityTypes[Math.floor(Math.random() * entityTypes.length)];
		const country =
			countries[Math.floor(Math.random() * countries.length)];
		const region = regions[country]
			? regions[country][
					Math.floor(Math.random() * regions[country].length)
			  ]
			: country;

		let name: string;
		if (entityType === 'port') {
			name = portNames[Math.floor(Math.random() * portNames.length)];
		} else if (
			entityType === 'person' ||
			entityType === 'broker' ||
			entityType === 'handler'
		) {
			const firstName =
				firstNames[Math.floor(Math.random() * firstNames.length)];
			const lastName1 =
				lastNames[Math.floor(Math.random() * lastNames.length)];
			const lastName2 =
				Math.random() > 0.7
					? ` ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
					: '';
			name = `${firstName} ${lastName1}${lastName2}`;
		} else {
			const orgName =
				organizations[Math.floor(Math.random() * organizations.length)];
			const suffix =
				orgSuffixes[Math.floor(Math.random() * orgSuffixes.length)];
			name = `${orgName} ${suffix}`;
		}

		// Risk level distribution: 15% critical, 25% high, 40% medium, 20% low
		let riskLevel: 'low' | 'medium' | 'high' | 'critical';
		const riskRand = Math.random();
		if (riskRand < 0.15) riskLevel = 'critical';
		else if (riskRand < 0.4) riskLevel = 'high';
		else if (riskRand < 0.8) riskLevel = 'medium';
		else riskLevel = 'low';

		// Generate 1-4 flagged reasons
		const reasonCount = Math.floor(Math.random() * 4) + 1;
		const shuffledReasons = [...flaggedReasons].sort(
			() => Math.random() - 0.5
		);
		const selectedReasons = shuffledReasons.slice(0, reasonCount);

		// Generate 1-3 associated entities
		const associatedCount = Math.floor(Math.random() * 3) + 1;
		const associatedEntities: string[] = [];
		for (let j = 0; j < associatedCount; j++) {
			if (Math.random() > 0.5) {
				const orgName =
					organizations[Math.floor(Math.random() * organizations.length)];
				const suffix =
					orgSuffixes[Math.floor(Math.random() * orgSuffixes.length)];
				associatedEntities.push(`${orgName} ${suffix}`);
			} else {
				const firstName =
					firstNames[Math.floor(Math.random() * firstNames.length)];
				const lastName =
					lastNames[Math.floor(Math.random() * lastNames.length)];
				associatedEntities.push(`${firstName} ${lastName}`);
			}
		}

		// Generate 1-3 OSINT sources
		const sourceCount = Math.floor(Math.random() * 3) + 1;
		const shuffledSources = [...osintSources].sort(
			() => Math.random() - 0.5
		);
		const selectedSources = shuffledSources.slice(0, sourceCount);

		// Generate dates
		const addedDate = new Date(
			2023,
			Math.floor(Math.random() * 12),
			Math.floor(Math.random() * 28) + 1
		);
		const updatedDate = new Date(
			addedDate.getTime() +
				Math.random() * (Date.now() - addedDate.getTime())
		);

		const entity: SuspiciousEntity = {
			id: `s${i}`,
			name,
			type: entityType,
			riskLevel,
			flaggedReasons: selectedReasons,
			sourceAgency:
				sourceAgencies[Math.floor(Math.random() * sourceAgencies.length)],
			dateAdded: addedDate.toISOString().split('T')[0],
			lastUpdated: updatedDate.toISOString().split('T')[0],
			location: {
				country,
				region,
				...(entityType === 'port' &&
					Math.random() > 0.5 && {
						coordinates: {
							lat: (Math.random() - 0.5) * 180,
							lng: (Math.random() - 0.5) * 360,
						},
					}),
			},
			associatedEntities,
			osintSources: selectedSources,
			isActive: Math.random() > 0.1, // 90% active
			quarterlyUpdate:
				quarters[Math.floor(Math.random() * quarters.length)],
		};

		entities.push(entity);
	}

	return entities;
};

export const mockSuspiciousEntities: SuspiciousEntity[] =
	generateSuspiciousEntities();

export interface FTOLocation {
	id: string;
	name: string;
	type: 'country' | 'organization' | 'regional_group';
	coordinates: { lat: number; lng: number };
	riskLevel: 'low' | 'medium' | 'high' | 'critical';
	description: string;
	sourceList: string;
	lastUpdated: string;
	relatedEntities: string[];
}

export const mockFTOLocations: FTOLocation[] = [
	// High-risk countries with FTO presence
	{
		id: 'fto-1',
		name: 'Afghanistan',
		type: 'country',
		coordinates: { lat: 33.93911, lng: 67.709953 },
		riskLevel: 'critical',
		description: 'Known Taliban and Al-Qaeda operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-15',
		relatedEntities: ['Taliban', 'Al-Qaeda', 'ISIS-K'],
	},
	{
		id: 'fto-2',
		name: 'Syria',
		type: 'country',
		coordinates: { lat: 34.802075, lng: 38.996815 },
		riskLevel: 'critical',
		description: 'ISIS and Al-Nusra Front operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-12',
		relatedEntities: ['ISIS', 'Al-Nusra Front', 'Hayat Tahrir al-Sham'],
	},
	{
		id: 'fto-3',
		name: 'Iraq',
		type: 'country',
		coordinates: { lat: 33.223191, lng: 43.679291 },
		riskLevel: 'high',
		description: 'ISIS remnants and militia activities',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-10',
		relatedEntities: ['ISIS', 'Popular Mobilization Forces'],
	},
	{
		id: 'fto-4',
		name: 'Lebanon',
		type: 'country',
		coordinates: { lat: 33.854721, lng: 35.862285 },
		riskLevel: 'high',
		description: 'Hezbollah stronghold and operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-08',
		relatedEntities: ['Hezbollah', 'Palestinian Islamic Jihad'],
	},
	{
		id: 'fto-5',
		name: 'Gaza Strip',
		type: 'regional_group',
		coordinates: { lat: 31.354676, lng: 34.308825 },
		riskLevel: 'critical',
		description: 'Hamas territorial control and operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-16',
		relatedEntities: ['Hamas', 'Palestinian Islamic Jihad'],
	},
	{
		id: 'fto-6',
		name: 'Iran',
		type: 'country',
		coordinates: { lat: 32.427908, lng: 53.688046 },
		riskLevel: 'critical',
		description: 'State sponsor of terrorism, IRGC operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-14',
		relatedEntities: ['IRGC', 'Quds Force', 'Hezbollah'],
	},
	{
		id: 'fto-7',
		name: 'Yemen',
		type: 'country',
		coordinates: { lat: 15.552727, lng: 48.516388 },
		riskLevel: 'high',
		description: 'Al-Qaeda in Arabian Peninsula operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-11',
		relatedEntities: ['AQAP', 'Houthis', 'Ansar Allah'],
	},
	{
		id: 'fto-8',
		name: 'Somalia',
		type: 'country',
		coordinates: { lat: 5.152149, lng: 46.199616 },
		riskLevel: 'high',
		description: 'Al-Shabaab territorial control',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-09',
		relatedEntities: ['Al-Shabaab', 'Al-Qaeda East Africa'],
	},
	{
		id: 'fto-9',
		name: 'Nigeria',
		type: 'country',
		coordinates: { lat: 9.081999, lng: 8.675277 },
		riskLevel: 'high',
		description: 'Boko Haram and ISWAP operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-07',
		relatedEntities: ['Boko Haram', 'ISWAP', 'Ansaru'],
	},
	{
		id: 'fto-10',
		name: 'Mali',
		type: 'country',
		coordinates: { lat: 17.570692, lng: -3.996166 },
		riskLevel: 'medium',
		description: 'JNIM and ISIS-GS activities',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-06',
		relatedEntities: ['JNIM', 'ISIS-GS', 'AQIM'],
	},
	{
		id: 'fto-11',
		name: 'Pakistan',
		type: 'country',
		coordinates: { lat: 30.375321, lng: 69.345116 },
		riskLevel: 'medium',
		description: 'Taliban and terrorist group presence',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-05',
		relatedEntities: ['TTP', 'Lashkar-e-Taiba', 'Jaish-e-Mohammed'],
	},
	{
		id: 'fto-12',
		name: 'Libya',
		type: 'country',
		coordinates: { lat: 26.3351, lng: 17.228331 },
		riskLevel: 'medium',
		description: 'ISIS-Libya and militia activities',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-04',
		relatedEntities: ['ISIS-Libya', 'Various militias'],
	},
	{
		id: 'fto-13',
		name: 'Philippines',
		type: 'country',
		coordinates: { lat: 12.879721, lng: 121.774017 },
		riskLevel: 'medium',
		description: 'Abu Sayyaf Group operations',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-03',
		relatedEntities: ['Abu Sayyaf Group', 'Maute Group', 'BIFF'],
	},
	// Organizations with specific locations
	{
		id: 'fto-org-1',
		name: 'Hamas HQ',
		type: 'organization',
		coordinates: { lat: 31.5017, lng: 34.4668 },
		riskLevel: 'critical',
		description: 'Hamas political and military headquarters',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-16',
		relatedEntities: ['Hamas', 'Izz al-Din al-Qassam Brigades'],
	},
	{
		id: 'fto-org-2',
		name: 'Hezbollah Southern Command',
		type: 'organization',
		coordinates: { lat: 33.2775, lng: 35.2048 },
		riskLevel: 'critical',
		description: 'Hezbollah military operations center',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-14',
		relatedEntities: ['Hezbollah', 'Islamic Resistance'],
	},
	{
		id: 'fto-org-3',
		name: 'IRGC Quds Force Base',
		type: 'organization',
		coordinates: { lat: 35.6892, lng: 51.389 },
		riskLevel: 'critical',
		description: 'IRGC Quds Force headquarters',
		sourceList: 'US State Department FTO List',
		lastUpdated: '2024-01-13',
		relatedEntities: ['IRGC', 'Quds Force'],
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
