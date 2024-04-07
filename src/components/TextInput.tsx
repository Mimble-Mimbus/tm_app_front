import { ChangeEvent, FC, FormEvent, FormEventHandler, HTMLInputTypeAttribute, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import { observer } from "mobx-react";
import FormError from "./FormError";

interface ITextInputBase {
  label: string
  required?: boolean
  name?: string
  placeHolder?: string
  readonly?: boolean
  type?: HTMLInputTypeAttribute
  disabled?: boolean
  max?: number
  min?: number
  path?: string
}

interface ITextInput extends ITextInputBase {
  textArea?: false
  onChange? (event:  ChangeEvent<HTMLInputElement>): void
  onBeforeInput?: FormEventHandler<HTMLInputElement>
}

interface ITextInputArea extends ITextInputBase {
  textArea: true
  onChange? (event:  ChangeEvent<HTMLTextAreaElement>): void
  onBeforeInput?: FormEventHandler<HTMLTextAreaElement>
}

const TextInput: FC<ITextInput | ITextInputArea> = ({ name, required, label, onChange, placeHolder, textArea, type, disabled, onBeforeInput, max, min, path, readonly }) => {
  function beforeInput (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //@ts-ignore
    onBeforeInput?.(event)
  }

  return (<label htmlFor={name || label} className="flex flex-col w-11/12">
    <span className="text-lg font-extrabold flex">{label}</span>
    {!textArea ?
      <input readOnly={readonly} disabled={disabled} max={max} min={min}  type={type} className={clsx("px-4 py-3 bg-white rounded-md border-[1px] w-full mt-3", disabled || readonly ? 'text-gray-400 border-gray-400': 'text-black border-gray-500')} name={name || label} onChange={onChange} onBeforeInput={beforeInput} required={required} placeholder={placeHolder} /> :
      <textarea readOnly={readonly} disabled={disabled} className={clsx("px-4 py-3 rounded-md border-[1px] bg-white w-full mt-3 h-32", disabled || readonly ? 'text-gray-400 border-gray-400': 'text-black border-gray-500')} name={name || label} onChange={onChange} onBeforeInput={beforeInput} required={required} placeholder={placeHolder} />
    }
    {path && <FormError path={path} />}
  </label>)
}

export default observer(TextInput)
