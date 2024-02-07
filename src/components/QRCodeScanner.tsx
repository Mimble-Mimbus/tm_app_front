import { FC, useEffect, useState } from "react";
import { BarcodeScanner, BarcodeFormat, BarcodeScannedEvent } from '@capacitor-mlkit/barcode-scanning';
import { IonContent } from "@ionic/react";

const QRCodeScanner: FC<{ onScan: (event: BarcodeScannedEvent) => void | Promise<void>}> = ({ onScan }) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isGranted, setIsGranted] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  function stop () {
    if (isScanning) {
      BarcodeScanner.stopScan()
    }

    setIsScanning(false)
  }

  useEffect(() => {
    console.log('bonsoir')
    BarcodeScanner.addListener('barcodeScanned', onScan);

    (async () => {
     await BarcodeScanner.isSupported().then(({ supported }) => setIsSupported(supported)).catch((err) => console.log(err))
     await BarcodeScanner.requestPermissions().then(({ camera }) => {
      if (camera === 'granted') {
        setIsGranted(true)
      } else {
        setIsGranted(false)
      }
     }).catch((err) => console.log(err))

     setIsReady(true)

     if (isGranted && isSupported) {
        await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode] })
        setIsScanning(true)
     }
     
    })()

    return stop
  }, [])

  return (<IonContent className="w-full h-ful" color={'medium'}> {
    isReady && 
      (!isSupported ? (
        <div>Le qrcode n'est pas supporté sur cette appareill</div>
      ) : ( !isGranted ? 
        (<div>l'application n'a pas la permission d'utiliser la caméra</div>) : 
        (<div className="h-full w-full"></div>))
      )
  }</IonContent>)
}

export default QRCodeScanner