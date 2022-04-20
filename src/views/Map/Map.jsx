import { InfoWindow, useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import styles from './Map.css';
import LocateButton from '../../components/LocateButton/LocateButton';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { getAllResources } from '../../services/resources';
import { Link } from 'react-router-dom';

export default function MapView() {
  const [newMarkers, setNewMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 45.51223,
    lng: -122.658722,
  });
  const [list, setList] = useState([]);

  const { map } = styles;

  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };

  // retain position during rerender
  const center = useMemo(() => mapCenter, [mapCenter]);
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllResources();
      setList(data);
    }
    fetchData();
  }, []);
  // no dependancy in useCallback prevents rerender
  // const onMapClick = useCallback((event) => {
  //   //keep added markers with spread
  //   setNewMarkers((current) => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);
  // make 'box' to save map instance
  const mapRef = useRef();
  // // return saved map instance on rerender
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error Loading Map';
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className={map}>
      {/* <LocateButton setMapCenter={setMapCenter}/> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {list.map((marker) => (
          <div key={marker.id}>
            <Marker
              position={{
                lat: Number(marker.latitude),
                lng: Number(marker.longitude),
              }}
              icon={{
                url: '/assets/soup.png',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
            {selectedMarker ? (
              <InfoWindow
                position={{
                  lat: Number(selectedMarker.lat),
                  lng: Number(selectedMarker.lng),
                }}
                onCloseClick={() => {
                  setSelectedMarker(null);
                }}
              >
                <div>
                  <Link to={`/resource/${selectedMarker.id}`}>
                    {selectedMarker.title}
                  </Link>
                </div>
              </InfoWindow>
            ) : null}
          </div>
        ))}
      </GoogleMap>
    </div>
  );
}
