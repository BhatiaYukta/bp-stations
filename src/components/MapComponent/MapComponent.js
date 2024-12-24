import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BPMarker from '../../assets/images/BPMarker.png';  // Custom marker image (BP logo)
import markers from '../../data/markersData';  // Import markers data
import { PUNE_LOCATION, ZOOM_LEVEL } from '../../constants';  // Import constants
import { getDistance } from '../../utils/distance';  // Import distance utility function
import FilterComponent from '../FilterComponent/FilterComponent';  // Import FilterComponent

const MapComponent = () => {
    const { lat, lon } = PUNE_LOCATION;  // Reference location (Pune)
    const [radius, setRadius] = useState(5);  // Default radius set to 5 miles
    const [filter24Hours, setFilter24Hours] = useState(true);  // Default: filter by 24 hours
    const [filterConvenience, setFilterConvenience] = useState(false);  // Default: don't filter by convenience store
    const [filterHotFood, setFilterHotFood] = useState(false);  // New filter: Hot food in convenience stores
    const [filterBpFuelCard, setFilterBpFuelCard] = useState(false);  // New filter: BP fuel card acceptance

    // Custom icon for the BP marker
    const customIcon = new L.Icon({
        iconUrl: BPMarker,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });

    // Custom blue icon for the reference location (Pune)
    const redPointerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',  // Use the default blue marker icon from Leaflet
        iconSize: [25, 41],  // Standard size for Leaflet markers
        iconAnchor: [12, 41],  // Anchor the icon to the bottom (so the point is on the marker's tip)
        popupAnchor: [0, -41],  // Adjust the popup to appear above the marker
    });

    // Filter markers based on selected radius and the active filters
    const filteredMarkers = markers.filter(marker => {
        const distance = getDistance(lat, lon, marker.lat, marker.lon);
        const withinRadius = distance <= radius;
        const open24Hours = filter24Hours ? marker.isOpen24Hours : true;
        const hasConvenience = filterConvenience ? marker.hasConvenienceStore : true;
        const hasHotFood = filterHotFood ? marker.hasHotFood : true;
        const acceptsBpFuelCard = filterBpFuelCard ? marker.acceptsBpFuelCard : true;

        return withinRadius && open24Hours && hasConvenience && hasHotFood && acceptsBpFuelCard; // Apply all filters
    });

    return (
        <div className="map-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Filter Section */}
            <div className="map-filters" style={{ width: '300px' }}>
                <FilterComponent 
                    radius={radius} 
                    setRadius={setRadius} 
                    filter24Hours={filter24Hours} 
                    setFilter24Hours={setFilter24Hours} 
                    filterConvenience={filterConvenience} 
                    setFilterConvenience={setFilterConvenience}
                    filterHotFood={filterHotFood}
                    setFilterHotFood={setFilterHotFood}
                    filterBpFuelCard={filterBpFuelCard}
                    setFilterBpFuelCard={setFilterBpFuelCard}
                />
            </div>

            {/* Map Section */}
            <div className="map" style={{ flex: 1 }}>
                <MapContainer
                    center={[lat, lon]}  // Center the map on Pune
                    zoom={ZOOM_LEVEL}    // Use zoom level constant
                    style={{ width: '100%', height: '500px' }}
                    scrollWheelZoom={true}  // Enable zooming with scroll wheel
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Add the reference location marker (Pune) with a red pointer */}
                    <Marker position={[lat, lon]} icon={redPointerIcon}>
                        <Popup>
                            <strong>Pune</strong><br />
                            {lat}, {lon}<br />
                            Reference Location
                        </Popup>
                    </Marker>

                    {/* Add markers based on filtered data */}
                    {filteredMarkers.map(marker => {
                        const distance = getDistance(lat, lon, marker.lat, marker.lon);
                        return (
                            <Marker key={marker.id} position={[marker.lat, marker.lon]} icon={customIcon}>
                                <Popup>
                                    <strong>{marker.label}</strong><br />
                                    {distance.toFixed(2)} miles from base location<br />
                                    {marker.isOpen24Hours ? "Open 24 Hours" : "Closed"}<br />
                                    {marker.hasConvenienceStore ? "Has Convenience Store" : "No Convenience Store"}<br />
                                    {marker.hasHotFood ? "Serves Hot Food" : "Does not serve hot food"}<br />
                                    {marker.acceptsBpFuelCard ? "Accepts BP Fuel Cards" : "Does not accept BP Fuel Cards"}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
