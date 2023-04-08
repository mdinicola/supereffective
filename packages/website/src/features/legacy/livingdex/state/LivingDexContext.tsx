import { createContext, ReactNode, useReducer } from 'react'
import {
  dexWithRecalculatedCounters,
  isNotCatchable,
  normalizeDexWithPreset,
  PresetDex,
} from '#/features/legacy/livingdex/livingdex'
import { Dex, DexList, NullableDexPokemon } from '#/services/legacy/datastore/Entities'
import tracker from '#/services/legacy/metrics/tracker'
import { debug } from '#/utils/legacyUtils'

// ===========================
//          TYPES
// ===========================

const MAX_STORAGE = {
  // TODO add this info in games.json of supereffective-assets
  HOME: { boxes: 200, maxBoxSize: 30 },
  GO: { boxes: 1, maxBoxSize: 5000 },
  LGPE: { boxes: 1, maxBoxSize: 1000 },
  SWSH: { boxes: 32, maxBoxSize: 30 },
  BDSP: { boxes: 40, maxBoxSize: 30 },
  PLA: { boxes: 32, maxBoxSize: 30 },
}

interface LivingDexContextAction {
  type:
    | 'CHANGE_PRESET'
    | 'SET_DEXES'
    | 'SET_DEX'
    | 'RESET_DEX'
    | 'SET_DEX_TITLE'
    | 'SET_BOX_TITLE'
    | 'ADD_BOX'
    | 'ADD_POKEMON'
    | 'REMOVE_BOX'
    | 'REMOVE_POKEMON'
    | 'CATCH_BOX'
    | 'CATCH_POKEMON'
    | 'SHINIFY_BOX'
    | 'SHINIFY_POKEMON'
    | 'GMAXIZE_BOX'
    | 'GMAXIZE_POKEMON'
    | 'ALPHAIZE_BOX'
    | 'ALPHAIZE_POKEMON'
  payload?: Dex | string | any | null
}

export interface LivingDexState {
  currentDex: number | null
  userDexes: DexList | null
}

export interface LivingDexContextType {
  state: Dex | null
  stateV2: LivingDexState
  actions: {
    getCurrentDex: () => Dex | null
    setDexes: (dexes: DexList | null) => void
    changePreset: (preset: PresetDex) => void
    setDex: (dex: Dex) => void
    resetDex: () => void
    setDexTitle: (title: string) => void
    setBoxTitle: (boxIndex: number, title: string) => void
    shinifyBox: (boxIndex: number, value: boolean) => void
    shinifyPokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => void
    // selectBox: (boxIndex: number, value: boolean) => void,
    // selectPokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => void,
    catchBox: (boxIndex: number, value: boolean) => void
    catchPokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => void
    gmaxizeBox: (boxIndex: number, value: boolean) => void
    gmaxizePokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => void
    alphaizeBox: (boxIndex: number, value: boolean) => void
    alphaizePokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => void
  }
}

export const withCountedPokemon = (state: Dex | null): Dex | null => {
  if (state === null) return null

  return dexWithRecalculatedCounters(state)
}

// ===========================
//        Initial Values
// ===========================

const initialState: Dex | null = null
const initialStateV2: LivingDexState = {
  currentDex: null,
  userDexes: null,
}

const initialContext: LivingDexContextType = {
  state: initialState,
  stateV2: initialStateV2,
  actions: {
    getCurrentDex: () => null,
    setDexes: () => {},
    changePreset: () => {},
    setDex: () => null,
    resetDex: () => null,
    setDexTitle: () => null,
    setBoxTitle: () => null,
    shinifyPokemon: () => null,
    shinifyBox: () => null,
    catchBox: () => null,
    catchPokemon: () => null,
    gmaxizeBox: () => null,
    gmaxizePokemon: () => null,
    alphaizeBox: () => null,
    alphaizePokemon: () => null,
  },
}

const changePokemonProperty = (
  state: Dex | null,
  boxIndex: number,
  pokemonIndex: number,
  property: string,
  value: any
) => {
  if (state === null) {
    return null
  }

  const pkm: NullableDexPokemon = state.boxes[boxIndex].pokemon[pokemonIndex] || null
  if (pkm === null) {
    return state
  }

  if (property === 'caught' && isNotCatchable(pkm)) {
    return state
  }

  if (property === 'shiny') {
    return state
  }

  const newState = { ...state }
  // @ts-ignore
  newState.boxes[boxIndex].pokemon[pokemonIndex][property] = value
  return newState
}

const changeBoxAllPokemonProperty = (
  state: Dex | null,
  boxIndex: number,
  property: string,
  value: any
) => {
  if (state === null) {
    return null
  }
  const newState = { ...state }
  // @ts-ignore
  newState.boxes[boxIndex].pokemon = newState.boxes[boxIndex].pokemon.map(pokemon => {
    if (pokemon) {
      if (property === 'caught' && isNotCatchable(pokemon)) {
        return pokemon
      }
      if (property === 'shiny') {
        return pokemon
      }
      // @ts-ignore
      pokemon[property] = value
    }
    return pokemon
  })
  return newState
}

