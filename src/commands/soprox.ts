import { Command, flags } from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import { execSync } from 'child_process'

const REPOS: Record<string, string> = {
  hello: 'git@github.com:DescartesNetwork/soprox-hello.git',
}

export default class Soprox extends Command {
  static description =
    'Generate a no-config Rust-based smart contract template on Solana'

  static args = [{ name: 'project' }]

  static flags = {
    help: flags.help({ char: 'h' }),
    template: flags.string({
      char: 't',
      description: 'Choose template. Default: hello',
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force to overwrite the output',
    }),
  }

  async run() {
    const { args, flags } = this.parse(Soprox)

    if (!args.project) return this.error('Enter the project name')

    const project = path.join(process.cwd(), args.project)
    const template = flags.template ?? 'hello'

    if (fs.existsSync(project) && !flags.force) {
      return this.error(
        `The project ${project} that already existed. Please change another name and try again!`,
      )
    } else {
      fs.removeSync(project)
    }

    this.log('\n👏👏👏 Thank you for using SoproX!\n')
    const spinner = require('ora')('Building the project...\n').start()
    execSync(`git clone ${REPOS[template]} ${args.project}`, {
      stdio: 'inherit',
    })
    execSync('npm install', { cwd: project, stdio: 'inherit' })
    execSync('npm run prepare', { cwd: project, stdio: 'inherit' })
    spinner.succeed('The project has been created!')
    this.log('Check it out!', project)
  }
}
