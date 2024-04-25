import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

const MyGoogleMap: React.FC = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    address: "H46C+XR7, Delhi, Airport, New Delhi, Delhi 110037",
    lat: 28.5437, // Latitude for Delhi
    lng: 77.1282, // Longitude for Delhi
  };

  return (
    <div className="border border-black h-[70vh] w-full">
      <LoadScript googleMapsApiKey="AIzaSyAnu_hJVAodCX9J7AvNFozo9IXFWkmTOKI">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker
            position={{
              lat: 28.7041,
              lng: 77.1025,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;
