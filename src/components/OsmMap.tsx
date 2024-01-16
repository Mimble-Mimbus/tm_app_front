import { FC, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { GeocoderControl } from "leaflet-control-geocoder/dist/control";
import { geocoder } from "leaflet-control-geocoder";
import { LatLngExpression } from "leaflet";


const MapComponent: FC<{ geocoder: GeocoderControl }> = ({ geocoder }) => {
  const map = useMap()
  geocoder.addTo(map)

  return (<div className="w-96 h-96" id="map"></div>)
}

const OsmMap: FC<{ address: string, zoom?: number}> = ({ zoom, address }) => {
  const control = geocoder({ query: address})
  const [center, setCenter] = useState<LatLngExpression>({ lat: 8, lng: 7 })

  control.listens('locationfound', (event) => {
    console.log('locatoin listen')
  })
  control.addEventListener('locationfound', (event) => {
    console.log('locatoin addevent')
  })
  control.on('markgeocode', (event) => {
    console.log('market set')
    setCenter(event.geocode.center)
  })
  control.on('locationfound', (event) => {
    console.log('location found on')
    setCenter(event.latlng)
  })

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  )
}

export default OsmMap
