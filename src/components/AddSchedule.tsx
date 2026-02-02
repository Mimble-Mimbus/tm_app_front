import { FC, FormEvent, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { ScheduleData } from "../types/activity";
import TextInput from "./TextInput";
import { closeOutline } from "ionicons/icons";
import { RpgZone } from "../types/rpgZone";
import { AnimationCreationLabels } from "../constants/label";

interface IAddSchedule {
  values: ScheduleData[], 
  setValues: (values: ScheduleData[]) => void
  rpgZone: RpgZone
}

const AddSchedule: FC<IAddSchedule> = ({ values, setValues, rpgZone }) => {
  const [duration, setDuration] = useState<string>()
  const [start, setStart] = useState<string>()
  const [maxNumberSeats, setMaxNumberSeats]= useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const isDisabled =  values.length > 0
  const schedules = rpgZone.rpgTables

  function isBetween (start: number, end: number, valueStart: number, valueEnd: number) {
    return ((valueStart >= start) && (valueStart < end)) ||
      ((start >= valueStart) && (start <= valueEnd))
  }

  function isLimited () {
    if (!(start)) return false

    const actualDate = new Date(start).getHours()
    
    const startLimit = parseInt(rpgZone.minStartHour.replace('h', ''))
    const endLimit = parseInt(rpgZone.maxEndHour.replace('h', ''))
    if ((actualDate < startLimit) || (actualDate > endLimit)) {
      return true
    }

    return false
  }
  function addboth (date: Date, duration: string) {
    const durations = duration.split(':').map((val) => parseInt(val))
    date.setHours(date.getHours() + durations[0])
    date.setMinutes(date.getMinutes() + durations[1])
  } 

  function addhour (date: Date, duration: number) {
    date.setHours(date.getHours() + duration)
  }

  function isAlreadyScheduled() {
    if (!(start && duration)) return false
    let numberScheduled = 0
    for (const schedule of [...schedules,...values]) {
      const currentstart = new Date(schedule.start)
      const actualDate = new Date(start)
      const end = new Date(currentstart.getTime())

      if (typeof schedule.duration === 'string') {
        addboth(end, schedule.duration)
      } else {
        addhour(end, schedule.duration)
      }

      const actualDuration = duration.split(':').map((val) => parseInt(val))
      const actualEnd = new Date(actualDate.getTime())
      actualEnd.setHours(actualDate.getHours() + actualDuration[0])
      actualEnd.setMinutes(actualDate.getMinutes() + actualDuration[1])
      if (currentstart.getDay() !== actualDate.getDay()) {
        continue
      }

      if (numberScheduled > rpgZone.availableTables) {
        return true
      }

      if (isBetween(currentstart.getTime(), end.getTime(), actualDate.getTime(), actualEnd.getTime())) {
        numberScheduled++
      }
    }

    

    return false
  }

  function add () {
    if (!(duration && maxNumberSeats && start)) return
    if (isLimited()) {
      setErrorMsg(`Les horaires sont limités entre ${rpgZone.minStartHour} et ${rpgZone.maxEndHour}`)
      return
    }

    if (isAlreadyScheduled()) {
      setErrorMsg("le créneau n'est pas disponible")
      return
    }

    setErrorMsg(undefined)
    setValues([...values, {
      start,
      duration,
      maxNumberSeats,
    }])
  }

  function deleteValue (val: number) {
    setValues([...values].filter((_, index) => !(index === val)))
  }

  function format (val: ScheduleData) {
    return `${val.start} durée: ${val.duration} place: ${val.maxNumberSeats}`
  }

  function onDateChange (event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    const actualDate = new Date(value)


    let isValid = false
    for (const date of rpgZone.openDays) {
      const openDay = new Date(date.dayStart)
      if (openDay.getDay() === actualDate.getDay()) {
        isValid = true
      }
    }
    
    if (!isValid) {
      setErrorMsg("La date que vous avez sélectionné ne fait partie des jours de l'évenement")
      return
    }
    setErrorMsg(undefined)
    setStart(event.currentTarget.value)
  }

  return <div className="flex w-11/12 flex-col space-y-2">
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <TextInput label={AnimationCreationLabels.duration} readonly={isDisabled} placeHolder="Temps en heure" type="time" onChange={event => setDuration(event.currentTarget.value)} />
      <TextInput label={AnimationCreationLabels.maxNumberSeats} readonly={isDisabled} max={rpgZone.maxAvailableSeatsPerTable} placeHolder="Nombre de place maximum" type="number"  onChange={event => setMaxNumberSeats(event.currentTarget.value)} />
      <div className="h-fit ml-6 mt-6">
        <div>Début: {rpgZone.minStartHour}</div>
        <div>Fin: {rpgZone.maxEndHour}</div>
      </div>
      <TextInput type="datetime-local" label='Date' onChange={onDateChange} />
      <IonButton onClick={add} className="h-1/2 self-end mb-[6px]" color='purple'> ajouter</IonButton>
    </div>
    {errorMsg && <div className="text-red-500 font-bold ml-4">{errorMsg}</div>}
    <div className="flex flex-wrap mt-4 ml-4">
      {values.map(((value, index) => <div 
        className="py-1 px-2 bg-purple-base text-white text-xs font-bold rounded-xl mb-3 mr-3 flex items-center gap-2" 
        key={index}
      > 
      {format(value)} <IonIcon icon={closeOutline} className="text-lg" color="white"  onClick={() => deleteValue(index)}/> </div>))}
    </div>
  </div>
}

export default AddSchedule