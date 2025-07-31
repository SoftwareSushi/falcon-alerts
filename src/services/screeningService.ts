import {
	type FlaggedRecord,
	type SuspiciousEntity,
	type PreviousCheck,
	mockFlaggedRecords,
	mockSuspiciousEntities,
	mockPreviousChecks,
} from '../data/mockData';

interface EntityData {
	name: string;
	type: 'Person' | 'Business';
	address?: {
		country: string;
		region?: string;
		city?: string;
	};
	associates?: string[];
	businessActivities?: string[];
	ports?: string[];
}

interface ScreeningResult {
	entityId: string;
	entityName: string;
	traditionalResults: FlaggedRecord[];
	registryMatches: SuspiciousEntity[];
	riskScore: number;
	overallStatus: 'Clean' | 'Flagged' | 'High Risk';
	recommendations: string[];
}

export class ScreeningService {
	private static instance: ScreeningService;

	static getInstance(): ScreeningService {
		if (!ScreeningService.instance) {
			ScreeningService.instance = new ScreeningService();
		}
		return ScreeningService.instance;
	}

	/**
	 * Enhanced screening that combines traditional screening with registry lookup
	 */
	async enhancedScreening(
		entityData: EntityData
	): Promise<ScreeningResult> {
		// Simulate processing time
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const traditionalResults = await this.traditionalScreening(
			entityData
		);
		const registryMatches = await this.checkSuspiciousRegistry(
			entityData
		);

		// Calculate risk score based on multiple factors
		const riskScore = this.calculateRiskScore(
			entityData,
			traditionalResults,
			registryMatches
		);

		// Determine overall status
		const overallStatus = this.determineStatus(
			traditionalResults,
			registryMatches,
			riskScore
		);

		// Generate recommendations
		const recommendations = this.generateRecommendations(
			traditionalResults,
			registryMatches,
			riskScore
		);

		return {
			entityId: `ent-${Date.now()}`,
			entityName: entityData.name,
			traditionalResults,
			registryMatches,
			riskScore,
			overallStatus,
			recommendations,
		};
	}

	/**
	 * Traditional sanctions and watchlist screening
	 */
	private async traditionalScreening(
		entityData: EntityData
	): Promise<FlaggedRecord[]> {
		const matches: FlaggedRecord[] = [];

		// Simulate name matching
		if (this.nameMatches(entityData.name)) {
			matches.push(...this.getRandomFlaggedRecords(1, 2));
		}

		// Simulate geographic risk screening
		if (
			entityData.address &&
			this.isHighRiskLocation(entityData.address)
		) {
			matches.push(this.createGeographicRiskRecord(entityData.address));
		}

		// Simulate business activity screening
		if (
			entityData.businessActivities &&
			this.hasRiskyBusinessActivity(entityData.businessActivities)
		) {
			matches.push(this.createBusinessActivityRecord(entityData));
		}

		return matches;
	}

	/**
	 * Check entity against suspicious port & person registry
	 */
	async checkSuspiciousRegistry(
		entityData: EntityData
	): Promise<SuspiciousEntity[]> {
		const matches: SuspiciousEntity[] = [];

		// Check for direct name matches
		const directMatches = mockSuspiciousEntities.filter((entity) =>
			this.fuzzyMatch(entity.name, entityData.name)
		);
		matches.push(...directMatches);

		// Check for port activity matches
		if (entityData.ports) {
			const portMatches = mockSuspiciousEntities.filter(
				(entity) =>
					entity.type === 'port' &&
					entityData.ports?.some((port) =>
						this.fuzzyMatch(entity.name, port)
					)
			);
			matches.push(...portMatches);
		}

		// Check for associate matches
		if (entityData.associates) {
			const associateMatches = mockSuspiciousEntities.filter((entity) =>
				entityData.associates?.some((associate) =>
					entity.associatedEntities.some((assoc) =>
						this.fuzzyMatch(assoc, associate)
					)
				)
			);
			matches.push(...associateMatches);
		}

		// Check location-based matches
		if (entityData.address) {
			const locationMatches = mockSuspiciousEntities.filter(
				(entity) =>
					entity.location?.country === entityData.address?.country ||
					entity.location?.region === entityData.address?.region
			);
			// Only include high-risk location matches
			matches.push(
				...locationMatches.filter(
					(entity) => entity.riskLevel === 'critical'
				)
			);
		}

		// Remove duplicates
		return Array.from(new Set(matches));
	}

