import React, { useEffect, useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockFTOLocations } from '../data/mockData';
import type { FTOLocation } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different risk levels and types
const createCustomIcon = (riskLevel: string, type: string) => {
	const getColor = () => {
		switch (riskLevel) {
			case 'critical':
				return '#dc2626'; // red-600
			case 'high':
				return '#ea580c'; // orange-600
			case 'medium':
				return '#d97706'; // amber-600
			case 'low':
				return '#65a30d'; // lime-600
			default:
				return '#6b7280'; // gray-500
		}
	};

	const getSymbol = () => {
		switch (type) {
			case 'country':
				return '●';
			case 'organization':
				return '■';
			case 'regional_group':
				return '▲';
			default:
				return '●';
		}
	};

	return L.divIcon({
		html: `<div style="
			color: ${getColor()};
			font-size: 20px;
			font-weight: bold;
			text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20px;
			height: 20px;
		">${getSymbol()}</div>`,
		className: 'custom-div-icon',
		iconSize: [20, 20],
		iconAnchor: [10, 10],
	});
};

// Component to fit map bounds to show all markers
const FitBounds: React.FC<{ locations: FTOLocation[] }> = ({
	locations,
}) => {
	const map = useMap();

	useEffect(() => {
		if (locations.length > 0) {
			const bounds = L.latLngBounds(
				locations.map((location) => [
					location.coordinates.lat,
					location.coordinates.lng,
				])
			);
			map.fitBounds(bounds, { padding: [20, 20] });
		}
	}, [locations, map]);

	return null;
};

interface FTOMapProps {
	className?: string;
}

