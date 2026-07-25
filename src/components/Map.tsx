import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import React, { useCallback, useState } from "react"
import { Box } from "@mui/material"

const containerStyle = {
  width: "100%",
  minHeight: "485px",
  flex: 1
}

const taxmateCoord = { lat: 31.622685, lng: 71.059266 }

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAP_API_KEY as string
  })

  const [, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <Box sx={{ flex: 1, minHeight: 485, bgcolor: "action.hover" }} />
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={taxmateCoord}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={taxmateCoord} />
    </GoogleMap>
  )
}

export default Map