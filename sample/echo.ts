import { cmd } from '../lib/cmd'

cmd('echo nunix').then(out => {
  console.log(out)
})
