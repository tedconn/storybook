#!/usr/bin/env node
import fs from 'fs';
import { analyzeAndTransformGlobs } from "web-component-analyzer/lib/cjs/cli";

const lwcConfig = JSON.parse(fs.readFileSync('./lwc.config.json', 'utf-8'));
const moduleDirs = lwcConfig.modules.map((entry: { dir: string; }) => entry.dir);

analyzeAndTransformGlobs(moduleDirs, { format: "json" }).then(result => {
    fs.mkdirSync('dist/storybook', { recursive: true });
    fs.writeFileSync("dist/storybook/custom-elements.json", result);
})


