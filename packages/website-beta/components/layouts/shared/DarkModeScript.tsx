'use client'

type ScriptProps = {
  className?: string
  localStorageKey?: string
  autoDetect?: boolean
  defaultEnabled?: boolean
}

export default function DarkModeScript({
  className = 'dark',
  localStorageKey = 'darkMode',
  autoDetect = true,
  defaultEnabled = true,
}: ScriptProps) {
  const code = `
  (function() {
    const autoDetect = ${String(autoDetect)};
    const defaultEnabled = ${String(defaultEnabled)};
    const darkModeSetting = localStorage.getItem('${localStorageKey}');

    const darkModeSettingOn = darkModeSetting === 'true';
    const darkModeSettingOff = darkModeSetting === 'false';
    const darkModeSystemOn = autoDetect && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkModeDefaultOn = defaultEnabled && !darkModeSettingOff;
    
    const darkMode = darkModeSettingOn || darkModeSystemOn || darkModeDefaultOn;
    
    document.documentElement.classList.toggle('${className}', darkMode);
  })();
  `
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')

  return <script id="setup-darkmode" dangerouslySetInnerHTML={{ __html: code }} />
}
