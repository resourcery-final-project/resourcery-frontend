import { Loader } from '@googlemaps/js-api-loader';
import './App.css';
const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  // ...additionalOptions,
});

loader.load().then(() => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.51223, lng: -122.658722 },
    zoom: 8,
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
  const infowindow = new google.maps.InfoWindow({
    content: 'here I am',
  });
  marker1.addListener('click', () => {
    infowindow.open({
      anchor: marker1,
      map,
      shouldFocus: false,
    });
  });
});

export default function App() {
  return (
    <>
      <div id="map">map</div>
    </>
  );
}
