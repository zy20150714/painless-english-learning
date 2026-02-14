import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Title, Text, Card, Button, TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { testApiKey } from '../../../services/api/glm47';

export default function ApiKeySetupScreen() {
  const [apiKey, setApiKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // 从本地存储加载已保存的API密钥
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const savedKey = await AsyncStorage.getItem('@painless_english_api_key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    } catch (error) {
      console.error('加载API密钥失败:', error);
    }
  };

  const saveApiKey = async () => {
    try {
      await AsyncStorage.setItem('@painless_english_api_key', apiKey);
      setSnackbarMessage('API密钥已保存');
      setSnackbarVisible(true);
    } catch (error) {
      console.error('保存API密钥失败:', error);
      setSnackbarMessage('保存失败，请重试');
      setSnackbarVisible(true);
    }
  };

  const handleTestApiKey = async () => {
    if (!apiKey) {
      Alert.alert('提示', '请先输入API密钥');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await testApiKey(apiKey);
      setTestResult(result);
      if (result) {
        setSnackbarMessage('API密钥测试成功');
      } else {
        setSnackbarMessage('API密钥测试失败，请检查密钥是否正确');
      }
      setSnackbarVisible(true);
    } catch (error) {
      console.error('测试API密钥失败:', error);
      setTestResult(false);
      setSnackbarMessage('测试失败，请检查网络连接');
      setSnackbarVisible(true);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>API密钥配置</Title>
        <Text style={styles.subtitle}>配置智谱AI GLM-4.7-FLASH API密钥</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>获取API密钥</Text>
          <Text style={styles.cardText}>
            1. 访问智谱AI官网 (https://www.zhipuai.cn/)
          </Text>
          <Text style={styles.cardText}>
            2. 注册并登录账号
          </Text>
          <Text style={styles.cardText}>
            3. 在控制台创建API密钥
          </Text>
          <Text style={styles.cardText}>
            4. 复制API密钥到下方输入框
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>API密钥</Text>
          <TextInput
            label="输入API密钥"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            style={styles.input}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
          />
          
          <View style={styles.actions}>
            <Button 
              mode="contained" 
              style={styles.button} 
              onPress={saveApiKey}
            >
              保存密钥
            </Button>
            <Button 
              mode="outlined" 
              style={styles.button} 
              onPress={handleTestApiKey}
              loading={isTesting}
              disabled={isTesting}
            >
              测试密钥
            </Button>
          </View>
          
          {testResult !== null && (
            <View style={styles.testResult}>
              <Text style={[styles.testResultText, { color: testResult ? '#4CAF50' : '#B00020' }]}>
                {testResult ? '测试成功！API密钥有效' : '测试失败！API密钥无效'}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>使用说明</Text>
          <Text style={styles.cardText}>
            • API密钥将保存在本地设备，不会上传到服务器
          </Text>
          <Text style={styles.cardText}>
            • 智谱AI GLM-4.7-FLASH模型提供免费额度
          </Text>
          <Text style={styles.cardText}>
            • 密钥用于智能词义拆解、个性化例句生成等功能
          </Text>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  testResult: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  testResultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  snackbar: {
    marginBottom: 20,
  },
});
