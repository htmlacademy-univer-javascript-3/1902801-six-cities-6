import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { Offer } from './mocks/offers';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  places: Offer[];
  cityName?: string;
  containerClassName?: string;
  height?: string;
}

export default function Map({
  places,
  cityName = 'Amsterdam',
  containerClassName,
  height,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const offersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        center: [52.38333, 4.9],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(leafletMap.current);
    }

    const map = leafletMap.current;
    if (!map) {
      return;
    }
    const existing = offersLayerRef.current;
    if (existing) {
      map.removeLayer(existing);
      offersLayerRef.current = null;
    }

    const markers = L.layerGroup();

    places
      .filter((p) => p.city && p.city.name === cityName)
      .forEach((p) => {
        if (!p.city) {
          return;
        }
        const marker = L.marker([
          p.city.location.latitude,
          p.city.location.longitude,
        ]);
        marker.addTo(markers);
      });

    markers.addTo(map);
    offersLayerRef.current = markers;

    const latlngs: [number, number][] = [];
    places.forEach((p) => {
      if (p.city && p.city.name === cityName) {
        latlngs.push([p.city.location.latitude, p.city.location.longitude]);
      }
    });

    if (latlngs.length > 0) {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {};
  }, [places, cityName]);

  const styleHeight =
    typeof height === 'number' ? `${height}px` : (height ?? '100%');

  return (
    <div
      ref={mapRef}
      className={containerClassName}
      style={{ height: styleHeight }}
    />
  );
}
