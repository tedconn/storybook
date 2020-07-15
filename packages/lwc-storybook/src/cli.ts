#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { analyzeAndTransformGlobs } from "web-component-analyzer/lib/cjs/cli";
import { rollup } from 'rollup';
// @ts-ignore
import lwcRollupPlugin from '@lwc/rollup-plugin';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonjs from '@rollup/plugin-commonjs';
import syntheticShadow from './plugins/synthetic-shadow';
import { ModuleFormat } from 'rollup';

// Generate custom-elements.json
// TODO: pass in output dir as a parameter
const lwcConfig = JSON.parse(fs.readFileSync('./lwc.config.json', 'utf-8'));
const moduleDirs = lwcConfig.modules.map((entry: { dir: string; }) => entry.dir);

analyzeAndTransformGlobs(moduleDirs, { format: "json" }).then(result => {
    fs.mkdirSync('dist/storybook', { recursive: true });
    fs.writeFileSync("dist/storybook/custom-elements.json", result);
})

// Generate main-storybook.js
// TODO: pass in entry point as parameter

// need to do this because rollup uses the entry point dir as top level
const lwcModules = lwcConfig.modules.reduce((acc: any[], mod: any) => {
    if (mod.dir) {
        mod.dir = `../${mod.dir}`;
    }
    acc.push(mod);
    return acc;
}, []);

const plugins = [
    syntheticShadow(),
    lwcRollupPlugin({
        modules: lwcModules
    }),
    rollupNodeResolve(),
    rollupCommonjs(),
].filter(Boolean);

const inputOptions = {
    input: "stories/index",
    plugins
}

const outputOptions = {
    file: "dist/storybook/main-storybook.js",
    format: 'esm' as ModuleFormat
};

rollup(inputOptions).then(async bundle => {
    await bundle.write(outputOptions);
});