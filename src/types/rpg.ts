import { Tag, TriggerWarning } from "./tags-triggerCarnings"

export interface Rpg {
  id: number
  name: string
  description: string
  publisher: string
  universe: string
  tags: Tag[]
  triggerWarnings: TriggerWarning[]
}

export interface RpgData {
  name: string
  description: string
  publisher: string
  universe: string
  tags: number[]
  triggerWarnings: number[]
}