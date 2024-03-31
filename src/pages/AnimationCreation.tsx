import { IonButton, IonContent, IonPage } from "@ionic/react"
import { FC, FormEvent, useState } from "react"
import TextInput from "../components/TextInput"
import { TagsAndTriggers } from "../types/tags-triggerCarnings"
import { Rpg, RpgData } from "../types/rpg"
import { ScheduleData } from "../types/activity"
import { useApis } from "../hook/useApis"
import IconButton from "../components/IconeButton"
import { add, closeOutline } from 'ionicons/icons'
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

const AnimationCreation: FC = () => {
  const id = eventStore.rpgZoneId
  const { data } = useApis<[TagsAndTriggers, Rpg[], RpgZone]>(['/tags_and_trigger_warnings', '/rpgs', '/rpg_zone/' + id], [id])
  const [tagsAndTriggers, rpgs, rpgZone] = data
  const [isOpen, toggle] = useWindow()
  const [tags, setTags] = useState<Value[]>([])
  const [triggerWarnings, setTriggerWarnings] = useState<Value[]>([])
  const [currentRpgId, setCurrentRpgId] = useState<number>()
  const [newRpg, setNewRpg] = useState<RpgData>()
  const [newSchedules, setNewSchedules] = useState<ScheduleData[]>([]) 
  const labels = {
    tableName: 'Nom de la table',
    description: 'Description',
    maxSeats: 'Maximum de participants',
    duration: 'Durée',
    start: 'Date et heure de début',
    systemDescription: 'Description du système',
    phoneNumber: 'Numéro de téléphone',
    MJName: 'Nom du MJ',
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = getDataFromForm(labels ,event.currentTarget)
    console.log(data)
  }

  function toggleRpg () {
    if (newRpg) {
      setNewRpg(undefined)
    } else {
      toggle()
    }
  }

  return (
    (tagsAndTriggers && rpgs && rpgZone) &&
    <IonPage>
      <Modal isOpen={isOpen} toggle={toggle} useBackdrop={true}>
        <RpgForm tagsAndTriggerWarnings={tagsAndTriggers} setRpg={setNewRpg} onSubmit={toggle} />
      </Modal>
      <IonContent className="w-full">
        <h1 className="title">Proposer un table de jdr</h1>
        <form  onSubmit={submit} className="w-full flex-col middle">
          <div className="w-full flex-col middle space-y-4">
            <TextInput  label={labels.tableName} placeHolder="Nom de la table" />
            <TextInput textArea={true} label={labels.description} placeHolder="Description de la table" />
            <TextInput type="number" label={labels.maxSeats} placeHolder="Nombre de places max" />
            <TextInput type="time" label={labels.duration} placeHolder="Temps en heure" />
            <AddSchedule values={newSchedules} setValues={setNewSchedules} rpgZone={rpgZone} />
            <div className="flex w-11/12 flex-col">
              <div className="flex justify-between items-end">
                <label className="w-4/5 flex flex-col">
                  <span className="text-lg font-extrabold">Nom du jeu de rôle</span>
                  <Select isDisabled={Boolean(newRpg)} placeholder={newRpg ? newRpg.name : 'Choisir un jdr'} className="mt-6" options={rpgs.map((rpg) => ({ label: rpg.name, value: rpg.id }))} onChange={(event)=> {if(event) setCurrentRpgId(event.value)}} />
                </label>
                <IconButton icon={newRpg ? closeOutline : add} onClick={toggleRpg}/>
              </div>
            </div>
            <SelectAndAdd label="Tags" values={tags} setValues={setTags} options={tagsAndTriggers.tags.map(tag => ({ label: tag.tag, value: tag.id }))} />
            <SelectAndAdd label="TriggerWarnings" values={triggerWarnings} setValues={setTriggerWarnings} options={tagsAndTriggers.triggerWarnings.map(tw=> ({ label: tw.theme, value: tw.id }))} />
            <TextInput textArea={true} label={labels.systemDescription} placeHolder="description du jeu" />
            <div className="w-11/12">
              <div className="text-lg font-extrabold">Éditeurs</div>
              <p className="mt-4">Klaewyss edition</p>
            </div>
            <div className="w-11/12">
              <div className="text-lg font-extrabold">Univers</div>
              <p className="mt-4">Médiéval fantastique</p>
            </div>
            <TextInput label={labels.MJName} placeHolder="Votre nom" />
            <TextInput type="number" label={labels.phoneNumber} placeHolder="06 xx xx xx xx" />
          </div>
          <IonButton type="submit" className="mt-12" shape="round" size="large" color='purple'>Valider la proposition de table</IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default observer(AnimationCreation)
