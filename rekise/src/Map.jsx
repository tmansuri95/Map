import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const vesselIcon = new L.Icon({
    iconUrl: '/src/assets/Frame_334.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const startPointIcon = new L.Icon({
    iconUrl: '/src/assets/location_svgrepo.com (2).png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const endPointIcon = new L.Icon({
    iconUrl: '/src/assets/location_svgrepo.com (1).png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const Map = ({ startCoords, endCoords, speed, refreshRate }) => {
    const [position, setPosition] = useState(startCoords);
    const [path, setPath] = useState([startCoords]);

    const calculateNextPosition = (currentPosition, endPosition, distancePerFrame) => {
        const latDiff = endPosition[0] - currentPosition[0];
        const lngDiff = endPosition[1] - currentPosition[1];
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

        if (distance < distancePerFrame) {
            return endPosition;
        }

        const ratio = distancePerFrame / distance;
        const nLatd = currentPosition[0] + latDiff * ratio;
        const nLngd = currentPosition[1] + lngDiff * ratio;

        return [nLatd, nLngd];
    };

    useEffect(() => {
        const distancePerSecond = speed / 3600;
        const distancePerFrame = distancePerSecond / refreshRate;
        const interval = setInterval(() => {
            setPosition((prevPosition) => {
                const nextPosition = calculateNextPosition(prevPosition, endCoords, distancePerFrame);
                setPath((prevPath) => [...prevPath, nextPosition]);
                return nextPosition;
            });
        }, 1000 / refreshRate);

        return () => clearInterval(interval);
    }, [endCoords, speed, refreshRate]);

    return (
        <MapContainer center={startCoords} zoom={10} style={{ height: '100vh', width: '202vh' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={startCoords} icon={startPointIcon} />
            <Marker position={endCoords} icon={endPointIcon} />
            <Marker position={position} icon={vesselIcon} />
            <Polyline positions={path} />
        </MapContainer>
    );
};

export default Map;
