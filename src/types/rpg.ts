import { Tag, TriggerWarning } from "./tags-triggerCarnings"

export interface ApiRpg extends RpgBase {
  name: string
  description: string
  publisher: string
  universe: string
  tags: Tag[]
  triggerWarnings: TriggerWarning[]
}

export interface RpgBase {
  id: number
  name: string
  description: string
  publisher: string
  universe: string
}

export interface RpgData {
  name: string
  description: string
  publisher: string
  universe: string
  tags: number[]
  triggerWarnings: number[]
}