import React from 'react'
import Link from 'next/link'

import {
  getPresetByIdForGame,
  getPresetsForGame,
} from '@pkg/database/repositories/living-dexes/legacy/presets'
import { createDexFromPreset } from '@pkg/database/repositories/living-dexes/legacy/presets/createDexFromPreset'

import { PkBoxGroup } from '#/features/livingdex/views/PkBox'
import PageMeta from '#/features/pages/components/PageMeta'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button from '#/primitives/legacy/Button/Button'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'
import { classNameIf } from '#/utils/legacyUtils'

const Page = () => {
  const [selectedPreset, setSelectedPreset] = React.useState<string>('grouped-region')
  const dex = getPresetByIdForGame('home', selectedPreset)
  const homePresets = getPresetsForGame('home')

  if (!dex) {
    return (
      <LoadingBanner
        content={'Unexpected error. Cannot load the Living Pokédex. Please let us know.'}
      />
    )
  }

  return (
    <div className={'page-container dex-game dex-game-home'} style={{ maxWidth: 'none' }}>
      <PkSpriteStyles />
      <PageMeta
        metaTitle={
          'Full Living Pokédex - All Regions | Pokédex Tracker Online Tool - SuperEffective.gg'
        }
        metaDescription={
          'Full Living Pokédex visual guide. Overview of all Pokémon species and forms that ' +
          'are currently storable in Pokémon HOME.'
        }
        robots={'index, follow'}
        imageUrl={abs_url('/assets/livingdex.png')}
        canonicalUrl={abs_url('/apps/livingdex/national')}
        lang={'en'}
      />
      <div className={'inner-container text-center'}>
        <h2>Full National Living Pokédex - All Regions</h2>
        <div>
          Overview of all Pokémon species and forms that are currently storable in Pokémon HOME.
        </div>
        <div>
          <small>
            <i>
              You can change the sorting / grouping presets by clicking on one of the following
              buttons:
            </i>
          </small>
        </div>
        <div className={'buttonera'} style={{ margin: '2.0rem 0 0rem 0' }}>
          {Object.values(homePresets).map(preset => {
            return (
              <Button
                key={preset.id}
                title={preset.description}
                className={'switch-btn ' + classNameIf(selectedPreset === preset.id, 'active')}
                onClick={() => setSelectedPreset(preset.id)}
              >
                {preset.name}
              </Button>
            )
          })}
        </div>
        <div style={{ maxWidth: '860px', margin: '3rem auto 1rem auto' }}>
          <p>
            <b>{dex.name}</b>: <br /> {dex.description}
          </p>
        </div>

        <Link href={'/apps/livingdex/new'} className={'switch-btn hero-btn'}>
          Track your progress
        </Link>
        <style>
          {`
            .pkBoxGroupWr-separator {
              display:none;
            }

            .buttonera {
                display: grid;
                grid-template-columns: auto auto auto;
                gap: 0.4rem;
                justify-content: center;
            }
            .switch-btn {
              margin:0;
              background-color: #333333ee;
              color:#fff;
              padding: 0.2rem 1.2rem;
              border-radius: 5rem;
              font-size: 0.7rem;
              cursor: pointer;
              display: inline-flex;
              align-content: center;
              justify-content: center;
              align-items: center;
              justify-items: center;
              text-align: center;
              text-decoration: none;
              max-width: 200px;
              line-height: 1rem;

            }
            .switch-btn:hover {
              background-color: var(--color-orange);
              color:#fff;
              text-decoration: none;
            }
            .switch-btn.active {
              background-color: #fff;
              color: #000;
            }

            /*.buttonera .switch-btn:first-child {
              margin-left: 0;
              margin-right:0;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              border-right: 1px solid #888;
            }
            .buttonera .switch-btn:last-child {
              margin-left: 0;
              margin-right:0;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
            .switch-btn ~ .switch-btn {
              margin-left:0;
              margin-right:0;
            }
            .switch-btn ~ .switch-btn:not(:last-child) {
              border-radius: 0;
              border-right: 1px solid #888;
            }
            */
            .hero-btn {
              margin-top:2rem;
              font-size: 1rem;
              padding: 0.7rem 2.5rem;
              background-color: var(--color-orange);
              color: #fff;
            }
            .hero-btn:hover{
              background-color: var(--color-orange-lighter);
            }
            .hero-btn:active{
              background-color: var(--color-orange);
            }
          `}
        </style>
      </div>
      <PkBoxGroup
        dex={createDexFromPreset('home', dex, undefined)}
        perPage={6}
        showNonShiny={true}
        showShiny={false}
        selectMode={'cell'}
        viewMode={'boxed'}
        usePixelIcons={false}
        revealPokemon={true}
        editable={false}
        markTypes={['shiny']}
      />
    </div>
  )
}

export default Page
