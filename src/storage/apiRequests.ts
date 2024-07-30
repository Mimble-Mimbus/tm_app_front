import { ObjectLiteral } from "typeorm/browser"
import { ApiPathsType } from "../hook/useApi"
import { em, findOrcreate, initializeEvent, isEventInitialized } from './database'
import { Event } from "./entity/Event"
import { RpgActivity } from "./entity/RpgActivity"
import { Entertainment } from "./entity/Entertainment"
import { EntertainmentSchedule } from "./entity/EntertainmentSchedule"
import { RpgZone } from "./entity/RpgZone"
import { Zone } from "./entity/Zone"
import { AActivitySchedule } from "./entity/abstract/AActivitySchedule"
import { Rpg } from "./entity/Rpg"
import { RpgTable } from "./entity/RpgTable"
import { ApiEntertainment, ApiRpgActivity } from "../types/activity"
import { User } from "./entity/User"
import { EntertainmentType } from "./entity/EntertainmentType"
import { Paymentable } from "./entity/Paymentable"
import { TypePaymentable } from "./entity/TypePaymentables"
import { Price } from "./entity/Price"
import { repo } from "./database"
import fetchApi from '../utils/axios'
import { ApiBaseEvent } from "../types/event"
import { Transit } from "./entity/Transit"
import { OpenDay } from "./entity/OpenDay"
import { Quest } from "./entity/Quest"

type IDbRequests = { [K in keyof ApiPathsType]: (arg: Record<string, string>) => Promise<ApiPathsType[K]>}
type IDbMutations = { [K in keyof ApiPathsType]: (arg: ApiPathsType[K], params: Record<string, string>) => Promise<any>}

function schedules (schedules: (AActivitySchedule & { id: number })[]) {
  return schedules.map((data) => ({
    id: data.id,
    start: data.start,
    duration: data.duration,
    availableSeats: data.availableSeats
  }))
}

