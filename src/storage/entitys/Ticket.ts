import { AfterLoad, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { decrypt, encrypt } from "../../utils/crypto";

@Entity("ticket")
export class Ticket {

  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column('varchar')
  username!: string

  @Column('varchar')
  email!: string

  @Column('varchar')
  data!: string


  static parseEncryptedData (data: string) {
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
      tickedId: separatedData[2],
      type: separatedData[1],
      timestamp: parseInt(separatedData[3])
    }
  }

  ticketdId!: string
  createdAt!: number
  type!: string

  @AfterLoad()
  async getTickedData () {
    const decryptedData = await decrypt(this.data)
    const tickedData = Ticket.parseEncryptedData(decryptedData)

    this.createdAt = tickedData.timestamp
    this.ticketdId = tickedData.tickedId
    this.type = tickedData.type
  }

  @BeforeInsert()
  async encrypt () {
    this.data = await encrypt(this.data)
  }
}
