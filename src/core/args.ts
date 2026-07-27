/**
 * Splits a string of command-line arguments into an array of tokens.
 *
 * Unlike a naive `split(' ')`, this respects single (`'`) and double (`"`) quotes,
 * so an argument value may contain spaces (e.g. `--git-author-name "My Name"` becomes
 * `['--git-author-name', 'My Name']`). The surrounding quotes are used only for grouping
 * and are stripped from the resulting tokens.
 *
 * @param input The raw arguments string (for example, the `other-args` input).
 * @returns The parsed list of argument tokens. Empty or whitespace-only input yields `[]`.
 */
export function parseArgs(input: string): string[] {
  const tokens = input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/gv) ?? []

  return tokens.map(token => token.replaceAll(/"([^"]*)"|'([^']*)'/gv, '$1$2'))
}
