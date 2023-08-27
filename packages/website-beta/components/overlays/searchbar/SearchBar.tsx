'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { XCircleIcon } from 'lucide-react'
// @ts-ignore
import ArrowDown01Icon from 'lucide-react--icons/arrow-down-1-0'
// @ts-ignore
import ArrowDownAZIcon from 'lucide-react--icons/arrow-down-a-z'
// @ts-ignore
import ArrowUp01Icon from 'lucide-react--icons/arrow-up-0-1'
// @ts-ignore
import ArrowUpAZIcon from 'lucide-react--icons/arrow-up-a-z'

import { getPokemonEntries, getPokemonSearchIndex } from '@pkg/database/repositories/pokemon'

import VirtualScrollContainer from '@/components/overlays/virtualscroll/VirtualScrollContainer'
import { PokeImg } from '@/components/pkm/imgs/PokeImg'
import Button from '@/components/primitives/Button'
import TextField from '@/components/primitives/TextField'
import useVirtualScroll from '@/lib/hooks/useVirtualScroll'
import { DivAttributes } from '@/lib/types/react'
import { cn } from '@/lib/utils/cn'
import { css } from '@/styled-system/css'

type SearchBarProps = DivAttributes<{
  children?: never
  close?: () => void
}>

const searchbarListContainerClass = cn(
  css({
    // flex: 1,
    maxHeight: '100%',
    overflowY: 'auto',
    // overflowAnchor: 'none',
    bg: 'neutral.white-5',
    borderRadius: 'md',
    border: '1px solid token(colors.gray.500)',
  })
)

const searchbarListClass = css({
  display: 'grid',
  // equal high rows:
  // gridTemplateRows: 'repeat(6, minmax(74px, 1fr))',
  // gridTemplateColumns: 'repeat(2, 1fr)',
  gridAutoRows: 'minmax(min-content, 1fr)',
  gap: 0,
  listStyle: 'none',
  p: 0,
  m: 0,
  '& .vrow': {
    display: 'block',
    // transition: 'all 1s ease',
  },
  '& li.vrow': {
    opacity: 0,
    // minHeight: 'calc(50px + token(sizes.3) + token(sizes.3))',
  },
  '& .vrow a, & .vrow .empty': {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    p: 3,
    overflow: 'hidden',
    '& span:nth-child(1)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '50px',
      h: '50px',
      borderRadius: '50%',
      bg: 'gray.700',
    },
    '& span:nth-child(2)': {
      // display: 'none',
      textAlign: 'center',
    },
    '& span:nth-child(3)': {
      // display: 'none',
      flexGrow: 1,
    },
    '&:hover:not(.empty)': {
      bg: 'blue.600-70',
      color: 'black',
    },
  },
  '& li.vrow[data-active="1"]': {
    opacity: 1,
  },
  // odds:
  '& .vrow:nth-child(odd)': {
    bg: 'neutral.white-5',
  },
})

const pokemonSearch = getPokemonSearchIndex()
const allPokes = getPokemonEntries() // .filter(p => !p.form.isForm)

export default function SearchBar({ className, close, ...rest }: SearchBarProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')

  const searchResults = pokemonSearch.search(searchValue)
  const filteredPokemon = allPokes.filter((pk: any) => {
    if (searchValue.length === 0) {
      return true
    }
    return searchResults.has(pk.id)
  })

  const [sortBy, setSortBy] = useState<'name' | 'dexNum'>('dexNum')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  filteredPokemon.sort((a: any, b: any) => {
    if (sortBy === 'dexNum') {
      if (a.dexNum === null || a.dexNum === 0) {
        return sortOrder === 'asc' ? 1 : -1
      }
      if (b.dexNum === null || b.dexNum === 0) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (sortOrder === 'asc') {
        return a.dexNum - b.dexNum
      }
      return b.dexNum - a.dexNum
    }

    // sort by name
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name)
    }
    return b.name.localeCompare(a.name)
  })

  const virtualizer = useVirtualScroll({
    total: filteredPokemon.length,
    parentRef: parentRef,
    estimatedItemSize: 74,
    overflowItems: 2,
    keyMapper: index => filteredPokemon[index].id,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        })}
      >
        <TextField
          className={css({
            flexGrow: 1,
          })}
          autoFocus
          placeholder="Search..."
          onChangeDelay={500}
          onChange={value => {
            console.log('searching for: ', value)
            setSearchValue(value || '')
          }}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        })}
      >
        <div
          className={css({
            display: 'flex',
            flex: 1,
            gap: 2,
          })}
        >
          <Button
            title="Sort by name"
            className={css({ paddingInline: 3, flex: 1 })}
            color={sortBy === 'name' ? 'gold' : 'black'}
            onPress={() => {
              if (sortBy === 'name') {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                return
              }
              setSortBy('name')
            }}
          >
            {(sortBy !== 'name' || sortOrder === 'asc') && <ArrowDownAZIcon size={24} />}
            {sortBy === 'name' && sortOrder === 'desc' && <ArrowUpAZIcon size={24} />}
          </Button>
          <Button
            title="Sort by dex number"
            className={css({ paddingInline: 3, flex: 1 })}
            color={sortBy === 'dexNum' ? 'gold' : 'black'}
            onPress={() => {
              if (sortBy === 'dexNum') {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                return
              }
              setSortBy('dexNum')
            }}
          >
            {(sortBy !== 'dexNum' || sortOrder === 'asc') && <ArrowDown01Icon size={24} />}
            {sortBy === 'dexNum' && sortOrder === 'desc' && <ArrowUp01Icon size={24} />}
          </Button>
        </div>
        <Button
          className={css({ paddingInline: 3 })}
          color="black"
          onPress={() => {
            close?.()
          }}
        >
          <XCircleIcon size={24} />
        </Button>
      </div>

      {filteredPokemon.length === 0 && (
        <div className={searchbarListContainerClass}>
          <div className={searchbarListClass}>
            <div className="vrow">
              <div className="empty">
                <div>No results found</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredPokemon.length > 0 && (
        <VirtualScrollContainer
          ref={parentRef}
          classNames={[searchbarListContainerClass, undefined, searchbarListClass]}
          total={filteredPokemon.length}
          totalHeight={virtualizer.getTotalSize()}
          startOffset={virtualItems[0]?.start ?? 0}
        >
          {virtualItems.map(item => {
            const poke = filteredPokemon[item.index]
            if (!poke) {
              throw new Error(`No pokemon found for index ${item.index}`)
            }
            const _4digitDexNum = (poke.dexNum ?? 0).toString().padStart(4, '0')
            return (
              <div
                className="vrow"
                key={item.key}
                data-index={item.index}
                ref={virtualizer.measureElement}
              >
                <div key={poke.id}>
                  <Link href={`/pokemon/${poke.id}`}>
                    <span>
                      <PokeImg nid={poke.nid} variant="home2d-icon" />
                    </span>
                    <span>#{_4digitDexNum}</span>
                    <span>{poke.name}</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </VirtualScrollContainer>
      )}
    </div>
  )
}
