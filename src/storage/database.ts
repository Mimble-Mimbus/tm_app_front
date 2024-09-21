import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm/browser'
import { Entertainment } from './entity/Entertainment';
import { EntertainmentReservation } from './entity/EntertainmentReservation';
import { EntertainmentSchedule } from './entity/EntertainmentSchedule';
import { EntertainmentType } from './entity/EntertainmentType';
import { Event } from './entity/Event';
import { OpenDay } from './entity/OpenDay';
import { RpgActivity } from './entity/RpgActivity';
import { RpgTable } from './entity/RpgTable';
import { RpgReservation } from './entity/RpgReservation';
import { Rpg } from './entity/Rpg';
import { Quest } from './entity/Quest';
import { RpgZone } from './entity/RpgZone';
import { Zone } from './entity/Zone';
import { Tag } from './entity/Tag';
import { TriggerWarning } from './entity/TriggerWarning';
import { Ticket } from './entity/Ticket';
import { Paymentable } from './entity/Paymentable';
import { TypePaymentable } from './entity/TypePaymentables';
import { Price } from './entity/Price';
import { Transit } from './entity/Transit';
import { User } from './entity/User';
import { ApiBaseEvent } from '../types/event';
import { Capacitor } from '@capacitor/core';
import { QrCodeData } from '../types/qrcode';
import { VolunteerShift } from './entity/VolunteerShift';
import { Migration1726672088066 } from './migrations/1726672088066-migration';

export const connection = new SQLiteConnection(CapacitorSQLite);
export const DB_NAME = 'ionic-storage'
export async function saveDb (){
  if (Capacitor.getPlatform() === 'web') {
    await connection.saveToStore(DB_NAME)
  }
}

const dataSource = new DataSource({
  type: 'capacitor',
  driver: connection,
  database: DB_NAME,
  entities: [
    Entertainment, EntertainmentReservation, EntertainmentSchedule, EntertainmentType,
    RpgActivity, RpgTable, RpgReservation, Rpg, RpgZone,
    Event, OpenDay, Quest, Zone, Tag, TriggerWarning, Paymentable, TypePaymentable, Price, Transit, User, Ticket, VolunteerShift
  ],
  migrations: [Migration1726672088066],
  // logging: true
})

export function repo<Entity extends ObjectLiteral>(target: EntityTarget<Entity>) {
  return em.getRepository(target)
}

export const em = dataSource.manager

export const DatabaseService = {
  em,
  ticketRepository: em.getRepository(Ticket),
  async getTickets () {
    return this.ticketRepository.find()
  },
}

export async function findOrcreate<Entity extends (ObjectLiteral & { id: number })> (target: EntityTarget<Entity>, id: number): Promise<Entity> {
  const old = await repo(target).createQueryBuilder('x').where('x.id = :id', { id }).getOne()
  //@ts-ignore
  const newItem = new target()
  newItem.id = id
  return old || newItem
}

export async function initializeEvent (eventData: ApiBaseEvent) {
  const event = await repo(Event).findOne({ where: { id: eventData.id }, relations: { zones: true, rpgZones: true }}) || new Event()
  const zones = await Promise.all(eventData.zones.map(async(data) => {
    const zone = await findOrcreate(Zone, data.id)
    zone.event = event
    zone.id = data.id
    zone.name = data.name
    return zone
  }))
  const rpgZones = await Promise.all(eventData.rpgZones.map(async(data) => {
    const rpgZone = await findOrcreate(RpgZone, data.id)
    rpgZone.event = event
    rpgZone.id = data.id
    rpgZone.name = data.name
    const zone = zones.find((item) => item.id === data.zoneId)
    if (!zone) {
      throw new Error('missing valid zoneId')
    }

    return rpgZone
  }))

  event.id = eventData.id
  event.address = eventData.address
  event.rpgZones = rpgZones.concat(event.rpgZones || [])
  event.zones = zones.concat(event.zones || [])
  await em.save([event, ...zones, ...rpgZones])

  await saveDb()
}

export async function isEventInitialized (eventId: number) {
  const event = await repo(Event).findOne({ where: { id: eventId }, relations: { zones: true, rpgZones: true }, select: { zones: true, rpgZones: true}})
  if (!event) return false

  if ((event.rpgZones.length >= 0) || (event.zones.length >= 0)) return false

  return true
}

export async function loadTickets() {
  // await repo(Ticket).clear()
  const tickets = await DatabaseService.getTickets()
  if(tickets.length === 0) {
    await Promise.all([{ username: 'pierre', email: 'emaildepierre@gmail.com', data: 'salt¤1003¤uhe5cz82¤1707007967380¤pepper'}, { username: 'paul', email: 'emaildepaul@gmail.com', data: 'salt¤2004¤fhe6cz32¤1707007967380¤pepper'}].map(data => {
      const ticket = new Ticket()
      ticket.email = data.email
      ticket.username = data.username
      ticket.data =  data.data
      
      return DatabaseService.ticketRepository.save(ticket)
    }))
  }
}

export async function registerTicket (qrCodedata: QrCodeData) {
  const ticket = new Ticket()
  const timeStamp = new Date(qrCodedata.data).getTime()
  ticket.ticketdId = qrCodedata.id.toString()
  ticket.email = qrCodedata.email
  ticket.username = qrCodedata.firstName
  ticket.data = `${import.meta.env.VITE_REACT_APP_SALT}¤${qrCodedata.type}¤${qrCodedata.rawQrcode}¤${timeStamp}¤${import.meta.env.VITE_REACT_APP_PEPPER}`

  await em.save(ticket)
}

export default dataSource