export default function FTOMap({ className = '' }: FTOMapProps) {
	const { theme } = useTheme();
	const [selectedFilters, setSelectedFilters] = useState({
		critical: true,
		high: true,
		medium: true,
		low: true,
		country: true,
		organization: true,
		regional_group: true,
	});

	const filteredLocations = mockFTOLocations.filter(
		(location) =>
			selectedFilters[
				location.riskLevel as keyof typeof selectedFilters
			] && selectedFilters[location.type as keyof typeof selectedFilters]
	);

	const getTypeBadge = (type: string) => {
		switch (type) {
			case 'country':
				return 'badge badge-primary';
			case 'organization':
				return 'badge badge-secondary';
			case 'regional_group':
				return 'badge badge-accent';
			default:
				return 'badge badge-neutral';
		}
	};

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

	return (
		<div className={`${className}`}>
			{/* Custom styles for Leaflet popup in dark mode */}
			<style>
				{`
					.leaflet-popup-content-wrapper {
						background: transparent !important;
						box-shadow: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}
					.leaflet-popup-content {
						margin: 0 !important;
						padding: 0 !important;
					}
					.leaflet-popup-tip {
						background: var(--bg-secondary) !important;
						border: 1px solid var(--border-primary) !important;
						border-top: none !important;
					}
				`}
			</style>
			<div className="card">
				<div className="card-header">
					<div className="flex items-center justify-between flex-wrap gap-4">
						<h3
							className="text-xl font-semibold"
							style={{ color: 'var(--text-primary)' }}
						>
							FTO Global Risk Map
						</h3>
						<div className="flex items-center space-x-4 text-sm">
							<span style={{ color: 'var(--text-secondary)' }}>
								{filteredLocations.length} locations shown
							</span>
						</div>
					</div>

					{/* Filters */}
					<div className="mt-4 flex flex-wrap gap-6">
						{/* Risk Level Filters */}
						<div className="flex items-center gap-3">
							<span
								className="text-sm font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Risk Level:
							</span>
							<div className="flex flex-wrap gap-2">
								{(['critical', 'high', 'medium', 'low'] as const).map(
									(level) => (
										<label
											key={level}
											className={`cursor-pointer transition-all duration-200 ${getRiskBadge(
												level
											)} ${
												selectedFilters[level]
													? 'border border-white/50'
													: 'badge-outline opacity-60 hover:opacity-80'
											}`}
											onClick={() =>
												setSelectedFilters((prev) => ({
													...prev,
													[level]: !prev[level],
												}))
											}
										>
											<input
												type="checkbox"
												checked={selectedFilters[level]}
												onChange={() => {}}
												className="sr-only"
											/>
											<span className="capitalize flex items-center gap-1">
												{selectedFilters[level] && (
													<svg
														className="w-3 h-3"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												)}
												{level}
											</span>
										</label>
									)
								)}
							</div>
						</div>

						{/* Type Filters */}
						<div className="flex items-center gap-3">
							<span
								className="text-sm font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Type:
							</span>
							<div className="flex flex-wrap gap-2">
								{(['country', 'organization', 'regional_group'] as const).map(
									(type) => (
										<label
											key={type}
											className={`cursor-pointer transition-all duration-200 ${getTypeBadge(
												type
											)} ${
												selectedFilters[type]
													? 'border border-white/50'
													: 'badge-outline opacity-60 hover:opacity-80'
											}`}
											onClick={() =>
												setSelectedFilters((prev) => ({
													...prev,
													[type]: !prev[type],
												}))
											}
										>
											<input
												type="checkbox"
												checked={selectedFilters[type]}
												onChange={() => {}}
												className="sr-only"
											/>
											<span className="capitalize flex items-center gap-1">
												{selectedFilters[type] && (
													<svg
														className="w-3 h-3"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												)}
												{type.replace('_', ' ')}
											</span>
										</label>
									)
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="card-body p-0">
					<div style={{ height: '400px', width: '100%' }}>
						<MapContainer
							center={[20, 0]}
							zoom={2}
							style={{ height: '100%', width: '100%' }}
							zoomControl={true}
						>
							<TileLayer
								attribution={
									theme === 'dark'
										? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
										: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
								}
								url={
									theme === 'dark'
										? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
										: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
								}
							/>

							<FitBounds locations={filteredLocations} />

							{filteredLocations.map((location) => (
								<Marker
									key={location.id}
									position={[
										location.coordinates.lat,
										location.coordinates.lng,
									]}
									icon={createCustomIcon(location.riskLevel, location.type)}
								>
									<Popup>
										<div
											className="p-3 min-w-[280px] rounded-lg border"
											style={{
												backgroundColor: 'var(--bg-secondary)',
												borderColor: 'var(--border-primary)',
												boxShadow: 'var(--shadow-secondary)',
											}}
										>
											<div className="flex items-center justify-between mb-3">
												<h4
													className="font-semibold text-lg"
													style={{ color: 'var(--text-primary)' }}
												>
													{location.name}
												</h4>
												<span
													className={`${getTypeBadge(location.type)} badge-sm`}
												>
													{location.type === 'regional_group'
														? 'Regional Group'
														: location.type.charAt(0).toUpperCase() +
														  location.type.slice(1)}
												</span>
											</div>

											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<span
														className="text-sm font-medium"
														style={{ color: 'var(--text-secondary)' }}
													>
														Risk Level:
													</span>
													<span
														className={`${getRiskBadge(
															location.riskLevel
														)} badge-sm`}
													>
														{location.riskLevel.charAt(0).toUpperCase() +
															location.riskLevel.slice(1)}
													</span>
												</div>

												<div>
													<span
														className="text-sm font-medium"
														style={{ color: 'var(--text-secondary)' }}
													>
														Description:
													</span>
													<p
														className="text-sm mt-1"
														style={{ color: 'var(--text-primary)' }}
													>
														{location.description}
													</p>
												</div>

												<div>
													<span
														className="text-sm font-medium"
														style={{ color: 'var(--text-secondary)' }}
													>
														Related Entities:
													</span>
													<div className="flex flex-wrap gap-1 mt-1">
														{location.relatedEntities.map((entity, index) => (
															<span
																key={index}
																className="inline-block px-2 py-1 text-xs rounded border"
																style={{
																	backgroundColor: 'var(--bg-tertiary)',
																	color: 'var(--text-primary)',
																	borderColor: 'var(--border-secondary)',
																}}
															>
																{entity}
															</span>
														))}
													</div>
												</div>

												<div
													className="border-t pt-2"
													style={{ borderColor: 'var(--border-primary)' }}
												>
													<div
														className="text-xs space-y-1"
														style={{ color: 'var(--text-tertiary)' }}
													>
														<div>Source: {location.sourceList}</div>
														<div>Last Updated: {location.lastUpdated}</div>
													</div>
												</div>
											</div>
										</div>
									</Popup>
								</Marker>
							))}
						</MapContainer>
					</div>
				</div>

				{/* Legend */}
				<div className="card-footer">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="flex items-center gap-4">
							<span
								className="text-sm font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Risk Levels:
							</span>
							<div className="flex flex-wrap gap-2">
								{(['critical', 'high', 'medium', 'low'] as const).map(
									(level) => (
										<span
											key={level}
											className={`${getRiskBadge(level)} badge-sm`}
										>
											{level.charAt(0).toUpperCase() + level.slice(1)}
										</span>
									)
								)}
							</div>
						</div>
						<div className="flex items-center gap-4">
							<span
								className="text-sm font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Types:
							</span>
							<div className="flex flex-wrap gap-2">
								{(['country', 'organization', 'regional_group'] as const).map(
									(type) => (
										<span
											key={type}
											className={`${getTypeBadge(type)} badge-sm`}
										>
											{type === 'regional_group'
												? 'Regional Group'
												: type.charAt(0).toUpperCase() + type.slice(1)}
										</span>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
