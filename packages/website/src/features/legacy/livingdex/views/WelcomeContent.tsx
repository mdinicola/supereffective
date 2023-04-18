import { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getLivingDexRepository } from '@pkg/database/src/living-dexes/legacy'

import PkImage from '#/features/legacy/livingdex/views/PkImage'
import { UserContext } from '#/features/legacy/users/state/UserContext'
import { useScrollToLocation } from '#/hooks/legacy/useScrollToLocation'
import { ButtonInternalLink } from '#/primitives/legacy/Button/Button'
import { SiteLink } from '#/primitives/legacy/Link/Links'

import styles from './WelcomeContent.module.css'

const dexRepo = getLivingDexRepository()

export const WelcomeContent = () => {
  useScrollToLocation()

  const { dexes } = useContext(UserContext).state
  // Style guide: https://pokemongolive.com/en/post/alola-to-alola/
  const imgStyle = {
    width: '100%',
    borderRadius: '1rem',
    display: 'block',
    margin: '2rem 0',
  }

  const canAddMoreDexes = dexRepo.canCreateMoreDexes(dexes)
  const ifCanAddMoreDexes = (children: any, fallback: any) =>
    canAddMoreDexes ? children : fallback
  const onCreateBtn = (btnId: string) => {
    // tracker.dexCreateBtnClicked(btnId)
  }

  return (
    <>
      <div className={styles.topRightCallout + ' top-right-callout'}>
        {/*<Link href={"/apps/livingdex/missing"}>*/}
        {/*  <a className={styles.calloutBtn + " " + styles.heroCalloutBtn}>My Missing Pokémon</a>*/}
        {/*</Link>*/}
        <Link href={'/apps/livingdex/national'} className={styles.calloutBtn}>
          Full Dex Quick View
        </Link>
        <Link href={'#howto'} className={styles.calloutBtn}>
          How-To
        </Link>
      </div>
      <div className={'bordered-container inner-container bg-white'}>
        <article className={'inner-container-hero'}>
          <h2>
            <i className={'icon-pkg-box-home'} /> Living Pokédex Tracker
          </h2>
          <article className="bg-gr-blue inner-container">
            <div className="text-center">
              <Image src={'/assets/pokedex.png'} width={246} height={203} alt="pokedex" />
              <br />
              <br />
            </div>
            Track your Living Pokédex for any game and share your progress in your social media with{' '}
            <b>Supereffective's Dex Tracker</b>. You will be able to track your progress for all{' '}
            <b>main series</b> games as well as for <b>Pokémon GO</b> and <b>Pokémon HOME</b>.
            <br />
            <br />A visual guide will also help you organize your Pokémon Boxes in an effective and
            understandable way. If you are looking for a way to quickly check which Pokémon you are
            missing and for which games, this is your website.
          </article>
          <div className={'text-block'}>
            <p>
              Continue reading to know more about <a href={'#features'}>all the features</a> and
              future plans, <a href={'#howto'}>how to use the app</a> or, <span /> if you are
              already familiar with it, you can just{' '}
              {ifCanAddMoreDexes(
                <Link
                  href={'/apps/livingdex/new'}
                  onClick={() => onCreateBtn('btn-1')}
                  rel="nofollow"
                >
                  create a new Living Pokédex <span />
                </Link>,
                ' open one of your existing Living Pokédex '
              )}{' '}
              to get started and keep track of your Pokémon in any of the mentioned games.
            </p>
          </div>
          <div className={'text-block'}>
            <p>
              If you only need a visual reference for all storable Pokémon available for Pokémon
              HOME, you can use our{' '}
              <Link href={'/apps/livingdex/national'}>Full National Living Pokédex for Guests</Link>
              , which doesn't require any account or login.
            </p>
          </div>
        </article>

        <article className={'bg-teal-light inner-container'} id={'features'}>
          <h3>Visualize and Organize</h3>
          <div className="text-block">
            <p>
              This web app lists all storable Pokémon forms, including all gender differences,
              sorted and grouped in a comprehensive way. It will help you organize your own boxes in
              the most efficient and future-proof way.
            </p>
            <p>
              <small>Many sorting and grouping presets are available for you to choose.</small>
            </p>

            <Image style={imgStyle} src={'/assets/gui/help/box1.png'} alt={'box1'} fill={true} />
          </div>
        </article>

        <article className={'bg-gold-light inner-container'}>
          <h3>Track and Classify</h3>
          <div className="text-block">
            <p>
              With the Pokédex Tracker, you have various tools to mark a single or a box of Pokémon
              as Caught <i className={'icon-pkg-dynamax'} />, Gigantamax{' '}
              <i className={'icon-pkg-wild'} />, or Alpha (depending on the game) and then save your
              progress in the cloud. You can also edit the Dex and Box titles, change view mode from
              boxes to list, and more.
            </p>
            <p>
              This way, you will have all information available on a single page that you can check
              any time without having to log in to HOME and check your boxes to see what you are
              missing.
            </p>
            <p>
              You can also track your shiny Pokémon by switching to the "
              <i className={'icon-pkg-shiny'} /> Shiny Mode".
            </p>

            <Image
              style={imgStyle}
              src={'/assets/gui/help/box-markers.png'}
              alt={'box1'}
              fill={true}
            />
          </div>
        </article>

        <article className={'bg-blue-light inner-container'}>
          <h3>Share and Trade</h3>
          <div className="text-block">
            <p>
              You have completed filling your online Living Dex and you want to tell your friends to
              take a look and see if they have any of the Pokémon that you are missing.
            </p>
            <p>
              The link to your Living Dex will be always public and all the people that have a link
              to it will be able to see your Pokémon and boxes. It is like a "pokepaste", but for
              Pokédex progress.
            </p>
            <p>
              It's up to you to keep it secret or share it with your friends and on social media.
            </p>
            <p>
              <small>
                Soon you will be able to add your social links to your dex page and have a trainer
                profile with a nickname as well.
              </small>
            </p>

            <Image
              style={imgStyle}
              src={'/assets/gui/help/rb-trade.png'}
              alt={'box1'}
              fill={true}
            />
          </div>
        </article>

        <article id={'howto'} className={'inner-container bg-purple-light'}>
          <h3>How to use the Living Dex Tracker app?</h3>
          <div className="text-block">
            <section>
              How to use the new Living Dex app (site version 2.0+) :
              <ul>
                <li>
                  <p>
                    <b>Sign In: </b>
                    To use the app you have to be signed in with one of our providers (Google,
                    Twitter or Github) and
                    {ifCanAddMoreDexes(
                      <Link
                        href={'/apps/livingdex/new'}
                        onClick={() => onCreateBtn('btn-2')}
                        rel="nofollow"
                      >
                        {' '}
                        create a new Dex{' '}
                      </Link>,
                      ' create a new Dex '
                    )}
                    if you don't have any.
                  </p>

                  <p>
                    When you are signed in and go to your own Dex, a toolbar will appear at the top
                    of the page.
                  </p>

                  <p>
                    If for some reason, you can't or don't want to sign in, you can also use our{' '}
                    <Link href={'/apps/livingdex/national'}>read-only mode Living Dex</Link>, which
                    is basically a visual guide like in the first version of the site.
                  </p>
                </li>
                <li>
                  <p>
                    <b>Editing your Dex Title: </b>
                    Dex title is editable. You only need to click on it to start changing it.
                  </p>
                </li>
                <li>
                  <p>
                    <b>Pokémon Selection Mode: </b>
                    The first tool is the selection mode: single Pokémon{' '}
                    <i className={'icon-mouse-pointer'} /> or full box{' '}
                    <i className={'icon-pkg-box'} />. Selecting one or another will affect how marks
                    are applied to the Pokémon (to one or to all in a box).
                  </p>
                </li>
                <li>
                  <p>
                    <b>Changing List View: </b>
                    The second tool is the view mode: boxed <i className={'icon-pkg-grid'} /> or
                    continuous <i className={'icon-infinite'} />. In boxed, mode you will see all
                    Pokémon distributed in boxes. In continuous mode you will see all Pokémon in a
                    cleaner single list, without any gap between them, useful to see their marks and
                    images bigger with all their names.
                  </p>
                </li>
                <li>
                  <p>
                    <b>Check-listing and marking your Pokémon: </b>
                    The marker tool, allows you to mark your pokemon as Caught
                    <i className={'icon-pkg-pokeball'} />
                    / Uncaught
                    <i className={'icon-pkg-pokeball-outlined'} />, Gigantamax
                    <i className={'icon-pkg-dynamax'} /> or Alpha
                    <i className={'icon-pkg-wild'} />, depending on the game you are in.
                  </p>
                  <p>
                    All non-caught
                    <i className={'icon-pkg-pokeball-outlined'} /> pokemon will be shown as shadows,
                    which visually helps to know which ones you don&#39;t have, it also avoids
                    spoilers whenever we add newly discovered Pokémon and forms.
                  </p>
                  <p>
                    You can view all marks at once by clicking on the Show button (
                    <i className={'icon-eye'} />
                    ), or hide all of them by clicking on the Show-none button (
                    <b>
                      <small>
                        <i className={'icon-eye-blocked'} />
                      </small>
                    </b>
                    ).
                    <br />
                    In both of these show modes, you won't be applying any mark when clicking on
                    your Pokémon or boxes, until you select a marking tool again.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className={'icon-pkg-shiny'} /> Tracking Shiny Pokémon
                    </b>
                    <br />
                    You can alternate the regular and shiny mode by clicking on the "
                    <i className={'icon-pkg-shiny'} /> View Shiny Mode" button or the "
                    <i className={'icon-pkg-pokedex'} /> View Regular Mode" button.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className={'icon-sync_alt'} /> Changing your Dex to use a different preset:{' '}
                    </b>
                    The Living Dex app supports many different games and for every one, there might
                    be different predefined sorting and grouping modes from which you can choose.
                    <br />
                    When you use the preset tool (
                    <i className={'icon-sync_alt'} />) you are telling the app to reorganize your
                    boxes with a different preset than the current one. The app will try to match
                    your data with the existent Pokémon in the preset, but sometimes you will see
                    that the number of storable Pokémon varies.
                    <br />
                    This is because some presets have duplicated Pokémon to be visually more
                    attractive (e.g. the box with Vivillon, it also has the base form) and some
                    other presets omit the duplication of Pokémon that are hard to find (e.g. having
                    one Arceus per type).
                    <br />
                    In any case, when a Pokémon you recorded is not found in the destination preset,
                    it will be added into a new box at the end.
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className={'icon-keyboard'} /> Navigating with your keyboard:{' '}
                    </b>
                    You can use <kbd>TAB</kbd> or the arrow keys of your keyboard to navigate your
                    Dex, and <kbd>SPACE</kbd> or <kbd>ESC</kbd> to apply the currently selected
                    marker tool (if any).
                  </p>
                </li>
                <li>
                  <p>
                    <b>Saving your progress: </b>
                    Everything you do won&#39;t be saved until you click on the Save button (
                    <i className={'icon-cloud_upload'} />
                    ).
                  </p>
                </li>
                <li>
                  <p>
                    <b>
                      <i className={'icon-bin'} />
                      Deleting a Dex:{' '}
                    </b>
                    You have a limited number of Dexes that you can create. If you changed your mind
                    and want to recover a slot for a new one, you can scroll all the way down to the
                    bottom of your Dex to find the button to delete it.
                  </p>
                </li>
                <li>
                  <p>
                    <b>Sharing your Dex page: </b>
                    Once you save your dex the first time, you can share the link with others.
                    Others will see a view-only version, which shows all your progress in the boxed
                    view mode with all the Pokémon marks (except Pokéballs, to avoid redundancy).
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </article>

        <article className={'bg-gr-white-pattern inner-container'} id={'creation'}>
          <div className={'text-center'}>
            <div style={{ width: '150px', height: '150px', display: 'inline-block' }}>
              <PkImage
                slug={'arceus'}
                title={''}
                shiny={false}
                pixelArt={false}
                classNameExtra={''}
              />
            </div>
          </div>
          <p>
            Trainer, are you ready? Your very own Pokémon story is about to unfold. You'll face fun
            times and tough challenges in order to complete your Pokédex.
          </p>
          <p>
            A world of dreams and adventures with Pokémon awaits! Let's go! I'll be seeing you
            later!
          </p>
          {canAddMoreDexes && (
            <p className={'text-center'}>
              <ButtonInternalLink
                href={'/apps/livingdex/new'}
                onClick={() => onCreateBtn('btn-3')}
                rel="nofollow"
                style={{ fontSize: '1rem' }}
              >
                <i className={'icon-pkg-box-home'} /> Start a new Living Pokédex
              </ButtonInternalLink>
            </p>
          )}
        </article>

        <div className={'text-block text-center'}>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
            <br />
            <SiteLink href={'/terms-and-conditions'}>Terms and Conditions</SiteLink>
          </p>
        </div>
      </div>
    </>
  )
}
