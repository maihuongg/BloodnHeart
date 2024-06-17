import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons not appearing
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [start, end, map]);

  return null;
};

const LeafletMap = ({ eventLocation }) => {
  const [currentLocation, setCurrentLocation] = React.useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  if (!currentLocation) {
    return <p>Loading current location...</p>;
  }

  if (!eventLocation || !eventLocation.lat || !eventLocation.lng) {
    return <p>Event location not available</p>;
  }

  return (
    <MapContainer center={currentLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={currentLocation}>
        <Popup>Your current location</Popup>
      </Marker>
      <Marker position={[eventLocation.lat, eventLocation.lng]}>
        <Popup>Event location: {eventLocation.address}</Popup>
      </Marker>
      <Routing start={currentLocation} end={eventLocation} />
    </MapContainer>
  );
};

export default LeafletMap;
