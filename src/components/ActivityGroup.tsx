import { FC } from "react";
import HidingContainer from "./HidingContainer";
import { IonItem } from "@ionic/react";
import { time, week } from "../utils/date";
import { useMediaQuery } from "usehooks-ts";
import { firstToUpper } from "../utils";
import { ApiEntertainment, ApiRpgActivity } from "../types/activity";

interface Schedule {
  start: string
  duration: number
  id: number
}

const ActivityGroup: FC<{ activity: ApiRpgActivity | ApiEntertainment, eventId: string, date: string, type: string }> = ({ eventId, date, type, activity }) => {
  const isOnPhone = useMediaQuery('(max-width: 768px)')
  const Balise = isOnPhone ? HidingContainer : 'div' 
  function filterFromDate (val: Schedule) {
    const day = week[new Date(val.start).getDay()]
    if (date === 'Tous les jours') return true
    return date === firstToUpper(day)
  }

  return <>
    {activity.schedules.filter(filterFromDate).map((schedule) => <Balise title={activity.name} key={schedule.id} className="w-full mt-4">
      <IonItem  className="w-full" color="white" lines="none" routerLink={`/event/${eventId}/activity/${type}/${activity.id}`}> 
        <div className="w-full flex justify-between text-sm">
          <p className="w-1/3 ml-4">{firstToUpper(week[new Date(schedule.start).getDay()])} : {time(new Date(schedule.start))}</p>
          <p className="w-1/3 text-center">{activity.name}</p>
        </div>
      </IonItem>
    </Balise>)}
  </>

}

export default ActivityGroup