	/**
	 * Check for activity at flagged ports
	 */
	async checkPortActivity(
		entityData: EntityData
	): Promise<SuspiciousEntity[]> {
		if (!entityData.ports || entityData.ports.length === 0) {
			return [];
		}

		const flaggedPorts = mockSuspiciousEntities.filter(
			(entity) => entity.type === 'port'
		);

		const matches = flaggedPorts.filter((port) =>
			entityData.ports?.some((entityPort) =>
				this.fuzzyMatch(port.name, entityPort)
			)
		);

		return matches;
	}

	/**
	 * Calculate overall risk score (0-100)
	 */
	private calculateRiskScore(
		entityData: EntityData,
		traditionalResults: FlaggedRecord[],
		registryMatches: SuspiciousEntity[]
	): number {
		let score = 0;

		// Traditional screening results
		traditionalResults.forEach((result) => {
			switch (result.riskLevel) {
				case 'High':
					score += 30;
					break;
				case 'Medium':
					score += 15;
					break;
				case 'Low':
					score += 5;
					break;
			}
		});

		// Registry matches
		registryMatches.forEach((match) => {
			switch (match.riskLevel) {
				case 'critical':
					score += 40;
					break;
				case 'high':
					score += 25;
					break;
				case 'medium':
					score += 10;
					break;
				case 'low':
					score += 3;
					break;
			}
		});

		// Geographic risk
		if (
			entityData.address &&
			this.isHighRiskLocation(entityData.address)
		) {
			score += 15;
		}

		// Business activity risk
		if (
			entityData.businessActivities &&
			this.hasRiskyBusinessActivity(entityData.businessActivities)
		) {
			score += 10;
		}

		// Cap at 100
		return Math.min(score, 100);
	}

	/**
	 * Determine overall screening status
	 */
	private determineStatus(
		traditionalResults: FlaggedRecord[],
		registryMatches: SuspiciousEntity[],
		riskScore: number
	): 'Clean' | 'Flagged' | 'High Risk' {
		// High risk conditions
		if (
			riskScore >= 70 ||
			traditionalResults.some((r) => r.riskLevel === 'High') ||
			registryMatches.some((m) => m.riskLevel === 'critical')
		) {
			return 'High Risk';
		}

		// Flagged conditions
		if (
			riskScore >= 30 ||
			traditionalResults.length > 0 ||
			registryMatches.length > 0
		) {
			return 'Flagged';
		}

		return 'Clean';
	}

	/**
	 * Generate recommendations based on screening results
	 */
	private generateRecommendations(
		traditionalResults: FlaggedRecord[],
		registryMatches: SuspiciousEntity[],
		riskScore: number
	): string[] {
		const recommendations: string[] = [];

		if (riskScore >= 70) {
			recommendations.push(
				'Immediate escalation to compliance team required'
			);
			recommendations.push(
				'Comprehensive enhanced due diligence recommended'
			);
		}

		if (traditionalResults.some((r) => r.category === 'Sanctions')) {
			recommendations.push(
				'Verify sanctions status with OFAC/UN databases'
			);
			recommendations.push('Consider transaction blocking procedures');
		}

		if (registryMatches.some((m) => m.type === 'port')) {
			recommendations.push('Review all port-related activities');
			recommendations.push(
				'Enhanced monitoring of shipping transactions'
			);
		}

		if (
			registryMatches.some(
				(m) => m.type === 'broker' || m.type === 'handler'
			)
		) {
			recommendations.push(
				'Investigation of financial intermediaries required'
			);
		}

		if (traditionalResults.some((r) => r.category === 'Cartel')) {
			recommendations.push('Report to law enforcement if required');
			recommendations.push('Consider ongoing monitoring');
		}

		if (recommendations.length === 0) {
			recommendations.push('Standard monitoring protocols sufficient');
		}

		return recommendations;
	}

	/**
	 * Helper methods
	 */
	private nameMatches(name: string): boolean {
		// Simulate name matching algorithm
		const riskNames = [
			'Rodriguez',
			'Martinez',
			'Gonzalez',
			'Brown',
			'Smith',
		];
		return riskNames.some((riskName) =>
			name.toLowerCase().includes(riskName.toLowerCase())
		);
	}

