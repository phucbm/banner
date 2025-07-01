import {generateBanner} from '../src';
import {readFileSync} from 'fs';

// Mock fs module for testing
jest.mock('fs');
const mockReadFileSync = readFileSync as jest.MockedFunction<typeof readFileSync>;

describe('generateBanner', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('with file path input', () => {
        it('should generate banner from default package.json path', () => {
            const mockPackageJson = {
                name: 'test-package',
                version: '1.0.0',
                homepage: 'https://example.com',
                license: 'MIT',
                author: {
                    name: 'John Doe',
                    url: 'https://johndoe.com'
                }
            };

            mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));

            const result = generateBanner();

            expect(mockReadFileSync).toHaveBeenCalledWith('./package.json', 'utf-8');
            expect(result).toBe(`/*!
 * test-package 1.0.0
 * https://example.com
 *
 * @license MIT
 * @author: John Doe, https://johndoe.com
 */`);
        });

        it('should generate banner from custom file path', () => {
            const mockPackageJson = {
                name: 'custom-package',
                version: '2.0.0',
                homepage: 'https://custom.com',
                license: 'Apache-2.0',
                author: {
                    name: 'Jane Smith'
                }
            };

            mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));

            const result = generateBanner('./custom/package.json');

            expect(mockReadFileSync).toHaveBeenCalledWith('./custom/package.json', 'utf-8');
            expect(result).toBe(`/*!
 * custom-package 2.0.0
 * https://custom.com
 *
 * @license Apache-2.0
 * @author: Jane Smith
 */`);
        });

        it('should handle missing optional fields gracefully', () => {
            const mockPackageJson = {
                name: 'minimal-package',
                version: '1.0.0'
            };

            mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));

            const result = generateBanner();

            expect(result).toContain('minimal-package 1.0.0');
            expect(result).toMatch(/^\/\*!/);
            expect(result).toMatch(/\*\/$/);
        });

        it('should handle author without URL', () => {
            const mockPackageJson = {
                name: 'no-url-package',
                version: '1.0.0',
                license: 'MIT',
                author: {
                    name: 'Author Name'
                }
            };

            mockReadFileSync.mockReturnValue(JSON.stringify(mockPackageJson));

            const result = generateBanner();

            expect(result).toBe(`/*!
 * no-url-package 1.0.0
 * 
 *
 * @license MIT
 * @author: Author Name
 */`);
        });

        it('should throw error when file cannot be read', () => {
            mockReadFileSync.mockImplementation(() => {
                throw new Error('File not found');
            });

            expect(() => generateBanner('./nonexistent.json')).toThrow('Failed to generate banner: File not found');
        });

        it('should throw error when JSON is invalid', () => {
            mockReadFileSync.mockReturnValue('invalid json');

            expect(() => generateBanner()).toThrow('Failed to generate banner:');
        });
    });

    describe('with package object input', () => {
        it('should generate banner from package object with all fields', () => {
            const packageObj = {
                name: 'object-package',
                version: '3.0.0',
                homepage: 'https://object.com',
                license: 'BSD-3-Clause',
                author: {
                    name: 'Object Author',
                    url: 'https://objectauthor.com'
                }
            };

            const result = generateBanner(packageObj);

            expect(result).toBe(`/*!
 * object-package 3.0.0
 * https://object.com
 *
 * @license BSD-3-Clause
 * @author: Object Author, https://objectauthor.com
 */`);
        });

        it('should generate banner from minimal package object', () => {
            const packageObj = {
                name: 'minimal-object',
                version: '1.0.0'
            };

            const result = generateBanner(packageObj);

            expect(result).toContain('minimal-object 1.0.0');
            expect(result).toMatch(/^\/\*!/);
            expect(result).toMatch(/\*\/$/);
        });

        it('should handle package object with only license', () => {
            const packageObj = {
                name: 'license-only',
                version: '1.0.0',
                license: 'GPL-3.0'
            };

            const result = generateBanner(packageObj);

            expect(result).toBe(`/*!
 * license-only 1.0.0
 * 
 *
 * @license GPL-3.0
 */`);
        });

        it('should handle package object with only author', () => {
            const packageObj = {
                name: 'author-only',
                version: '1.0.0',
                author: {
                    name: 'Solo Author',
                    url: 'https://solo.com'
                }
            };

            const result = generateBanner(packageObj);

            expect(result).toBe(`/*!
 * author-only 1.0.0
 * 
 *
 * @author: Solo Author, https://solo.com
 */`);
        });
    });

    describe('edge cases', () => {
        it('should handle various input scenarios', () => {
            // Test with empty homepage
            const result1 = generateBanner({
                name: 'test-package',
                version: '1.0.0',
                homepage: ''
            });
            expect(result1).toContain('test-package 1.0.0');

            // Test with empty license
            const result2 = generateBanner({
                name: 'test-package',
                version: '1.0.0',
                license: ''
            });
            expect(result2).toContain('test-package 1.0.0');

            // Test with empty author name
            const result3 = generateBanner({
                name: 'test-package',
                version: '1.0.0',
                author: {name: '', url: 'https://example.com'}
            });
            expect(result3).toContain('test-package 1.0.0');
        });
    });
});