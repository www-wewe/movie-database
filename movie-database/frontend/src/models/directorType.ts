export interface Director {
  id: string
  createdAt: Date
  deletedAt: Date | null

  name: string
  birthDate: Date
  dateOfDeath: Date | null
  description: string
  picture: string | null
}
