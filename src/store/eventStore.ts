import { makeAutoObservable } from 'mobx'

export class EventStore {
  eventId?: number
  rpgZoneId?: number
  constructor () {
    makeAutoObservable(this)
  }

  setEventid (num: number) {
    this.eventId = num
  }

  setRpgZoneId (num: number) {
    this.rpgZoneId = num
  }
}

export default new EventStore()
