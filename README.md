sen-scripts
===========

Convenient scripts for keypair creation, contract deployment, and many others

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sen-scripts.svg)](https://npmjs.org/package/sen-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/sen-scripts.svg)](https://npmjs.org/package/sen-scripts)
[![License](https://img.shields.io/npm/l/sen-scripts.svg)](https://github.com/DescartesNetwork/sen-scripts/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sen-scripts
$ sen-scripts COMMAND
running command...
$ sen-scripts (-v|--version|version)
sen-scripts/0.0.1 darwin-x64 node-v14.16.1
$ sen-scripts --help [COMMAND]
USAGE
  $ sen-scripts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sen-scripts hello [FILE]`](#sen-scripts-hello-file)
* [`sen-scripts help [COMMAND]`](#sen-scripts-help-command)
* [`sen-scripts keypair`](#sen-scripts-keypair)

## `sen-scripts hello [FILE]`

describe the command here

```
USAGE
  $ sen-scripts hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/hello.ts](https://github.com/DescartesNetwork/sen-scripts/blob/v0.0.1/src/commands/hello.ts)_

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

## `sen-scripts keypair`

describe the command here

```
USAGE
  $ sen-scripts keypair

OPTIONS
  -f, --force          Force to overwrite the output
  -h, --help           show CLI help
  -i, --input=input    Directory to the config file, soprox.config.js
  -o, --output=output  Directory to output the keypair file
```

_See code: [src/commands/keypair.ts](https://github.com/DescartesNetwork/sen-scripts/blob/v0.0.1/src/commands/keypair.ts)_
<!-- commandsstop -->
