import { useEffect, useState } from "react";
import fetchApi from "../utils/axios";

export function useApi<T>(path: string, onResult?: (value: T) => void) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(undefined)

  useEffect(() => {
    fetchApi.get<T>(path).then((res) => {
      if (onResult) onResult(res.data)
      setData(res.data)
    }).catch(err => {
      setError(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return ({ data , error, isLoading } as const)
}
