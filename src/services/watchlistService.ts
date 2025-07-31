import {
	type WatchlistEntry,
	type Alert,
	mockWatchlistEntries,
	mockAlerts,
	mockPreviousChecks,
} from '../data/mockData';

export class WatchlistService {
	private static instance: WatchlistService;
	private watchlistEntries: WatchlistEntry[] = [
		...mockWatchlistEntries,
	];
	private alerts: Alert[] = [...mockAlerts];

	static getInstance(): WatchlistService {
		if (!WatchlistService.instance) {
			WatchlistService.instance = new WatchlistService();
		}
		return WatchlistService.instance;
	}

	/**
	 * Get all watchlist entries
	 */
	getWatchlistEntries(): WatchlistEntry[] {
		return this.watchlistEntries;
	}

	/**
	 * Add entity to watchlist
	 */
	addToWatchlist(entry: Omit<WatchlistEntry, 'id'>): WatchlistEntry {
		const newEntry: WatchlistEntry = {
			...entry,
			id: `w${Date.now()}`,
		};
		this.watchlistEntries.push(newEntry);
		return newEntry;
	}

	/**
	 * Remove entity from watchlist
	 */
	removeFromWatchlist(entryId: string): boolean {
		const initialLength = this.watchlistEntries.length;
		this.watchlistEntries = this.watchlistEntries.filter(
			(entry) => entry.id !== entryId
		);
		return this.watchlistEntries.length < initialLength;
	}

	/**
	 * Toggle watchlist entry active status
	 */
	toggleWatchlistEntry(entryId: string): boolean {
		const entry = this.watchlistEntries.find((e) => e.id === entryId);
		if (entry) {
			entry.isActive = !entry.isActive;
			return true;
		}
		return false;
	}

	/**
	 * Update watchlist entry settings
	 */
	updateWatchlistEntry(
		entryId: string,
		updates: Partial<WatchlistEntry>
	): boolean {
		const entryIndex = this.watchlistEntries.findIndex(
			(e) => e.id === entryId
		);
		if (entryIndex !== -1) {
			this.watchlistEntries[entryIndex] = {
				...this.watchlistEntries[entryIndex],
				...updates,
			};
			return true;
		}
		return false;
	}

	/**
	 * Scan watchlist entries for changes (simulated)
	 */
	async scanWatchlistEntries(): Promise<Alert[]> {
		const newAlerts: Alert[] = [];
		const currentTime = new Date().toISOString();

		for (const entry of this.watchlistEntries) {
			if (!entry.isActive) continue;

			// Simulate different types of alerts based on monitoring preferences
			if (entry.alertPreferences.ftoTcoActivity && Math.random() < 0.1) {
				newAlerts.push({
					id: `a${Date.now()}-${entry.id}`,
					watchlistEntryId: entry.id,
					alertType: 'FTO_TCO_LINK',
					severity: 'critical',
					title: `New FTO/TCO Activity: ${entry.entityName}`,
					description: `Potential terrorist organization activity detected for ${entry.entityName}.`,
					timestamp: currentTime,
					isRead: false,
					requiresAction: true,
					relatedEntities: [entry.entityName],
					sourceData: { confidence: 85, source: 'FTO Intelligence' },
				});
			}

			if (entry.alertPreferences.portActivity && Math.random() < 0.15) {
				newAlerts.push({
					id: `a${Date.now()}-${entry.id}-port`,
					watchlistEntryId: entry.id,
					alertType: 'PORT_ACTIVITY',
					severity: 'high',
					title: `Port Activity Alert: ${entry.entityName}`,
					description: `Suspicious port activity detected at high-risk locations.`,
					timestamp: currentTime,
					isRead: false,
					requiresAction: false,
					relatedEntities: [entry.entityName, 'Port of Buenaventura'],
					sourceData: { port: 'Buenaventura', activity: 'Commercial' },
				});
			}

			if (
				entry.alertPreferences.networkChanges &&
				Math.random() < 0.08
			) {
				newAlerts.push({
					id: `a${Date.now()}-${entry.id}-network`,
					watchlistEntryId: entry.id,
					alertType: 'NETWORK_CHANGE',
					severity: 'medium',
					title: `Network Change: ${entry.entityName}`,
					description: `Changes detected in entity network structure.`,
					timestamp: currentTime,
					isRead: false,
					requiresAction: false,
					relatedEntities: [entry.entityName],
					sourceData: { changeType: 'Ownership structure' },
				});
			}

			if (entry.alertPreferences.newSanctions && Math.random() < 0.05) {
				newAlerts.push({
					id: `a${Date.now()}-${entry.id}-sanctions`,
					watchlistEntryId: entry.id,
					alertType: 'NEW_SANCTIONS',
					severity: 'critical',
					title: `New Sanctions: ${entry.entityName}`,
					description: `Entity added to new sanctions list.`,
					timestamp: currentTime,
					isRead: false,
					requiresAction: true,
					relatedEntities: [entry.entityName],
					sourceData: { list: 'OFAC SDN', effective: currentTime },
				});
			}

			// Update last scanned timestamp
			entry.lastScanned = currentTime.split('T')[0];
		}

		// Add new alerts to the alerts array
		this.alerts.push(...newAlerts);

		return newAlerts;
	}

