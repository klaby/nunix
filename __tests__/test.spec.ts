import { print } from '../lib/console'

describe('Test', () => {
  it('should print "npm-pkg-boilerplate" on the console.', () => {
    console.log = jest.fn()

    print('npm-pkg-boilerplate')

    expect(console.log).toHaveBeenCalledWith(`Print > npm-pkg-boilerplate`)
  })
})
