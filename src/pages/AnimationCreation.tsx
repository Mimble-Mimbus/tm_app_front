import { IonButton, IonContent, IonPage } from "@ionic/react"
import { FC, FormEvent, useMemo, useState } from "react"
import TextInput from "../components/TextInput"
import { TagsAndTriggers } from "../types/tags-triggerCarnings"
import { ApiRpg, RpgData } from "../types/rpg"
import { Schedule, ScheduleData } from "../types/activity"
import { useApis } from "../hook/useApis"
import IconButton from "../components/IconeButton"
import { add, closeOutline, refresh } from 'ionicons/icons'
import Modal from "../components/Modal"
import SelectAndAdd, { Value } from "../components/SelectAndAdd"
import Select from 'react-select'
import RpgForm from "../components/RpgForm"
import { useWindow } from "../hook/useWindow"
import AddSchedule from "../components/AddSchedule"
import { getDataFromForm } from "../utils"
import eventStore from "../store/eventStore"
import { observer } from "mobx-react"
import { RpgZone } from "../types/rpgZone"
import { AnimationCreationLabels } from "../constants/label"
import fetchApi from '../utils/axios'
import FormError from "../components/FormError"

const AnimationCreation: FC = () => {
  const id = eventStore.rpgZoneId
  const { data, set } = useApis<[TagsAndTriggers, ApiRpg[], RpgZone]>(['/tags_and_trigger_warnings', '/rpgs', '/rpg_zone/' + id], [id])
  const [tagsAndTriggers, rpgs, rpgZone] = data
  const [isRpgOpen, toggleRpg] = useWindow()
  const [isSuccess, toggleSuccess] = useWindow()
  const [tags, setTags] = useState<Value[]>([])
  const [triggerWarnings, setTriggerWarnings] = useState<Value[]>([])
  const [currentRpgId, setCurrentRpgId] = useState<number>()
  const [newRpg, setNewRpg] = useState<RpgData>()
  const [newSchedules, setNewSchedules] = useState<ScheduleData[]>([]) 
  const currentRpg = useMemo(() => rpgs?.find(rpg => rpg.id === currentRpgId), [currentRpgId])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = getDataFromForm(AnimationCreationLabels ,event.currentTarget)
    const response: any = {...data}
    response.rpgData = newRpg || currentRpgId
    response.schedules = newSchedules
    response.tags = tags.map(tag => tag.id)
    response.triggerWarnings = triggerWarnings.map(tw => tw.id)

    return fetchApi.post<{ id: number, schedules: Schedule[]}>('/rpg_activity/' +  rpgZone?.id, response).then(res => {
      toggleSuccess()
      const newRpgzone = {...rpgZone, rpgTables: [...rpgZone!.rpgTables, ...res.data.schedules ]}
      set(2, newRpgzone)
    })
  }

  function inverseRpg () {
    if (newRpg) {
      setNewRpg(undefined)
    } else {
      toggleRpg()
    }
  }

  return (
    (tagsAndTriggers && rpgs && rpgZone) &&
    <IonPage>
      <Modal isOpen={isRpgOpen} toggle={toggleRpg} useBackdrop={true}>
        <RpgForm tagsAndTriggerWarnings={tagsAndTriggers} setRpg={setNewRpg} onSubmit={toggleRpg} />
      </Modal>
      <Modal isOpen={isSuccess} toggle={toggleSuccess} timeout={3000} useBackdrop={true}>
        <div className="text-green-500 font-bold h-full w-full p-6 opacity-100">Votre activité a été réservé avec succès</div>
      </Modal>
      <IonContent className="w-full">
        <h1 className="title">Proposer un table de jdr</h1>
        <form  onSubmit={submit} className="w-full flex-col middle">
          <div className="w-full flex-col middle space-y-4">
            <TextInput required={true}  label={AnimationCreationLabels.name} placeHolder="Nom de la table" />
            <TextInput required={true} textArea={true} label={AnimationCreationLabels.description} placeHolder="Description de la table" />
            <AddSchedule values={newSchedules} setValues={setNewSchedules} rpgZone={rpgZone} />
            <div className="flex w-11/12 flex-col">
              <div className="flex justify-between items-end">
                <label className="w-4/5 flex flex-col">
                  <span className="text-lg font-extrabold">Nom du jeu de rôle</span>
                  <Select required={true} isDisabled={Boolean(newRpg)} placeholder={newRpg ? newRpg.name : 'Choisir un jdr'} className="mt-6" options={rpgs.map((rpg) => ({ label: rpg.name, value: rpg.id }))} onChange={(event)=> {if(event) setCurrentRpgId(event.value)}} />
                </label>
                <IconButton icon={newRpg ? closeOutline : add} onClick={inverseRpg}/>
              </div>
            </div>
            <SelectAndAdd label="Tags" values={tags} setValues={setTags} options={tagsAndTriggers.tags.map(tag => ({ label: tag.tag, value: tag.id }))} />
            <SelectAndAdd label="TriggerWarnings" values={triggerWarnings} setValues={setTriggerWarnings} options={tagsAndTriggers.triggerWarnings.map(tw=> ({ label: tw.theme, value: tw.id }))} />
            <TextInput required={true} textArea={true} label={AnimationCreationLabels.systemDescription} placeHolder="description du jeu" />
            <div className="w-11/12">
              <div className="text-lg font-extrabold">Éditeurs</div>
              <p className="mt-4">{ newRpg ?  newRpg.publisher : currentRpg ? currentRpg.publisher : 'Klaewyss edition'}</p>
            </div>
            <div className="w-11/12">
              <div className="text-lg font-extrabold">Univers</div>
              <p className="mt-4">{newRpg ? newRpg.universe : currentRpg ? currentRpg.universe  : 'Médiéval fantastique'}</p>
            </div>
          </div>
          <FormError path="schedule-error" />
          <IonButton type="submit" className="mt-12" shape="round" size="large" color='purple'>Valider la proposition de table</IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default observer(AnimationCreation)
