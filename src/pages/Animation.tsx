import { IonButton, IonContent, IonInput, IonItem, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption } from "@ionic/react"
import { FC, FormEvent, useEffect, useMemo, useState } from "react"
import { useApi } from "../hook/useApi"
import { Entertainment } from "../types/activity"
import { EventAndIdParams } from "../router"
import { time } from "../utils/date"
import axios from '../utils/axios'

const Animation: FC<EventAndIdParams> = ({ match }) => {
  const { data } = useApi<Entertainment>(`/entertainement/${match.params.id}`)
  const [currentScheduleId, setCurrentScheduleId] = useState<number>();
  const currenSchedule = useMemo(() => data?.entertainmentSchedules.find(schedule => schedule.id === currentScheduleId), [currentScheduleId])
  const [seats, setSeats] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [error, setError] = useState()
  const places = [1, 2 , 3, 4]

  async function submit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!(name && phoneNumber && seats && email)) return

    await axios.post('/entertainment_reservation/' + currentScheduleId, {
      name,
      phoneNumber,
      bookings: seats
    }).then(() => {
      setError(undefined)
    }).catch((err) => {
      setError(err)
    })

    
  }

  useEffect(() => {
    if (data) {
      setCurrentScheduleId(data.entertainmentSchedules[0].id)
    }
  }, [data])

  return (
    <IonPage>
      {data && <IonContent className="flex flex-col items-center">
        <div className="flex flex-col items-center mx-8 ">
          <h1 className="w-auto text-center font-bold text-3xl mt-10 mb-16">{data.name}</h1>
          <p className="text-center">{data.description}</p>
          <div className="h-px my-8 w-4/5 border-0 bg-black" />
          <p className="text-2xl mb-4">Reserver</p>
          <div className="w-full h-16 flex">
            <div className="w-1/6 h-full bg-orange-400"></div>
            <div className="w-5/6 h-full bg-orange-200 flex items-center">
              <p className="ml-5">Plus que {currenSchedule?.availableSeats} restantes !</p> 
            </div>
          </div>
          <form onSubmit={submit} className="self-start mt-8 space-y-6 w-full">
            <IonRadioGroup class="flex flex-col space-y-6 w-2/5" value={currentScheduleId} onIonChange={event => setCurrentScheduleId(event.target.value)} >
              {data.entertainmentSchedules.map(schedule => (
                <IonRadio key={schedule.id} className="text-xl" value={schedule.id} labelPlacement="end" color="purple">
                  Créneau de {time(new Date(schedule.start))}
                </IonRadio>
              ))}
            </IonRadioGroup>
            <select className="input" value={seats} onChange={(event => setSeats(parseInt(event.target.value)))}>
              {places.map((num, index) => (
                <option value={num} key={index}>{num} places</option>
              ))}
            </select>
            <input className="input" required onChange={event => setName(event.target.value)} placeholder="Votre nom" />
            <input className="input" required onChange={event => setPhoneNumber(event.target.value)} placeholder="Votre numéro de téléphone" />
            <input className="input" required onChange={event => setEmail(event.target.value)} placeholder="Votre email" />
            <IonButton type="submit" className="w-full h-14 text-lg rounded-lg" color="purple">Réserver</IonButton>
          </form>
        </div>
      </IonContent>}
    </IonPage>
  )
}

export default Animation
