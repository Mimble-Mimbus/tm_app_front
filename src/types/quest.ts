export interface ApiQuest {
  id: number
  title: string
  isFullFilled: boolean
  zone: { id: number, name: string }
  type: string
  infos: string
  points: number
}
