import { useState, useEffect, useCallback, useRef } from "react"

/**
 * need to be use inside google wrapper
 */ 
export function useGoogleMap<S extends HTMLElement>(address: string, options?: google.maps.MapOptions) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [parameter, setParameter] = useState<google.maps.MapOptions | undefined>(options)
  const elemRef = useRef<S | null>(null)

  const ref = useCallback((node: S | null ) => {
    if (node !== null) {
      elemRef.current = node;
      (async() => {
        const geocoder = new window.google.maps.Geocoder
        const { location } = (await geocoder.geocode({ address })).results[0].geometry
        setMap(new window.google.maps.Map(node, {...parameter, center: { lat: location.lat(), lng: location.lng()}, zoom: options?.zoom || 8 }))
      })()
    }
  }, []);


  useEffect(() => {
    if (map && elemRef.current) {
      setMap(new window.google.maps.Map(elemRef.current, parameter))
    }
  }, [parameter, ref])

  return { ref, map, setParameter } as const
}


