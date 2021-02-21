import { cmd } from '../lib/cmd'

describe('Test', () => {
  it('should print "nunix" on the console.', async () => {
    expect(await cmd('echo nunix')).toBe(`nunix\n`)
  })
})
