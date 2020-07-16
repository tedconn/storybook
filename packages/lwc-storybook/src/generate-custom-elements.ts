import fs from 'fs';
import { analyzeAndTransformGlobs } from "web-component-analyzer/lib/cjs/cli";

// Generate custom-elements.json
// TODO: pass in output dir as a parameter
// TODO: package.json

export async function generateCustomElementsJson(lwcConfig:any) {
    const moduleDirs = lwcConfig.modules.map((entry: { dir: string; }) => entry.dir);
    const result = await analyzeAndTransformGlobs(moduleDirs, { format: "json" });
    
    fs.mkdirSync('dist/storybook', { recursive: true });
    fs.writeFileSync("dist/storybook/custom-elements.json", result);
}