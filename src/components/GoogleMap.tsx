import { FC } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { useGoogleMap } from "../hook/useGoogleMap";


const render = (status: Status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const GoogleMap: FC<{ address: string, zoom?: number}> = ({ address, zoom }) =>  {
  const { ref } = useGoogleMap<HTMLDivElement>(address, { zoom })

  return (
    <div className="h-1/3 w-full">
      <Wrapper apiKey={import.meta.env.VITE_REACT_APP_MAP_KEY} render={render}>
        <div className="h-[300px] w-1/2" ref={ref} id="map" />;
      </Wrapper>
    </div>
  );
}

export default GoogleMap