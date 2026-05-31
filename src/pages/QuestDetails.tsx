import { IonPage } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { apiPaths, useApi } from "../hook/useApi";
import { IdParams } from "../router";
import { useQRCodeScanner } from "../components/useQRCodeScanner";
import fetchApi from '../utils/axios'

const QuestDetails: FC<IdParams<{ id: string }>> = ({ match }) => {
  const id = match.params.id
  const { data } = useApi(apiPaths.quest, { id })
  const [isOpen, setIsopen] = useState(false)
  const [msg, setMsg] = useState<string>()
  const { scan, error } = useQRCodeScanner(async(value) => {
    if (error) {
      setMsg(error)
      return
    }

    let rawValue = value[0].rawValue
    await fetchApi.post('/validate_quest', { qrCode: rawValue })
      .then((res) => {
    
      })
  })
  async function scanQrcode () {
    if (msg) {
      setIsopen(true)
    } else {
      await scan()
    }
  }

  useEffect(() => {
    if (msg) {
      setIsopen(true)
    }
  }, [msg])

  useEffect(() => {
    if (error) {
      setMsg(error)
    }
  }, [error])

  if (!data) return null

  return <IonPage>
    <div className="mt-8 mx-14 md:mx-64">
      <h1 className="text-center w-full text-2xl font-bold">{data.title}</h1>
      <div className="flex font-bold mt-10">
        <div className="flex flex-col mr-8 space-y-10">
          <div className="">zone :</div>
          <div className="">Type :</div>
          <div className="">Points :</div>
        </div>
        <div className="flex flex-col space-y-10">
          <div>{data.zone.name}</div>
          <div>{data.type}</div>
          <div>{data.points}</div>
        </div>
      </div>
      <p className="border border-gray-500 text-gray-500 mt-10 p-1 text-sm">
        {data.infos}
      </p>
    </div>
  </IonPage>
}

export default QuestDetails
