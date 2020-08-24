#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { generateCustomElementsJson } from './generate-custom-elements';
import { compileComponents } from './compile-components';
import { buildStorybook } from './build-storybook';

function build(lwcConfig:any) {
    const generate = generateCustomElementsJson(lwcConfig);
    const compile = compileComponents(lwcConfig);
    return Promise.all([generate, compile]).then(() => {
        
        const outDir = path.resolve(__dirname, '..', 'build');
        const configDir = path.resolve(__dirname, '..', '.storybook');
        return buildStorybook(outDir, configDir)
    });
}

const lwcConfigFile = fs.readFileSync('./lwc.config.json', 'utf-8');
const lwcConfig = JSON.parse(lwcConfigFile);
build(lwcConfig).then(() => {
    console.log("it was a success");
}).catch(e => {
    console.error("it was a failure");
})