function removeDuplicate<T extends ObjectLiteral & { id: number }>(data : T[]) {
  return data.reduce((acc, current) => {
    const exists = acc.find(item => {
      return item.id === current.id
    })

    if(!exists) { 
      acc = acc.concat(current)
    }
    return acc
  }, [] as T[])
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
      openDays: event.opendays.map((od) => ({ dayStart: od.dayStart, dayEnd: od.dayEnd, id: od.id })),
      transits: event.transits.map(transit => ({...transit, arrival: transit.arrival, start: transit.start, id: transit.id})),
      paymentables: event.paymentables.filter(item => item.typePaymentable.name !== 'consommable buvette').map((item => ({
        id: item.id,
        name: item.name,
        priceDetails: item.prices.map((price) => ({ price: price.value, priceConditions: price.priceCondition, id: price.id })),
        typePaymentable: item.typePaymentable
      })))
    }
  },
  '/{activityType}/{id}': async ({ activityType, id }) => {
    if (!['rpg_activity', 'entertainment'].includes(activityType)) {
      throw new Error('invalid activity type ' + activityType)
    }
    
    if (activityType === 'entertainment') {
      const animation = await repo(Entertainment).findOne({ 
        where: { id: parseInt(id) }, 
        relations: { entertainmentSchedules: true, entertainmentType: true, zone: { event: true }, },
      })

      if (!animation) {
        throw new Error('invalid id')
      }

      return {
        eventId: animation.zone.event.id,
        name: animation.name,
        description: animation.description,
        id: animation.id,
        zoneId: animation.zone.id,
        schedules: animation.entertainmentSchedules.map((schedule) => ({ 
          id: schedule.id, 
          start: schedule.start, 
          duration: schedule.duration, 
          availableSeats: schedule.availableSeats 
        })),
        entertainmentType: {
          description: animation.entertainmentType.description,
          name: animation.entertainmentType.name,
          id: animation.entertainmentType.id
        } as ApiEntertainment
      }
    } else {
      const rpgActivity = await repo(RpgActivity).findOne({ where: { id: parseInt(id) }, relations: { rpgTables: true, rpgZone: true, user: true }})

      if (!rpgActivity) {
        throw new Error('invalid id')
      }

      return {
        name: rpgActivity.name,
        description: rpgActivity.description,
        id: rpgActivity.id,
        rpgZoneId: rpgActivity.rpgZone.id,
        userGm: { id: rpgActivity.user.id, name: rpgActivity.user.name },
        schedules: rpgActivity.rpgTables.map((table) => ({
          id: table.id,
          duration: table.duration,
          start: table.start,
          availableSeats: table.availableSeats
        }))
      } as ApiRpgActivity
    }
  },
  '/event/{eventId}/activities': async ({ eventId }) => {
    const rpgActivities = await repo(RpgActivity).find({
      where: { rpgZone: { event: { id: parseInt(eventId) }}},
      relations: { rpgZone: { event: true } , rpgTables: true, user: true, rpg: true }
    })
    const entertainments = await repo(Entertainment).find({
      where: { zone: { event: { id: parseInt(eventId) }}},
      relations: { zone: { event: true }, entertainmentSchedules: true, entertainmentType: true }
    })

    return {
      entertainments: entertainments.map((data) =>({
        eventId: data.zone.event.id,
        description: data.description,
        id: data.id,
        name: data.name,
        schedules: schedules(data.entertainmentSchedules),
        zoneId: data.zone.id,
        entertainmentType: {
          description: data.entertainmentType.description,
          id: data.entertainmentType.id,
          name: data.entertainmentType.name
        }
      })),
      rpgActivities: rpgActivities.map((data) => ({
        eventId: data.rpgZone.event.id,
        description: data.description,
        id: data.id,
        name: data.name,
        rpgZoneId: data.rpgZone.id,
        schedules: schedules(data.rpgTables),
        userGm: {
          id: data.user.id,
          name: data.user.name
        },
        rpg: {
          id: data.rpg.id,
          name: data.rpg.name,
          description: data.rpg.description,
          publisher: data.rpg.publisher,
          universe: data.rpg.universe,
        }
      }))
    }
  },
  '/event/{eventId}/quests': async ({ eventId }) => {
    const quests = await repo(Quest).find({ where: { event: { id: parseInt(eventId)} }, relations: { zone: true }})
    return quests.map(quest => ({
      id: quest.id,
      title: quest.title,
      isFullFilled: quest.isFullFilled,
      infos: quest.infos,
      zone: {
        id: quest.zone.id,
        name: quest.zone.name
      },
      type: quest.type,
      points: quest.points
    }))
  },
  '/quest/{id}': async ({ id }) => {
    const quest = await repo(Quest).findOne({ where: { id: parseInt(id) }, relations: { zone: true }})
    
    if (!quest) throw new Error('invalid quest id')

    return {
      id: quest.id,
      title: quest.title,
      isFullFilled: quest.isFullFilled,
      infos: quest.infos,
      zone: {
        id: quest.zone.id,
        name: quest.zone.name
      },
      type: quest.type,
      points: quest.points
    }
  }
}

