#!/usr/bin/env node
import fs from 'fs';
import { generateCustomElementsJson } from './generate-custom-elements';
import { compileComponents } from './compile-components';

function build(lwcConfig:any) {
    generateCustomElementsJson(lwcConfig).then(result => {
        console.log("wrote custom elements");
    });

    compileComponents(lwcConfig).then(result => {
        console.log("wrote lwc bundle");
    });
}

const lwcConfigFile = fs.readFileSync('./lwc.config.json', 'utf-8');
const lwcConfig = JSON.parse(lwcConfigFile);
build(lwcConfig);