import { Command, flags } from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import { Keypair } from '@solana/web3.js'

const DEFAULT_CONFIG = './soprox.config.json'
const DEFAULT_KEYPAIR = './dist/main-keypair.json'

export default class Program extends Command {
  static description = `Handle program's keypair. Default file: ${DEFAULT_KEYPAIR}`

  static args = [{ name: 'file' }]

  static flags = {
    help: flags.help({ char: 'h' }),
    network: flags.string({
      char: 'n',
      description: 'devnet | testnet | mainnet | custom',
    }),
    config: flags.string({
      char: 'c',
      description: 'Directory to the config file, soprox.config.js',
    }),
    show: flags.boolean({
      char: 's',
      description: 'Read the program keypair',
    }),
    force: flags.boolean({
      char: 'f',
      description: 'Force to overwrite the output',
    }),
  }

  async run() {
    const { args, flags } = this.parse(Program)
    const file = path.join(process.cwd(), args.file ?? DEFAULT_KEYPAIR)
    // View file only
    if (flags.show) {
      if (!fs.existsSync(file)) throw new Error(`Cannot find ${file}.`)
      const buf = require(file)
      if (!buf) throw new Error(`The file ${file} is empty.`)
      const keypair = Keypair.fromSecretKey(Buffer.from(buf))
      this.log(`Read file ${file}`)
      this.log('\tAddress:', keypair.publicKey.toBase58())
      this.log('\tSecretKey:', Buffer.from(keypair.secretKey).toString('hex'))
    }
    // Create a new keypair
    else {
      const network = flags.network ?? 'devnet'
      const config = path.join(process.cwd(), flags.config ?? DEFAULT_CONFIG)

      if (!fs.existsSync(config))
        throw new Error(`Cannot find the config file ${config}.`)
      if (fs.existsSync(config) && !flags.force) {
        throw new Error(
          `The file ${file} already existed. Please change another name and try again!`,
        )
      } else {
        fs.mkdirSync(path.dirname(config), { recursive: true })
        fs.closeSync(fs.openSync(config, 'w')) // Clear or Create a new file
      }

      const {
        [network]: {
          program: { address, secretKey },
        },
      } = require(config)
      if (!secretKey)
        throw new Error(`Program's secretKey in ${network} config is empty.`)
      const keypair = Keypair.fromSecretKey(Buffer.from(secretKey, 'hex'))
      const generatedAddress = keypair.publicKey.toBase58()
      if (address && address !== generatedAddress)
        throw new Error(
          `The address and generated address by secret key is unmatched, ${address} != ${generatedAddress}.`,
        )
      fs.writeFileSync(file, `[${keypair.secretKey.toString()}]`)
    }
  }
}
