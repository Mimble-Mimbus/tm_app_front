import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";

export const nativeStorage = {
  async get (key: string) {
    if (Capacitor.getPlatform() !== 'web') {
      return (await Preferences.get({ key })).value
    } else {
      return localStorage.getItem(key)
    }
  },
  async set (key: string, value: string) {
    if (Capacitor.getPlatform() !== 'web') {
      await Preferences.set({ key, value })
    } else {
      localStorage.setItem(key, value)
    }
  }
}
