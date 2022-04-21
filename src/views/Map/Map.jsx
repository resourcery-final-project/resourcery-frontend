import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllResources } from '../../services/resources';

import { InfoWindow, useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker } from '@react-google-maps/api';

import mapStyles from './mapStyles';
import styles from './Map.css';

export default function MapView() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 45.51223,
    lng: -122.658722,
  });
  const [list, setList] = useState([]);

  const { map } = styles;

  // const [libraries] = useState(['places']);
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyB_CW_olHj572sQ6AURzEjfzrFK2bhz5J8',
  //   libraries,
  // });

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

  // make 'box' to save map instance
  const mapRef = useRef();
  // // return saved map instance on rerender
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // if (loadError) return 'Error Loading Map';
  // if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div className={map}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
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
                url: '/assets/hot-soup.png',
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
                  lat: Number(selectedMarker.latitude),
                  lng: Number(selectedMarker.longitude),
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
