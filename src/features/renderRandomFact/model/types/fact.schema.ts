import { Fact } from "./fact.interface"

export interface FactSchema {
  isLoading: boolean
  error: string
  fact: Fact | null
}