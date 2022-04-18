// import { Loader } from '@googlemaps/js-api-loader';
// import styles from './Map.css'
// import mapStyles from './mapStyles'

// const loader = new Loader({
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   version: 'weekly',
//   // ...additionalOptions,
// });

// loader.load().then(() => {
//   const map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 45.51223, lng: -122.658722 },
//     zoom: 11,
//     options: {
//       styles: mapStyles,
//       disableDefaultUI: true, 
//       zoomControl: true
//     }
//   });

//   //we will map locations over the marker object
//   const marker1 = new google.maps.Marker({
//     position: { lat: 45.51223, lng: -122.658722 },
//     map: map,
//   });
//   const marker2 = new google.maps.Marker({
//     position: { lat: 45.629398, lng: -122.657107 },
//     map: map,
//   });
//   const marker3 = new google.maps.Marker({
//     position: { lat: 45.498063, lng: -122.615631 },
//     map: map,
//   });
//   const infowindow1 = new google.maps.InfoWindow({
//     content: 'Zach',
//   });
//   marker1.addListener('click', () => {
//     infowindow1.open({
//       anchor: marker1,
//       map,
//       shouldFocus: false,
//     });
//   });
//   const infowindow2 = new google.maps.InfoWindow({
//     content: 'Spencer',
//   });
//   marker2.addListener('click', () => {
//     infowindow2.open({
//       anchor: marker2,
//       map,
//       shouldFocus: false,
//     });
//   });
//   const infowindow3 = new google.maps.InfoWindow({
//     content: 'Bailey',
//   });
//   marker3.addListener('click', () => {
//     infowindow3.open({
//       anchor: marker3,
//       map,
//       shouldFocus: false,
//     });
//   });
// });

// export default function Map() {
//   const { map } = styles
//   return (
//     <div>
//       <div className={map} id="map">Map</div>
//     </div>
//   )
// }
import { InfoWindow, useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api';
import mapStyles from './mapStyles';
// import Map from '../../components/map/map'

import { useCallback, useMemo, useRef, useState } from 'react';

export default function MapView() {
  const [newMarkers, setNewMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 45.51223, lng: -122.658722 })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBdNq9njCHnPId5ilXIgn7LvnexfHImuWU',
  });
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };

  // retain position during rerender
  const center = 
  useMemo(() => (mapCenter), [mapCenter]);
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  // no dependancy in useCallback prevents rerender
  const onMapClick = useCallback((event) => {
      //keep added markers with spread
    setNewMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  // make 'box' to save map instance
  const mapRef = useRef();
  // return saved map instance on rerender
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  // pans to given location once per mount
  const panToLocation = ({ lat, lng }) => {
    mapRef.current.panToLocation({ lat, lng });
    mapRef.current.setZoom(13);
  }
//   const panToLocation = useCallback(({ lat, lng }) => {
//     mapRef.current.panToLocation({ lat, lng });
//     mapRef.current.setZoom(13);
//   }, []);

  function LocateUser({ panToLocation }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            const { latitude, longitude } = position.coords;
            console.log({ latitude, longitude })
            setMapCenter({ lat: latitude, lng: longitude })

            // panToLocation({
            //   lat: position.coords.latitude,
            //   lng: position.coords.longitude,
            // });
          },
          // empty function for failure condition
            () => null
          );
        }}
      >
        Locate
      </button>
    );
  }

  if (loadError) return 'Error Loading Map';
  if (!isLoaded) return <p>Loading...</p>;

  return (
    //   <Map />
    <>
      <LocateUser panToLocation={panToLocation}/>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {newMarkers.map((marker) => (
          <Marker
            key={marker.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: './assets/soup.png',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelectedMarker(marker);
              console.log(selectedMarker);
            }}
          />
        ))}
        {selectedMarker ? (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <h3>Free Soup</h3>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}
