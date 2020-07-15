import { InputOptions, InputOption } from 'rollup';

const SYNTHETIC_IMPORT = 'import "@lwc/synthetic-shadow";';

export default function syntheticShadow() {
    let input: InputOption | undefined;
    return {
        name: 'synthetic-shadow',
        options(rollupOptions: InputOptions) {
            input = rollupOptions.input;
        },
        transform(code: string, id: string) {
            if (id === input) {
                code = SYNTHETIC_IMPORT + code;
            }
            return { code, map: null };
        }
    };
};
