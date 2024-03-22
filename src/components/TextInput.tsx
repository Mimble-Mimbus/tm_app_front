import { ChangeEvent, FC, FormEvent, HTMLInputTypeAttribute, useCallback } from "react";
import { isNumeric } from "../utils";
import { time } from "../utils/date";

interface ITextInputBase {
  label: string
  required?: boolean
  name?: string
  numeric?: boolean
  placeHolder?: string
  type?: HTMLInputTypeAttribute
}

interface ITextInput extends ITextInputBase {
  textArea?: false
  onChange? (event:  ChangeEvent<HTMLInputElement>): void
}

interface ITextInputArea extends ITextInputBase {
  textArea: true
  onChange? (event:  ChangeEvent<HTMLTextAreaElement>): void
}

const TextInput: FC<ITextInput | ITextInputArea> = ({ name, required, label, onChange, placeHolder, textArea, numeric, type }) => {
  function beforeInput (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
      let value = (event.nativeEvent as Event & { data?: string }).data

      if (!value) return

      if (numeric && !isNumeric(value)) {
        event.preventDefault()
      }
  }

  return (<label htmlFor={name || label} className="flex flex-col w-11/12">
    <span className="text-lg font-extrabold">{label}</span>
    {!textArea ?
      <input  type={type} className="px-4 py-3 border-gray-500 rounded-md border-[1px] bg-white w-full mt-3" name={name || label} onChange={onChange} onBeforeInput={beforeInput} required={required} placeholder={placeHolder} /> :
      <textarea className="px-4 py-3 border-gray-500 rounded-md border-[1px] bg-white w-full mt-3 h-32" name={name || label} onChange={onChange} onBeforeInput={beforeInput} required={required} placeholder={placeHolder} />
    }
  </label>)
}

export default TextInput
