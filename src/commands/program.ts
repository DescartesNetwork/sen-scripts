import { Command, flags } from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import { Keypair } from '@solana/web3.js'

const DEFAULT_CONFIG = './soprox.config.json'
const DEFAULT_KEYPAIR = './dist/main-keypair.json'

export default class Program extends Command {
  static description = "Handle program's keypair"

  static args = [{ name: 'file' }]

  static flags = {
    help: flags.help({ char: 'h' }),
    network: flags.string({
      char: 'n',
      description: 'devnet | testnet | mainnet | custom',
    }),
    input: flags.string({
      char: 'i',
      description: 'Directory to the config file, soprox.config.js',
    }),
    output: flags.string({
      char: 'o',
      description: 'Directory to output the keypair file',
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
    // View file only
    if (flags.show) {
      const decode = path.join(process.cwd(), args.file ?? DEFAULT_KEYPAIR)
      if (!fs.existsSync(decode)) throw new Error(`Cannot find ${decode}.`)
      const buf = require(decode)
      if (!buf) throw new Error(`The file ${decode} is empty.`)
      const keypair = Keypair.fromSecretKey(Buffer.from(buf))
      this.log(`Read file ${decode}`)
      this.log('\tAddress:', keypair.publicKey.toBase58())
      this.log('\tSecretKey:', Buffer.from(keypair.secretKey).toString('hex'))
    }
    // Create a new keypair
    else {
      const network = flags.network ?? 'devnet'
      const input = path.join(process.cwd(), flags.input ?? DEFAULT_CONFIG)
      const output = path.join(process.cwd(), flags.output ?? DEFAULT_KEYPAIR)

      if (!fs.existsSync(input))
        throw new Error(`Cannot find the config file ${input}.`)
      if (fs.existsSync(output) && !flags.force) {
        throw new Error(
          'The file already existed. Please change another name and try again!',
        )
      } else {
        fs.mkdirSync(path.dirname(output), { recursive: true })
        fs.closeSync(fs.openSync(output, 'w')) // Clear or Create a new file
      }

      const {
        [network]: {
          program: { address, secretKey },
        },
      } = require(input)
      if (!secretKey)
        throw new Error(`Program's secretKey in ${network} config is empty.`)
      const keypair = Keypair.fromSecretKey(Buffer.from(secretKey, 'hex'))
      const generatedAddress = keypair.publicKey.toBase58()
      if (address && address !== generatedAddress)
        throw new Error(
          `The address and generated address by secret key is unmatched, ${address} != ${generatedAddress}.`,
        )
      fs.writeFileSync(output, `[${keypair.secretKey.toString()}]`)
    }
  }
}
