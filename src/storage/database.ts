import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm'
import { Ticket } from './entitys/Ticket';
import { Migration1705970458262 } from './migrations/1705970458262-migration'

export const connection = new SQLiteConnection(CapacitorSQLite);
const dataSource = new DataSource({
  type: 'capacitor',
  driver: connection,
  database: 'ionic-storage',
  entities: [Ticket],
  migrations: [Migration1705970458262],
})

const em = dataSource.manager

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
