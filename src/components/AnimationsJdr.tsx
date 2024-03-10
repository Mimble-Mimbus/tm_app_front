import { FC } from "react";
import { useApi } from "../hook/useApi";
import { RpgActivity } from "../types/activity";
import HidingContainer from "./HidingContainer";
import { IonButton } from "@ionic/react";
import { time } from "../utils/date";

const AnimationsJdr: FC<{ eventId: string}> = ({ eventId }) => {
  const { data } = useApi<RpgActivity[]>(`/event/${eventId}/rpg_activities`)

  return <div className="flex flex-col items-center mt-5 h-full justify-between">
    <div className="flex flex-col space-y-5 w-full">
      {data && data.map((activity, key) => (
        <HidingContainer className="mt-6 ml-8" title={activity.name}>
          {activity.rpgTables.map((table, index) => (
            <div key={index}>
              <p>date : {time(new Date(table.start))}</p>
              <p>durée : {table.duration}</p>
            </div>
          ))}
        </HidingContainer>
      ))}
    </div>
    <IonButton className="items-end"  shape="round" color='purple' routerLink={`/event/${eventId}/animation-creation`}>MJ - Proposer une table </IonButton>
  </div>
}

export default AnimationsJdr
