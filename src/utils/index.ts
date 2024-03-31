import { Capacitor } from "@capacitor/core";

export const isMobile = import.meta.env.VITE_REACT_APP_FORCE_MOBILE === 'true' ? true : (Capacitor.getPlatform() === 'web')

export function isNumeric(n: string) {
  //@ts-ignore
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function firstToUpper(str: string) {
  return (str.charAt(0).toUpperCase() + str.substring(1))
}

export function getDataFromForm<const T extends Record<string, string>>(labels: T, target: HTMLFormElement) {
  const formData = Object.fromEntries(new FormData(target).entries()) as Record<string , string>
  const data = Object.keys(labels).reduce((acc, val) => {
    acc[val] = formData[labels[val]]

    return acc
  }, {} as Record<keyof typeof labels, string>)

  return data
}
