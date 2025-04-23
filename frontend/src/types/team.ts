export interface Team {
  id: string
  name: string
  description: string
  manager?: {
    id: string
    name: string
  }
  parentTeam?: {
    id: string
    name: string
  }
  portfolios?: any[]
  status: string
  createdAt: Date
  updatedAt: Date
}
