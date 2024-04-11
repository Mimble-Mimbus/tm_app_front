import { EntityTarget, ObjectLiteral } from "typeorm"
import { ApiPathsType } from "../hook/useApi"
import { em } from './database'
import { Event } from "./entity/Event"

type IDbRequests = { [K in keyof ApiPathsType]: (arg: Record<string, string>) => Promise<ApiPathsType[K]>}
type IDbMutations = { [K in keyof ApiPathsType]: (arg: ApiPathsType[K]) => Promise<any>}

function repo<Entity extends ObjectLiteral>(target: EntityTarget<Entity>) {
  return em.getRepository(target)
} 

export const dbRequests: IDbRequests = {
  '/get_event_informations/{id}' : async({ id }) => {
    const eventRepo = repo(Event)
    const event = await eventRepo.findOne({ 
      where: { id: parseInt(id)}, 
      relations: { 
        opendays: true, 
        transits: true, 
        paymentables: { prices: true, typePaymentable: true }} 
      })

    if (!event) throw new Error('invalid id')

    return {
      address: event.address,
      id: event.id,
      openDays: event.opendays.map((od) => ({ dayStart: od.dayStart.toISOString(), dayEnd: od.dayEnd.toISOString() })),
      transits: event.transits.map(transit => ({...transit, arrival: transit.arrival.toISOString(), start: transit.start.toISOString()})),
      paymentables: event.paymentables.filter(item => item.typePaymentable.name !== 'consommable buvette').map((item => ({
        name: item.name,
        priceDetails: item.prices.map((price) => ({ price: price.price, priceConditions: price.priceCondition })),
        type: item.typePaymentable.name
      })))
    }
  }
}

export const dbMutations: IDbMutations = {

}