import { Capacitor } from "@capacitor/core";

export const isMobile = import.meta.env.VITE_REACT_APP_FORCE_MOBILE === 'true' ? true : (Capacitor.getPlatform() === 'web')

export function isNumeric(n: string) {
  //@ts-ignore
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function firstToUpper(str: string) {
  return (str.charAt(0).toUpperCase() + str.substring(1))
}
