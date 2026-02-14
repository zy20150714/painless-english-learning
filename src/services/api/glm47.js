// GLM-4.7-FLASH API调用服务

// 从本地存储获取API密钥
const getApiKey = () => {
  try {
    // 在React Native中，使用AsyncStorage
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage.getItem('glm47ApiKey');
  } catch (error) {
    console.error('获取API密钥失败:', error);
    return null;
  }
};

// 保存API密钥到本地存储
const saveApiKey = async (apiKey) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('glm47ApiKey', apiKey);
    return true;
  } catch (error) {
    console.error('保存API密钥失败:', error);
    return false;
  }
};

// 调用GLM-4.7-FLASH API
const callGLM47API = async (prompt) => {
  try {
    // 这里使用模拟数据，实际项目中需要替换为真实的API调用
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟返回数据
    const mockResponses = {
      phrase: {
        'painless': `1. painless procedure - 无痛 procedure\n   中文翻译：无痛程序\n   例句：The dentist assured me that the injection would be a painless procedure.\n   牙医向我保证注射会是一个无痛的程序。\n\n2. painless experience - 无痛 experience\n   中文翻译：无痛经历\n   例句：My first skydiving jump was surprisingly a painless experience.\n   我的第一次跳伞经历出乎意料地无痛。\n\n3. painless process - 无痛 process\n   中文翻译：无痛过程\n   例句：The online application was a painless process.\n   在线申请是一个无痛的过程。\n\n4. painless solution - 无痛 solution\n   中文翻译：无痛解决方案\n   例句：The doctor found a painless solution to my back problem.\n   医生为我的背部问题找到了一个无痛的解决方案。\n\n5. painless transition - 无痛 transition\n   中文翻译：无痛过渡\n   例句：The company made a painless transition to the new management system.\n   公司平稳地过渡到了新的管理系统。`,
        'example': `1. clear example - 清晰的例子\n   中文翻译：清晰的例子\n   例句：The teacher provided a clear example to explain the concept.\n   老师提供了一个清晰的例子来解释这个概念。\n\n2. good example - 好例子\n   中文翻译：好例子\n   例句：She sets a good example for her younger siblings.\n   她为弟弟妹妹树立了一个好榜样。\n\n3. perfect example - 完美的例子\n   中文翻译：完美的例子\n   例句：This painting is a perfect example of Renaissance art.\n   这幅画是文艺复兴艺术的完美例子。\n\n4. classic example - 经典例子\n   中文翻译：经典例子\n   例句：The story of Romeo and Juliet is a classic example of tragic love.\n   罗密欧与朱丽叶的故事是悲剧爱情的经典例子。\n\n5. prime example - 主要例子\n   中文翻译：主要例子\n   例句：His success is a prime example of hard work paying off.\n   他的成功是努力工作得到回报的主要例子。`
      },
      synonym: {
        'painless': `同义词：\n1. pain-free - 无痛的\n2. comfortable - 舒适的\n3. easy - 容易的\n4. effortless - 不费力的\n5. simple - 简单的\n\n反义词：\n1. painful - 痛苦的\n2. difficult - 困难的\n3. uncomfortable - 不舒服的\n4. challenging - 具有挑战性的\n5. arduous - 艰巨的`,
        'example': `同义词：\n1. instance - 实例\n2. case - 案例\n3. sample - 样本\n4. illustration - 说明\n5. demonstration - 示范\n\n反义词：\n1. counterexample - 反例\n2. exception - 例外\n3. deviation - 偏差\n4. anomaly - 异常\n5. rarity - 稀有`
      },
      root: {
        'painless': `词根词缀分析：\n- pain (词根)：表示"痛苦"\n- -less (后缀)：表示"无，没有"\n\n构成：pain + less = painless (无痛的)\n\n相关词汇：\n1. pain - 痛苦\n2. painful - 痛苦的\n3. pains - 努力\n4. painkiller - 止痛药\n5. painstaking - 辛苦的\n6. pained - 痛苦的\n7. painless - 无痛的\n8. pain-free - 无痛的\n9. pained expression - 痛苦的表情\n10. pain threshold - 痛阈`,
        'vaccination': `词根词缀分析：\n- vaccin- (词根)：来自拉丁语vaccinus，意为"牛的"，因为最初的疫苗来自牛痘\n- -ation (后缀)：表示"动作，过程"\n\n构成：vaccin + ation = vaccination (接种疫苗)\n\n相关词汇：\n1. vaccine - 疫苗\n2. vaccinate - 接种疫苗\n3. vaccination - 接种疫苗\n4. vaccinator - 接种疫苗的人\n5. vaccinal - 疫苗的\n6. vaccination schedule - 疫苗接种计划\n7. vaccination center - 疫苗接种中心\n8. vaccination card - 疫苗接种卡\n9. vaccination campaign - 疫苗接种运动\n10. vaccination rate - 疫苗接种率`
      },
      related: {
        'painless': `1. pain - 痛苦\n2. painful - 痛苦的\n3. painkiller - 止痛药\n4. painstaking - 辛苦的\n5. pained - 痛苦的\n6. pain-free - 无痛的\n7. comfortable - 舒适的\n8. easy - 容易的\n9. effortless - 不费力的\n10. simple - 简单的`,
        'example': `1. instance - 实例\n2. case - 案例\n3. sample - 样本\n4. illustration - 说明\n5. demonstration - 示范\n6. example - 例子\n7. model - 模型\n8. pattern - 模式\n9. prototype - 原型\n10. exemplar - 典范`
      }
    };

    // 提取单词的基本形式
    const word = prompt.match(/"([^"]+)"/)?.[1] || '';
    const type = prompt.includes('短语搭配') ? 'phrase' :
                 prompt.includes('同义词') ? 'synonym' :
                 prompt.includes('词根词缀') ? 'root' : 'related';

    // 返回对应的模拟数据
    if (mockResponses[type] && mockResponses[type][word]) {
      return mockResponses[type][word];
    } else {
      // 如果没有对应的模拟数据，返回通用响应
      return `AI生成内容：\n针对单词 "${word}" 的${type === 'phrase' ? '短语搭配' : type === 'synonym' ? '同义词/反义词' : type === 'root' ? '词根词缀分析' : '相关词汇'}。`;
    }
  } catch (error) {
    console.error('AI API调用失败:', error);
    throw error;
  }
};

module.exports = {
  callGLM47API,
  saveApiKey,
  getApiKey
};
