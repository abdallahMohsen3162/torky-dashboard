'use client';

import React from 'react';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export default function GoogleMapEmbed({ latitude, longitude, zoom = 14 }: MapProps) {
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
