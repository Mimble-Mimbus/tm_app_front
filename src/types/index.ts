export type ErrorDetail = Record<'message' | 'name' | 'value' | 'constraint', string>

export interface Details {
  entity: string
  properties: ErrorDetail[]
}

export interface ConstraintError  {
  type: 'ConstraintError'
  statusCode: number
  entity: string
  message: string
  details: Details
}