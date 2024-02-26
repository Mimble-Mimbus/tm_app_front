import { useEffect, useRef, useState } from "react";
import { BarcodeScanner, BarcodeFormat, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { isMobile } from "../util";

export function useQRCodeScanner (onScan: (value: Barcode[]) => void | Promise<void>, onError?: (err: any) => void | Promise<void>) {
  const [isScanning, setIsScanning] = useState(false)
  const moduleInstallRef = useRef(false)
  const isSupportedRef = useRef(false)
  const [error, setError] = useState<string | undefined>()

  async function installModule () {
    const res = await BarcodeScanner.isSupported()

    if(!res.supported) {
      throw 'not supported'
    }

    isSupportedRef.current = true
    return BarcodeScanner.installGoogleBarcodeScannerModule().then(() => {
      moduleInstallRef.current= true
    })
  }

  function stop () {
    if (isScanning) {
      BarcodeScanner.stopScan()
    }

    setIsScanning(false)
  }

  async function scan () {
    if (!isSupportedRef.current) {
      setError('QRcode non supporté sur cet appareil')
      return
    }
    if (!moduleInstallRef.current) {
      try {
        installModule()
      } catch {() => {
        setError("module indisponible")
        return
      }}
    }

    await BarcodeScanner.requestPermissions()
      .then(async({ camera }) => {
        if (camera === 'granted') {
          setError(undefined)
          const { barcodes } = await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode] })
          setIsScanning(true)
          await onScan(barcodes)
        } else {
          setError('Permissions refusées')
        }
      })
      .catch(() => setError('Error de permissions'))
  }

  useEffect(() => {
    (async() => {
      if (!isMobile) return
      try {
        const isAvailable = (await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()).available
        if (!isAvailable) {
          await installModule()

        }
        moduleInstallRef.current = true
      } catch {(err: any) => {
        console.error(err)
      }} 

      BarcodeScanner.addListener('scanError', (err) => {
        console.error('error while scanning', err)
        if (onError) {
          onError(err)
        }
      })

    })()
  }, [])

  return { scan, stop, error }
}
