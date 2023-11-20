import type { SVGProps } from 'react'
import type { PokeType } from '@supeffective/dataset'
import {
  BugType,
  DarkType,
  DragonType,
  ElectricType,
  FairyType,
  FightingType,
  FireType,
  FlyingType,
  GhostType,
  GrassType,
  GroundType,
  IceType,
  NormalType,
  PoisonType,
  PsychicType,
  RockType,
  SteelType,
  WaterType,
} from '@supeffective/icons'

export const pokemonTypeComponents: Record<
  PokeType['id'],
  {
    component: React.FC<SVGProps<SVGSVGElement>>
    bgColor?: string
  }
> = {
  normal: {
    component: NormalType,
  },
  fire: {
    component: FireType,
  },
  water: {
    component: WaterType,
  },
  electric: {
    component: ElectricType,
  },
  grass: {
    component: GrassType,
  },
  ice: {
    component: IceType,
  },
  fighting: {
    component: FightingType,
  },
  poison: {
    component: PoisonType,
  },
  ground: {
    component: GroundType,
  },
  flying: {
    component: FlyingType,
  },
  psychic: {
    component: PsychicType,
  },
  bug: {
    component: BugType,
  },
  rock: {
    component: RockType,
  },
  ghost: {
    component: GhostType,
  },
  dragon: {
    component: DragonType,
  },
  dark: {
    component: DarkType,
  },
  steel: {
    component: SteelType,
  },
  fairy: {
    component: FairyType,
  },
}
