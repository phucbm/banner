import {readFileSync} from 'fs';

interface PackageJson {
    name: string;
    version: string;
    homepage?: string;
    license?: string;
    author?: {
        name: string;
        url?: string;
    };
}

/**
 * Reads package.json and generates a banner string
 * @param input - Either a path to package.json file or a package.json object
 * @returns Banner string formatted for JavaScript files
 */
export function generateBanner(input: string | PackageJson = './package.json'): string {
    try {
        let pkg: PackageJson;

        if (typeof input === 'string') {
            // Read from file path
            const packageJsonContent = readFileSync(input, 'utf-8');
            pkg = JSON.parse(packageJsonContent);
        } else {
            // Use provided object
            pkg = input;
        }

        const banner = `/*!
 * ${pkg.name} ${pkg.version}
 * ${pkg.homepage || ''}
 *${pkg.license ? `\n * @license ${pkg.license}` : ''}${pkg.author?.name ? `\n * @author: ${pkg.author.name}${pkg.author.url ? `, ${pkg.author.url}` : ''}` : ''}
 */`;

        return banner;
    } catch (error) {
        throw new Error(`Failed to generate banner: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}