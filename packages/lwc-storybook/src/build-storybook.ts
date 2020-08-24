// @ts-ignore
import storybook from '@storybook/web-components/standalone';

export async function buildStorybook(outputDir: String, configDir: String) {
    const results = await storybook({
        mode: 'static',
        outputDir,
        configDir
    });

    return results;
}