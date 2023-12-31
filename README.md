 <p align="center">
   <img  src="https://img.shields.io/badge/license-MIT-green">
 <img  src="https://img.shields.io/badge/build-passing-brightgreen">
   <img  src="https://img.shields.io/badge/version-1.0.0-orange">
   <img  src="https://img.shields.io/badge/npm-v6.14.8-blue">
  <img  src="https://img.shields.io/badge/node-v12.18.2-yellow">
 </p>
 <br>
<p align="center">A CLI tool to easily configure KKiaPay Pos Terminal.</p>
<br>
---

## Usage

```
~$ terminal --help
   _____                             _                   _    ____   _       ___ 
 |_   _|   ___   _ __   _ __ ___   (_)  _ __     __ _  | |  / ___| | |     |_ _|
   | |    / _ \ | '__| | '_ ` _ \  | | | '_ \   / _` | | | | |     | |      | | 
   | |   |  __/ | |    | | | | | | | | | | | | | (_| | | | | |___  | |___   | | 
   |_|    \___| |_|    |_| |_| |_| |_| |_| |_|  \__,_| |_|  \____| |_____| |___|
                                                                                

Usage: terminal -i <initialize>
┌────────────────────────────────────┐
│                                    │
│                                    │
│   Configure KKiaPay Pos Terminal   │
│                                    │
│                                    │
└────────────────────────────────────┘


Options:
      --version     Show version number                                [boolean]
  -i, --initialize  Initialize environment                              [string]
  -c, --configure   Configure Terminal                                  [string]
  -b, --build       build for production                                [string]
      --help        Show help                                          [boolean]

```

<br>

## Installation

1. Run ```npm install -g terminal_cli``` to install the CLI. <br>

> :warning: **This might cause an error** which can be resolved easily by using ```sudo``` with the command, **however**, using ```sudo``` with ```npm``` is **not recommended** because it might cause permission issues later. So instead put the code below in your .bashrc file and then run the above command again.
```
npm set prefix ~/.npm
PATH="$HOME/.npm/bin:$PATH"
PATH="./node_modules/.bin:$PATH"
```

2. Now you are good to go and can use the CLI globally!

Type ```terminal``` or ```terminal --help``` to get started.

<br>

## License

MIT © ***TerminalCLI***