import React from "react";
import Map from 'react-map-gl';

const Donor = () => {
    return (
        <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{width: 600, height: 400}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    )
}

export default Donor