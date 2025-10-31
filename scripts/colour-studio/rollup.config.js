import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/theme.js',
    output: {
        file: 'bundle/compound-theme.js',
        format: 'iife',
        name: 'CompoundTheme',
        plugins: [terser()]
    },
    plugins: [
        resolve(),
        commonjs()
    ]
};
