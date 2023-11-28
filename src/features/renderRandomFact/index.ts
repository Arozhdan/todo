export {
  factActions,
  factReducer
} from "./model/slice/fact.slice"

export { type FactSchema } from "./model/types/fact.schema"
export { type Fact } from "./model/types/fact.interface"

export { fetchFact } from "./model/services/fetchFact/fetchFact"

export { getFactIsLoading } from "./model/selectors/getFactIsLoading/getFactIsLoading"
export { getFact } from "./model/selectors/getFact/getFact"

export { FactCard } from "./ui/FactCard/FactCard"