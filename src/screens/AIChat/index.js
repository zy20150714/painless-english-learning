import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Title, Text, Card, Button, IconButton } from 'react-native-paper';
import { callGLM47API } from '../../services/api/glm47';

export default function AIChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '你好！我是你的AI英语学习助手。有什么我可以帮助你的吗？',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      text: '可以问我单词释义、语法问题、发音练习等',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // 滚动到底部
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // 调用AI API
      const aiResponse = await callGLM47API(`你是一个专业的英语学习助手，请详细回答以下问题：${inputText}`);

      // 添加AI回复
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI API调用失败:', error);

      // 添加错误消息
      const errorMessage = {
        id: Date.now() + 1,
        text: '抱歉，我暂时无法回答你的问题，请稍后再试。',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);

      // 滚动到底部
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const insertExample = (example) => {
    setInputText(example);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Title style={styles.title}>AI学习对话</Title>
        <Text style={styles.subtitle}>与AI助手实时交流，提高英语水平</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer, 
              message.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer
            ]}
          >
            <Card 
              style={[
                styles.messageCard, 
                message.sender === 'user' ? styles.userMessageCard : styles.aiMessageCard
              ]}
            >
              <Card.Content>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
              </Card.Content>
            </Card>
          </View>
        ))}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4CAF50" />
            <Text style={styles.loadingText}>AI正在思考...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="输入你的问题..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <IconButton
          icon="send"
          size={24}
          color="#4CAF50"
          onPress={sendMessage}
          disabled={loading}
        />
      </View>

      <Card style={styles.examplesCard}>
        <Card.Content>
          <Text style={styles.examplesTitle}>💡 对话示例</Text>
          <View style={styles.examplesGrid}>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => insertExample('这个单词怎么发音？')}
            >
              单词发音
            </Button>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => insertExample('这个语法点怎么用？')}
            >
              语法解释
            </Button>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => insertExample('给我一些例句')}
            >
              例句生成
            </Button>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => insertExample('同义词有哪些？')}
            >
              同义词查询
            </Button>
          </View>
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '85%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageCard: {
    elevation: 2,
  },
  userMessageCard: {
    backgroundColor: '#E8F5E9',
  },
  aiMessageCard: {
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 24,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  examplesCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  examplesTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  examplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exampleButton: {
    flex: 1,
    minWidth: '48%',
    marginBottom: 8,
  },
});
