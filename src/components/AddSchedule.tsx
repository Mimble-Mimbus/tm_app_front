import { FC, FormEvent, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { ScheduleData } from "../types/activity";
import TextInput from "./TextInput";
import { closeOutline } from "ionicons/icons";
import { RpgZone } from "../types/rpgZone";

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
      ((valueEnd > start) && (valueEnd <= end))
  }

  function isLimited () {
    return true
  }

  function isAlreadyScheduled() {
    if (!(start && duration)) return
    let numberScheduled = 0
    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i]
      const currentstart = new Date(schedule.start)
      const actualDate = new Date(start)
      const end = new Date(currentstart.getTime())
      end.setHours(currentstart.getHours() + schedule.duration)
      const actualDuration = duration.split(':').map((val) => parseInt(val))
      const actualEnd = new Date(actualDate.getTime())
      actualEnd.setHours(actualDate.getHours() + actualDuration[0])
      actualEnd.setMinutes(actualDate.getMinutes() + actualDuration[1])
      if (currentstart.getDay() !== actualDate.getDay()) {
        continue
      }

      if (isBetween(currentstart.getTime(), end.getTime(), actualDate.getTime(), actualEnd.getTime())) {
        numberScheduled++
      }
    }

    if (numberScheduled >= rpgZone.availableTables) {
      return true
    }

    return false
  }

  function add () {
    if (!(duration && maxNumberSeats && start)) return
    if (values.some(value => value.start === start)) return
    if (isLimited()) {
      setErrorMsg(`Les horaires sont limités entre ${rpgZone.minStartHour} et ${rpgZone.maxAvailableSeatsPerTable}`)
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
    console.log(event.currentTarget.value)
    setStart(event.currentTarget.value)
  }

  return <div className="flex w-11/12 flex-col space-y-2">
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <TextInput disabled={isDisabled} type="time" label='Durée' onChange={event => setDuration(event.currentTarget.value)} />
      <TextInput max={rpgZone.maxAvailableSeatsPerTable} type="number" disabled={isDisabled} label='Nombre de place' onChange={event => setMaxNumberSeats(event.currentTarget.value)} />
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