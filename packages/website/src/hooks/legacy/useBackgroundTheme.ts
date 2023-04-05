import { useEffect } from 'react'

export type BackgroundTheme =
  | 'white'
  | 'teal'
  | 'purple'
  | 'blue'
  | 'gold'
  | 'white-pattern'
  | 'teal-pattern'
  | 'purple-pattern'
  | 'blue-pattern'
  | 'gold-pattern'

export const DefaultBackgroundTheme: BackgroundTheme = 'teal-pattern'

const useBackgroundTheme = (themeName: BackgroundTheme) => {
  useEffect(() => {
    return
    // //console.info(`Background theme changed to '${themeName}'`)
    //
    // const body = document.querySelector(".page")
    // if (!body) {
    //   return
    // }
    //
    // // find class starting with "theme-"
    // const currentTheme =
    //   Array.from(body.classList).find((c) => c.startsWith("bg-gr-")) || `bg-gr-${DefaultBackgroundTheme}`
    //
    // body.classList.remove(currentTheme)
    // body.classList.add(`bg-gr-${themeName}`)
    //
    // return () => {
    //   body.classList.add(currentTheme)
    //   body.classList.remove(`bg-gr-${themeName}`)
    // }
  }, [themeName])
}

export default useBackgroundTheme
