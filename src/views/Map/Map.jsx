import { Loader } from '@googlemaps/js-api-loader';
import styles from './Map.css'


const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  // ...additionalOptions,
});

loader.load().then(() => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.51223, lng: -122.658722 },
    zoom: 11,
  });

  //we will map locations over the marker object
  const marker1 = new google.maps.Marker({
    position: { lat: 45.51223, lng: -122.658722 },
    map: map,
  });
  const marker2 = new google.maps.Marker({
    position: { lat: 45.629398, lng: -122.657107 },
    map: map,
  });
  const marker3 = new google.maps.Marker({
    position: { lat: 45.498063, lng: -122.615631 },
    map: map,
  });
  const infowindow1 = new google.maps.InfoWindow({
    content: 'Zach',
  });
  marker1.addListener('click', () => {
    infowindow1.open({
      anchor: marker1,
      map,
      shouldFocus: false,
    });
  });
  const infowindow2 = new google.maps.InfoWindow({
    content: 'Spencer',
  });
  marker2.addListener('click', () => {
    infowindow2.open({
      anchor: marker2,
      map,
      shouldFocus: false,
    });
  });
  const infowindow3 = new google.maps.InfoWindow({
    content: 'Bailey',
  });
  marker3.addListener('click', () => {
    infowindow3.open({
      anchor: marker3,
      map,
      shouldFocus: false,
    });
  });
});

export default function Map() {
  const { map } = styles
  return (
    <div className={map-container}>
      <div className={map} id="map">Map</div>
    </div>
  )
}
