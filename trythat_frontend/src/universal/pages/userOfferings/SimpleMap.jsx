import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './userOfferings.scss';

const SimpleMap = ({ coordinates, setCoordinates }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP__GOOGLE_PLACES_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return 'Error';
  if (!isLoaded) return 'Maps';

  return (
    <>
      <div className='simplemap'>
        <GoogleMap
          onClick={(e) => {
            setCoordinates({
              lat: e?.latLng.lat(),
              lng: e?.latLng.lng(),
            });
          }}
          mapContainerStyle={{
            width: '100%',
            height: '400px',
          }}
          center={coordinates}
          zoom={16}
          onLoad={onMapLoad}
        >
          <MarkerF position={coordinates} icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'} />
        </GoogleMap>
      </div>
    </>
  );
};

export default SimpleMap;
