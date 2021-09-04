sen-scripts
===========

Convenient scripts for keypair creation, contract deployment, and many others

[![Version](https://img.shields.io/npm/v/@senswap/sen-scripts.svg)](https://npmjs.org/package/sen-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/@senswap/sen-scripts.svg)](https://npmjs.org/package/sen-scripts)
[![License](https://img.shields.io/npm/l/@senswap/sen-scripts.svg)](https://github.com/DescartesNetwork/sen-scripts/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @senswap/sen-scripts
$ sen-scripts COMMAND
running command...
$ sen-scripts (-v|--version|version)
@senswap/sen-scripts/0.0.18 darwin-x64 node-v14.16.1
$ sen-scripts --help [COMMAND]
USAGE
  $ sen-scripts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sen-scripts help [COMMAND]`](#sen-scripts-help-command)
* [`sen-scripts payer [FILE]`](#sen-scripts-payer-file)
* [`sen-scripts program [FILE]`](#sen-scripts-program-file)
* [`sen-scripts soprox [PROJECT]`](#sen-scripts-soprox-project)

## `sen-scripts help [COMMAND]`

display help for sen-scripts

```
USAGE
  $ sen-scripts help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `sen-scripts payer [FILE]`

Handle payer's keypair. Default file: ./dist/payer-keypair.json

```
USAGE
  $ sen-scripts payer [FILE]

OPTIONS
  -c, --config=config    Directory to the config file, soprox.config.js
  -f, --force            Force to overwrite the output
  -h, --help             show CLI help
  -n, --network=network  devnet | testnet | mainnet | custom
  -s, --show             Read the payer keypair
```

_See code: [src/commands/payer.ts](https://github.com/DescartesNetwork/sen-scripts/blob/v0.0.18/src/commands/payer.ts)_

## `sen-scripts program [FILE]`

Handle program's keypair. Default file: ./dist/main-keypair.json

```
USAGE
  $ sen-scripts program [FILE]

OPTIONS
  -c, --config=config    Directory to the config file, soprox.config.js
  -f, --force            Force to overwrite the output
  -h, --help             show CLI help
  -n, --network=network  devnet | testnet | mainnet | custom
  -s, --show             Read the program keypair
```

_See code: [src/commands/program.ts](https://github.com/DescartesNetwork/sen-scripts/blob/v0.0.18/src/commands/program.ts)_

## `sen-scripts soprox [PROJECT]`

Generate a no-config Rust-based smart contract template on Solana

```
USAGE
  $ sen-scripts soprox [PROJECT]

OPTIONS
  -f, --force              Force to overwrite the output
  -h, --help               show CLI help
  -t, --template=template  Choose template. Default: hello
```

_See code: [src/commands/soprox.ts](https://github.com/DescartesNetwork/sen-scripts/blob/v0.0.18/src/commands/soprox.ts)_
<!-- commandsstop -->
