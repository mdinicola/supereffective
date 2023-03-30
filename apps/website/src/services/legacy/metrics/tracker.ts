import { GameId } from '@app/src/domains/legacy/livingdex/games'
import { Dex } from '@app/src/services/legacy/datastore/Entities'
import fb from '@app/src/services/legacy/datastore/Firebase'

const setUser = (userId: string) => {
  fb.setAnalyticsUserId(userId)
}
const setUserData = (data: { [key: string]: any }) => {
  fb.setAnalyticUserProperties(data)
}
const trackEvent = (event: string, data?: { [key: string]: any }) => {
  fb.trackAnalyticsEvent(event, data)
}

const tracker = {
  asUser: (userId: string) => {
    setUser(userId)
  },
  loggedIn: (userId: string) => {
    setUser(userId)
    trackEvent('user_logged_in')
  },
  loggedOut: () => {
    trackEvent('user_logged_out')
    setUser('_guest')
  },
  dexCreated: (dexId: string, dex: Dex) => {
    trackEvent('dex_created', {
      game: dex.gameId,
    })
  },
  dexRemoved: (dexId: string) => {
    trackEvent('dex_removed')
  },
  dexUpdated: (dex: Dex) => {
    // track caught pokemon by game
    trackEvent('dex_updated', {
      game: dex.gameId,
      caught: dex.caughtRegular,
    })
    if (dex.caughtRegular === dex.totalRegular) {
      trackEvent('dex_complete', {
        game: dex.gameId,
      })
    }
    setUserData({
      lastDexGame: dex.gameId,
      lastDexCaught: dex.caughtRegular,
    })
  },
  dexSelectModeChanged: (dex: Dex, mode: string | null) => {
    trackEvent('dex_select_mode_changed', {
      game: dex.gameId,
      mode,
    })
  },
  dexViewModeChanged: (dex: Dex, mode: string | null) => {
    trackEvent('dex_view_mode_changed', {
      game: dex.gameId,
      mode,
    })
  },
  dexMarkingToolSelected: (dex: Dex, tool: string | null) => {
    trackEvent('dex_tool_selected', {
      game: dex.gameId,
      tool,
    })
  },
  dexHelpClicked: () => {
    trackEvent('dex_help_clicked')
  },
  dexesHomeClicked: () => {
    trackEvent('dexes_home_clicked')
  },
  dexCreateBtnClicked: (buttonId: string) => {
    trackEvent('dex_create_clicked', { buttonId: buttonId })
  },
  dexBoxTitleChanged: (game: GameId) => {
    trackEvent('dex_boxtitle_changed', { game: game })
  },
  tshirtQrScanned: () => {
    trackEvent('tshirt_qr_scanned')
  },
  tshirtQrNewUSer: () => {
    trackEvent('tshirt_qr_new_user')
  },
}

export default tracker
