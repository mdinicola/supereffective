import * as _firebase from '@firebase/app'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'

import config from '../config.json'
import getFirebaseApp from './getFirebaseApp'

vi.mock('@firebase/app', () => ({
  getApps: vi.fn(),
  initializeApp: vi.fn(),
  getApp: vi.fn(),
}))

vi.mock('../config.json', () => ({
  default: {
    firebase: {
      publicConfig: {
        apiKey: 'testApiKey',
        authDomain: 'testAuthDomain',
        projectId: 'testProjectId',
      },
    },
  },
}))

const getAppMock = _firebase.getApp as Mock
const getAppsMock = _firebase.getApps as Mock

describe('firebaseApp', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('initializes the app only when no apps have been initialized', () => {
    getAppsMock.mockReturnValueOnce([])
    getFirebaseApp()

    expect(_firebase.initializeApp).toBeCalled()
    expect(_firebase.initializeApp).toHaveBeenCalledWith(config.firebase.publicConfig)
  })

  it('does not initialize the app when there is an existing app', () => {
    getAppsMock.mockReturnValueOnce([{ existingApp: true }])
    getFirebaseApp()

    expect(_firebase.initializeApp).not.toHaveBeenCalled()
  })

  it('exports the correct Firebase app instance', () => {
    const mockAppInstance = { appName: 'testApp' }
    getAppsMock.mockReturnValueOnce([])
    getAppMock.mockReturnValueOnce(mockAppInstance)

    expect(getFirebaseApp()).toEqual(mockAppInstance)
    expect(_firebase.getApp).toHaveBeenCalledTimes(1)
    expect(_firebase.getApp).toHaveBeenCalled()
  })
})
