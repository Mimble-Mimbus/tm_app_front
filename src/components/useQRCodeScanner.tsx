import { useEffect, useRef, useState } from "react";
import { BarcodeScanner, BarcodeFormat, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { isMobile } from "../utils";

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

    try {
      const status = await BarcodeScanner.checkPermissions()
      if (status.camera !== 'granted') {
        const newStatut = await BarcodeScanner.requestPermissions()
        if (newStatut.camera !== 'granted') {
          setError('Permissions refusées')
          return
        }
      }
      setError(undefined)
      const { barcodes } = await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode] })
      setIsScanning(true)
      await onScan(barcodes)
    } catch {() => {
      setError('Erreur de permissions')
    }}
  }

  useEffect(() => {
    (async() => {
      if (!isMobile) return
      try {
        const isAvailable = (await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()).available
        if (!isAvailable) {
          await installModule()
        }
        isSupportedRef.current = true
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
