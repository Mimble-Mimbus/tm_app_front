import { useEffect, useState } from "react";
import fetchApi from "../utils/axios";
import { EventInformations } from "../types/event";
import { Entertainment, IActivities, RpgActivity } from "../types/activity";
// import { dbMutations, dbRequests } from "../storage/apiRequests";

export const apiPaths = {
  eventInformations: '/get_event_informations/{id}',
  randomEvent: '/random_event',
  activities: '/event/{eventId}/activities',
  activity: '/{activityType}/{id}'
} as const

export type ApiPathsType = {
  '/get_event_informations/{id}': EventInformations
  '/random_event': Event,
  '/event/{eventId}/activities': IActivities
  '/{activityType}/{id}': RpgActivity | Entertainment
}


export function useApi<S extends keyof ApiPathsType>(path: S, params: Record<string, string> = {} ,onResult?: (value: ApiPathsType[S]) => void) {
  const [data, setData] = useState<ApiPathsType[S] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)

  async function request () {
    let newPath: string = path

    if (params) {
      Object.keys(params).forEach(key => {
        newPath = newPath.replace(`{${key}}`, String(params[key]))
      })
    }

    // await dbRequests[path](params).then((data) => {
    //   if (onResult) onResult(data)
    //   setData(data)
    //   setIsLoading(false)
    // }).catch()
    
    await fetchApi.get<ApiPathsType[S]>(newPath).then(async({ data }) => {
      if (onResult) onResult(data)
      // await dbMutations[path](data)
      setData(data)
    }).catch(err => {
      setError(err)
    }).finally(() => {
      setIsLoading(false)
    })

  }

  useEffect(() => {
    request()
  }, [])

  return ({ data , error, isLoading, refresh: request } as const)
}
