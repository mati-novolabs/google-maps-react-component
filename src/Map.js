import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";

function Map({ dataSimulated }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    console.log(selectedLocation);

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedLocation(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 45.38589848750091, lng: -75.6920678682056 }}
        >
            {dataSimulated &&
                dataSimulated.default.features.map((data, i) => (
                    <Marker
                        key={`id${i}`}
                        position={{
                            lat: data.geometry.coordinates[1],
                            lng: data.geometry.coordinates[0],
                        }}
                        onClick={() => {
                            setSelectedLocation(data);
                        }}
                    />
                ))}
            {selectedLocation && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedLocation(null);
                    }}
                    position={{
                        lat: selectedLocation.geometry.coordinates[1],
                        lng: selectedLocation.geometry.coordinates[0],
                    }}
                >
                    <div>
                        <h2>{selectedLocation.properties.NAME}</h2>
                        <p>{selectedLocation.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function GoogleMaps(props) {
    return (
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&libraries=geometry,drawing,places
  `}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            {...props}
        />
    );
}
