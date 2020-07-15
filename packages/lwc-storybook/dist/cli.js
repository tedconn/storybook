#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cli_1 = require("web-component-analyzer/lib/cjs/cli");
const lwcConfig = JSON.parse(fs_1.default.readFileSync('./lwc.config.json', 'utf-8'));
const moduleDirs = lwcConfig.modules.map((entry) => entry.dir);
cli_1.analyzeAndTransformGlobs(moduleDirs, { format: "json" }).then(result => {
    fs_1.default.mkdirSync('dist/storybook', { recursive: true });
    fs_1.default.writeFileSync("dist/storybook/custom-elements.json", result);
});
