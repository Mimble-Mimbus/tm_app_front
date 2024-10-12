import { PushNotifications } from '@capacitor/push-notifications'
import { Preferences } from '@capacitor/preferences';

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const hasNotification = async() => (await Preferences.get({ key: 'notification'})).value === 'true'

export async function activateNotificaton () {
  if (await hasNotification()) return
  else {
    await registerNotifications()
    await Preferences.set({ key: 'notification', value: 'true' })
  }
}

export async function disableNotifications () {
  if (await hasNotification()) {
    await PushNotifications.unregister()
    await Preferences.set({ key: 'notification', value: 'false' })
  }
}