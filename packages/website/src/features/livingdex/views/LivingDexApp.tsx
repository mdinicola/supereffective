import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { useRouter } from 'next/router'

import { useSession } from '@pkg/auth/lib/hooks/useSession'
import { convertDexFromLegacyToV4 } from '@pkg/database/lib/dex-parser/support'
import { getGameSetByGameId } from '@pkg/database/repositories/game-sets'
import { isCatchable } from '@pkg/database/repositories/living-dexes/legacy'
import {
  getPresetByIdForGame,
  getPresetsForGame,
} from '@pkg/database/repositories/living-dexes/legacy/presets'
import { normalizeDexWithPreset } from '@pkg/database/repositories/living-dexes/legacy/presets/normalizeDexWithPreset'
import {
  PresetDex,
  PresetDexMap,
} from '@pkg/database/repositories/living-dexes/legacy/presets/types'
import {
  DexBox,
  LoadedDex,
  NullableDexPokemon,
} from '@pkg/database/repositories/living-dexes/legacy/types'

import config from '#/config'
import legacyConfig from '#/config/legacyConfig'
import { useDexesContext } from '#/features/livingdex/state/LivingDexListContext'
import { GameLogo } from '#/features/livingdex/views/GameLogo'
import { MarkType, PkBoxGroup, SelectMode, ViewMode } from '#/features/livingdex/views/PkBox'
import PkImgFile from '#/features/livingdex/views/PkImgFile'
import { useScrollToLocation } from '#/hooks/useScrollToLocation'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import Button from '#/primitives/legacy/Button/Button'
import InlineTextEditor from '#/primitives/legacy/Input/InlineTextEditor'
import { ExternLink, SiteLink } from '#/primitives/legacy/Link/Links'
import { DexSocialLinks } from '#/primitives/legacy/SocialLinks/SocialLinks'
import {
  ToolbarButton,
  ToolbarButtonGroup,
  ToolbarButtonGroupGroup,
} from '#/primitives/legacy/Toolbar/ToolbarButton'
import { classNameIf } from '#/utils/legacyUtils'

import { LivingDexContext } from '../state/LivingDexContext'
import styles from './LivingDexApp.module.css'

type ActionTool = MarkType | 'all-marks' | 'no-marks' | null // | 'move' | 'delete'
type SyncState = 'changed' | 'synced'
type SavingState = 'ready' | 'saving' | 'saved' | 'error'
const defaultTool: ActionTool = 'catch'

export interface LivingDexAppProps {
  loadedDex: LoadedDex
  presets: PresetDexMap
  onSave?: (dex: LoadedDex, isNewDex: boolean) => void
}

interface ModalContent {
  title?: string
  content: React.ReactNode
  cancelButton?: React.ReactNode
  confirmButton?: React.ReactNode
  onCancel?: () => void
  onConfirm?: () => void
  prevState: {
    dex: LoadedDex
    preset: PresetDex
  }
}

