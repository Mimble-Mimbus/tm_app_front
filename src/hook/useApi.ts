import { useEffect, useState } from "react";
import fetchApi from "../utils/axios";

export function useApi<T>(path: string, onResult?: (value: T) => void) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)
  function request () {
    return fetchApi.get<T>(path).then((res) => {
      if (onResult) onResult(res.data)
      setData(res.data)
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
