// @ts-ignore
import lwcRollupPlugin from '@lwc/rollup-plugin';
import { rollup } from 'rollup';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonjs from '@rollup/plugin-commonjs';
import syntheticShadow from './plugins/synthetic-shadow';
import { ModuleFormat } from 'rollup';

/**
 * Bundle all the LWC components into a main-storybook.js
 * @param lwcConfig 
 */
export async function compileComponents(lwcConfig:any) {
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

    const bundle = await rollup(inputOptions);
    const result = await bundle.write(outputOptions);
    return result;
}