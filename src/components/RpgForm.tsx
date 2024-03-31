import { FC, FormEvent, useState } from "react";
import TextInput from "./TextInput";
import SelectAndAdd, { Value } from "./SelectAndAdd";
import { IonButton } from "@ionic/react";
import { TagsAndTriggers } from "../types/tags-triggerCarnings";
import { RpgData } from "../types/rpg";

const RpgForm: FC<{ tagsAndTriggerWarnings: TagsAndTriggers, setRpg: (rpg: RpgData) => void, onSubmit?: () => void }> = ({ tagsAndTriggerWarnings, setRpg, onSubmit }) => {
  const [tags, setTags] = useState<Value[]>([])
  const [triggerWarnings, setTriggerWarnings] = useState<Value[]>([])
  const labels = {
    name: 'Nom',
    description: 'Description',
    universe: 'Univers',
    publisher: 'Éditeur'
  }

  function addRpg(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string , string>
    const data = Object.keys(labels).reduce((acc, val) => {
      acc[val] = formData[labels[val]]

      return acc
    }, {} as Record<keyof typeof labels, string>)

    setRpg({...data, tags: tags.map(tag => tag.id as number), triggerWarnings: triggerWarnings.map(tw => tw.id as number)})
    onSubmit?.()
  }

  return <form className="text-black flex p-8 items-start h-full" onSubmit={addRpg}>
    <div className="flex flex-col space-y-4">
      <TextInput required label={labels.name}  />
      <TextInput required label={labels.description} />
      <TextInput required label={labels.universe} />
      <TextInput required label={labels.publisher} />
    </div>
    <div className="flex flex-col space-y-4 justify-between h-full">
      <SelectAndAdd label="Tags" values={tags} setValues={setTags} options={tagsAndTriggerWarnings.tags.map(tag => ({ label: tag.tag, value: tag.id }))} />
      <SelectAndAdd label="TriggerWarnings" values={triggerWarnings} setValues={setTriggerWarnings} options={tagsAndTriggerWarnings.triggerWarnings.map(triggerWarning => ({ label: triggerWarning.theme, value: triggerWarning.id }))} />
      <IonButton className="mt-12" color={'purple'} type="submit">Valider</IonButton>
    </div>
  </form>
}

export default RpgForm