/**
 * feat：新增功能
 * fix：bug 修复
 * docs：文档更新
 * style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
 * refactor：重构代码(既没有新增功能，也没有修复 bug)
 * perf：性能, 体验优化
 * test：新增测试用例或是更新现有测试
 * build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
 * ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
 * revert：回滚某个更早之前的提交
*/

const fs = require('fs');

const envMessage = process.env['HUSKY_GIT_PARAMS'];
const viMessage = fs.readFileSync(envMessage, { encoding: 'utf-8' });

function getDymicScope() {
    const typeVal = viMessage.split(':')[0];
    if(typeVal === 'fix') {
        return [2, 'never']
    } else {
        return [0, 'never']
    }
}
module.exports = {
    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'docs', 'build', 'style', 'revert', 'perf', 'test']],

        'type-empty': [2, 'never'],

        'scope-empty': getDymicScope(),

        'subject-empty': [2, 'never'],

        'subject-max-length': [2, 'always', 50],

        'subject-min-length': [2, 'always', 5]
    }
}