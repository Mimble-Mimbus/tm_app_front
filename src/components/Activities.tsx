import type { FC } from "react";
import { apiPaths, useApi } from "../hook/useApi";
import ActivityGroup from "./ActivityGroup";

const Activities: FC<{ type: string, date: string, eventId: string}> = ({ type, date, eventId }) => {
  const { data } = useApi(apiPaths.activities, { eventId })
  const isBoth = type === 'Voir tout'
  const isAnimations = type === 'Animations'
  const isJDR = type === 'JDR'
  return <div className="space-y-4 [&>*:nth-child(1)]:mt-4 overflow-auto max-h-[70%] flex items-center flex-col">
    {(isBoth || isAnimations) && data?.entertainments.map((entertainment) => <ActivityGroup key={entertainment.id} type="entertainment" eventId={eventId} activity={entertainment} date={date} />)}
    {(isBoth || isJDR) && data?.rpgActivities.map(rpgActivity => <ActivityGroup key={rpgActivity.id} type="rpg-activity" eventId={eventId} activity={rpgActivity} date={date} />)}
  </div>
}

export default Activities