export const dbMutations: IDbMutations = {
  '/get_event_informations/{id}': async (event) => {
    const entity = await findOrcreate(Event, event.id)
    entity.address = event.address
    entity.id = event.id
    entity.transits = await Promise.all(event.transits.map(async(data) => {
      const transit = await findOrcreate(Transit, data.id)
      transit.address = data.address
      transit.arrival = data.arrival
      transit.availableSeats = data.availableSeats
      transit.name = data.name
      transit.start = data.start
      return transit
    }))
    entity.opendays = await Promise.all(event.openDays.map(async(data) => {
      const openDay = await findOrcreate(OpenDay, data.id)
      openDay.dayEnd = data.dayEnd
      openDay.dayStart = data.dayStart
      return openDay
    }))
    entity.paymentables = await Promise.all(event.paymentables.map(async(data) => {
      const paymentable = await findOrcreate(Paymentable, data.id)
      paymentable.event = entity
      paymentable.id = data.id
      paymentable.name = data.name
      const type = await repo(TypePaymentable).findOne({ where: { id: data.typePaymentable.id }, relations: { paymentables: true }}) || new TypePaymentable()
      type.paymentables = [paymentable].concat(type.paymentables || [])
      paymentable.typePaymentable = Object.assign(type, data.typePaymentable)
      paymentable.prices = await Promise.all(data.priceDetails.map(async(priceDEtail) => {
        const price = await findOrcreate(Price, priceDEtail.id)
        price.paymentable = paymentable
        price.value = priceDEtail.price
        price.priceCondition = priceDEtail.priceCondition
        price.id = price.id
        return price
      }))
      return paymentable
    }))
    await em.save([entity, ...removeDuplicate(entity.paymentables.map(x => x.typePaymentable).flat()), ...entity.transits])
  },
  '/event/{eventId}/activities': async (data, { eventId }) => {
    if(!await isEventInitialized(parseInt(eventId))) {
      const event = (await fetchApi<ApiBaseEvent>('/event/' + eventId)).data
      await initializeEvent(event)
    }
    const values = await Promise.all([
      Promise.all(data.entertainments.map(async(entertainment) => {
        const entity = await findOrcreate(Entertainment, entertainment.id)
        const zone = await repo(Zone).findOneBy({ id: entertainment.zoneId })

        if (!zone) {
          throw new Error('invalid zone id ' + entertainment.zoneId)
        }
        const entertainementType = await findOrcreate(EntertainmentType, entertainment.entertainmentType.id)
        entertainementType.description = entertainment.entertainmentType.description
        entertainementType.name = entertainment.entertainmentType.name
        entity.zone = zone
        zone.entertainments = [entity].concat(zone.entertainments || [])
        entity.description = entertainment.description
        entity.name = entertainment.name
        entity.entertainmentType = entertainementType
        entity.entertainmentSchedules = await Promise.all(entertainment.schedules.map(async(schedule) => {
          const entertainmentSchedule = await findOrcreate(EntertainmentSchedule, schedule.id)
          entertainmentSchedule.availableSeats = schedule.availableSeats
          entertainmentSchedule.duration = schedule.duration
          entertainmentSchedule.start = schedule.start
          entertainmentSchedule.entertainement = entity

          return entertainmentSchedule
        }))

        return entity
      })),
      Promise.all(data.rpgActivities.map(async(rpgActivity) => {
        const entity = await findOrcreate(RpgActivity, rpgActivity.id)
        const rpgZone = await repo(RpgZone).findOneBy({ id: rpgActivity.rpgZoneId })

        if (!rpgZone) {
          throw new Error('invalide rpgZone id')
        }
        const rpg = await repo(Rpg).findOne({ where: { id: rpgActivity.rpg.id }, relations: { rpgActivities: true }}) || new Rpg()
        rpg.description = rpgActivity.rpg.description
        rpg.name = rpgActivity.rpg.name
        rpg.publisher = rpgActivity.rpg.publisher
        rpg.universe = rpgActivity.rpg.universe
        entity.description = rpgActivity.description
        entity.rpg = rpg
        entity.name = rpgActivity.name
        entity.description = rpgActivity.description
        entity.rpgZone = rpgZone
        rpgZone.rpgActivities = [entity].concat(rpgZone.rpgActivities)
        entity.user = Object.assign(await findOrcreate(User, rpgActivity.userGm.id), rpgActivity.userGm)
        entity.rpgTables = await Promise.all(rpgActivity.schedules.map(async(schedule) => {
          const rpgTable = await findOrcreate(RpgTable, schedule.id)
          rpgTable.availableSeats = schedule.availableSeats
          rpgTable.duration = schedule.duration
          rpgTable.start = schedule.start
          rpgTable.rpgActivity = entity
          return rpgTable
        }))

        return entity
      }))
    ])

    const entertainments = values[0]
    const rpgActivities = values[1]
    await em.save([...removeDuplicate(rpgActivities.map(x => x.rpg)), ...removeDuplicate(entertainments.map(x => x.entertainmentType))])

    rpgActivities.forEach((x) => {
      x.rpg.rpgActivities = [x].concat(rpgActivities || [])
    })
    entertainments.forEach(x => {
      x.entertainmentType.entertainments = [x].concat(entertainments || [])
    })

    await em.save([
      ...rpgActivities.map(x => x.user),
      ...entertainments, ...rpgActivities,
      ...removeDuplicate(rpgActivities.map(x => x.rpg)),
      ...removeDuplicate(entertainments.map(x => x.entertainmentType)),
      ...entertainments.map(x => x.entertainmentSchedules).flat(), 
      ...rpgActivities.map(x => x.rpgTables).flat(), 
    ])
  },
  '/{activityType}/{id}': async (activity, { activityType, id }) => {
    if (!['rpg_activity', 'entertainment'].includes(activityType)) {
      throw new Error('invalid activity type ' + activityType)
    }
    if(!(await repo(Event).exists({ where: { id: activity.eventId }}))) {
      const event = (await fetchApi<ApiBaseEvent>('/event/' + activity.eventId)).data
      await initializeEvent(event)
    }

    const isRpg = (_activity: ApiEntertainment | ApiRpgActivity): _activity is ApiRpgActivity => activityType === 'rpg_activity'

    if (isRpg(activity)) {
      const entity = await findOrcreate(RpgActivity, parseInt(id))
      const rpgZone = await findOrcreate(RpgZone ,activity.rpgZoneId)
      entity.description = activity.description
      entity.id = activity.id
      entity.name = activity.name
      entity.rpgZone = rpgZone
      entity.rpgTables = await Promise.all(activity.schedules.map(async(schedule) => {
        const rpgTable = await findOrcreate(RpgTable, schedule.id)
        rpgTable.availableSeats = schedule.availableSeats
        rpgTable.duration = schedule.duration
        rpgTable.start = schedule.start
        rpgTable.rpgActivity = entity

        return rpgTable
      }))
      entity.rpg = Object.assign(await findOrcreate(Rpg, activity.rpg.id), activity.rpg)
      entity.user = Object.assign(await findOrcreate(User, activity.userGm.id), activity.userGm)
      await em.save([entity.rpg, entity.user])
      entity.rpg.rpgActivities = [entity].concat(entity.rpg.rpgActivities)
      entity.user.rpgActivities = [entity].concat(entity.user.rpgActivities)
      await em.save([entity,...entity.rpgTables, entity.rpg, entity.user])
      rpgZone.rpgActivities = [entity].concat(rpgZone.rpgActivities || [])
      await em.save(entity.rpgZone)
    } else {
      const entity = await findOrcreate(Entertainment, activity.id)
      const zone = await findOrcreate(Zone, activity.zoneId)
      entity.zone = zone
      entity.description = activity.description
      entity.id = activity.id
      entity.name = activity.name
      entity.entertainmentSchedules = await Promise.all(activity.schedules.map(async(schedule) => {
        const entertainmentSchedule = await findOrcreate(EntertainmentSchedule, schedule.id)
        entertainmentSchedule.availableSeats = schedule.availableSeats
        entertainmentSchedule.duration = schedule.duration
        entertainmentSchedule.id = schedule.id
        entertainmentSchedule.start = schedule.start
        entertainmentSchedule.entertainement = entity

        return entertainmentSchedule
      }))

      const entertainmentType = Object.assign(await findOrcreate(EntertainmentType, activity.entertainmentType.id), activity.entertainmentType)
      await em.save(entertainmentType)
      entity.entertainmentType = entertainmentType
      entertainmentType.entertainments = [entity].concat(entertainmentType.entertainments)
      await em.save([entity, entity.entertainmentType, ...entity.entertainmentSchedules])
      zone.entertainments = [entity].concat(zone.entertainments || [])
      await em.save(zone)
    }
  },
  '/event/{eventId}/quests': async (quests, {eventId}) => {
    if(!await isEventInitialized(parseInt(eventId))) {
      const event = (await fetchApi<ApiBaseEvent>('/event/' + eventId)).data
      await initializeEvent(event)
    }

    let event = await repo(Event).findOneBy({ id: parseInt(eventId)})

    if (!event) throw new Error('invalid eventId')

    const entities = await Promise.all(quests.map(async(quest) => {
      const entity = await findOrcreate(Quest, quest.id)
      const zone = await findOrcreate(Zone, quest.zone.id)
      entity.infos = quest.infos
      entity.isFullFilled = quest.isFullFilled
      entity.points = quest.points
      entity.type = quest.type
      entity.zone = zone
      entity.title = quest.title
      entity.id = quest.id

      return entity
    }))

    await em.save([...entities, event])
  },
  '/quest/{id}': async (quest, {id}) => {
    const entity = await findOrcreate(Quest, parseInt(id))
    const zone = await findOrcreate(Zone, quest.zone.id)

    entity.infos = quest.infos
    entity.isFullFilled = quest.isFullFilled
    entity.points = quest.points
    entity.type = quest.type
    entity.zone = zone
    entity.title = quest.title
    entity.id = quest.id

    await em.save(entity)
  }
}
