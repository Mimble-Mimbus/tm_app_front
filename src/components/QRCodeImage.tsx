import QRCodeStyling from "qr-code-styling";
import { FC, useCallback, useRef } from "react";

const QRCodeImage: FC<{ data: string }> = ({ data }) => {
  const optionsRef = useRef(new QRCodeStyling({
    width: 220,
    height: 220,
    data: data,
    margin: 0,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: false,
      imageSize: 0.4,
      margin: 0,
    },
    dotsOptions: {
      type: "extra-rounded",
      color: "#5b2bca",
      gradient: {
        type: "linear",
        rotation: 0.3490658503988659,
        colorStops: [
          {
            offset: 0,
            color: "#bb1bae",
          },
          {
            offset: 1,
            color: "#4a21ba",
          },
        ],
      },
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#000000",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: "#561e7b",
          },
          {
            offset: 1,
            color: "#1a17d9",
          },
        ],
      },
    },
    cornersDotOptions: {
      type: "dot",
      color: "#7b3b8c",
    },
  }))
  const ref = useCallback(async (nodeRef: HTMLDivElement) => {
    if (nodeRef) {
      optionsRef.current.append(nodeRef)
    }
  }, [])


  return (<div className="middle" ref={ref} />)
};

export default QRCodeImage
