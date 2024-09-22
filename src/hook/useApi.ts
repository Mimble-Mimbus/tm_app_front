import { useEffect, useState } from "react";
import fetchApi from "../utils/axios";
import { ApiEvent } from "../types/event";
import { ApiActivities, ApiEntertainment, ApiRpgActivity } from "../types/activity";
import { dbMutations, dbRequests } from "../storage/apiRequests";
import { Network } from '@capacitor/network'
import { saveDb } from "../storage/database";
import { isDbAvailable } from "../utils";
import { ApiQuest } from "../types/quest";
import { ApiVolunteerShift } from "../types/VolunteerShift";

export const apiPaths = {
  eventInformations: '/get_event_informations/{id}',
  activities: '/event/{eventId}/activities',
  activity: '/{activityType}/{id}',
  quests: '/event/{eventId}/quests',
  quest: '/quest/{id}',
  volunteerShifts: '/event/{eventId}/volunteer_shifts'
} as const

export type ApiPathsType = {
  '/get_event_informations/{id}': ApiEvent
  '/event/{eventId}/activities': ApiActivities
  '/{activityType}/{id}': ApiRpgActivity | ApiEntertainment,
  '/event/{eventId}/quests': ApiQuest[]
  '/quest/{id}': ApiQuest,
  '/event/{eventId}/volunteer_shifts': ApiVolunteerShift[]
}

export function useApi<S extends keyof ApiPathsType>(path: S, params: Record<string, string> = {} ,onResult?: (value: ApiPathsType[S]) => void) {
  const [data, setData] = useState<ApiPathsType[S] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)

  let newPath: string = path

  if (params) {
    Object.keys(params).forEach(key => {
      newPath = newPath.replace(`{${key}}`, String(params[key]))
    })
  }


  async function request () {
    const status = await Network.getStatus()
    if (status.connected) {
      await fetchApi.get<ApiPathsType[S]>(newPath).then(async({ data }) => {
        if (onResult) onResult(data)
          setData(data)
        if (isDbAvailable()) {
          await dbMutations[path](data, params).catch((err) => console.error('mutation error', err))
          await saveDb()
        }
      }).catch(err => {
        setError(err)
      }).finally(() => {
        setIsLoading(false)
      })
    }

  }

  useEffect(() => {
    (async() => {
      if (isDbAvailable()) {
        await dbRequests[path](params).then((data) => {
          if (onResult) onResult(data)
          setData(data)
          setIsLoading(false)
        }).catch((err) => {
          console.error('request error', err)
        })
      }

      await request()
    })()
  }, [])

  return ({ data , error, isLoading, refresh: request } as const)
}
