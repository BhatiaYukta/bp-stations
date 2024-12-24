import React from 'react';
import { RADIUS_VALUES, FILTER_LABELS } from '../../constants';
import "./FilterComponent.css";

const FilterComponent = ({
    radius,
    setRadius,
    filter24Hours,
    setFilter24Hours,
    filterConvenience,
    setFilterConvenience,
    filterHotFood,
    setFilterHotFood,
    filterBpFuelCard,
    setFilterBpFuelCard
}) => {
    // Handle radius change
    const handleRadiusChange = (e) => {
        setRadius(Number(e.target.value));  // Convert value to number
    };

    // Handle the filter button click for Open 24 Hours
    const handle24HoursChange = () => {
        setFilter24Hours((prevState) => !prevState); // Toggling based on previous state
    };

    // Handle the filter button click for Convenience Store
    const handleConvenienceChange = () => {
        setFilterConvenience(!filterConvenience);
    };

    // Handle the filter button click for Hot Food
    const handleHotFoodChange = () => {
        setFilterHotFood(!filterHotFood);
    };

    // Handle the filter button click for BP Fuel Cards
    const handleBpFuelCardChange = () => {
        setFilterBpFuelCard(!filterBpFuelCard);
    };

    return (
        <div className="filters">
            <h3>Filters</h3>

            {/* Radius Dropdown */}
            <div className="filter-group">
                <label className="filter-label" htmlFor="radius-select">Radius (miles)</label>
                <select
                    id="radius-select"
                    value={radius}
                    onChange={handleRadiusChange}
                    className="filter-dropdown"
                >
                    {RADIUS_VALUES.map((value) => (
                        <option key={value} value={value}>{value} miles</option>
                    ))}
                </select>
            </div>

            {/* Open 24 Hours Button */}
            <div className="filter-group">
                <button
                    className={`filter-button ${filter24Hours ? 'active' : ''}`}
                    onClick={handle24HoursChange}
                >
                    {FILTER_LABELS.open24Hours}
                </button>
            </div>

            {/* Convenience Store Button */}
            <div className="filter-group">
                <button
                    className={`filter-button ${filterConvenience ? 'active' : ''}`}
                    onClick={handleConvenienceChange}
                >
                    {FILTER_LABELS.convenienceStore}
                </button>
            </div>

            {/* Hot Food Button */}
            <div className="filter-group">
                <button
                    className={`filter-button ${filterHotFood ? 'active' : ''}`}
                    onClick={handleHotFoodChange}
                >
                    {FILTER_LABELS.hotFood}
                </button>
            </div>

            {/* BP Fuel Cards Button */}
            <div className="filter-group">
                <button
                    className={`filter-button ${filterBpFuelCard ? 'active' : ''}`}
                    onClick={handleBpFuelCardChange}
                >
                    {FILTER_LABELS.bpFuelCard}
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
