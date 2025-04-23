export interface Portfolio {
  id: string
  name: string
  description: string
  level: string
  owner?: {
    id: string
    name: string
  }
  parentPortfolio?: {
    id: string
    name: string
  }
  status: string
  priority?: number
  createdAt: Date
  updatedAt: Date
}
