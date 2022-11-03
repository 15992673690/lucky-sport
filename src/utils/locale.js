import { Locale } from 'vant';
// 引入语言包
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';

const messages = {
    'zh-CN': {
      vanPicker: {
        // confirm: '关闭', // 将'确认'修改为'关闭'
      },
    },
};
Locale.use('en-US', enUS);
Locale.use('zh-CN', zhCN);
Locale.add(messages);