import { render, screen, fireEvent } from '@testing-library/react';
import MapComponent from './MapComponent';  // Path to your component

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  Marker: () => <div data-testid="marker">Marker</div>,  // Add data-testid to Marker
  Popup: () => <div>Popup</div>
}));

describe('MapComponent', () => {
  it('renders the MapContainer and its children', () => {
    render(<MapComponent />);

    // Log the entire DOM structure for debugging purposes
    screen.debug();

    // Check if the mocked TileLayer is in the document
    expect(screen.getByText('TileLayer')).toBeInTheDocument();

    // Check if any Marker elements are in the document
    const markers = screen.getAllByTestId('marker');
    expect(markers.length).toBeGreaterThan(0);  // Ensure at least one marker is rendered
    markers.forEach(marker => {
      expect(marker).toBeInTheDocument();  // Ensure each marker is rendered
    });

  });

  it('applies a filter when the filter button is clicked', () => {
    render(<MapComponent />);

    const filterButton = screen.getByText('Open 24 Hours');
    fireEvent.click(filterButton);

    // Check if the button has the expected class after being clicked
    expect(filterButton).toHaveClass('filter-button');  // Adjust according to your logic
  });
});
