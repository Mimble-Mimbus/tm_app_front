import { FC, useCallback } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Map, tileLayer, Marker } from "leaflet";

const OsmMap: FC<{ address: string, zoom?: number}> = ({ zoom, address }) => {
  const provider = new OpenStreetMapProvider()

  const geocoder = GeoSearchControl({ provider })

  const ref = useCallback(async (node: HTMLDivElement | null ) => {
    if (node) {
      let newMap = new Map('OSMap').setZoom(17)

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(newMap)

      const result = (await provider.search({ query: address }))[0]
      const marker = new Marker({ lat: result.y, lng: result.x })
      newMap.setView({ lat: result.y, lng: result.x })
      marker.addTo(newMap)
      geocoder.addTo(newMap)
    }
  }, []);

  return (
    <div id="OSMap" className="w-1/3" ref={ref}></div>
  )
}

export default OsmMap
