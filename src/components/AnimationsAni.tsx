import { FC, useState } from "react";
import { useApi } from "../hook/useApi";
import HidingContainer from "./HidingContainer";
import { Entertainment } from "../types/activity";
import { time } from "../utils/date";
import { IonButton, IonItem } from "@ionic/react";

const AnimationsAnim: FC<{ eventId: string}> = ({ eventId }) => {
  const { data } = useApi<Entertainment[]>(`/event/${eventId}/entertainements`)

  return <div className="flex flex-col space-y-5 mt-5">
    {data && data.map((activity, index) => (
      <HidingContainer className="mt-6 ml-8 space-y-4" key={index} title={activity.name}>
        {activity.entertainmentSchedules.map((schedule, index) => (
          <IonItem color="white" lines="none" routerLink={`/event/${eventId}/animation/${activity.id}`} key={index}>
            <div>
              <p>date : {time(new Date(schedule.start))}</p>
              <p>durée : {schedule.duration}</p>
            </div>
          </IonItem>
        ) )}
      </HidingContainer>
    ))}
  </div>
}

export default AnimationsAnim
