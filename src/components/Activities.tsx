import type { FC } from "react";
import { useApi } from "../hook/useApi";
import type { IActivities } from "../types/activity";
import ActivityGroup from "./ActivityGroup";

const Activities: FC<{ type: string, date: string, eventId: string}> = ({ type, date, eventId }) => {
  const { data } = useApi<IActivities>(`/event/${eventId}/activities`)
  const isBoth = type === 'Voir tout'
  const isAnimations = type === 'Animations'
  const isJDR = type === 'JDR'
  return <div className="space-y-4">
    {(isBoth || isAnimations) && data?.entertainments.map((entertainment) => <ActivityGroup key={entertainment.id} type="entertainment" eventId={eventId} activity={entertainment} date={date} />)}
    {(isBoth || isJDR) && data?.rpgActivities.map(rpgActivity => <ActivityGroup key={rpgActivity.id} type="rpg-activity" eventId={eventId} activity={rpgActivity} date={date} />)}
  </div>
}

export default Activities
