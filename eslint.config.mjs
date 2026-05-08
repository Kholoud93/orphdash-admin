// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt(
    {
        ignores: ['coverage/**'],
    },

    {
        name: 'project/base',
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
        },
    },

    {
        name: 'project/vue',
        files: ['**/*.vue'],
        rules: {
            'vue/no-v-html': 'off',
        },
    },

    {
        name: 'project/vue-layouts',
        files: ['app/layouts/**/*.vue'],
        rules: {
            'vue/no-multiple-template-root': 'off',
        },
    },

    {
        name: 'project/ssr-globals',
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        rules: {
            'no-restricted-globals': [
                'error',
                {
                    name: 'event',
                    message: 'Do not rely on the global event object.',
                },
            ],
        },
    },

    {
        name: 'project/architecture/pages-components',
        files: ['app/pages/**/*.vue', 'app/components/**/*.vue'],
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.name='$fetch']",
                    message: 'Do not call $fetch directly in pages/components. Use composables/api.',
                },
                {
                    selector: "CallExpression[callee.name='useFetch']",
                    message: 'Do not call useFetch directly in pages/components. Use composables/api.',
                },
            ],
        },
    },

    {
        name: 'project/architecture/ui-no-app-imports',
        files: ['app/components/ui/**/*.vue', 'app/components/vectors/**/*.vue', 'app/components/icons/**/*.vue'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['~/components/app/**', '@/components/app/**'],
                            message: 'Shared UI components must not import app/domain components.',
                        },
                        {
                            group: ['~/stores/**', '@/stores/**'],
                            message: 'Do not import Pinia stores into shared UI components unless explicitly justified.',
                        },
                    ],
                },
            ],
        },
    },

    {
        name: 'project/architecture/utils',
        files: ['app/utils/**/*.{ts,js,mjs}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['vue', '#imports', 'pinia'],
                            message: 'Keep utils pure; move reactive or Nuxt state to composables or stores.',
                        },
                        {
                            group: ['~/composables/**', '@/composables/**'],
                            message: 'Utilities must not depend on composables.',
                        },
                        {
                            group: ['~/stores/**', '@/stores/**'],
                            message: 'Utilities must not depend on stores.',
                        },
                    ],
                },
            ],
        },
    },

    {
        name: 'project/architecture/api-composables',
        files: ['app/composables/api/**/*.{ts,js}'],
        rules: {
            'no-restricted-syntax': 'off',
        },
    },

    eslintConfigPrettier,
);
