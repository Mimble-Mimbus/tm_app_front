import { FC } from "react";
import { useApi } from "../hook/useApi";
import HidingContainer from "./HidingContainer";
import { Entertainement } from "../types/activity";
import { time } from "../utils/date";

const AnimationsAnim: FC<{ eventId: string}> = ({ eventId }) => {
  const { data } = useApi<Entertainement[]>(`/event/${eventId}/entertainements`)

  return <div className="flex flex-col space-y-5 mt-5">
    {data && data.map((activity, index) => (
      <HidingContainer className="mt-6 ml-8 space-y-4" key={index} title={activity.name}>
        {activity.entertainementSchedules.map((schedule, index) => (
          <div key={index}>
             <p>date : {time(new Date(schedule.start))}</p>
              <p>durée : {schedule.duration}</p>
          </div>
        ) )}
      </HidingContainer>
    ))}
  </div>
}

export default AnimationsAnim
