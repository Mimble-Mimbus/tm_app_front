import { FC, useState } from "react";
import Select from 'react-select'
import { closeOutline } from 'ionicons/icons'
import { IonButton, IonIcon } from "@ionic/react";

export interface Value {
  name: string, 
  id: string | number
}

interface ISelectAndAdd {
  options: { label: string, value: string | number }[], 
  values: Value[], 
  setValues: (values: Value[]) => void
  label: string
}
const SelectAndAdd: FC<ISelectAndAdd> = ({ options, values, setValues, label }) => {
  const [value, setValue] = useState<Value>()
  function add() {
    if (!value) return

    if (!values.some(val => val.id === value.id)) {
      setValues([...values, value])
    }
    
  }

  function deleteValue (id: string | number) {
    setValues([...values].filter(value => !(value.id === id)))
  }

  return <div className="flex w-11/12 flex-col">
    <div className="flex justify-between items-end">
      <label className="w-4/5 flex flex-col">
        <span className="text-lg font-extrabold">{label}</span>
        <Select className="mt-6" options={options} onChange={event => {if(event) setValue({ name: event.label, id: event.value})}} />
      </label>
      <IonButton className="h-1/2 mb-0" color='purple' onClick={add}> ajouter</IonButton>
    </div>
    <div className="flex flex-wrap mt-4 ml-4">
      {values.map((value => <div className="py-1 px-2 bg-purple-base text-white text-xs font-bold rounded-xl w-fit h-fit mb-3 mr-3 flex items-center gap-2" key={value.id}>{value.name} <IonIcon icon={closeOutline} className="text-lg" color="white" /></div>))}
    </div>
  </div>
}

export default SelectAndAdd