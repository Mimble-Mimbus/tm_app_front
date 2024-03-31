import { useEffect, useState } from "react";
import fetchApi from "../utils/axios";

export function useApis<const T extends any[]>(paths: string[], dependency?: (string | number | undefined)[], onResult?: (value: T) => void) {
  const [data, setData] = useState<T | []>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)

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

  return ({ data , error, isLoading } as const)
}