export default function LivingDexApp({ loadedDex, presets, onSave }: LivingDexAppProps) {
  const initialMarkTypes: MarkType[] = ['catch']
  const allMarkTypes: MarkType[] = ['catch', 'shiny', 'gmax', 'alpha', 'ability', 'gender']
  const viewOnlyModeMarkTypes: MarkType[] = ['shiny', 'gmax', 'alpha', 'ability']
  const router = useRouter()
  const [savingState, setSavingState] = useState<SavingState>('ready')
  const [syncState, setSyncState] = useState<SyncState>('synced')
  const [selectMode, setSelectMode] = useState<SelectMode>('cell')
  const [currentTool, setCurrentTool] = useState<ActionTool>(defaultTool)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const numBoxes = loadedDex.boxes.length || 0
  const [viewMode, setViewMode] = useState<ViewMode>(numBoxes > 2 ? 'boxed' : 'listed')
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)
  const [showShiny, setShowShiny] = useState(false)
  const livingdex = useContext(LivingDexContext)

  const dex = livingdex.state

  const app = new Proxy(livingdex.actions, {
    get(target, prop) {
      if (['setDex', 'getCurrentDex', 'setDexes', 'resetDex'].includes(prop as string)) {
        return target[prop as keyof typeof livingdex.actions]
      }
      return (...args: any[]) => {
        setSyncState('changed')
        return (target[prop as keyof typeof livingdex.actions] as any)(...args)
      }
    },
  })

  const auth = useSession()
  const [markTypes, setMarkTypes] = useState<MarkType[]>(initialMarkTypes)
  const { dexesLoading, saveDex, deleteDex } = useDexesContext()

  const handleSavedState = () => {
    setSyncState('synced')
    setSavingState('saved')
    setTimeout(() => {
      setSavingState('ready')
    }, 1000)
  }

  const handleSave = () => {
    if (!dex) {
      return
    }

    if (!dex.userId) {
      throw new Error('Cannot save dex without a logged in user')
    }
    if (savingState !== 'ready') {
      return
    }

    setSavingState('saving')

    const isNewDex = dex.id === null || dex.id === undefined

    saveDex(dex)
      .then(updatedDex => {
        if (updatedDex instanceof Error) {
          console.error('Failed to save', updatedDex)
          setSavingState('error')
          return
        }

        let dexWithId = dex
        if (isNewDex) {
          dexWithId = { ...dex, id: updatedDex.id }
          app.setDex(dexWithId)
        }
        // currentUser.syncDex(dexWithId)
        // setUserDexes(null) // TODO remove userCtx.syncDex, do it inside livingdexCtx.setDex
        handleSavedState()
        if (isNewDex) {
          router.push(`/apps/livingdex/${updatedDex.id}`)
        }
        if (onSave) {
          onSave(dexWithId, isNewDex)
        }
      })
      .catch(e => {
        console.error('Failed to save', e)
        setSavingState('error')
      })
  }

  useScrollToLocation()

  useEffect(() => {
    if (
      livingdex.state === null ||
      loadedDex.id !== livingdex.state.id ||
      loadedDex.gameId !== livingdex.state.gameId
      // || (loadedDex.preset !== livingdex.state.preset)
    ) {
      livingdex.actions.setDex(loadedDex)
      return
    }

    if (!auth.isAuthenticated || savingState !== 'ready' || syncState !== 'changed') {
      return
    }
    const autoSaveTimeout = setTimeout(() => {
      handleSave()
      console.log('Dex saved')
    }, 5000)
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }
    }
  }, [livingdex.state, loadedDex])

  const preset = useMemo(() => {
    if (livingdex.state === null) {
      return null
    }
    return getPresetByIdForGame(livingdex.state.gameId, livingdex.state!.presetId)
  }, [presets, livingdex.state])

  if (auth.isLoading() || dex === null) {
    return <LoadingBanner />
  }

  if (dexesLoading) {
    return <LoadingBanner />
  }

  const isEditable =
    auth.isAuthenticated() && (dex.userId === auth.currentUser?.uid || dex.userId === undefined)

  const gameSet = getGameSetByGameId(dex.gameId)
  const gameSymbols = gameSet.storage?.symbols || []
  const hasShinyMode = gameSet.hasShinies

  const handleBoxClick = (boxIndex: number, boxData: DexBox) => {
    if (viewMode !== 'boxed') {
      throw new Error('Cannot handle box click in non-boxed view mode')
    }

    if (selectMode !== 'box' || boxData.pokemon.length === 0) {
      return
    }

    // find first pokemon in box, that is not null
    const firstPokemon = boxData.pokemon.find(pk => pk !== null)
    if (firstPokemon === undefined || firstPokemon === null) {
      return
    }

    switch (currentTool) {
      case 'catch':
        app.catchBox(boxIndex, !firstPokemon.caught)
        break
      case 'shiny':
        app.shinifyBox(boxIndex, !firstPokemon.shiny)
        break
      case 'alpha':
        app.alphaizeBox(boxIndex, !firstPokemon.alpha)
        break
      case 'gmax':
        app.gmaxizeBox(boxIndex, !firstPokemon.gmax)
        break
    }
  }

  const handlePkmClick = (
    boxIndex: number,
    pokemonIndex: number,
    pokemonData: NullableDexPokemon
  ) => {
    if (pokemonData === null || selectMode !== 'cell') {
      return
    }
    switch (currentTool) {
      case 'catch':
        if (!isCatchable(pokemonData)) {
          return
        }
        app.catchPokemon(boxIndex, pokemonIndex, !pokemonData.caught)
        break
      case 'shiny':
        if (pokemonData.shinyLocked) {
          return
        }
        app.shinifyPokemon(boxIndex, pokemonIndex, !pokemonData.shiny)
        break
      case 'alpha':
        app.alphaizePokemon(boxIndex, pokemonIndex, !pokemonData.alpha)
        break
      case 'gmax':
        app.gmaxizePokemon(boxIndex, pokemonIndex, !pokemonData.gmax)
        break
    }
  }

  const handleDexTitleChange = (newTitle: string) => {
    if (newTitle === dex.title || newTitle.length === 0) {
      return
    }

    if (newTitle.length > legacyConfig.limits.maxDexTitleSize) {
      newTitle = newTitle.slice(0, legacyConfig.limits.maxDexTitleSize)
    }

    app.setDexTitle(newTitle)
  }

  const handleBoxTitleEdit = (boxIndex: number, newTitle: string) => {
    if (newTitle === dex.boxes[boxIndex].title || newTitle.length === 0) {
      return
    }

    if (newTitle.length > legacyConfig.limits.maxBoxTitleSize) {
      newTitle = newTitle.slice(0, legacyConfig.limits.maxBoxTitleSize)
    }

    app.setBoxTitle(boxIndex, newTitle)
  }

  const handleExport = () => {
    const docSpec = convertDexFromLegacyToV4(dex)
    // const mdContent = serializeLivingDex(docSpec, getLivingDexFormat('v4'), true)
    // const blob = new Blob([mdContent], { type: 'text/plain;charset=utf-8' })

    // download as text/plain blob:
    const blob = new Blob([JSON.stringify(docSpec, undefined, 2)], {
      type: 'application/json;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const element = document.createElement('a')
    element.setAttribute('href', url)
    // element.setAttribute('download', dex.title + '.md')
    element.setAttribute('download', dex.title + '.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleRemoveDex = () => {
    if (!dex.id) {
      return
    }
    deleteDex(dex.id)
      .then(() => {
        window.location.href = '/apps/livingdex' // TODO do better than this, which reloads the whole state
      })
      .catch(() => {
        alert('Failed to remove dex')
      })
  }

  const handleSelectModeToolbar = (
    newAction: string | null,
    prevState: string | null,
    prevAction: string | null
  ) => {
    if (newAction === selectMode || newAction === null) {
      return
    }
    setSelectMode(newAction as SelectMode)
    // tracker.dexSelectModeChanged(dex, newAction)
  }

  const handleViewModeToolbar = (
    newAction: string | null,
    prevState: string | null,
    prevAction: string | null
  ) => {
    if (newAction === viewMode || viewMode === null) {
      return
    }
    if (selectMode === 'box') {
      setSelectMode('cell')
    }
    setViewMode(newAction as ViewMode)
    // tracker.dexViewModeChanged(dex, newAction)
  }

  const handleChangePresetToolbar = (
    newAction: string | null,
    prevState: string | null,
    prevAction: string | null
  ) => {
    if (newAction === dex.presetId || newAction === null) {
      return
    }
    const newPreset = getPresetByIdForGame(dex.gameId, newAction)
    if (!newPreset) {
      throw new Error(`Preset ${newAction} not found for game ${dex.gameId}`)
    }
    const preliminaryDex = normalizeDexWithPreset(dex, newPreset)
    const lostPkm = preliminaryDex.lostPokemon.map(pkm => {
      if (pkm === null) {
        return null
      }
      return (
        <div key={pkm.pid} title={pkm.pid} className={styles.lostPkm}>
          <PkImgFile key={pkm.pid} nid={pkm.nid} title={pkm.pid} shiny={pkm.shiny} variant="3d" />
        </div>
      )
    })
    const modalTitle = (
      <>
        <p>Changing preset to:</p>
        <i style={{ fontSize: '1rem' }}>{newPreset.name}</i>
      </>
    )
    setModalContent({
      content: (
        <div style={{ maxWidth: '600px' }}>
          <h4>{modalTitle}</h4>
          <p
            style={{
              fontStyle: 'italic',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              background: '#ddd',
            }}
          >
            <b>Description:</b> {newPreset.description}
          </p>
          {lostPkm.length > 0 && (
            <div className={styles.lostPkmBoxContainer}>
              <h4>Caught Pokémon that will be lost:</h4>
              <div className={styles.lostPkmBox}>{lostPkm}</div>
            </div>
          )}
          <p>
            Changing presets will reorganize your boxes and may change available Pokémon. <br />
            <b>Do you want to continue?</b>
          </p>
        </div>
      ),
      title: '', // TODO support it or remove it
      onConfirm: () => {
        app.changePreset(newPreset)
      },
      onCancel: () => {
        setModalContent(null)
      },
      confirmButton: 'Change',
      cancelButton: 'Cancel',
      prevState: {
        dex: dex,
        preset: preset!,
      },
    })
    // TODO tracker.dexPresetChanged(dex, newAction)
  }

  const handleActionToolToolbar = (
    newAction: string | null,
    prevState: string | null,
    prevAction: string | null
  ) => {
    if (newAction === currentTool) {
      return
    }
    if (newAction === 'all-marks') {
      setMarkTypes(allMarkTypes)
    } else if (newAction === 'no-marks') {
      setMarkTypes([])
    } else {
      setMarkTypes([newAction as MarkType])
    }
    setCurrentTool(newAction as ActionTool)
    // tracker.dexMarkingToolSelected(dex, newAction)
  }

  const toolbar = (
    <div id={'dex-' + dex.id} className={styles.toolbar}>
      <div className={styles.toolbarContainer}>
        <ToolbarButtonGroupGroup collapsed={true}>
          <ToolbarButton
            actionName={null}
            icon={'home3'}
            href={'/apps/livingdex'}
            label={'Go back to the list of Living Dexes'}
            onClick={() => {
              // tracker.dexesHomeClicked()
            }}
          />
          {/*Todo: fix button group internal state not updating when selectMode changes (initialAction related?)*/}
          {viewMode !== 'boxed' && (
            <ToolbarButtonGroup
              initialAction={selectMode}
              onButtonClick={handleSelectModeToolbar}
              isDropdown
              dropdownTitle={'Selection mode'}
              dropdownPosition={'left'}
              items={[
                {
                  actionName: 'cell',
                  icon: 'mouse-pointer',
                  label: 'Select Pokémon',
                },
                {
                  actionName: 'box',
                  icon: 'pkg-box',
                  label: 'Select Box',
                  status: 'disabled',
                },
              ]}
            />
          )}
          {viewMode === 'boxed' && (
            <ToolbarButtonGroup
              initialAction={selectMode}
              onButtonClick={handleSelectModeToolbar}
              isDropdown
              dropdownTitle={'Selection mode'}
              dropdownPosition={'left'}
              items={[
                {
                  actionName: 'cell',
                  icon: 'mouse-pointer',
                  label: 'Select Pokémon',
                },
                { actionName: 'box', icon: 'pkg-box', label: 'Select Box' },
              ]}
            />
          )}
          <ToolbarButtonGroup
            initialAction={viewMode}
            onButtonClick={handleViewModeToolbar}
            isDropdown
            dropdownTitle={'View mode'}
            dropdownPosition={'left'}
            items={[
              { actionName: 'boxed', icon: 'pkg-grid', label: 'Boxed view' },
              {
                actionName: 'listed',
                icon: 'infinite',
                label: 'Continuous view',
              },
            ]}
          />
          <ToolbarButtonGroup
            initialAction={currentTool}
            onButtonClick={handleActionToolToolbar}
            isDropdown
            dropdownTitle={'Marker tool'}
            dropdownPosition={'left'}
            dropdownNoActionIcon={'pencil2'}
            items={[
              {
                actionName: 'catch',
                icon: 'pkg-pokeball',
                label: 'Caught Marker Tool',
              }, // {actionName: 'shiny', icon: 'pkg-shiny', label: 'Shiny Marker Tool'},
              {
                actionName: 'gmax',
                icon: 'pkg-dynamax',
                label: 'Gigantamax Marker Tool',
                status: gameSymbols.includes('gmax') ? undefined : 'hidden',
              },
              {
                actionName: 'alpha',
                icon: 'pkg-wild',
                label: 'Alpha Marker Tool',
                status: gameSymbols.includes('alpha') ? undefined : 'hidden',
              },
              null,
              {
                actionName: 'all-marks',
                icon: 'eye',
                label: 'Show All (Read-only)',
              },
              {
                actionName: 'no-marks',
                icon: 'eye-blocked',
                label: 'Hide Marks & Uncaught',
              },
            ]}
          />
          <ToolbarButtonGroup
            initialAction={preset?.id || null}
            onButtonClick={handleChangePresetToolbar}
            isDropdown
            dropdownTitle={'Change Box Preset'}
            dropdownPosition={'middle'}
            dropdownNoActionIcon={'sync_alt'}
            items={Object.values(getPresetsForGame(dex.gameId))
              .filter(p => !p.isHidden)
              .map(pr => ({
                actionName: pr.id,
                label: pr.name,
                title: pr.description,
                status: pr.id === preset?.id ? 'selected' : null,
              }))}
          />

          <ToolbarButtonGroup
            initialAction={null}
            isDropdown
            onButtonClick={handleExport}
            dropdownNoActionIcon={'cog'}
            isDeselectable={false}
            items={(() => {
              return [
                {
                  actionName: 'export',
                  icon: 'download',
                  label: 'Export',
                  status: '',
                  className: styles.saveBtn,
                  showLabel: true,
                },
              ]
            })()}
          />
        </ToolbarButtonGroupGroup>
        <ToolbarButtonGroupGroup position="right">
          {savingState === 'saving' && <>⏳ Saving...</>}
          {savingState === 'error' && <>Sync error❌</>}
        </ToolbarButtonGroupGroup>
      </div>
    </div>
  )

  ReactModal.setAppElement('#__next')

  const removeDexModal = (
    <ReactModal
      isOpen={showRemoveModal}
      style={{ zIndex: 9999 } as any}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
      onRequestClose={() => {
        document.body.classList.remove('ReactModal__Body--open')
        setShowRemoveModal(false)
      }}
      contentElement={() => {
        return (
          <div className={'modal-content-wrapper text-center'}>
            <div className={'modal-dialog'}>
              <div className={'modal-dialog-message'}>
                Are you sure you want to remove this Living Dex and all its progress?
                <br /> This operation cannot be undone.
              </div>
              <div className={'modal-dialog-buttons'}>
                <div className={'text-center'}>
                  <Button
                    onClick={() => {
                      setShowRemoveModal(false)
                    }}
                  >
                    Keep it
                  </Button>
                  <Button onClick={handleRemoveDex} style={{ background: '#de1515' }}>
                    Sure, remove it
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )

  let genericModal = null
  if (modalContent !== null) {
    genericModal = (
      <ReactModal
        isOpen={true}
        style={{ zIndex: 9999, overflow: 'auto' } as any}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          document.body.classList.remove('ReactModal__Body--open')
          setModalContent(null)
        }}
        contentElement={() => {
          return (
            <div className={'modal-content-wrapper text-center'}>
              <div className={'modal-dialog'}>
                <div className={'modal-dialog-message'}>{modalContent?.content}</div>
                <div className={'modal-dialog-buttons'}>
                  <div className={'text-center'}>
                    <Button
                      onClick={() => {
                        if (modalContent?.onCancel) {
                          modalContent.onCancel()
                        }
                        setModalContent(null)
                      }}
                    >
                      {modalContent?.cancelButton || 'Cancel'}
                    </Button>
                    <Button
                      onClick={() => {
                        if (modalContent?.onConfirm) {
                          modalContent.onConfirm()
                        }
                        setModalContent(null)
                      }}
                      style={{ background: '#de8715' }}
                    >
                      {modalContent?.confirmButton || 'Confirm'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      />
    )
  }

  const missingAnchor = (
    <span className={styles.nonShinyAnchor}>
      <SiteLink href={'/apps/livingdex/missing#g-' + dex.gameId}>
        <i className={'icon-pkg-pokeball-outlined'} /> View Missing
      </SiteLink>
    </span>
  )

  const shinyAnchor = (
    <span
      onClick={() => {
        setShowShiny(true)
      }}
      className={styles.nonShinyAnchor}
    >
      <i className={'icon-pkg-shiny'} /> View Shiny Mode
    </span>
  )

  const nonShinyAnchor = (
    <span
      onClick={() => {
        setShowShiny(false)
      }}
      className={styles.shinyAnchor}
    >
      <i className={'icon-pkg-pokedex'} /> View Normal Mode
    </span>
  )

  return (
    <>
      {isEditable && toolbar}
      {isEditable && removeDexModal}
      {isEditable && genericModal !== null && genericModal}
      <div className={'text-center ' + classNameIf(isEditable, styles.toolbarApp)}>
        <div className={'inner-container bordered-container text-center ' + styles.dexHeader}>
          <div className={styles.dexLogo}>
            <GameLogo game={dex.gameId} size={160} asSwitchIcon={true} />
          </div>
          <div className={styles.dexInfo}>
            <h2 className={styles.dexTitle}>
              {isEditable && (
                <InlineTextEditor
                  maxLength={legacyConfig.limits.maxDexTitleSize}
                  afterEdit={handleDexTitleChange}
                >
                  {dex.title}
                </InlineTextEditor>
              )}
              {!isEditable && dex.title}
            </h2>
            <div className={styles.presetName}>
              <i>{preset?.name}</i>
            </div>
            <div className={styles.counters}>
              {dex.boxes.length > 2 && (
                <span className={styles.counter}>
                  <i className="icon-pkg-box" /> {dex.boxes.length / 2}*
                </span>
              )}
              <span className={styles.counter}>
                <i className="icon-pkg-pokedex" /> {dex.caughtRegular} / {dex.totalRegular}
                {dex.caughtRegular === dex.totalRegular && <i className={'icon-pkg-ribbon'} />}
              </span>
              {hasShinyMode && dex.totalShiny > 0 && (
                <span className={styles.counter}>
                  <i className="icon-pkg-shiny" /> {dex.caughtShiny} / {dex.totalShiny}
                  {dex.caughtShiny === dex.totalShiny && <i className={'icon-pkg-ribbon'} />}
                </span>
              )}
            </div>
          </div>
        </div>
        {isEditable && false && (
          <div className={'inner-container text-center ' + styles.dexMessageBanner}>
            Missing something? You can find all the data and presets used to organize all boxes in
            our <ExternLink href={config.links.github_dataset}>Dataset Repository</ExternLink>.
          </div>
        )}

        {dex.id ? (
          <div className={'inner-container text-center ' + styles.socialLinksBanner}>
            <DexSocialLinks
              shareAsOwner={isEditable}
              dexId={dex.id}
              className={styles.socialLinks + ' dexSocialLinks'}
            />
          </div>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <div
          className={styles.topRightCallout + ' ' + classNameIf(isEditable, styles.withToolbar)}
          style={{ right: hasShinyMode ? '200px' : '1rem' }}
        >
          {missingAnchor}
        </div>

        {hasShinyMode && (
          <div
            className={styles.topRightCallout + ' ' + classNameIf(isEditable, styles.withToolbar)}
          >
            {showShiny && nonShinyAnchor}
            {!showShiny && shinyAnchor}
          </div>
        )}

        <PkBoxGroup
          dex={dex}
          perPage={2}
          showNonShiny={!showShiny}
          showShiny={showShiny}
          selectMode={selectMode}
          viewMode={viewMode}
          usePixelIcons={false}
          revealPokemon={currentTool === 'all-marks'}
          editable={isEditable}
          markTypes={isEditable ? markTypes : viewOnlyModeMarkTypes}
          onBoxTitleEdit={isEditable ? handleBoxTitleEdit : undefined}
          onBoxClick={isEditable ? handleBoxClick : undefined}
          onPokemonClick={isEditable ? handlePkmClick : undefined}
        />

        {isEditable && dex.id && (
          <div className={'page-container'}>
            <br />
            <br />
            <br />
            <Button
              onClick={() => {
                setShowRemoveModal(true) // TODO convert to a ModalButton component
              }}
              style={{
                background: 'rgba(222,21,21,0.56)',
                border: '1px solid rgba(0,0,0.3)',
                padding: '0.5rem',
              }}
            >
              Delete Dex
            </Button>
          </div>
        )}
      </div>
      {dex.boxes.length > 2 && (
        <p className="text-center" style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <small>
            <i>
              <span>
                <sup>(*) </sup>
                {dex.boxes.length / 2} boxes for each mode (regular and shiny).
                <br />
                <br />
              </span>
              Be aware that the maximum number of boxes for this game is {gameSet.storage?.boxes},
              meaning that you can only store{' '}
              {(gameSet.storage?.boxes || NaN) * (gameSet.storage?.boxCapacity || NaN)} Pokémon in
              total + 6 in your party.
            </i>
          </small>
        </p>
      )}
    </>
  )
}
