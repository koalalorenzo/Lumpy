import * as daemon from './daemon'

jest.mock('electron-settings', () => {
  const getSyncMock = jest.fn()
    .mockReturnValueOnce(null)
    .mockReturnValueOnce('/custom/path/to/ipfs')

  return {
    getSync: getSyncMock
  }
})
jest.mock('app-root-dir', () => {
  const getAppRootMock = jest.fn().mockReturnValue('root-dir')

  return {
    get: getAppRootMock
  }
})

jest.mock('electron', () => {
  const fakeDir = jest.fn().mockReturnValue('not-existing-dir')
  return {
    app: {
      getPath: fakeDir
    }
  }
})

describe('daemon.js', () => {
  describe('getPathIPFSBinary', () => {
    it('should always return the default value', () => {
      // arrange
      // act
      const path = daemon.binaryPath
      // assert
      expect(path).toBe('root-dir/go-ipfs/ipfs')
    })
  })

  describe('isIPFSInitialised', () => {
    it('will correctly return if a repo conf does not exist', () => {
      const bool = daemon.isIPFSInitialised()
      expect(bool).toBe(false)
    })
  })

  describe('getSiderusPeers', () => {
    it('should download list of peers, not empty', () => {
      const prom = daemon.getSiderusPeers()

      expect(prom).resolves.not.toContain('')// removes empty lines
    })
  })
})
