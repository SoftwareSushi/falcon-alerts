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

	const getRiskLevelColor = (riskLevel: string) => {
		switch (riskLevel) {
			case 'critical':
				return 'text-red-600';
			case 'high':
				return 'text-orange-600';
			case 'medium':
				return 'text-amber-600';
			case 'low':
				return 'text-lime-600';
			default:
				return 'text-gray-500';
		}
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'country':
				return '🌍';
			case 'organization':
				return '🏢';
			case 'regional_group':
				return '📍';
			default:
				return '●';
		}
	};

	return (
		<div className={`${className}`}>
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
					<div className="mt-4 flex flex-wrap gap-4">
						{/* Risk Level Filters */}
						<div className="flex items-center space-x-2">
							<span
								className="text-sm font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Risk Level:
							</span>
							{(['critical', 'high', 'medium', 'low'] as const).map(
								(level) => (
									<label
										key={level}
										className="flex items-center space-x-1 cursor-pointer"
									>
										<input
											type="checkbox"
											checked={selectedFilters[level]}
											onChange={(e) =>
												setSelectedFilters((prev) => ({
													...prev,
													[level]: e.target.checked,
												}))
											}
											className="form-checkbox h-4 w-4"
										/>
										<span
											className={`text-sm capitalize ${getRiskLevelColor(
												level
											)}`}
										>
											{level}
										</span>
									</label>
								)
							)}
						</div>

						{/* Type Filters */}
						<div className="flex items-center space-x-2">
							<span
								className="text-sm font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Type:
							</span>
							{(['country', 'organization', 'regional_group'] as const).map(
								(type) => (
									<label
										key={type}
										className="flex items-center space-x-1 cursor-pointer"
									>
										<input
											type="checkbox"
											checked={selectedFilters[type]}
											onChange={(e) =>
												setSelectedFilters((prev) => ({
													...prev,
													[type]: e.target.checked,
												}))
											}
											className="form-checkbox h-4 w-4"
										/>
										<span
											className="text-sm"
											style={{ color: 'var(--text-primary)' }}
										>
											{getTypeIcon(type)} {type.replace('_', ' ')}
										</span>
									</label>
								)
							)}
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
										<div className="p-2 min-w-[250px]">
											<div className="flex items-center space-x-2 mb-2">
												<span className="text-lg">
													{getTypeIcon(location.type)}
												</span>
												<h4 className="font-semibold text-lg">{location.name}</h4>
											</div>

											<div className="space-y-2">
												<div className="flex items-center space-x-2">
													<span className="text-sm font-medium">Risk Level:</span>
													<span
														className={`text-sm font-semibold capitalize ${getRiskLevelColor(
															location.riskLevel
														)}`}
													>
														{location.riskLevel}
													</span>
												</div>

												<div className="flex items-center space-x-2">
													<span className="text-sm font-medium">Type:</span>
													<span className="text-sm capitalize">
														{location.type.replace('_', ' ')}
													</span>
												</div>

												<div>
													<span className="text-sm font-medium">Description:</span>
													<p className="text-sm mt-1">{location.description}</p>
												</div>

												<div>
													<span className="text-sm font-medium">
														Related Entities:
													</span>
													<div className="flex flex-wrap gap-1 mt-1">
														{location.relatedEntities.map((entity, index) => (
															<span
																key={index}
																className="inline-block px-2 py-1 text-xs bg-gray-100 rounded"
															>
																{entity}
															</span>
														))}
													</div>
												</div>

												<div className="text-xs text-gray-500 mt-2">
													Source: {location.sourceList}
													<br />
													Last Updated: {location.lastUpdated}
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
					<div className="flex flex-wrap items-center justify-between gap-4 text-sm">
						<div className="flex items-center space-x-4">
							<span
								className="font-medium"
								style={{ color: 'var(--text-secondary)' }}
							>
								Legend:
							</span>
							<div className="flex items-center space-x-1">
								<span style={{ color: '#dc2626' }}>●</span>
								<span>Critical</span>
							</div>
							<div className="flex items-center space-x-1">
								<span style={{ color: '#ea580c' }}>●</span>
								<span>High</span>
							</div>
							<div className="flex items-center space-x-1">
								<span style={{ color: '#d97706' }}>●</span>
								<span>Medium</span>
							</div>
							<div className="flex items-center space-x-1">
								<span style={{ color: '#65a30d' }}>●</span>
								<span>Low</span>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-1">
								<span>●</span>
								<span>Country</span>
							</div>
							<div className="flex items-center space-x-1">
								<span>■</span>
								<span>Organization</span>
							</div>
							<div className="flex items-center space-x-1">
								<span>▲</span>
								<span>Regional Group</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
