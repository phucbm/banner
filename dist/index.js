/*!
 * @phucbm/banner v0.0.1
 * A TypeScript utility package
 * @license MIT
 */


// src/index.ts
import { readFileSync } from "fs";
function generateBanner(input = "./package.json") {
  try {
    let pkg;
    if (typeof input === "string") {
      const packageJsonContent = readFileSync(input, "utf-8");
      pkg = JSON.parse(packageJsonContent);
    } else {
      pkg = input;
    }
    const banner = `/*!
 * ${pkg.name} ${pkg.version}
 * ${pkg.homepage || ""}
 *${pkg.license ? `
 * @license ${pkg.license}` : ""}${pkg.author?.name ? `
 * @author: ${pkg.author.name}${pkg.author.url ? `, ${pkg.author.url}` : ""}` : ""}
 */`;
    return banner;
  } catch (error) {
    throw new Error(`Failed to generate banner: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
export {
  generateBanner
};
//# sourceMappingURL=index.js.map