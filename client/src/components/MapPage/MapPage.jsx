import React, { useEffect } from 'react'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import style from './mapPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setAllUserAddressThunk } from '../../redux/actionCreators/addressAC';

const containerStyle = {
  width: '700px',
  height: '700px'
};

const center = {
  lat: 55.75222,
  lng: 37.61556,
};

const MapPage = () => {

  const id = useSelector(state => state.user.id)
  const dispatch = useDispatch()
  const address = useSelector(state => state.address)
  console.log('address', address);
  // let map;
  // const maps1 = document.querySelector('.maps')
  // console.log(resultCoordination)

  // function initMap() {
  //   console.log(231564);
  //   map = new google.maps.Map(document.querySelector('#map'), {
  //     center: { lat: 10.397, lng: 70.644 },
  //     zoom: 2
  //   });
  // }

  // function addMarker(map, arrLocation = []) {
  //   arrLocation.forEach(el => {
  //     new google.maps.Marker({
  //       position: el.cood,
  //       title: el.name,
  //       map: map
  //     })
  //   })
  // }

  useEffect(() => {
    dispatch(setAllUserAddressThunk(id))
  }, [])
  console.log();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBrCV2mahsSsU2ZCwJcFTyx8EIT0oEqlj4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className={style.maps_orientation} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 55.75222,
          lng: 37.61556
        }}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {
          address ? address.map(el => <Marker position={{ lat: el.location.lat, lng: el.location.lng }} label={el.hospital} title={el.address}></Marker>) : null
        }
      <></>
      </GoogleMap>
    </div >
  ) : <></>

}

export default React.memo(MapPage)
