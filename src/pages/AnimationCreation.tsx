import { IonButton, IonContent, IonPage } from "@ionic/react"
import { FC, FormEvent } from "react"
import TextInput from "../components/TextInput"

const AnimationCreation: FC = () => {
  const labels = {
    tableName: 'Nom de la table',
    description: 'Description',
    maxSeats: 'Maximum de participants',
    duration: 'Durée',
    start: 'Date et heure de début',
    systemDescription: 'Description du système',
    phoneNumber: 'Numéro de téléphone',
    MJName: 'Nom du MJ',
    tags: ''
  }

  
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) 
    const data = Object.keys(labels).reduce((acc, val) => {
      acc[val] = formData[labels[val]]

      return acc
    }, {} as Record<string, any>)

    console.log(data)
  }

  return (<IonPage>
    <IonContent className="w-full">
      <h1 className="title">Proposer un table de jdr</h1>
      <form  onSubmit={submit} className="w-full flex-col middle">
        <div className="w-full flex-col middle space-y-4">
          <TextInput  label={labels.tableName} placeHolder="Nom de la table" />
          <TextInput textArea={true} label={labels.description} placeHolder="Description de la table" />
          <TextInput numeric={true} label={labels.maxSeats} placeHolder="Nombre de places max" />
          <TextInput type="time" label={labels.duration} placeHolder="Temps en heure" />
          <TextInput type='time' label={labels.start} placeHolder="Date" />
          <label className="w-11/12">
            <span className="text-lg font-extrabold">Nom du jeu de rôle</span>
            <select placeholder="Choisir un JDR">

            </select>
          </label>
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
          <TextInput numeric={true} label={labels.phoneNumber} placeHolder="06 xx xx xx xx" />
        </div>
        <IonButton type="submit" className="mt-12" shape="round" size="large" color='purple'>Valider la proposition de table</IonButton>
      </form>
    </IonContent>
  </IonPage>)
}

export default AnimationCreation
