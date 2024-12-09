import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.006292, 40.712666],
      zoom: 16.2,
      pitch: 40,
      bearing: 53,
      style: 'mapbox://styles/mapbox/standard',
      minZoom: 15,
      maxZoom: 17
    });

    mapRef.current.on('style.load', () => {
      mapRef.current.addSource('eraser', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                coordinates: [
                  [
                    [-74.00618, 40.71406],
                    [-74.00703, 40.71307],
                    [-74.00787, 40.71206],
                    [-74.00766, 40.71176],
                    [-74.00624, 40.71204],
                    [-74.00487, 40.71252],
                    [-74.00421, 40.71315],
                    [-74.00618, 40.71406]
                  ]
                ],
                type: 'Polygon'
              }
            }
          ]
        }
      });

      mapRef.current.addLayer({
        id: 'eraser',
        type: 'clip',
        source: 'eraser',
        layout: {
          'clip-layer-types': ['symbol', 'model']
        },
        maxzoom: 16
      });

      mapRef.current.addLayer({
        id: 'eraser-debug',
        type: 'line',
        source: 'eraser',
        paint: {
          'line-color': 'rgba(255, 0, 0, 0.9)',
          'line-dasharray': [0, 4, 3],
          'line-width': 5
        }
      });
    });
  }, []);

  return <div id="map" style={{ height: '100%' }} ref={mapContainerRef} />;
};

export default MapboxExample;