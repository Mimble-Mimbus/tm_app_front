export interface Tag {
  id: number
  tag: string
}

export interface TriggerWarning {
  id: number
  theme: string
}

export interface TagsAndTriggers {
  tags: Tag[]
  triggerWarnings: TriggerWarning[]
}