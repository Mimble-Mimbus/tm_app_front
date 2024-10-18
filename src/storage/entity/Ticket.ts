import { AfterLoad, Column, Entity, PrimaryColumn } from "typeorm/browser";

@Entity("ticket")
export class Ticket {

  @PrimaryColumn({ type: 'int', unique: true })
  id!: number

  @Column('varchar')
  username!: string

  @Column('varchar')
  email!: string

  @Column('varchar')
  data!: string

  static parseDecryptedData (data: string) {
    const separatedData = data.split('¤')
    
    const conditions = [
      separatedData.length === 5,
      separatedData[0] === import.meta.env.VITE_REACT_APP_SALT,
      separatedData[separatedData.length - 1] === import.meta.env.VITE_REACT_APP_PEPPER,
    ]

    if (!conditions.every((val) => val)) {
      throw Error('invalid format')
    }

    return {
      rawQrcode: separatedData[2],
      type: separatedData[1],
      timestamp: parseInt(separatedData[3])
    }
  }

  rawQrcode!: string
  ticketdId!: string
  createdAt!: number
  type!: string

  @AfterLoad()
  async getTickedData () {
    const tickedData = Ticket.parseDecryptedData(this.data)
    const id = atob(tickedData.rawQrcode).split(':')[0]
    this.createdAt = tickedData.timestamp
    this.ticketdId = id
    this.type = tickedData.type
    this.rawQrcode = tickedData.rawQrcode
  }
}