const changeBoxProperty = (state: Dex | null, boxIndex: number, property: string, value: any) => {
  if (state === null) {
    return null
  }
  const newState = { ...state }
  // @ts-ignore
  newState.boxes[boxIndex][property] = value
  return newState
}

// ===========================
//      Action Reducer
// ===========================

const livingDexActionReducer = (state: Dex | null, action: LivingDexContextAction): Dex | null => {
  const { type, payload } = action
  switch (type) {
    case 'CHANGE_PRESET':
      if (state === null) {
        return null
      }
      return normalizeDexWithPreset(state, payload)
    case 'SET_DEX':
      // TODO update dexes list here if the dex is new (not in the list)
      return withCountedPokemon(payload)
    case 'RESET_DEX':
      return initialState
    case 'SHINIFY_POKEMON':
      return withCountedPokemon(
        changePokemonProperty(state, payload.boxIndex, payload.pokemonIndex, 'shiny', payload.value)
      )
    case 'CATCH_POKEMON':
      return withCountedPokemon(
        changePokemonProperty(
          state,
          payload.boxIndex,
          payload.pokemonIndex,
          'caught',
          payload.value
        )
      )
    case 'CATCH_BOX':
      return withCountedPokemon(
        changeBoxAllPokemonProperty(state, payload.boxIndex, 'caught', payload.value)
      )
    case 'SHINIFY_BOX':
      return withCountedPokemon(
        changeBoxAllPokemonProperty(state, payload.boxIndex, 'shiny', payload.value)
      )
    case 'SET_DEX_TITLE':
      return state ? { ...state, title: payload } : null
    case 'SET_BOX_TITLE':
      return changeBoxProperty(state, payload.boxIndex, 'title', payload.value)
    case 'GMAXIZE_POKEMON':
      return changePokemonProperty(
        state,
        payload.boxIndex,
        payload.pokemonIndex,
        'gmax',
        payload.value
      )
    case 'GMAXIZE_BOX':
      return changeBoxAllPokemonProperty(state, payload.boxIndex, 'gmax', payload.value)
    case 'ALPHAIZE_POKEMON':
      return changePokemonProperty(
        state,
        payload.boxIndex,
        payload.pokemonIndex,
        'alpha',
        payload.value
      )
    case 'ALPHAIZE_BOX':
      return changeBoxAllPokemonProperty(state, payload.boxIndex, 'alpha', payload.value)
    default:
      debug('Unknown action type', action.type)
      return state
  }
}

// ===========================
//    Context and Provider
// ===========================
const LivingDexContext = createContext<LivingDexContextType>(initialContext)

const LivingDexProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(livingDexActionReducer, initialState)

  // Define the actions API and payload messages
  const ctxValue = {
    state,
    stateV2: initialStateV2, // TODO initialStateV2
    actions: {
      getCurrentDex: (): Dex | null => {
        return state
      },
      setDexes: (dexes: DexList | null) => dispatch({ type: 'SET_DEXES', payload: dexes }),
      setDex: (dex: Dex) => dispatch({ type: 'SET_DEX', payload: dex }),
      resetDex: () => dispatch({ type: 'RESET_DEX' }),
      setDexTitle: (title: string) => dispatch({ type: 'SET_DEX_TITLE', payload: title }),
      setBoxTitle: (boxIndex: number, title: string) => {
        if (state !== null) {
          tracker.dexBoxTitleChanged(state.gameId)
        }
        return dispatch({
          type: 'SET_BOX_TITLE',
          payload: { boxIndex, value: title },
        })
      },
      shinifyPokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => {
        dispatch({
          type: 'SHINIFY_POKEMON',
          payload: { boxIndex, pokemonIndex, value },
        })
      },
      shinifyBox: (boxIndex: number, value: boolean) => {
        dispatch({
          type: 'SHINIFY_BOX',
          payload: { boxIndex, value },
        })
      },
      catchBox: (boxIndex: number, value: boolean) => {
        dispatch({
          type: 'CATCH_BOX',
          payload: { boxIndex, value },
        })
      },
      catchPokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => {
        dispatch({
          type: 'CATCH_POKEMON',
          payload: { boxIndex, pokemonIndex, value },
        })
      },
      gmaxizePokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => {
        dispatch({
          type: 'GMAXIZE_POKEMON',
          payload: { boxIndex, pokemonIndex, value },
        })
      },
      gmaxizeBox: (boxIndex: number, value: boolean) => {
        dispatch({
          type: 'GMAXIZE_BOX',
          payload: { boxIndex, value },
        })
      },
      alphaizePokemon: (boxIndex: number, pokemonIndex: number, value: boolean) => {
        dispatch({
          type: 'ALPHAIZE_POKEMON',
          payload: { boxIndex, pokemonIndex, value },
        })
      },
      alphaizeBox: (boxIndex: number, value: boolean) => {
        dispatch({
          type: 'ALPHAIZE_BOX',
          payload: { boxIndex, value },
        })
      },
      changePreset: (preset: PresetDex) => {
        dispatch({
          type: 'CHANGE_PRESET',
          payload: preset,
        })
      },
    },
  }

  return <LivingDexContext.Provider value={ctxValue}>{children}</LivingDexContext.Provider>
}

export { LivingDexContext, LivingDexProvider }
