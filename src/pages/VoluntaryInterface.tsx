import { IonButton, IonContent, IonIcon, IonItem, IonPage } from "@ionic/react"
import { searchOutline } from "ionicons/icons"
import { FC, useEffect, useState } from "react"
import { useQRCodeScanner } from "../components/useQRCodeScanner"
import fetchApi from '../utils/axios'
import { QrCodeData } from "../types/qrcode"
import Modal from "../components/Modal"
import Ticket, { ITicket } from "../components/TIcket"
import { useMediaQuery } from "usehooks-ts"
import { apiPaths, useApi } from "../hook/useApi"
import eventStore from "../store/eventStore"
import { ApiVolunteerShift } from "../types/VolunteerShift"
import { time, week } from "../utils/date"
import { Link } from "react-router-dom"

const VoluntaryInteface: FC = () => {
  const id = eventStore.eventId

  if (!id) return null

  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const [msg, setMsg] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)
  const [qrcodeInfo, setQrcodeInfo] = useState<ITicket>()
  const { data } = useApi(apiPaths.volunteerShifts, { eventId: id.toString()})


  function groupByDay (volunteerShifts: ApiVolunteerShift[]) {
    const groupedValues = volunteerShifts.reduce<Partial<Record<number,(ApiVolunteerShift & { start: string, end: string })[]>>>((acc, val) => {
        const day = new Date(val.shiftStart)
        const start = time(day)
        const end = time(new Date(val.shiftEnd));
        acc[day.getDay()] = [{...val, start, end }].concat(acc[day.getDay()] || [])

        return acc
    }, {})

    return Object.keys(groupedValues).sort().map(x => [week[x], groupedValues[x]] as const)
  }

  const { scan, error } = useQRCodeScanner(async(value) => {
    if (error) {
      setMsg(error)
      return
    }

    let rawValue = value[0].rawValue
    await fetchApi.post<QrCodeData>('/verify_ticket', { qrCode: rawValue })
      .then(({data}) => {
        setQrcodeInfo({...data, username: data.lastName})
      }).catch(() => {
        setMsg('invalid qrcode')
      })

    setIsOpen(true)
  })

  useEffect(() => {
    if (msg) {
      setIsOpen(true)
    }
  }, [msg])

  return (<IonPage>
    <Modal isOpen={isOpen}  toggle={setIsOpen} useBackdrop={true} onClose={() => setMsg(undefined)}>
      <div className='p-2 text-center'>
        {msg ? <p className='text-2xl text-red-600 font-bold h-full w-full p-4'>{msg}</p> :
          qrcodeInfo && <Ticket {...qrcodeInfo} />}
      </div>
    </Modal>
    <IonContent>
      <div>
      {isOnPhone &&
        <IonButton size="small" color='purple' className="w-[70px] h-[40px] flex mx-2 middle rounded-lg" onClick={scan}>
          <IonItem lines="none" color={'purple'} className="w-full h-auto text-white flex flex-col text-xs">
            <IonIcon className="h-full w-full text-white" icon={searchOutline} />
          </IonItem>
        </IonButton>
      }
      </div>
      <h1 className="text-center font-bold text-2xl md:mt-8">Bénévole</h1>
      <div className="flex flex-col items-center space-y-2 mt-10">
        <div className="button-voluntary">Planning</div>
        <div className="flex items-start w-[95%] md:flex-row flex-col justify-center">
          <div className="flex flex-col items-center mb-4 space-y-4">
            {data && [...groupByDay(data), ...groupByDay(data), ...groupByDay(data), ...groupByDay(data)].map((group, i) => <div className="w-10/12" key={i}>
              <h2 className="bg-gray-500 rounded-sm text-center text-white py-4 font-medium mb-4">Activités du {group[0]}</h2>
              <div>{group[1]?.map((val, y) => <div className="bg-gray-400 py-5 text-center space-y-4 font-medium rounded-xl text-slate-700" key={y}>
                <p>{val.start}-{val.end}</p>
                <p>Zone: {val.zone.name}</p>
                <p className="mx-6">Mission: {val.description}</p>
              </div>)}</div>
            </div>)}
          </div>
          <div className="space-y-2 w-full flex flex-col items-center">
            <a target="_blank" href="https://mimble-mimbus.fr/wp-content/uploads/2024/07/Guide-du-benevole.pdf" className="button-voluntary">Lire la charte bénévole</a>
            <a target="_blank" href="https://docs.google.com/spreadsheets/d/1FtxXAP-kRi8uICEtmEzwE0ydTzEAxm4_VGZaSzcRQ8M/edit?gid=0#gid=0" className="button-voluntary">Consulter le planning général</a>
            <Link to="/contact" className="button-voluntary">Contacter l'orga</Link>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>)
}

export default VoluntaryInteface
