import { Command, flags } from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'

export default class Keypair extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    input: flags.string({
      char: 'i',
      description: 'Directory to the config file, soprox.config.js',
    }),
    output: flags.string({
      char: 'o',
      description: 'Directory to output the keypair file',
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force to overwrite the output',
    }),
  }

  async run() {
    const { flags } = this.parse(Keypair)

    const { force } = flags
    const input = path.join(process.cwd(), flags.input ?? './soprox.config.js')
    const output = path.join(
      process.cwd(),
      flags.output ?? './dist/keypair.json',
    )

    if (!fs.existsSync(input))
      return this.log(`Cannot find the config file ${input}`)
    if (fs.existsSync(output) && !force) {
      return this.log(
        'The file already existed. Please change another name and try again!',
      )
    } else {
      fs.mkdirSync(output, { recursive: true })
    }
  }
}
