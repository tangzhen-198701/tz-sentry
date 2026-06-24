export default {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'cspell lint --no-must-find-files --color --cache --show-suggestions'
  ],
  '**/*.{css,scss,md,html}': [
    'prettier --write',
    'cspell lint --no-must-find-files --color --cache --show-suggestions'
  ]
};
