/*
 *   Copyright (c) 2024 濡欑爜瀛﹂櫌-Heyi
 *   All rights reserved.
 *   濡欑爜瀛﹂櫌瀹樻柟鍑哄搧锛屼綔鑰?@Heyi锛屼緵瀛﹀憳瀛︿範浣跨敤锛屽彲鐢ㄤ綔缁冧範锛屽彲鐢ㄤ綔缇庡寲绠€鍘嗭紝涓嶅彲寮€婧愩€? */
import fg from 'fast-glob'

const getPackages = packagePath => fg.sync('*', { cwd: packagePath, onlyDirectories: true, deep: 2 })

const scopes = [
    ...getPackages('packages'),
    ...getPackages('apps'),
    ...getPackages('demos'),
    'docs',
    'project',
    'style',
    'ci',
    'dev',
    'deploy',
    'other',
]

// Emoji
/** @type {import('cz-git').UserConfig} */
export default {
    extends: ['@commitlint/config-conventional'], // extends can be nested
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'scope-enum': [2, 'always', scopes],
    },
    prompt: {
        settings: {},
        messages: {
            skip: ':skip',
            max: 'upper %d chars',
            min: '%d chars at least',
            emptyWarning: 'can not be empty',
            upperLimitWarning: 'over limit',
            lowerLimitWarning: 'below limit',
        },
        types: [
            { value: 'feat', name: 'feat:     鉁? A new feature', emoji: '鉁?' },
            { value: 'fix', name: 'fix:      馃悰  A bug fix', emoji: '馃悰 ' },
            { value: 'docs', name: 'docs:     馃摑  Documentation only changes', emoji: '馃摑 ' },
            {
                value: 'style',
                name: 'style:    馃拕  Changes that do not affect the meaning of the code',
                emoji: '馃拕 ',
            },
            {
                value: 'refactor',
                name: 'refactor: 馃摝锔?  A code change that neither fixes a bug nor adds a feature',
                emoji: '馃摝锔?',
            },
            {
                value: 'perf',
                name: 'perf:     馃殌  A code change that improves performance',
                emoji: '馃殌 ',
            },
            {
                value: 'test',
                name: 'test:     馃毃  Adding missing tests or correcting existing tests',
                emoji: '馃毃 ',
            },
            {
                value: 'build',
                name: 'build:    馃洜   Changes that affect the build system or external dependencies',
                emoji: '馃洜 ',
            },
            {
                value: 'ci',
                name: 'ci:       馃帯  Changes to our CI configuration files and scripts',
                emoji: '馃帯 ',
            },
            {
                value: 'chore',
                name: "chore:    馃敤  Other changes that don't modify src or test files",
                emoji: '馃敤 ',
            },
            { value: 'revert', name: 'revert:   鈴笍  Reverts a previous commit', emoji: ':rewind:' },
        ],
        useEmoji: true,
        confirmColorize: true,
        emojiAlign: 'center',
        questions: {
            scope: {
                description: 'What is the scope of this change (e.g. component or file name)',
            },
            subject: {
                description: 'Write a short, imperative tense description of the change',
            },
            body: {
                description: 'Provide a longer description of the change',
            },
            isBreaking: {
                description: 'Are there any breaking changes?',
            },
            breakingBody: {
                description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
            },
            breaking: {
                description: 'Describe the breaking changes',
            },
            isIssueAffected: {
                description: 'Does this change affect any open issues?',
            },
            issuesBody: {
                description: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
            },
            issues: {
                description: 'Add issue references (e.g. "fix #123", "re #123".)',
            },
        },
    },
}

