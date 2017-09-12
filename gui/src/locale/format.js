// 用来匹配形如 %{} 或者 {} 格式的参数
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

// export default function(Vue) {
export default function() {
    // const { hasOwn } = Vue.util
    function hasOwn (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
    /**
     * template
     * 
     * @param {String} string 
     * @param {Array} ...args 
     * @returns {String}
     */
    function template(string, ...args) {
        // 处理第二个参数传对象或者数组的情况
        if (args.length === 1 && typeof args[0] === 'object') {
            args = args[0];
        }
        // 处理没有传参数或者参数不是对象的情况
        if (!args || !args.hasOwnProperty) {
            args = {}
        }
        // 处理没有传参数或者参数不是对象的情况
        return string.replace(RE_NARGS, (match, prefix, i, index) => {
            let result;
        // 形如 {{ val }} 直接返回， { val }，不进行解析
            if(string[index -1] === '{' && string[index + match.length] === '}') {
                return i;
            } else {
                // 取得相应的值进行替换，不存在的话则替换为空
                result = hasOwn(args, i) ? args[i] : null;
                if (result === null || result === undefined) {
                    return '';
                }
                return result;
            }
        });
    }
    return template;
}