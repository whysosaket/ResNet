import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {motion} from 'framer-motion'

import icon from "./constants";
const AgencyMap = () => {
  function LocationMarker() {
    const [position, setPosition] = useState({lat: 20.2478872, lng: 85.8010479});
    const [bbox, setBbox] = useState<any>([]);

    const map = useMap();

    useEffect(() => {
    //   map.locate().on("locationfound", function (e) {
    //     setPosition(e.latlng);
    //     console.log(e.latlng);
    //     console.log(e.accuracy);
    //     console.log(e.bounds.toBBoxString().split(","));
    //     map.flyTo(e.latlng, map.getZoom());
    //     const radius = e.accuracy;
    //     const circle = L.circle(e.latlng, radius);
    //     circle.addTo(map);
    //     setBbox(e.bounds.toBBoxString().split(","));
    //   });


    /// HARDCODED
    // setITERLocation();    
    setHOMELocation();
    }, [map]);

    const setITERLocation = () => {
        setPosition({lat: 20.2478872, lng: 85.8010479});
          map.flyTo({lat: 20.2478872, lng: 85.8010479}, map.getZoom());
            const radius = 50.997;
            const circle = L.circle({lat: 20.2478872, lng: 85.8010479}, radius);
            circle.addTo(map);
            setBbox(['85.7999004787452', '20.246759845293546', '85.8014853212548', '20.248246754706457']);
    }

    const setHOMELocation = () => {
        setPosition({lat: 20.2499227, lng: 85.7974602});
          map.flyTo({lat: 20.2499227, lng: 85.7974602}, map.getZoom());
            const radius = 13.445;
            const circle = L.circle({lat: 20.2499227, lng: 85.7974602}, radius);
            circle.addTo(map);
            setBbox(['85.79731686431316', '20.249733113334983', '85.79786853568683', '20.25025068666502']);
    }

    const updateRealtimeLocation = () => {
        setPosition({lat: position.lat + 0.01, lng: position.lng + 0.01});
        const radius = 50.997;
            const circle = L.circle({lat: 20.2478872, lng: 85.8010479}, radius);
            map.flyTo({lat: position.lat + 0.01, lng: position.lng + 0.01}, map.getZoom());
    }

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }


  
  return (
    <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.5}} className="m-4 md:mx-24">
      <MapContainer
        center={[49.1951, 16.6068]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-80 md:h-96"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </motion.div>
  );
};


export default AgencyMap;
