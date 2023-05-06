import baseConfig from '@pkg/config/default'

const themeColorPurple = ['#352f46', '#6b5e94', '#a692eb', '#c5b6f2', '#e3dbf9']

const config = {
  ...baseConfig,
  version: {
    num: '3.6.0',
  },
  themeColor: themeColorPurple[2],
}

export default config
