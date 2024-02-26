import { useEffect, useState } from "react"

export function useAsync <S>(promise: Promise<S>) {
  const [data, setData] = useState<S | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    setIsLoading(true)
    promise.then((res) => {
      setData(res)
    }).catch(err => {
      setError(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return { data , isLoading, error }
}