import {
  ChildProcessByStdio,
  ChildProcessWithoutNullStreams,
  SpawnOptionsWithoutStdio,
} from 'child_process'
import internal from 'stream'
import { COMMANDS } from './constants'

export type IChild =
  | ChildProcessWithoutNullStreams
  | ChildProcessByStdio<null, internal.Readable, null>

export type IMetadata = {
  cmd: string
  options: string[]
}

export type ICommand = string | number | null
export type ICommandOptions = typeof COMMANDS[number]
export type IUnstructuredCommand = [ICommandOptions, ...string[]]
export type IArgs = string[]
export type IOptions = SpawnOptionsWithoutStdio
