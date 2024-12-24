import { render, screen, fireEvent } from '@testing-library/react';
import FilterComponent from './FilterComponent'; // Adjust path as needed

// Mock the functions used to set filters and radius
const mockSetRadius = jest.fn();
const mockSetFilter24Hours = jest.fn();
const mockSetFilterConvenience = jest.fn();
const mockSetFilterHotFood = jest.fn();
const mockSetFilterBpFuelCard = jest.fn();

describe('FilterComponent', () => {
    it('renders without crashing', () => {
        render(
            <FilterComponent
                radius={1}
                setRadius={mockSetRadius}
                filter24Hours={false}
                setFilter24Hours={mockSetFilter24Hours}
                filterConvenience={false}
                setFilterConvenience={mockSetFilterConvenience}
                filterHotFood={false}
                setFilterHotFood={mockSetFilterHotFood}
                filterBpFuelCard={false}
                setFilterBpFuelCard={mockSetFilterBpFuelCard}
            />
        );
        expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('changes radius when selected', () => {
        render(
            <FilterComponent
                radius={1}
                setRadius={mockSetRadius}
                filter24Hours={false}
                setFilter24Hours={mockSetFilter24Hours}
                filterConvenience={false}
                setFilterConvenience={mockSetFilterConvenience}
                filterHotFood={false}
                setFilterHotFood={mockSetFilterHotFood}
                filterBpFuelCard={false}
                setFilterBpFuelCard={mockSetFilterBpFuelCard}
            />
        );

        // Simulate changing the radius
        fireEvent.change(screen.getByLabelText('Radius (miles)'), { target: { value: '5' } });
        expect(mockSetRadius).toHaveBeenCalledWith(5);
    });

});
