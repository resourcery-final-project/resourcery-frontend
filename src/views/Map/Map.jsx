import { InfoWindow } from '@react-google-maps/api';
import { GoogleMap, Marker } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import styles from './Map.css';
import { useMemo, useRef, useState, useEffect } from 'react';
import { getAllResources } from '../../services/resources';
import { Link, useHistory } from 'react-router-dom';
import { useMarkerCoords } from '../../context/MarkerContext';

export default function MapView() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedNewMarker, setSelectedNewMarker] = useState(null)
  const [newMarkers, setNewMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 45.51223,
    lng: -122.658722,
  });
  const [list, setList] = useState([]);
  const { setMarkerCoords } = useMarkerCoords();
  const history = useHistory();

  const { map } = styles;

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
  const onMapLoad = useMemo((map) => {
    mapRef.current = map;
  }, []);

  return (
    <div className={map}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={(event) => {
          //spread in current markers with new markers
          setNewMarkers((current) => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            },
          ]);
          setMarkerCoords({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            }
          );
          setSelectedNewMarker(
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            }
          );
        }}
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
              </div>
            ))}

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
                  <p>{selectedMarker.type}</p>
                </div>
              </InfoWindow>
            ) : null}

            {newMarkers.map((newMarker) => (
              <Marker 
                key={newMarker.lat}
                position={{ lat: newMarker.lat, lng: newMarker.lng }}
                icon={{
                  url: '/assets/hot-soup.png',
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
              />
            ))}

            {selectedNewMarker ? (
              <InfoWindow
                position={{
                  lat: selectedNewMarker.lat,
                  lng: selectedNewMarker.lng,
                }}
                onCloseClick={() => {
                  setSelectedNewMarker(null);
                  setNewMarkers([]);
                }}
              >
                <div>
                  <button onClick={() => {
                    history.push('/create-resource')
                  }
                    
                  }>
                    Add new resource?
                  </button>
                </div>
              </InfoWindow>
            ) : null}
      </GoogleMap>
    </div>
  );
}
