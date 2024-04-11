import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm'
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
import { Migration1712879213036 } from './migrations/1712879213036-migration';

export const connection = new SQLiteConnection(CapacitorSQLite);

const dataSource = new DataSource({
  type: 'capacitor',
  driver: connection,
  database: 'ionic-storage',
  entities: [Entertainment, EntertainmentReservation, EntertainmentSchedule, EntertainmentType,
    RpgActivity, RpgTable, RpgReservation, Rpg, RpgZone,
    Event, OpenDay, Quest, Zone, Tag, TriggerWarning, Ticket, Paymentable, TypePaymentable, Price, Transit
  ],
  migrations: [Migration1712879213036],
})

export const em = dataSource.manager

export const DatabaseService = {
  em,
  ticketRepository: em.getRepository(Ticket),
  async getTickets () {
    return this.ticketRepository.find()
  },
}

export async function loadTickets() {
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

export default dataSource
