import { IonContent, IonPage } from "@ionic/react"
import { FC } from "react"
import { apiPaths, useApi } from "../hook/useApi"
import eventStore from "../store/eventStore"
import ListQuest from "../components/ListQuest"

const Quests: FC = () => {
  const id = eventStore.eventId

  if (!id) return null
  
  const { data } = useApi(apiPaths.quests, { eventId: id.toString() })

  if (!data) {
    return null
  }

  return (<IonPage>
    <IonContent>
      {data && <ListQuest quests={data} />}      
    </IonContent>
  </IonPage>)
}

export default Quests
