import React from 'react'

export default function LocateButton({setMapCenter}) {
  return (
    <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              const { latitude, longitude } = position.coords;
              console.log({ latitude, longitude });
              setMapCenter({ lat: latitude, lng: longitude });
            },
            // empty function for failure condition
            () => null
          );
        }}
      >
        Locate
      </button>
  )
}
