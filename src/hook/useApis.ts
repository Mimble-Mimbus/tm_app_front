import { useEffect, useState } from "react";
import fetchApi from "../utils/axios";

export function useApis<T extends any[]>(paths: string[], dependency?: (string | number | undefined)[], onResult?: (value: T) => void) {
  //@ts-ignore
  const [data, setData] = useState<T>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)

  function refresh (index: number) {
    return fetchApi.get<T[number]>(paths[index]).then(res => {
      const newdata = [...data] as T
      newdata[index] = res.data
      setData(newdata)
    })
  }

  function set (index: number, value: any) {
    const newdata = [...data] as T
    newdata[index] = value
    setData(newdata)
  }

  useEffect(() => {
    if (dependency && (!dependency.every(val => val))) return
    Promise.all(paths.map(path => fetchApi.get<T[number]>(path).then(res => res.data))).then((data) => {
      if (onResult) onResult(data as T)
      setData(data as T)
    }).catch(err => {
      setError(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, dependency ?? [])

  return ({ data , error, isLoading, refresh, set } as const)
}
