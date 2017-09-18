// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js

// 引入默认语言，是一个 JSON
import defaultLang from './lang/zh-CN';
import Vue from 'vue';
import deepmerge from 'deepmerge'; // 好吧深拷贝的库
import Fromat from './format';

const format = Fromat(Vue); //ivem 并没有接 Vue   elm接了    // const { hasOwn } = Vue.util;
// 设置默认语言
let lang = defaultLang;
// 标志是否合并过
let merged = false;

let i18nHandler = function() {
    // 获取 vue-i18n的模板方法
    const vuei18n = Object.getPrototypeOf(this || Vue).$t;

    // 如果有引入 vue-i18n 则使用它
    if (typeof vuei18n === 'function') {
        if (!merged) {
            // 设置已合并
            merged = true;
            // 配置 vue-i18n
            Vue.Locale(
                Vue.config.lang,
                deepmerge(lang, Vue.locale(Vue.config.lang) || {}, {clone: true})
            );
        }
        // 使用 vue-i18n
        return vuei18n.apply(this, arguments);
    }
};

export const t = function(path, options) {
    let value =i18nHandler.apply(this, arguments);
    if (value !== null && value !== undefined) return value;

    const array = path.split('.');
    let current = lang;

    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1) return format(value, options);
        if (!value) return '';
        current = value; 
    }
    return '';
};

export const use = function(l) {
  lang = l || lang;
};

export const i18n = function(fn) {
    i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n};