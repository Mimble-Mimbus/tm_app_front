import { IonButton, IonContent, IonPage, IonRadio, IonRadioGroup } from "@ionic/react"
import { FC, useState } from "react"
import { EventParams } from "../router"
import { useMediaQuery } from "usehooks-ts"
import Activities from "../components/Activities"
import { apiPaths, useApi } from "../hook/useApi"
import { ApiOpenDay } from "../types/event"
import { week } from "../utils/date"
import { firstToUpper } from "../utils"
import authStore from "../store/authStore"

const ListAnimation: FC<EventParams> = ({ match }) => {
  const id = match.params.idevent
  const { data } = useApi(apiPaths.eventInformations , { id } ) 
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const [type, setType] = useState('Voir tout')
  const [date, setDate] = useState('Tous les jours')
  function formatOpenDay (val: ApiOpenDay) {
    const str = week[new Date(val.dayStart).getDay()]
    return firstToUpper(str);
  }
  return (<IonPage>
    {data &&
        <IonContent className="h-full w-full">
          <div className="flex flex-col h-full w-full">
          {isOnPhone ? <>
            <div className="flex flex-col justify-center h-[200px]">
              <h1 className="w-auto text-center font-bold text-3xl mt-10 mb-16">Animations</h1>
              <div className="w-full h-12 bg-zinc-900 flex justify-around items-end">
                <div onClick={() => setType('Animations') } className="w-[45%] h-5/6 text-white text-center rounded bg-zinc-800 middle translate-y-[2px]">Animations</div>
                <div onClick={() =>  setType('JDR')} className="w-[45%] h-5/6 text-white text-center bg-zinc-800 middle translate-y-[2px]">Jeux de rôle</div>
              </div>
            </div>
            <Activities type={type} date={date} eventId={id} />
          </> :
            <div className="w-full h-5/6 flex justify-center mt-8">
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
            {(isOnPhone && (type === 'JDR') && authStore.isLogged) && <IonButton color={'purple'} routerLink={`/event/${id}/animation-creation`}  className="md:max-w-[33%] self-center mt-6" shape="round">Proposer une table de jdr</IonButton>}
          </div>
      </IonContent>
    }
  </IonPage>)
}

export default ListAnimation
