import { IonButton, IonContent, IonPage, IonRadio, IonRadioGroup } from "@ionic/react"
import { FC, FormEvent, useEffect, useMemo, useState } from "react"
import { useApi } from "../hook/useApi"
import { Entertainment, RpgActivity, Schedule } from "../types/activity"
import { EventAndIdParams } from "../router"
import { time, week } from "../utils/date"
import fetchApi from '../utils/axios'
import { AxiosError } from "axios"
import Modal from '../components/Modal'
import { useMediaQuery } from "usehooks-ts"
import { useWindow } from "../hook/useWindow"
import { ConstraintError } from "../types"
import FormError from "../components/FormError"

const Animation: FC<EventAndIdParams<{ type: string }>> = ({ match }) => {
  const { params } = match
  const { data } = useApi<Entertainment | RpgActivity>(`/${params.type.replace('-', '_')}/${params.id}`)
  const [currentScheduleId, setCurrentScheduleId] = useState<number>();

  const currentSchedule = useMemo<Schedule | undefined>(function () {
    if (!data) return

    return data.schedules.find(schedule => schedule.id === currentScheduleId)
  }, [currentScheduleId, data])

  const [seats, setSeats] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [isOpen, toggle] = useWindow()
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const places = [1, 2 , 3, 4]

  async function submit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!(name && phoneNumber && seats && email)) return
    const url = 'userGm' in data! ? '/rpg_reservation/' : '/entertainment_reservation/'
    await fetchApi.post(url + currentScheduleId, {
      name,
      phoneNumber,
      bookings: seats,
      email
    }).then(() => {
      toggle()
    }).catch()
  }

  useEffect(() => {
    if (data) {
      setCurrentScheduleId(data.schedules[0].id)
    }
  }, [data])

  return (
    <IonPage>
      <Modal isOpen={isOpen} toggle={toggle} useBackdrop={true}>
        <div className="text-green-500 font-bold h-full w-full opacity-100">{'Votre réservation a bien été éffectuée'}</div>
      </Modal>
      {data && <IonContent className="w-full">
        <div className="flex flex-col w-full items-center px-8 md:px-0">
          <h1 className="md:bg-gray-400 title py-2 w-full text-center md:w-2/3">{data.name}</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between md:w-2/3 w-full mt-2">
            {isOnPhone ?  
              <p className="text-center">{data.description}</p> :
              <div className="flex flex-col w-[47%] text-center items-center">
                <p className="w-full bg-gray-400 py-2 text-xl font-medium">Description</p>
                <p className="mt-6 w-11/12 text-start">{data.description}</p>
              </div>
            }
            
            {isOnPhone && <div className="h-px my-6 border-0 bg-black w-full font-semibold" />}
            <div className="md:w-[47%]">
              {isOnPhone ? 
                <p className="text-2xl mb-4 text-center">Reserver</p>:
                <p className="text-xl py-2 bg-gray-400 font-medium text-center">Horaires et zones</p>
              }
              <div className="w-full h-16 flex">
                <div className="w-1/6 h-full bg-orange-400"></div>
                <div className="w-5/6 h-full bg-orange-200 flex items-center">
                  <p className="ml-5">Plus que {currentSchedule?.availableSeats} restantes !</p> 
                </div>  
              </div>
              <form onSubmit={submit} className="self-start mt-8 space-y-6 w-full">
                <IonRadioGroup class="flex flex-col space-y-6 w-full" value={currentScheduleId} onIonChange={event => setCurrentScheduleId(event.target.value)} >
                  {data.schedules.map(schedule => {
                    const date = new Date(schedule.start)
                    return <IonRadio key={schedule.id} className="text-xl md:text-base w-full" value={schedule.id} justify="start" labelPlacement="end" color="purple">
                       Créneau de {week[date.getDay()]} {time(date)}
                    </IonRadio>
                  })}
                </IonRadioGroup>
                <select className="input" value={seats} onChange={(event => setSeats(parseInt(event.target.value)))}>
                  {places.map((num, index) => (
                    <option value={num} key={index}>{num} places</option>
                  ))}
                </select>
                <input className="input" required onChange={event => setName(event.target.value)} placeholder="Votre nom" />
                <FormError path="name"/>
                <input type="number" className="input" required onChange={event => setPhoneNumber(event.target.value)} placeholder="Votre numéro de téléphone" />
                <FormError path="phoneNumber"/>
                <input className="input" required onChange={event => setEmail(event.target.value)} placeholder="Votre email" />
                <FormError path="email"/>
                <IonButton type="submit" className="w-full h-14 text-lg rounded-lg" color="purple">Réserver</IonButton>
              </form>
            </div>
          </div>
        </div>
      </IonContent>}
    </IonPage>
  )
}

export default Animation
