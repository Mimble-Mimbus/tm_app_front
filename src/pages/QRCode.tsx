import { IonPage } from "@ionic/react"
import { FC, useEffect } from "react"
import QRCodeScanner from "../components/QRCodeScanner"

const QRCode: FC = () => {

  return (
    <IonPage>
      <QRCodeScanner onScan={(event) => console.log(event.barcode)} />
      
    </IonPage>
  )
}

export default QRCode
