import { spawn } from 'child_process'
import { COMMANDS } from '../src/constants'
import {
  IChild,
  ICommand,
  IMetadata,
  IOptions,
  IUnstructuredCommand,
} from '../src/interfaces'

const toPromise = (child: IChild): Promise<ICommand> =>
  new Promise((resolve, reject) => {
    child.on('close', () => resolve(null))
    child.on('error', error => reject(error))
    child.stdout.on('data', data => resolve(String(data)))
  })

const sanitizer = (command: string): IMetadata[] => {
  return command.split(/\|\s/g).map(data => {
    let metadata: IMetadata = { cmd: '', options: [] }
    const [cmd, ...opts] = data.split(/\s/g) as IUnstructuredCommand

    if (!COMMANDS.includes(cmd)) {
      throw new Error('Command not available')
    } else {
      metadata = { cmd, options: opts ? [...opts] : [] }
    }

    return metadata
  })
}

export const cmd = (command: string, options?: IOptions): Promise<ICommand> => {
  const commands = sanitizer(command)

  let child: IChild = spawn('echo')

  for (let idx = 0; idx < commands.length; idx++) {
    const meta = commands[idx]

    child = !idx
      ? spawn(meta.cmd, meta.options, options)
      : spawn(meta.cmd, meta.options, {
          ...options,
          stdio: [child!.stdout, 'pipe', process.stderr],
        })
  }

  return toPromise(child)
}
