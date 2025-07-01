# banner

A TypeScript utility package

[![npm version](https://badgen.net/npm/v/@phucbm/banner?icon=npm)](https://www.npmjs.com/package/@phucbm/banner)
[![npm downloads](https://badgen.net/npm/dm/@phucbm/banner?icon=npm)](https://www.npmjs.com/package/@phucbm/banner)
[![npm dependents](https://badgen.net/npm/dependents/@phucbm/banner?icon=npm)](https://www.npmjs.com/package/@phucbm/banner)
[![github stars](https://badgen.net/github/stars/phucbm/banner?icon=github)](https://github.com/phucbm/banner/)
[![github license](https://badgen.net/github/license/phucbm/banner?icon=github)](https://github.com/phucbm/banner/blob/main/LICENSE)

## Installation

```bash
npm i @phucbm/banner
```

```bash
pnpm add @phucbm/banner
```

## Usage

```typescript
import {myUtilityFunction} from '@phucbm/banner'
// or
import myUtilityFunction from '@phucbm/banner'

// Basic usage
const result = myUtilityFunction('your input');
```

## API

### `myUtilityFunction(input?: any): any`

Main utility function that processes the input.

**Parameters:**

- `input` (optional) - The input to process

**Returns:**

- The processed result

### `processElement(element: HTMLElement): HTMLElement`

Function for DOM element processing.

**Parameters:**

- `element` - HTML element to process

**Returns:**

- The processed element

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm run build

# Run tests in watch mode
pnpm run test:watch
```

## License

MIT © [phucbm](https://github.com/phucbm)