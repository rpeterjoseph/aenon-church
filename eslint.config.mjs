import coreWebVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  ...coreWebVitals,
  {
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // MaintenanceGate and SiteChrome deliberately read a browser-only API
      // (a cookie / localStorage) on mount and setState from it — the
      // standard SSR-hydration pattern, not something that can be computed
      // during render. This rule's default (error) is tuned for React
      // Compiler adoption and flags that legitimate pattern; downgraded
      // rather than rewriting working, SSR-behavior-sensitive components.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default eslintConfig;