	private fuzzyMatch(
		str1: string,
		str2: string,
		threshold = 0.8
	): boolean {
		const similarity = this.levenshteinSimilarity(
			str1.toLowerCase(),
			str2.toLowerCase()
		);
		return similarity >= threshold;
	}

	private levenshteinSimilarity(str1: string, str2: string): number {
		const matrix = Array(str2.length + 1)
			.fill(null)
			.map(() => Array(str1.length + 1).fill(null));

		for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
		for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

		for (let j = 1; j <= str2.length; j++) {
			for (let i = 1; i <= str1.length; i++) {
				const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
				matrix[j][i] = Math.min(
					matrix[j][i - 1] + 1,
					matrix[j - 1][i] + 1,
					matrix[j - 1][i - 1] + substitutionCost
				);
			}
		}

		const maxLength = Math.max(str1.length, str2.length);
		return maxLength === 0
			? 1
			: (maxLength - matrix[str2.length][str1.length]) / maxLength;
	}

	private isHighRiskLocation(address: {
		country: string;
		region?: string;
	}): boolean {
		const highRiskCountries = [
			'Colombia',
			'Mexico',
			'Venezuela',
			'Afghanistan',
		];
		const highRiskRegions = ['Sinaloa', 'Valle del Cauca', 'Kandahar'];

		return (
			highRiskCountries.includes(address.country) ||
			(address.region && highRiskRegions.includes(address.region))
		);
	}

	private hasRiskyBusinessActivity(activities: string[]): boolean {
		const riskyActivities = [
			'money exchange',
			'precious metals',
			'transportation',
			'import/export',
			'cash intensive',
		];

		return activities.some((activity) =>
			riskyActivities.some((risky) =>
				activity.toLowerCase().includes(risky.toLowerCase())
			)
		);
	}

	private getRandomFlaggedRecords(
		min: number,
		max: number
	): FlaggedRecord[] {
		const count = Math.floor(Math.random() * (max - min + 1)) + min;
		const shuffled = [...mockFlaggedRecords].sort(
			() => 0.5 - Math.random()
		);
		return shuffled.slice(0, count);
	}

	private createGeographicRiskRecord(address: {
		country: string;
		region?: string;
	}): FlaggedRecord {
		return {
			id: `geo-${Date.now()}`,
			matchingCriteria: ['Geographic Location'],
			sourceName: 'Geographic Risk Intelligence',
			recordType: 'High-Risk Location',
			confidenceScore: 75,
			timestamp: new Date().toISOString(),
			details: `Entity operates in high-risk geographic area: ${
				address.country
			}${address.region ? `, ${address.region}` : ''}`,
			riskLevel: 'Medium',
			category: 'Geographic',
		};
	}

	private createBusinessActivityRecord(
		entityData: EntityData
	): FlaggedRecord {
		return {
			id: `biz-${Date.now()}`,
			matchingCriteria: ['Business Activity'],
			sourceName: 'Business Risk Analytics',
			recordType: 'High-Risk Business Activity',
			confidenceScore: 65,
			timestamp: new Date().toISOString(),
			details: `Entity engages in high-risk business activities: ${entityData.businessActivities?.join(
				', '
			)}`,
			riskLevel: 'Medium',
			category: 'ML_Pattern',
		};
	}

	/**
	 * Get screening statistics
	 */
	getScreeningStats() {
		const recentChecks = mockPreviousChecks.slice(-30); // Last 30 checks
		const flaggedCount = recentChecks.filter(
			(check) => check.status === 'Flagged'
		).length;
		const cleanCount = recentChecks.filter(
			(check) => check.status === 'Clean'
		).length;

		return {
			totalChecks: mockPreviousChecks.length,
			recentChecks: recentChecks.length,
			flaggedRate:
				recentChecks.length > 0
					? (flaggedCount / recentChecks.length) * 100
					: 0,
			cleanRate:
				recentChecks.length > 0
					? (cleanCount / recentChecks.length) * 100
					: 0,
			avgProcessingTime: '2.3 seconds', // Simulated
		};
	}
}
