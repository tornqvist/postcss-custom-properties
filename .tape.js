const postcss = require('postcss');

module.exports = {
	'postcss-custom-properties': {
		'substitution-empty': {
			message: 'throws an error when a variable function is empty',
			error: { message: /must contain a non-whitespace string/ }
		},
		'substitution-malformed': {
			message: 'throws an error when a variable function is malformed',
			error: { message: /Unclosed bracket/ }
		},
		'substitution-undefined': [
			{
				message: 'warn for undefined variables when { warnings: true }',
				options: { warnings: true },
				warnings: { text: /variable '--(a|b|test)' is undefined and used without a fallback/ }
			},
			{
				message: 'warn for undefined variables when { warnings: { "no-value-notifications": true } }',
				options: { warnings: { 'no-value-notifications': true } },
				warnings: { text: /variable '--(a|b|test)' is undefined and used without a fallback/ }
			},
			{
				message: 'throw for undefined variable when { warnings: { "no-value-notifications": "error" } }',
				options: { warnings: { 'no-value-notifications': 'error' } },
				error: { message: /variable '--test' is undefined and used without a fallback/ }
			},
			{
				message: 'throw for undefined variable when { warnings: { noValueNotifications: "error", warnings: true } }',
				options: { warnings: { noValueNotifications: 'error', warnings: true } },
				error: { message: /variable '--test' is undefined and used without a fallback/ }
			}
		],
		'substitution-defined': [
			{
				message: 'should add a warning for non root custom properties { warnings: true }',
				options: { warnings: true },
				warnings: { text: /^Custom property ignored/ }
			},
			{
				message: 'should add a warning for non root custom properties { warnings: { "not-scoped-to-root": true } }',
				options: { warnings: { 'not-scoped-to-root': true } },
				warnings: { text: /^Custom property ignored/ }
			},
			{
				message: 'should throw an error for non root custom properties',
				options: { warnings: { 'not-scoped-to-root': 'error' } },
				error: { message: /Custom property ignored/ }
			}
		],
		'js-defined': {
			message: 'accepts variables defined from JavaScript, and overrides local definitions',
			options: {
				variables: {
					'--test-one': 'js-one',
					'--test-two': 'js-two',
					'--test-three': 'js-three',
					'--test-varception': 'var(--test-one)',
					'--test-jsception': 'var(--test-varception)',
					'--test-num': 1,
				}
			}
		},
		'automatic-variable-prefix': {
			message: 'prefixes js defined variabled with a double dash automatically',
			options: { variables: { unprefixed: 'blue', '--prefixed': 'white' } }
		},
		'js-override': {
			message: 'allows users to programmatically change the variables',
			before: conditions => {
				const plugin = conditions.plugin();

				plugin.setVariables({
					'--test-one': 'js-one',
					'--test-two': 'js-two',
					'--test-three': 'js-three',
					'--test-varception': 'var(--test-one)',
					'--test-jsception': 'var(--test-varception)',
					'--test-num': 1
				});

				conditions.plugin = {
					process(css, processOpts) {
						return postcss([ plugin ]).process(css, processOpts);
					}
				};
			}
		},
		'remove-properties': {
			message: 'removes variable properties from the output'
		},
		'media-query': {
			message: 'ignores variables defined in a media query'
		},
		'substitution-overwrite': {
			message: 'overwrites variables correctly'
		},
		'substitution-fallback': {
			message: 'substitutes undefined variables if there is a fallback'
		},
		'supports case-sensitive variables': {
			message: 'case-sensitive'
		},
		'supports !important': {
			message: 'important'
		},
		'preserve-variables': {
			message: 'preserves variables when `preserve` is `true`',
			options: { preserve: true }
		},
		'preserve-computed': {
			message: 'preserves computed value when `preserve` is `"computed"`',
			options: { preserve: 'computed' }
		},
		'self-reference': {
			message: 'circular variable references'
		},
		'circular-reference': [
			{
				message: 'circular variable references with { warnings: true }',
				options: { warnings: true },
				warnings: { text: /Circular variable reference: --bg-color/ }
			},
			{
				message: 'circular variable references with { warnings: { "circular-reference": true } }',
				options: { warnings: { 'circular-reference': true } },
				warnings: { text: /Circular variable reference: --bg-color/ }
			},
			{
				message: 'circular variable references with { warnings: { "circular-reference": "error" } }',
				options: { warnings: { 'circular-reference': 'error' } },
				error: { message: /Circular variable reference: --bg-color/ }
			}
		],
		'self-reference-fallback': {
			message: 'circular variable references with fallback'
		},
		'self-reference-double-fallback': {
			message: 'circular variable references with double fallback'
		},
		'append': {
			message: 'append variables',
			options: {
				variables: {
					'--test-one': 'js-one',
					'test-two': 'js-two',
					'test-three': 'var(--test-one, one) var(--test-two, two)',
				},
				preserve: 'computed',
				appendVariables: true
			}
		},
		'append-duplicates': {
			message: 'append variables without duplicates',
			options: {
				variables: {
					'--test-two': 'js-one',
					'test-three': 'js-two',
					'test-four': 'var(--test-one, one) var(--test-two, two) var(--test-three, three)'
				},
				preserve: 'computed',
				appendVariables: true
			}
		},
		'substitution-strict': {
			message: 'strict option',
			options: { strict: false }
		},
		'substitution-trailing-space': {
			message: 'ignores trailing space after variable'
		}
	}
};
