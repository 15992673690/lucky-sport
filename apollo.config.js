// apollo.config.js
const {
    VUE_WS_BASE_URL,
    VUE_WS_BASE_QUERY
} = process.env;

module.exports = {
    client: {
        service: {
            name: 'lucky-sports',
            // GraphQL API 的 URL
            url: VUE_WS_BASE_URL + VUE_WS_BASE_QUERY,
        },
        // 通过扩展名选择需要处理的文件
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
        ]
    },
}