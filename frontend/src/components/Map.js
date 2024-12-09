import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749, 
    longitude: -122.4194,
    zoom: 5,
  });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    console.log('Fetching locations...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('User location:', position);
        setViewport(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 5,
        }));
      }, error => {
        console.error('Error getting user location:', error);
      });
    }

    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations`)
      .then(response => {
        console.log('Fetched locations:', response.data);
        setLocations(response.data.features);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const filterLocations = () => {
    const { latitude, longitude } = viewport;
    return locations.filter(location => {
      const [lng, lat] = location.geometry.coordinates;
      const distance = getDistanceFromLatLonInKm(latitude, longitude, lat, lng);
      return distance <= 1000;
    });
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1); 
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c; 
    return distance;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  }

  const filteredLocations = filterLocations();
  console.log("Mapbox Token:", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
  console.log("Viewport:", viewport);
  console.log("Filtered Locations:", filteredLocations);

  return (
    <Map
      {...viewport}
      style={{ width: '50%', height: '50vh' ,borderRadius: '20px'}}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onMove={evt => setViewport(evt.viewState)}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {filteredLocations.map(location => (
        <Marker
          key={location.properties.id}
          latitude={location.geometry.coordinates[1]}
          longitude={location.geometry.coordinates[0]}
        >
          <button className="marker-btn" onClick={(e) => {
            e.preventDefault();
            setSelectedLocation(location);
          }}>
            <img style = {{width: '30px', height: '30px'}} src="/marker.svg" alt="Marker Icon" />
          </button>
        </Marker>
      ))}

      {selectedLocation && (
        <Popup
          latitude={selectedLocation.geometry.coordinates[1]}
          longitude={selectedLocation.geometry.coordinates[0]}
          onClose={() => {
            setSelectedLocation(null);
          }}
          closeOnClick={false}
        >
          <div>
            <h3>{selectedLocation.properties.name}</h3>
            <p>{selectedLocation.properties.address}</p>
            <p>Score: {selectedLocation.properties.score}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapComponent;
