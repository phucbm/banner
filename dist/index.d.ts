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
declare function generateBanner(input?: string | PackageJson): string;

export { generateBanner };