// 姹夊寲
// /** @type {import('cz-git').UserConfig} */
// module.exports = {
//     rules: {
//         // @see: https://commitlint.js.org/#/reference-rules
//     },
//     prompt: {
//         alias: { fd: 'docs: fix typos' },
//         messages: {
//             type: '閫夋嫨浣犺鎻愪氦鐨勭被鍨?:',
//             scope: '閫夋嫨涓€涓彁浜よ寖鍥达紙鍙€夛級:',
//             customScope: '璇疯緭鍏ヨ嚜瀹氫箟鐨勬彁浜よ寖鍥?:',
//             subject: '濉啓绠€鐭簿鐐肩殑鍙樻洿鎻忚堪 :\n',
//             body: '濉啓鏇村姞璇︾粏鐨勫彉鏇存弿杩帮紙鍙€夛級銆備娇鐢?"|" 鎹㈣ :\n',
//             breaking: '鍒椾妇闈炲吋瀹规€ч噸澶х殑鍙樻洿锛堝彲閫夛級銆備娇鐢?"|" 鎹㈣ :\n',
//             footerPrefixesSelect: '閫夋嫨鍏宠仈issue鍓嶇紑锛堝彲閫夛級:',
//             customFooterPrefix: '杈撳叆鑷畾涔塱ssue鍓嶇紑 :',
//             footer: '鍒椾妇鍏宠仈issue (鍙€? 渚嬪: #31, #I3244 :\n',
//             generatingByAI: '姝ｅ湪閫氳繃 AI 鐢熸垚浣犵殑鎻愪氦绠€鐭弿杩?..',
//             generatedSelectByAI: '閫夋嫨涓€涓?AI 鐢熸垚鐨勭畝鐭弿杩?',
//             confirmCommit: '鏄惁鎻愪氦鎴栦慨鏀筩ommit ?'
//         },
//         types: [
//             { value: '鐗规€?, name: '鐗规€?     鏂板鍔熻兘' },
//             { value: '淇', name: '淇:     淇缂洪櫡' },
//             { value: '鏂囨。', name: '鏂囨。:     鏂囨。鍙樻洿' },
//             { value: '鏍煎紡', name: '鏍煎紡:     浠ｇ爜鏍煎紡锛堜笉褰卞搷鍔熻兘锛屼緥濡傜┖鏍笺€佸垎鍙风瓑鏍煎紡淇锛? },
//             { value: '閲嶆瀯', name: '閲嶆瀯:     浠ｇ爜閲嶆瀯锛堜笉鍖呮嫭 bug 淇銆佸姛鑳芥柊澧烇級' },
//             { value: '鎬ц兘', name: '鎬ц兘:     鎬ц兘浼樺寲' },
//             { value: '娴嬭瘯', name: '娴嬭瘯:     娣诲姞鐤忔紡娴嬭瘯鎴栧凡鏈夋祴璇曟敼鍔? },
//             { value: '鏋勫缓', name: '鏋勫缓:     鏋勫缓娴佺▼銆佸閮ㄤ緷璧栧彉鏇达紙濡傚崌绾?npm 鍖呫€佷慨鏀?webpack 閰嶇疆绛夛級' },
//             { value: '闆嗘垚', name: '闆嗘垚:     淇敼 CI 閰嶇疆銆佽剼鏈? },
//             { value: '鍥為€€', name: '鍥為€€:     鍥炴粴 commit' },
//             { value: '鍏朵粬', name: '鍏朵粬:     瀵规瀯寤鸿繃绋嬫垨杈呭姪宸ュ叿鍜屽簱鐨勬洿鏀癸紙涓嶅奖鍝嶆簮鏂囦欢銆佹祴璇曠敤渚嬶級' }
//         ],
//         useEmoji: false,
//         emojiAlign: 'center',
//         useAI: false,
//         aiNumber: 1,
//         themeColorCode: '',
//         scopes: [],
//         allowCustomScopes: true,
//         allowEmptyScopes: true,
//         customScopesAlign: 'bottom',
//         customScopesAlias: '浠ヤ笂閮戒笉鏄紵鎴戣鑷畾涔?,
//         emptyScopesAlias: '璺宠繃',
//         upperCaseSubject: false,
//         markBreakingChangeMode: false,
//         allowBreakingChanges: ['feat', 'fix'],
//         breaklineNumber: 100,
//         breaklineChar: '|',
//         skipQuestions: [],
//         issuePrefixes: [
//             // 濡傛灉浣跨敤 gitee 浣滀负寮€鍙戠鐞?//             { value: 'link', name: 'link:     閾炬帴 ISSUES 杩涜涓? },
//             { value: 'closed', name: 'closed:   鏍囪 ISSUES 宸插畬鎴? }
//         ],
//         customIssuePrefixAlign: 'top',
//         emptyIssuePrefixAlias: '璺宠繃',
//         customIssuePrefixAlias: '鑷畾涔夊墠缂€',
//         allowCustomIssuePrefix: true,
//         allowEmptyIssuePrefix: true,
//         confirmColorize: true,
//         maxHeaderLength: Infinity,
//         maxSubjectLength: Infinity,
//         minSubjectLength: 0,
//         scopeOverrides: undefined,
//         defaultBody: '',
//         defaultIssues: '',
//         defaultScope: '',
//         defaultSubject: ''
//     }
// }
