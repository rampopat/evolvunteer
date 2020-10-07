import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Box } from '@material-ui/core';
import Axios from 'axios';

import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import icon from '../../assets/marker-icon.png';

const defaultPos = [51.524296, -0.133475];
const defaultZoom = 15;

const eventIcon = L.icon({
  iconUrl: icon
});

function geocode (address) {
  const url = 'https://nominatim.openstreetmap.org/search/';

  return Axios.get(url + address + '?format=json', {
    headers: {"Access-Control-Allow-Origin": "*"}
  })
    .then(response => {
      console.log(response);

      return [
        response.data[0].lat,
        response.data[0].lon,
      ];
    })
};

const EventMap = (props) => {
  const { address, coordinates } = props;
  const [position, setPosition] = useState(coordinates || defaultPos);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
      setLoading(true);
      address && geocode(address).then(coords => {
        setPosition(coords);
        setLoading(false);
      });
    },
    [props.address]
  );

  return (
    <Box>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""/>

      <SinglePointMap loading={loading} center={position} zoom={defaultZoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}
                icon={eventIcon}>
        </Marker>
      </SinglePointMap>
    </Box>
  );
};

const mapLoading = css`
  opacity: 0.4;

  & .leaflet-tile, & .leaflet-marker-icon {
    filter: blur(2px) grayscale(80%);
  }
`;

const SinglePointMap = styled(Map)`
  height: 179px;
  border-radius: 13px;

  transition: opacity 0.2 ease-out;
  opacity: 0.8;
  ${ ({ loading }) => loading && mapLoading }
  filter: grayscale(20%);
`;

export default EventMap;