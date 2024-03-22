import { IonContent, IonPage, IonRadio, IonRadioGroup } from "@ionic/react"
import { FC, useState } from "react"
import { EventParams } from "../router"
import { useMediaQuery } from "usehooks-ts"
import Activities from "../components/Activities"
import { useApi } from "../hook/useApi"
import { EventInformations, OpenDay } from "../types/event"
import { week } from "../utils/date"
import { firstToUpper } from "../utils"

const ListAnimation: FC<EventParams> = ({ match }) => {
  const id = match.params.idevent
  const { data } = useApi<EventInformations>('/get_event_informations/' + id)
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const [type, setType] = useState('Voir tout')
  const [date, setDate] = useState('Tous les jours')
  function formatOpenDay (val: OpenDay) {
    const str = week[new Date(val.dayStart).getDay()]
    return firstToUpper(str);
  }
  return (<IonPage>
    {data &&
      <IonContent class="flex flex-col h-full">
        {isOnPhone ? <>
          <div className="flex flex-col justify-center h-[25%]">
            <h1 className="w-auto text-center font-bold text-3xl mt-10 mb-16">Animations</h1>
            <div className="w-full h-12 bg-zinc-900 flex justify-around items-end">
              <div onClick={() => setType('Animations') } className="w-[45%] h-5/6 text-white text-center rounded bg-zinc-800 middle translate-y-[2px]">Animations</div>
              <div onClick={() =>  setType('JDR')} className="w-[45%] h-5/6 text-white text-center bg-zinc-800 middle translate-y-[2px]">Jeux de rôle</div>
            </div>
          </div>
          <div className="h-[70%]" >
            <Activities type={type} date={date} eventId={id} />
          </div>
        </> :
          <div className="w-full h-full flex justify-center mt-8">
            <div className="w-1/3 h-5/6 text-xl font-bold middle border-slate-950 border-2">ceci est une carte</div>
            <div className="w-1/3 h-5/6">
              <div className="w-full text-white py-1 bg-purple-base text-center">Animations dans la zone sélectionnée</div>
              <div className="bg-gray-400 h-1/4 flex justify-around items-center">
                <IonRadioGroup class="flex flex-col space-y-3" value={type} onIonChange={event => setType(event.target.value)}>
                  {['Animations', 'JDR', 'Voir tout'].map((val, index) => (<IonRadio class="w-fit" labelPlacement="end" key={index} value={val}>{val}</IonRadio>))}
                </IonRadioGroup>
                <IonRadioGroup class="flex flex-col space-y-3"  value={date} onIonChange={event => setDate(event.target.value)}>
                  {['Tous les jours',...data.openDays.map(formatOpenDay)].map((val, index) => <IonRadio labelPlacement="end" key={index} value={val} className="w-fit">{val}</IonRadio>)}
                </IonRadioGroup>
              </div>
            <Activities type={type} date={date} eventId={id} />
            </div>
          </div>
        }
      </IonContent>
    }
  </IonPage>)
}

export default ListAnimation