	/**
	 * Check for FTO/TCO activity links for a specific entity
	 */
	async checkFTOTCOActivity(entityId: string): Promise<Alert[]> {
		const entity = mockPreviousChecks.find((e) => e.id === entityId);
		if (!entity) return [];

		// Simulate FTO/TCO check against known databases
		const ftoTcoSources = [
			'State Department FTO List',
			'Treasury SDGT List',
			'UN 1267 Committee List',
			'EU Terrorist List',
		];

		const alerts: Alert[] = [];

		// Simulate a potential match
		if (Math.random() < 0.2) {
			const alert: Alert = {
				id: `fto-${Date.now()}`,
				watchlistEntryId: '',
				alertType: 'FTO_TCO_LINK',
				severity: 'critical',
				title: `FTO/TCO Match Found: ${entity.entityName}`,
				description: `Entity ${entity.entityName} has been linked to known terrorist organization activity.`,
				timestamp: new Date().toISOString(),
				isRead: false,
				requiresAction: true,
				relatedEntities: [entity.entityName],
				sourceData: {
					source:
						ftoTcoSources[Math.floor(Math.random() * ftoTcoSources.length)],
					confidence: 75 + Math.floor(Math.random() * 25),
				},
			};
			alerts.push(alert);
		}

		return alerts;
	}

	/**
	 * Get alerts for a specific watchlist entry
	 */
	getAlertsForEntry(entryId: string): Alert[] {
		return this.alerts.filter(
			(alert) => alert.watchlistEntryId === entryId
		);
	}

	/**
	 * Mark alert as read
	 */
	markAlertAsRead(alertId: string): boolean {
		const alert = this.alerts.find((a) => a.id === alertId);
		if (alert) {
			alert.isRead = true;
			return true;
		}
		return false;
	}

	/**
	 * Delete alert
	 */
	deleteAlert(alertId: string): boolean {
		const initialLength = this.alerts.length;
		this.alerts = this.alerts.filter((alert) => alert.id !== alertId);
		return this.alerts.length < initialLength;
	}

	/**
	 * Get all alerts
	 */
	getAllAlerts(): Alert[] {
		return this.alerts;
	}

	/**
	 * Simulate ERP/CRM webhook handler
	 */
	async handleERPWebhook(data: {
		entityId: string;
		eventType: 'create' | 'update' | 'delete';
		entityData: any;
	}): Promise<void> {
		console.log('ERP Webhook received:', data);

		// In production, this would:
		// 1. Validate webhook signature
		// 2. Process entity data
		// 3. Update watchlist if entity exists
		// 4. Trigger automatic screening
		// 5. Send alerts back to ERP system

		// For demo, just log the event
		if (data.eventType === 'create') {
			console.log(`New entity created in ERP: ${data.entityData.name}`);
		} else if (data.eventType === 'update') {
			console.log(`Entity updated in ERP: ${data.entityData.name}`);
		}
	}

	/**
	 * Simulate background monitoring process
	 */
	startBackgroundMonitoring(): void {
		console.log('Starting background monitoring...');

		// Simulate real-time monitoring
		const realtimeEntries = this.watchlistEntries.filter(
			(entry) => entry.monitoringType === 'realtime' && entry.isActive
		);

		if (realtimeEntries.length > 0) {
			console.log(
				`Monitoring ${realtimeEntries.length} entities in real-time`
			);
		}

		// In production, this would set up:
		// 1. Database change listeners
		// 2. API polling schedules
		// 3. Webhook endpoints
		// 4. Event processing queues
	}

	/**
	 * Get watchlist statistics
	 */
	getWatchlistStats() {
		const active = this.watchlistEntries.filter((e) => e.isActive);
		const realtime = active.filter(
			(e) => e.monitoringType === 'realtime'
		);
		const weekly = active.filter((e) => e.monitoringType === 'weekly');

		return {
			total: this.watchlistEntries.length,
			active: active.length,
			realtime: realtime.length,
			weekly: weekly.length,
			inactive: this.watchlistEntries.filter((e) => !e.isActive).length,
		};
	}
}
