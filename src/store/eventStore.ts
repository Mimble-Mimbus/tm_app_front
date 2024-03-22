import { makeAutoObservable } from 'mobx'

export class EventStore {
  eventId?: string
  constructor () {
    makeAutoObservable(this)
  }

  setEventid (str: string) {
    this.eventId = str
  }
}

export default new EventStore()
