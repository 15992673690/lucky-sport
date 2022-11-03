/**
 * 根据字典取value
 * @param {String, Number} value
 * @param {Array} dictOpt
 */
export const getDictLabelFilter = function(value, dictOpt) {
    let opt = dictOpt.find(item => item.value == value);
    return opt.label
}

/**
 * 格式化时间
 * @param {Date参数} date
 * @param {格式 默认"YYYY-mm-dd HH:MM:SS"} fmt
 * @returns "YYYY-mm-dd HH:MM:SS"
 */
 export const dateFormat = (date, fmt = "YYYY/mm/dd HH:MM:SS") => {
    if (!(date instanceof Date)) date = new Date(date);
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1 ?
                    opt[k] :
                    opt[k].padStart(ret[1].length, "0")
            );
        }
    }
    return fmt;
}