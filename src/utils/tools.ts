import path from 'path'
import fs from 'fs'
import {spawn} from 'child_process'
import {workspace} from 'coc.nvim'
import which from 'which'
import {configDir} from './config'

////////////////////////////////////////////////////////////////////////////////

export async function installGoBin(source: string, force: boolean = false) {
  const name = goBinName(source)

  if (!force && await goBinExists(name)) {
    return
  }

  workspace.showMessage(`Installing '${name}'`)

  const success = await goRun(`get -u ${source}`)

  if (success) {
    workspace.showMessage(`Installed '${name}'`)
  } else {
    workspace.showMessage(`Failed to install '${name}'`, 'error')
  }

  return success
}

export async function goBinPath(source: string): Promise<string> {
  const name = goBinName(source)
  return path.join(await configDir('bin'), name)
}

export async function runGoTool(name: string, args: string[] = []): Promise<Number> {
  const bin = await goBinPath(name)
  return new Promise(resolve => spawn(bin, args).on('close', (code) => resolve(code)))
}

export async function commandExists(command: string): Promise<boolean> {
  return new Promise(resolve => which(command, (err, _: string) => resolve(err == null)))
}

////////////////////////////////////////////////////////////////////////////////

async function goBinExists(source: string): Promise<boolean> {
  const name = goBinName(source)
  const bin = await goBinPath(name)
  return new Promise(resolve => fs.open(bin, 'r', (err, _) => resolve(err === null)))
}

async function goRun(args: string): Promise<boolean> {
  const gopath = await configDir('tools')
  const gobin = await configDir('bin')
  const cmd = `env GOBIN=${gobin} GOPATH=${gopath} go ${args}`

  try {
    await workspace.runCommand(cmd, gopath)
  } catch (ex) {
    workspace.showMessage(ex)
    return false
  }

  return true
}

function goBinName(source: string): string {
  return source.replace(/\/\.\.\.$/, '').split('/').pop()
}

