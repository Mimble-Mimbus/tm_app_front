import { IonContent, IonPage, useIonRouter } from "@ionic/react"
import { FC } from "react"
import AnimationsJdr from "../components/AnimationsJdr"
import AnimationsAnim from "../components/AnimationsAni"
import { EventParams } from "../router"

const ListAnimation: FC<EventParams> = ({ match, location }) => {
  const params = new URLSearchParams(location.search)
  const id = match.params.idevent
  const router = useIonRouter()
  const type = params.get('type')

  return (<IonPage>
    <IonContent class="flex flex-col h-full">
      <div className="flex flex-col justify-center h-[25%]">
        <h1 className="w-auto text-center font-bold text-3xl mt-10 mb-16">Animations</h1>
        <div className="w-full h-12 bg-zinc-900 flex justify-around items-end">
          <div onClick={() =>  router.push(`/event/${id}/animations?type=anim`)} className="w-[45%] h-5/6 text-white text-center rounded bg-zinc-800 middle translate-y-[2px]">Animations</div>
          <div onClick={() =>  router.push(`/event/${id}/animations?type=jdr`)} className="w-[45%] h-5/6 text-white text-center bg-zinc-800 middle translate-y-[2px]">Jeux de rôle</div>
        </div>
      </div>
      <div className="h-[70%]" >
        {(type === 'jdr') &&  <AnimationsJdr eventId={id} />}
        {(type === 'anim') &&  <AnimationsAnim eventId={id} />}
      </div>
    </IonContent>
  </IonPage>)
}

export default ListAnimation
