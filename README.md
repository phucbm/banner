# banner

A TypeScript utility for generating JavaScript banner comments from package.json data

[![Publish on Release](https://github.com/phucbm/banner/actions/workflows/publish.yml/badge.svg)](https://github.com/phucbm/banner/actions/workflows/publish.yml)
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
import {generateBanner} from '@phucbm/banner'

// Using default package.json path
const banner = generateBanner();

// Using custom package.json path
const banner = generateBanner('./custom/package.json');

// Using package.json object directly
import pkg from './package.json';

const banner = generateBanner(pkg);

// Using custom object
const banner = generateBanner({
    name: 'my-package',
    version: '1.0.0',
    homepage: 'https://example.com',
    license: 'MIT',
    author: {
        name: 'John Doe',
        url: 'https://johndoe.com'
    }
});
```

### Example Output

```javascript
/*!
 * my-package 1.0.0
 * https://example.com
 *
 * @license MIT
 * @author: John Doe, https://johndoe.com
 */
```

### Integration with Build Tools

#### tsup

```typescript
import {defineConfig} from 'tsup';
import {generateBanner} from '@phucbm/banner';

const banner = generateBanner();

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    banner: {js: banner},
    // ... other options
});
```

#### Rollup

```javascript
import {generateBanner} from '@phucbm/banner';

const banner = generateBanner();

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        banner: banner
    }
};
```

#### Webpack

```javascript
import {BannerPlugin} from 'webpack';
import {generateBanner} from '@phucbm/banner';

const banner = generateBanner();

module.exports = {
    plugins: [
        new BannerPlugin({
            banner: banner,
            raw: true
        })
    ]
};
```

## API

### `generateBanner(input?: string | PackageJson): string`

Generates a JavaScript banner comment from package.json data.

**Parameters:**

- `input` (optional) - Either a path to package.json file (defaults to `'./package.json'`) or a package.json object

**Returns:**

- A formatted banner string ready for use in JavaScript files

**Package.json Fields Used:**

- `name` (required) - Package name
- `version` (required) - Package version
- `homepage` (optional) - Project homepage URL
- `license` (optional) - License identifier
- `author` (optional) - Author information object with `name` and optional `url`

## Features

- 📦 Reads directly from package.json files or objects
- 🎯 TypeScript support with full type definitions
- 🔧 Works with popular build tools (tsup, Rollup, Webpack, etc.)
- 🛡️ Graceful handling of missing optional fields
- ⚡ Zero dependencies
- 🧪 Comprehensive test coverage

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