export interface ApiQuest {
  id: number
  title: string
  isFullFilled: boolean
  zone: { id: number, name: string }
  event : { id: number }
  type: string
  infos: string
  points: number
}
